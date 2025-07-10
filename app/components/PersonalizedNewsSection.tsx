'use client';

import { throttle } from 'lodash-es';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { Skeleton } from '../../src/components/ui/skeleton';
import { usePersonalization } from '../contexts/PersonalizationContext';
import usePersonalizedNews from '../hooks/usePersonalizedNews';
import KeywordManager from './KeywordManager';

interface Keyword {
  id?: number | string;
  keyword: string;
  category: string;
}

interface PersonalizedNewsSectionProps {
  initialKeywords?: Keyword[];
}

/**
 * PersonalizedNewsSection 컴포넌트
 * 
 * 데이터 흐름 검증:
 * 1. props.initialKeywords - 선택: 초기 키워드 목록
 *    - 부모 컴포넌트: PersonalizationSection
 *    - 전달 시 자동으로 뉴스 조회 시작
 * 
 * 2. KeywordManager 자식 컴포넌트에 필수 props:
 *    - onSettingsComplete: 키워드 설정 완료 시 호출될 콜백 함수
 *    - 이 콜백을 통해 KeywordManager → PersonalizedNewsSection 데이터 흐름 형성
 * 
 * 3. usePersonalizedNews 훅 사용:
 *    - fetchNewsWithKeywords 함수 호출로 API 요청 시작
 *    - 훅으로부터 상태(news, isLoading, error 등) 업데이트 수신
 * 
 * 4. usePersonalization 컨텍스트 연동:
 *    - 전역 상태 관리를 위한 연결
 *    - KeywordManager에게 selectedTopics 전달
 */
const PersonalizedNewsSection = React.memo(({ initialKeywords = [] }: PersonalizedNewsSectionProps) => {
  const { news, keywords, isLoading, error, message, refreshNews, fetchNewsWithKeywords } = usePersonalizedNews();
  const [showKeywordManager, setShowKeywordManager] = useState(initialKeywords.length === 0);
  const { state } = usePersonalization();
  const [localLoading, setLocalLoading] = useState(false);
  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0); // 로딩 진행 상태 추가

  // 초기 키워드가 있을 경우 뉴스 가져오기
  useEffect(() => {
    if (initialKeywords.length > 0 && !showKeywordManager) {
      fetchNewsWithKeywords(initialKeywords);
      simulateLoadingProgress(); // 로딩 진행 상태 시뮬레이션 시작
    }
  }, [initialKeywords, fetchNewsWithKeywords, showKeywordManager]);

  // 로딩 진행 상태 시뮬레이션
  const simulateLoadingProgress = () => {
    setLoadingProgress(0);
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const next = prev + Math.random() * 15;
        return next > 90 ? 90 : next;
      });
    }, 300);
    
    return () => clearInterval(interval);
  };

  // 키워드 설정 완료 처리 - 쓰로틀링 적용
  const handleSettingsComplete = useCallback(
    throttle((keywords: Keyword[]) => {
      setShowKeywordManager(false);
      
      // 로딩 상태 설정
      setLocalLoading(true);
      setLocalMessage("맞춤형 뉴스를 불러오는 중입니다...");
      simulateLoadingProgress(); // 로딩 진행 상태 시뮬레이션 시작
      
      // 키워드로 뉴스 가져오기
      try {
        fetchNewsWithKeywords(keywords);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('fetchNewsWithKeywords 함수 호출 중 오류:', error);
        }
      }
    }, 300),
    [fetchNewsWithKeywords]
  );

  // 로딩 상태 및 메시지 업데이트 (useEffect로 관리)
  useEffect(() => {
    setLocalLoading(isLoading);
    setLocalMessage(message);
    
    // 로딩이 완료되면 진행 상태를 100%로 설정
    if (!isLoading && loadingProgress > 0) {
      setLoadingProgress(100);
      const timeout = setTimeout(() => setLoadingProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, message, loadingProgress]);

  // 키워드 관리로 돌아가기
  const handleBackToSettings = useCallback(() => {
    setShowKeywordManager(true);
  }, []);

  // 뉴스 새로고침 처리
  const handleRefreshNews = useCallback(() => {
    if (keywords.length > 0) {
      setLocalLoading(true);
      setLocalMessage("뉴스를 새로고침 중입니다...");
      simulateLoadingProgress();
      refreshNews();
    }
  }, [keywords, refreshNews]);

  // 오류 메시지 사용자 친화적으로 변환
  const getUserFriendlyErrorMessage = useCallback((error: string | null) => {
    if (!error) return null;
    
    if (error.includes('network') || error.includes('fetch')) {
      return "인터넷 연결을 확인해주세요. 서버에 연결할 수 없습니다.";
    } else if (error.includes('timeout')) {
      return "서버 응답 시간이 너무 깁니다. 잠시 후 다시 시도해주세요.";
    } else if (error.includes('not found') || error.includes('404')) {
      return "요청하신 정보를 찾을 수 없습니다.";
    }
    
    return "뉴스를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }, []);

  // 카테고리별 배경색 지정
  const getCategoryColor = useCallback((category: string) => {
    const colorMap: Record<string, string> = {
      '기술': 'bg-[#F59E0B]',
      '경제': 'bg-[#10B981]',
      '정치': 'bg-[#3B82F6]',
      '문화': 'bg-[#4B5563]',
      '스포츠': 'bg-[#EF4444]',
      '과학': 'bg-[#10B981]',
      '건강': 'bg-[#10B981]',
    };
    
    return colorMap[category] || 'bg-[#4B5563]';
  }, []);

  // 키워드 매니저 섹션
  const keywordManagerSection = useMemo(() => {
    if (!showKeywordManager) return null;
    
    return (
      <KeywordManager 
        onSettingsComplete={handleSettingsComplete} 
        selectedTopics={state.selectedTopics}
      />
    );
  }, [showKeywordManager, handleSettingsComplete, state.selectedTopics]);

  // 뉴스 아이템별 매칭되는 키워드를 미리 계산
  const newsWithMatchedKeywords = useMemo(() => {
    if (!news || news.length === 0 || !keywords || keywords.length === 0) {
      return news;
    }

    return news.map(item => {
      const lowerTitle = item.title.toLowerCase();
      const lowerExcerpt = item.excerpt.toLowerCase();
      
      // 각 뉴스 아이템에 매칭되는 키워드 미리 계산
      const matchedKeywords = keywords.filter(keyword => {
        const lowerKeyword = keyword.keyword.toLowerCase();
        return lowerTitle.includes(lowerKeyword) || lowerExcerpt.includes(lowerKeyword);
      });
      
      return {
        ...item,
        matchedKeywords
      };
    });
  }, [news, keywords]);

  // 뉴스 섹션
  const newsSection = useMemo(() => {
    if (showKeywordManager) return null;
    
    const userFriendlyError = getUserFriendlyErrorMessage(error);
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-[#121212] mb-3">
            나만의 맞춤형 뉴스
          </h3>
          <p className="text-[#4B5563] max-w-2xl mx-auto">
            선택하신 키워드를 기반으로 AI가 엄선한 뉴스를 보여드립니다.
          </p>
          
          {/* 키워드 관리 및 새로고침 버튼 */}
          <div className="flex justify-center gap-3 mt-4">
            <Button
              onClick={handleBackToSettings}
              className="bg-white text-[#4B5563] border border-[#D1D5DB] hover:bg-gray-50"
              aria-label="키워드 설정 변경하기"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              키워드 설정 변경
            </Button>
            <Button
              onClick={handleRefreshNews}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              disabled={localLoading || keywords.length === 0}
              aria-label="뉴스 새로고침"
            >
              <svg className={`w-4 h-4 mr-2 ${localLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              새로고침
            </Button>
          </div>
          
          {/* 로딩 상태 표시 개선 */}
          {localLoading && (
            <div className="mt-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 text-[#3B82F6] mb-2">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>{localMessage || "뉴스를 불러오는 중..."}</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#3B82F6] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                  role="progressbar"
                  aria-valuenow={loadingProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                {loadingProgress < 100 ? '데이터를 불러오는 중...' : '완료!'}
              </p>
            </div>
          )}
          
          {/* 오류 메시지 개선 */}
          {userFriendlyError && (
            <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-4 max-w-md mx-auto" role="alert">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-red-700">{userFriendlyError}</p>
                  <div className="mt-2 flex space-x-2">
                    <Button
                      onClick={handleRefreshNews}
                      className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded"
                      size="sm"
                    >
                      다시 시도
                    </Button>
                    <Button
                      onClick={handleBackToSettings}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      size="sm"
                    >
                      키워드 변경
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-white rounded-lg overflow-hidden border border-[#E5E7EB]">
                <div className="relative h-40 w-full">
                  <Skeleton className="h-full w-full absolute inset-0" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : news && news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsWithMatchedKeywords.map((item, index) => (
              <div 
                key={`news-item-${item.id || index}-${item.title}`} 
                className="bg-white rounded-lg overflow-hidden border border-[#E5E7EB] hover:border-[#D1D5DB] transition-colors will-change-transform hover:shadow-md"
              >
                {item.imageUrl && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiB2aWV3Qm94PSIwIDAgNDAwIDIyNSI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                      priority={index < 3}
                    />
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs text-white px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">{item.source}</span>
                    <span className="text-xs text-[#9CA3AF] ml-auto">{item.publishedAt}</span>
                  </div>
                  <h4 className="text-base font-medium mb-2 line-clamp-2 text-[#121212]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#4B5563] mb-3 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.matchedKeywords && item.matchedKeywords.map((keyword, idx) => (
                      <Badge key={`keyword-${item.id || index}-${idx}-${keyword.keyword}`} className="bg-[#EBF5FF] text-[#3B82F6]">
                        {keyword.keyword}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Link 
                      href={item.url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#3B82F6] hover:underline flex items-center"
                    >
                      자세히 보기
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <button 
                      className="text-sm text-[#4B5563] hover:text-[#3B82F6] p-2 rounded-full hover:bg-gray-50"
                      aria-label="뉴스 저장"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <div className="mb-4 text-gray-400">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-1M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
              </svg>
            </div>
            <h4 className="text-xl font-medium mb-2">뉴스를 찾을 수 없습니다</h4>
            <p className="text-[#4B5563] mb-6 max-w-md mx-auto">
              선택하신 키워드에 맞는 뉴스가 없습니다. 다른 키워드를 선택하거나 나중에 다시 시도해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleBackToSettings}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                키워드 다시 선택하기
              </Button>
              <Button
                onClick={handleRefreshNews}
                className="bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-gray-50"
              >
                새로고침
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }, [showKeywordManager, localLoading, localMessage, error, isLoading, news, newsWithMatchedKeywords, getCategoryColor, handleBackToSettings, handleRefreshNews, getUserFriendlyErrorMessage, keywords.length, loadingProgress]);

  return (
    <div className="w-full">
      {showKeywordManager ? keywordManagerSection : newsSection}
    </div>
  );
});

PersonalizedNewsSection.displayName = 'PersonalizedNewsSection';

export default PersonalizedNewsSection; 