"use client";

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import React, { memo, useCallback, useState } from 'react';
import { Keyword } from '../../types';
import { SectionProps } from '../../types/sections';
import PersonalizedNewsSection from '../PersonalizedNewsSection';

// 카테고리 데이터 (원래 KeywordManager에서 가져옴)
const CATEGORIES = [
  { 
    name: '테크/IT', 
    icon: 'tech', 
    color: 'bg-[#F59E0B]/20 text-[#F59E0B] font-medium border-[#F59E0B]/30',
    bgColor: '#F59E0B' 
  },
  { 
    name: '경제/금융', 
    icon: 'finance', 
    color: 'bg-[#10B981]/20 text-[#10B981] font-medium border-[#10B981]/30',
    bgColor: '#10B981'
  },
  { 
    name: '정치/사회', 
    icon: 'politics', 
    color: 'bg-[#3B82F6]/20 text-[#3B82F6] font-medium border-[#3B82F6]/30',
    bgColor: '#3B82F6'
  },
  { 
    name: '문화/예술', 
    icon: 'culture', 
    color: 'bg-[#4B5563]/20 text-[#4B5563] font-medium border-[#4B5563]/30',
    bgColor: '#4B5563'
  },
];

// 추천 키워드 데이터
const SUGGESTED_KEYWORDS = {
  '테크/IT': ['AI', '블록체인', '메타버스', '클라우드'],
  '경제/금융': ['주식', '부동산', '암호화폐', '금리'],
  '정치/사회': ['선거', '정책', '사회이슈', '국제관계'],
  '문화/예술': ['전시회', '공연', '영화', '음악'],
};

// SVG 아이콘 맵핑
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  tech: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  ),
  finance: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  ),
  politics: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  culture: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  ),
};

/**
 * PersonalizationSection 컴포넌트
 * 
 * 새로운 그리드 레이아웃:
 * - 첫 번째 행: 왼쪽에 새 관심 주제 추가, 오른쪽에 추천 주제
 * - 두 번째 행: 맞춤형 뉴스 받기 버튼
 * - 세 번째 행: 맞춤형 뉴스 콘텐츠
 */
const PersonalizationSection = memo(({ className = '', id = 'personalization' }: SectionProps) => {
  const [showNewsSection, setShowNewsSection] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isDuplicateWarning, setIsDuplicateWarning] = useState(false);

  // 키워드 설정 완료 처리
  const handleSettingsComplete = useCallback((keywords: Keyword[]) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedKeywords(keywords);
      
      // 즉시 상태 업데이트
        setShowNewsSection(true);
        setIsLoading(false);
    } catch (err) {
      setError('관심 주제 설정 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  }, []);

  // 뉴스 섹션에서 키워드 관리로 돌아가기
  const handleBackToSettings = useCallback(() => {
    setShowNewsSection(false);
  }, []);

  // 키워드 업데이트 핸들러
  const handleKeywordsUpdate = useCallback((keywords: Keyword[]) => {
    setSelectedKeywords(keywords);
  }, []);

  // 에러 닫기 핸들러
  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  // 중복 키워드 확인
  const checkDuplicateKeyword = useCallback((keyword: string): boolean => {
    return selectedKeywords.some(k => 
      k.keyword.toLowerCase() === keyword.toLowerCase()
    );
  }, [selectedKeywords]);

  // 키워드 추가 핸들러
  const handleAddKeyword = useCallback(() => {
    if (!newKeyword.trim()) return;
    
    // 중복 키워드 검사
    if (checkDuplicateKeyword(newKeyword.trim())) {
      setIsDuplicateWarning(true);
      setTimeout(() => setIsDuplicateWarning(false), 3000);
      return;
    }

    const tempId = `temp_${Date.now()}`;
    const tempKeyword = { 
      id: tempId,
      keyword: newKeyword.trim(),
      category: selectedCategory
    } as Keyword;
    
    const updatedKeywords = [...selectedKeywords, tempKeyword];
    setSelectedKeywords(updatedKeywords);
    setNewKeyword('');
    setIsDuplicateWarning(false);
    
    if (handleKeywordsUpdate) {
      handleKeywordsUpdate(updatedKeywords);
    }
  }, [newKeyword, selectedCategory, selectedKeywords, handleKeywordsUpdate, checkDuplicateKeyword]);

  // 키워드 삭제 핸들러
  const handleDeleteKeyword = useCallback((keywordToDelete: Keyword) => {
    const updatedKeywords = selectedKeywords.filter(k => k.id !== keywordToDelete.id);
    setSelectedKeywords(updatedKeywords);
    
    if (handleKeywordsUpdate) {
      handleKeywordsUpdate(updatedKeywords);
    }
  }, [selectedKeywords, handleKeywordsUpdate]);

  // 추천 키워드 클릭 핸들러
  const handleSuggestedKeywordClick = useCallback((keyword: string, category: string) => {
    // 이미 추가된 키워드인지 확인
    if (checkDuplicateKeyword(keyword)) {
      setIsDuplicateWarning(true);
      setTimeout(() => setIsDuplicateWarning(false), 3000);
      return;
    }
    
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const tempKeyword = { 
      id: tempId,
      keyword: keyword,
      category: category
    } as Keyword;
    
    const updatedKeywords = [...selectedKeywords, tempKeyword];
    setSelectedKeywords(updatedKeywords);
    
    if (handleKeywordsUpdate) {
      handleKeywordsUpdate(updatedKeywords);
    }
  }, [selectedKeywords, handleKeywordsUpdate, checkDuplicateKeyword]);

  return (
    <section
      id={id}
      className={`py-10 md:py-12 lg:py-16 bg-[#F9FAFB] ${className} min-h-[90vh] mb-24`}
      aria-label="개인 맞춤형 뉴스 설정"
    >
      <div className="container mx-auto px-4 max-w-5xl py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-medium text-[#121212] mb-2">
            나만의 <span className="text-[#3B82F6]">관심 주제</span>로 맞춤 뉴스 받기
            </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base">
            관심 있는 주제를 선택하면 AI가 당신에게 맞는 뉴스를 제공합니다
            </p>
          </div>

          {/* 로딩 오버레이 */}
          {isLoading && (
          <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50" aria-live="polite">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                <span className="sr-only">로딩 중...</span>
                <p className="mt-2 text-sm text-[#4B5563]">맞춤형 뉴스를 불러오는 중...</p>
              </div>
            </div>
          )}

          {/* 오류 메시지 */}
          {error && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-3 text-center" role="alert" aria-live="assertive">
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
              <button 
                onClick={handleCloseError} 
                className="mt-1 text-xs text-[#3B82F6] hover:text-[#2563EB] focus:outline-none rounded-md px-2 py-1"
                aria-label="오류 메시지 닫기"
              >
                닫기
              </button>
            </div>
          )}

        {!showNewsSection ? (
          <div className="space-y-4">
            {/* 첫 번째 행: 그리드 레이아웃 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 왼쪽: 새 관심 주제 추가 */}
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] min-h-[320px]">
                <div className="mb-3">
                  <h3 className="text-base font-semibold mb-1">새 관심 주제 추가</h3>
                  <p className="text-sm text-gray-500">관심 있는 주제를 추가하세요</p>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <Input
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        placeholder="예: 인공지능, 주식투자, 건강관리..."
                        className="w-full text-[#121212]"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && newKeyword.trim()) {
                            e.preventDefault();
                            handleAddKeyword();
                          }
                        }}
                        aria-label="관심 주제 입력"
                      />
                    </div>
                    <div className="col-span-1">
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full" aria-label="카테고리 선택">
                          <SelectValue placeholder="카테고리" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category.name} value={category.name}>
                              <span className="inline-flex items-center">
                                <span className="mr-2">{CATEGORY_ICONS[category.icon]}</span>
                                {category.name}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* 중복 키워드 경고 메시지 */}
                  {isDuplicateWarning && (
                    <div className="text-amber-600 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      이미 추가된 주제입니다
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAddKeyword}
                      disabled={!newKeyword.trim() || isButtonLoading}
                      className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                    >
                      {isButtonLoading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          추가 중...
                        </span>
                      ) : '주제 추가'}
                    </Button>
                  </div>
                </div>
                
                {/* 선택된 관심 주제 표시 */}
                {selectedKeywords.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">선택된 관심 주제</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedKeywords.map((keyword) => (
                        <Badge
                          key={keyword.id || keyword.keyword}
                          className="bg-[#F5F5F5] hover:bg-[#EFEFEF] text-[#121212] cursor-pointer flex items-center"
                          onClick={() => handleDeleteKeyword(keyword)}
                        >
                          {keyword.keyword}
                          <span 
                            className="ml-1 text-[#9CA3AF] hover:text-[#EF4444]" 
                            role="button" 
                            aria-label={`${keyword.keyword} 주제 삭제`}
                          >
                            ×
                          </span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* 오른쪽: 추천 주제 */}
              <div className="bg-white rounded-lg p-4 border border-[#E5E7EB] min-h-[320px]">
                <div className="mb-3">
                  <h3 className="text-base font-semibold mb-1 flex items-center">
                    <span className="text-[#3B82F6] mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"></path>
                      </svg>
                    </span>
                    추천 주제
                  </h3>
                  <p className="text-sm text-[#4B5563] ml-6">관심 있는 주제를 선택해 보세요</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((category) => (
                    <div 
                      key={category.name} 
                      className="bg-white rounded-lg p-3 border border-[#E5E7EB]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center justify-center w-6 h-6 bg-[#F5F5F5] rounded-full text-[#3B82F6]">
                          {CATEGORY_ICONS[category.icon]}
                        </span>
                        <h4 className="font-medium text-sm text-[#121212]">{category.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {SUGGESTED_KEYWORDS[category.name as keyof typeof SUGGESTED_KEYWORDS]?.map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => handleSuggestedKeywordClick(suggestion, category.name)}
                            className="bg-[#F5F5F5] hover:bg-[#EFEFEF] text-[#121212] text-xs px-2 py-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                            aria-label={`${suggestion} 주제 추가`}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
          </div>
            </div>

            {/* 두 번째 행: 맞춤형 뉴스 받기 버튼 */}
            <div className="text-center py-8 my-4">
              <Button
                onClick={() => handleSettingsComplete(selectedKeywords)}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-2 text-lg"
                disabled={selectedKeywords.length === 0 || isButtonLoading}
              >
                {isButtonLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    처리 중...
                  </span>
                ) : '맞춤형 뉴스 받기 시작하기'}
              </Button>
              {selectedKeywords.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">관심 주제를 하나 이상 선택해주세요</p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-[#E5E7EB] min-h-[500px]">
            <div className="mb-3 flex justify-between items-center">
              <h3 className="text-lg font-medium text-[#121212]">맞춤형 뉴스</h3>
              <button 
                onClick={handleBackToSettings}
                className="text-sm text-[#3B82F6] hover:text-[#2563EB] focus:outline-none rounded-md px-2 py-1 flex items-center"
                aria-label="관심 주제 설정으로 돌아가기"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                관심 주제 수정
              </button>
            </div>
            <PersonalizedNewsSection initialKeywords={selectedKeywords} />
          </div>
        )}
      </div>
    </section>
  );
});

PersonalizationSection.displayName = 'PersonalizationSection';

export default PersonalizationSection; 