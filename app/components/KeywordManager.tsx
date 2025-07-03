"use client"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import { CATEGORIES, CATEGORY_ICONS, SUGGESTED_KEYWORDS } from '../constants/keywords';
import { Keyword, KeywordManagerProps } from '../types';

// 직접 상수 정의 (constants/keywords.ts 파일에서 가져오는 대신)
// 성능 최적화를 위해 컴포넌트 외부에서 직접 정의
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
  { 
    name: '과학/의학', 
    icon: 'science', 
    color: 'bg-[#10B981]/20 text-[#10B981] font-medium border-[#10B981]/30',
    bgColor: '#10B981'
  },
  { 
    name: '스포츠', 
    icon: 'sports', 
    color: 'bg-[#EF4444]/20 text-[#EF4444] font-medium border-[#EF4444]/30',
    bgColor: '#EF4444'
  },
  { 
    name: '엔터테인먼트', 
    icon: 'entertainment', 
    color: 'bg-[#8B5CF6]/20 text-[#8B5CF6] font-medium border-[#8B5CF6]/30',
    bgColor: '#8B5CF6'
  },
  { 
    name: '라이프스타일', 
    icon: 'lifestyle', 
    color: 'bg-[#10B981]/20 text-[#10B981] font-medium border-[#10B981]/30',
    bgColor: '#10B981'
  },
  { 
    name: '일반', 
    icon: 'general', 
    color: 'bg-[#6B7280]/20 text-[#6B7280] font-medium border-[#6B7280]/30',
    bgColor: '#6B7280'
  }
];

// SVG 아이콘 맵핑 - 이모지 대신 사용
const CATEGORY_ICONS = {
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
  science: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>
  ),
  sports: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      <path d="M2 12h20"></path>
    </svg>
  ),
  entertainment: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polygon points="23 7 16 12 23 17 23 7"></polygon>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
    </svg>
  ),
  lifestyle: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  ),
  general: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )
};

// 추천 키워드 데이터
const SUGGESTED_KEYWORDS = {
  '테크/IT': ['AI', '블록체인', '메타버스', '클라우드', '사이버보안', '스타트업'],
  '경제/금융': ['주식', '부동산', '암호화폐', '금리', '인플레이션', '투자'],
  '정치/사회': ['선거', '정책', '사회이슈', '국제관계', '법률', '복지'],
  '문화/예술': ['전시회', '공연', '영화', '음악', '문학', '디자인'],
  '과학/의학': ['의료기술', '신약', '우주', '환경', '연구', '바이오'],
  '스포츠': ['축구', '야구', '올림픽', '프로스포츠', 'e스포츠', '피트니스'],
  '엔터테인먼트': ['드라마', 'K-POP', '예능', '게임', '웹툰', '유튜브'],
  '라이프스타일': ['건강', '요리', '여행', '패션', '뷰티', '육아'],
  '일반': ['최신뉴스', '헤드라인', '핫이슈', '속보', '데일리', '주간']
};

export default function KeywordManager({ onKeywordsUpdate, onSettingsComplete, selectedTopics = [] }: KeywordManagerProps) {
  const { data: session, status } = useSession();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const [message, setMessage] = useState<{ type: 'info' | 'error' | 'success', content: string | null }>({ 
    type: 'info', 
    content: null 
  });
  const [isSettingsDirty, setIsSettingsDirty] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  
  // 임시 ID 생성을 위한 카운터 참조
  const tempIdCounter = useRef(0);

  // 부모 컴포넌트에 키워드 목록 업데이트 알림
  useEffect(() => {
    if (onKeywordsUpdate) {
      onKeywordsUpdate(keywords);
    }
    
    // 초기 상태와 다른지 확인 (완료 버튼 활성화 여부)
    setIsSettingsDirty(keywords.length > 0);
  }, [keywords, onKeywordsUpdate]);

  // 카테고리별 키워드 수 계산을 최적화 (O(n)으로 개선)
  const categoryKeywordCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // 초기화
    CATEGORIES.forEach(cat => {
      counts[cat.name] = 0;
    });
    
    // 한 번의 순회로 모든 카테고리의 카운트 계산
    keywords.forEach(keyword => {
      if (counts[keyword.category] !== undefined) {
        counts[keyword.category]++;
      }
    });
    
    return counts;
  }, [keywords]);

  // 카테고리별로 그룹화된 키워드
  const groupedKeywords = useMemo(() => {
    const groups: Record<string, Keyword[]> = {};
    
    CATEGORIES.forEach(cat => {
      groups[cat.name] = keywords.filter(k => k.category === cat.name);
    });
    
    return groups;
  }, [keywords]);

  // 키워드 추가 핸들러
  const handleAddKeyword = useCallback(() => {
    if (!newKeyword.trim()) return;

    const keywordData = {
      keyword: newKeyword.trim(),
      category: selectedCategory
    };
    
    if (status === 'authenticated' && session) {
      // 로딩 상태 표시
      setIsButtonLoading(true);
      
      fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keywordData),
      })
      .then(response => {
        if (!response.ok) throw new Error('API 요청 실패');
        return response.json();
      })
      .then(savedKeyword => {
        const updatedKeywords = [...keywords, savedKeyword];
        setKeywords(updatedKeywords);
        setNewKeyword('');
        setMessage({ type: 'success', content: '키워드가 추가되었습니다.' });
        setIsSettingsDirty(true);
        
        // 키워드 업데이트 콜백 호출
        if (onKeywordsUpdate) {
          onKeywordsUpdate(updatedKeywords);
        }
      })
      .catch(error => {
        setMessage({ type: 'error', content: '키워드 추가에 실패했습니다.' });
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
    } else {
      // 비로그인 사용자는 증가하는 카운터와 타임스탬프로 임시 ID 생성
      const tempId = `temp_${Date.now()}_${tempIdCounter.current++}`;
      const tempKeyword = { ...keywordData, id: tempId } as Keyword;
      
      const updatedKeywords = [...keywords, tempKeyword];
      setKeywords(updatedKeywords);
      setNewKeyword('');
      setMessage({ type: 'info', content: null });
      setIsSettingsDirty(true);
      
      // 키워드 업데이트 콜백 호출
      if (onKeywordsUpdate) {
        onKeywordsUpdate(updatedKeywords);
      }
    }
  }, [newKeyword, selectedCategory, status, session, keywords, onKeywordsUpdate]);

  // 키워드 삭제 핸들러
  const handleDeleteKeyword = useCallback((keywordToDelete: Keyword) => {
    if (status === 'authenticated' && session && keywordToDelete.id) {
      setIsButtonLoading(true);
      
      fetch(`/api/keywords/${keywordToDelete.id}`, {
          method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        if (!response.ok) throw new Error('API 요청 실패');
        return response.json();
      })
      .then(() => {
        const updatedKeywords = keywords.filter(k => k.id !== keywordToDelete.id);
        setKeywords(updatedKeywords);
        setMessage({ type: 'success', content: '키워드가 삭제되었습니다.' });
        
        // 키워드 업데이트 콜백 호출
        if (onKeywordsUpdate) {
          onKeywordsUpdate(updatedKeywords);
        }
      })
      .catch(error => {
        setMessage({ type: 'error', content: '키워드 삭제에 실패했습니다.' });
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
    } else {
      const updatedKeywords = keywords.filter(k => k.id !== keywordToDelete.id);
      setKeywords(updatedKeywords);
      
      // 키워드 업데이트 콜백 호출
      if (onKeywordsUpdate) {
        onKeywordsUpdate(updatedKeywords);
      }
    }
  }, [keywords, status, session, onKeywordsUpdate]);

  // 추천 키워드 클릭 핸들러
  const handleSuggestedKeywordClick = useCallback((keyword: string, category: string) => {
    const keywordData = {
      keyword: keyword,
      category: category
    };
    
    // 이미 추가된 키워드인지 확인
    const isDuplicate = keywords.some(k => 
      k.keyword.toLowerCase() === keyword.toLowerCase() && 
      k.category === category
    );
    
    if (isDuplicate) {
      setMessage({ type: 'info', content: '이미 추가된 키워드입니다.' });
      return;
    }
    
    if (status === 'authenticated' && session) {
      setIsButtonLoading(true);
      
      fetch('/api/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keywordData),
      })
      .then(response => {
        if (!response.ok) throw new Error('API 요청 실패');
        return response.json();
      })
      .then(savedKeyword => {
        const updatedKeywords = [...keywords, savedKeyword];
        setKeywords(updatedKeywords);
        setMessage({ type: 'success', content: '키워드가 추가되었습니다.' });
        setIsSettingsDirty(true);
        
        // 키워드 업데이트 콜백 호출
        if (onKeywordsUpdate) {
          onKeywordsUpdate(updatedKeywords);
        }
      })
      .catch(error => {
        setMessage({ type: 'error', content: '키워드 추가에 실패했습니다.' });
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
    } else {
      // 비로그인 사용자는 증가하는 카운터와 타임스탬프로 임시 ID 생성
      const tempId = `temp_${Date.now()}_${tempIdCounter.current++}`;
      const tempKeyword = { ...keywordData, id: tempId } as Keyword;
      
      const updatedKeywords = [...keywords, tempKeyword];
      setKeywords(updatedKeywords);
      setIsSettingsDirty(true);
      
      // 키워드 업데이트 콜백 호출
      if (onKeywordsUpdate) {
        onKeywordsUpdate(updatedKeywords);
      }
    }
  }, [keywords, status, session, onKeywordsUpdate]);

  return (
    <div className="w-full overflow-hidden">
      <div className="space-y-6">
        {message.content && message.content !== '로그인하면 키워드가 저장됩니다.' && (
          <Alert variant={message.type === 'error' ? 'destructive' : message.type === 'success' ? 'default' : 'default'} 
            className="rounded-lg border"
          >
            <AlertDescription className="text-center">
              {message.content}
            </AlertDescription>
          </Alert>
        )}

        {/* 키워드 추가 섹션 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-1">새 키워드 추가</h3>
            <p className="text-sm text-gray-500">관심 있는 주제의 키워드를 추가하세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
            <div className="md:col-span-3">
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
              />
              {/* 로그인 안내 툴팁 */}
              {status !== 'authenticated' && (
                <p className="text-xs text-gray-500 mt-2 ml-1">
                  <span className="inline-flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    로그인하면 키워드가 저장됩니다
                  </span>
                </p>
              )}
            </div>
            <div className="md:col-span-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="카테고리 선택" />
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
          <div className="mt-4 flex justify-end">
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
              ) : '키워드 추가'}
              </Button>
          </div>
        </div>

        {keywords.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg">
            <div className="mb-4 text-blue-500">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-lg sm:text-xl mb-2 sm:mb-3 font-semibold">
              아직 추가된 키워드가 없습니다
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto mb-6 sm:mb-8 px-4">
              위의 입력란에 키워드를 입력하거나 아래 추천 키워드를 선택해보세요.
            </p>
              <Button 
              onClick={() => onSettingsComplete && onSettingsComplete([])}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              disabled={true}
            >
              맞춤형 뉴스 받기 시작하기
              </Button>
          </div>
        )}

        {/* 추천 키워드 섹션 */}
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold mb-1 flex items-center">
              <span className="text-[#3B82F6] mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"></path>
                </svg>
              </span>
              추천 키워드
            </h3>
            <p className="text-sm text-[#4B5563] ml-6">관심 있는 키워드를 선택해 보세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {CATEGORIES.slice(0, 4).map((category) => (
              <div 
                key={category.name} 
                className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium flex items-center gap-2 text-sm sm:text-base text-[#121212]">
                    <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-[#F5F5F5] rounded-full text-[#3B82F6]">
                      {CATEGORY_ICONS[category.icon]}
                    </span>
                    {category.name}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {SUGGESTED_KEYWORDS[category.name as keyof typeof SUGGESTED_KEYWORDS]?.slice(0, 4).map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestedKeywordClick(suggestion, category.name)}
                      className="bg-[#F5F5F5] hover:bg-[#EFEFEF] text-[#121212] text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 내 키워드 목록 */}
        {keywords.length > 0 && (
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-1 flex items-center">
                <span className="text-[#3B82F6] mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </span>
                내 키워드
              </h3>
              <p className="text-sm text-[#4B5563] ml-6">선택한 키워드 목록입니다</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
              {CATEGORIES.map((category) => {
                const categoryKeywords = groupedKeywords[category.name];
                if (!categoryKeywords || categoryKeywords.length === 0) return null;

                return (
                  <div 
                    key={category.name} 
                    className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB]"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-[#F5F5F5] rounded-full text-[#3B82F6]">
                        {CATEGORY_ICONS[category.icon]}
                      </span>
                      <h4 className="font-medium text-sm sm:text-base text-[#121212]">{category.name}</h4>
                      <span className="text-xs bg-[#EBF5FF] text-[#3B82F6] px-2 py-0.5 rounded-full ml-auto">
                        {categoryKeywordCounts[category.name]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {categoryKeywords.map((keyword) => (
                        <Badge
                          key={keyword.id || keyword.keyword}
                          className="bg-[#F5F5F5] hover:bg-[#EFEFEF] text-[#121212] cursor-pointer text-xs sm:text-sm px-2 py-0.5"
                          onClick={() => handleDeleteKeyword(keyword)}
                        >
                          {keyword.keyword}
                          <span className="ml-1 sm:ml-2 text-[#9CA3AF] hover:text-[#EF4444]">×</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 text-center">
          <Button
                onClick={() => onSettingsComplete && onSettingsComplete(keywords)}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2"
            disabled={!isSettingsDirty || isButtonLoading}
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
        </div>
          </div>
        )}
      </div>
    </div>
  );
} 