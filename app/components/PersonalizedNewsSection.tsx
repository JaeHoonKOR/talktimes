'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Badge } from '../../src/components/ui/badge';
import { Button } from '../../src/components/ui/button';
import { Skeleton } from '../../src/components/ui/skeleton';
import { usePersonalization } from '../contexts/PersonalizationContext';
import usePersonalizedNews from '../hooks/usePersonalizedNews';
import KeywordManager from './KeywordManager';

interface Keyword {
  id?: number;
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
export default function PersonalizedNewsSection({ initialKeywords = [] }: PersonalizedNewsSectionProps) {
  const { news, keywords, isLoading, error, message, refreshNews, fetchNewsWithKeywords } = usePersonalizedNews();
  const [showKeywordManager, setShowKeywordManager] = useState(initialKeywords.length === 0);
  const { state, setKeywords } = usePersonalization();

  // 초기 키워드가 있을 경우 뉴스 가져오기
  React.useEffect(() => {
    if (initialKeywords.length > 0 && !showKeywordManager) {
      console.log('초기 키워드로 뉴스 가져오기:', initialKeywords);
      fetchNewsWithKeywords(initialKeywords);
    }
  }, [initialKeywords, fetchNewsWithKeywords, showKeywordManager]);

  // 키워드 설정 완료 처리
  const handleSettingsComplete = (keywords: Keyword[]) => {
    console.log('=== PersonalizedNewsSection.handleSettingsComplete 호출됨 ===');
    console.log('시간:', new Date().toISOString());
    console.log('받은 키워드 수:', keywords.length);
    console.log('받은 키워드 목록:', keywords);
    console.log('PersonalizationContext 상태:', state);
    
    console.log('showKeywordManager 상태 변경: true -> false');
    setShowKeywordManager(false);
    
    // 로딩 상태 메시지 표시
    console.log('로컬 updateLocalState 함수 호출');
    updateLocalState({ isLoading: true, message: "맞춤형 뉴스를 불러오는 중입니다..." });
    
    // 키워드로 뉴스 가져오기
    console.log('fetchNewsWithKeywords 함수 호출 준비');
    try {
      console.log('fetchNewsWithKeywords 함수 호출 시작');
      fetchNewsWithKeywords(keywords);
      console.log('fetchNewsWithKeywords 함수 호출 완료');
    } catch (error) {
      console.error('fetchNewsWithKeywords 함수 호출 중 오류:', error);
    }
  };

  // 상태 업데이트 헬퍼 함수
  const updateLocalState = (updates: Partial<{ isLoading: boolean; message: string | null }>) => {
    if (updates.isLoading !== undefined) {
      // isLoading 상태 명시적 설정
      // usePersonalizedNews 훅의 isLoading을 직접 수정할 수 없으므로 UI에 표시
      document.getElementById('loading-state')?.setAttribute('data-loading', updates.isLoading.toString());
    }
    if (updates.message !== null && updates.message !== undefined) {
      // 메시지 상태 업데이트 (DOM 조작)
      const messageEl = document.getElementById('status-message');
      if (messageEl) {
        messageEl.textContent = updates.message;
        messageEl.style.display = updates.message ? 'block' : 'none';
      }
    }
  };

  // 키워드 관리로 돌아가기
  const handleBackToSettings = () => {
    setShowKeywordManager(true);
  };

  // 카테고리별 배경색 지정
  const getCategoryColor = (category: string) => {
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
  };

  // 해당 뉴스에 포함된 키워드 찾기 (정확한 매칭)
  const findMatchingKeywords = (title: string, excerpt: string) => {
    if (!keywords || keywords.length === 0) return [];

    return keywords.filter(keyword => {
      // 키워드가 짧은 경우 (3글자 미만)는 단어 경계 검사를 더 엄격하게 수행
      if (keyword.length < 3) {
        const titleRegex = new RegExp(`\\b${keyword}\\b|\\b${keyword}[가-힣]|[가-힣]${keyword}\\b`, 'i');
        const excerptRegex = new RegExp(`\\b${keyword}\\b|\\b${keyword}[가-힣]|[가-힣]${keyword}\\b`, 'i');
        return titleRegex.test(title) || excerptRegex.test(excerpt);
      }
      
      // 영어 키워드는 단어 경계 검사
      if (/^[a-zA-Z]+$/.test(keyword)) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(title) || regex.test(excerpt);
      }
      
      // 한글 및 기타 키워드는 일반 포함 검사
      const lowerKeyword = keyword.toLowerCase();
      const lowerTitle = title.toLowerCase();
      const lowerExcerpt = excerpt.toLowerCase();
      
      return lowerTitle.includes(lowerKeyword) || lowerExcerpt.includes(lowerKeyword);
    });
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl space-y-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black text-gray-900 mb-6 elite-heading">
          당신만의 <span className="premium-text-gradient">뉴스 취향</span> 설정
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          관심 있는 키워드를 선택하면, AI가 학습해서 더욱 정확한 뉴스를 추천해드립니다.
        </p>
        <span className="sr-only">
          이 섹션에서는 개인화된 뉴스 추천을 위한 키워드를 설정하고 맞춤형 뉴스를 확인할 수 있습니다.
        </span>
      </div>
      
      {showKeywordManager ? (
        <KeywordManager 
          onSettingsComplete={handleSettingsComplete} 
          selectedTopics={state.selectedTopics}
        />
      ) : (
        <div className="space-y-8">
          {/* 뉴스 섹션 중앙 정렬 및 최대 너비 적용 */}
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              나만의 맞춤형 뉴스
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              선택하신 키워드를 기반으로 AI가 엄선한 뉴스를 보여드립니다.
            </p>
            
            {/* 상태 메시지 및 로딩 표시 */}
            <div id="loading-state" data-loading={isLoading.toString()} className="mt-4">
              {isLoading && (
                <div className="flex items-center justify-center gap-2 text-blue-600 animate-pulse">
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>뉴스를 불러오는 중...</span>
                </div>
              )}
              <p 
                id="status-message" 
                className={`mt-2 text-sm ${error ? 'text-red-500' : 'text-blue-600'}`}
                style={{display: (message || error) ? 'block' : 'none'}}
              >
                {error || message}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Skeleton 
                  key={index} 
                  className="h-[400px] w-full rounded-xl bg-gray-100" 
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-xl">
              <p className="text-red-600 text-xl mb-4">
                뉴스를 불러오는 중 오류가 발생했습니다.
              </p>
              <Button 
                onClick={refreshNews}
                className="premium-button interactive-element"
              >
                다시 시도하기
              </Button>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12 bg-blue-50 rounded-xl">
              <div className="text-6xl mb-4 text-blue-400">📰</div>
              <p className="text-xl text-gray-700 mb-3 font-semibold">
                아직 추천할 뉴스가 없습니다
              </p>
              <p className="text-sm text-gray-500 mb-6">
                키워드를 더 추가하거나 다른 카테고리를 선택해보세요.
              </p>
              <Button 
                onClick={handleBackToSettings}
                className="premium-button interactive-element"
              >
                키워드 설정으로 돌아가기
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => {
                const matchingKeywords = findMatchingKeywords(item.title, item.excerpt);
                
                return (
                  <Link 
                    href={`/news/${item.id}`}
                    key={item.id} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative">
                        <Image 
                          src={item.imageUrl || '/images/default-news.png'} 
                          alt={item.title} 
                          width={400} 
                          height={250} 
                          className="w-full h-48 object-cover"
                        />
                        <div className={`absolute top-3 left-3 ${getCategoryColor(item.category)} text-white px-2 py-1 text-xs rounded`}>
                          {item.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                        
                        {matchingKeywords.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1.5">
                              {matchingKeywords.map((keyword, idx) => (
                                <Badge 
                                  key={idx} 
                                  variant="outline" 
                                  className="text-xs bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100"
                                >
                                  # {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-xs">
                            {new Date(item.publishedAt).toLocaleDateString('ko-KR')}
                          </span>
                          <span className="text-indigo-600 text-sm font-medium">{item.source}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 