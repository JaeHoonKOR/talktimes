"use client"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { CATEGORIES, SUGGESTED_KEYWORDS } from '../constants/keywords';
import { Keyword, KeywordManagerProps } from '../types';

export default function KeywordManager({ onKeywordsUpdate, onSettingsComplete, selectedTopics = [] }: KeywordManagerProps) {
  const { data: session, status } = useSession();
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].name);
  const [message, setMessage] = useState<{ type: 'info' | 'error', content: string | null }>({ 
    type: 'info', 
    content: null 
  });
  const [isSettingsDirty, setIsSettingsDirty] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  // 부모 컴포넌트에 키워드 목록 업데이트 알림
  useEffect(() => {
    if (onKeywordsUpdate) {
      onKeywordsUpdate(keywords);
    }
    
    // 초기 상태와 다른지 확인 (완료 버튼 활성화 여부)
    setIsSettingsDirty(keywords.length > 0);
  }, [keywords, onKeywordsUpdate]);

  useEffect(() => {
    if (status === 'authenticated' && session) {
      fetchUserKeywords();
    } else if (status === 'unauthenticated') {
      setMessage({ type: 'info', content: '로그인하면 키워드가 저장됩니다.' });
    }
  }, [session, status]);

  const fetchUserKeywords = async () => {
    try {
      if (status !== 'authenticated') return;
      
      const response = await fetch('/api/keywords');
      if (!response.ok) throw new Error('API 요청 실패');
      
      const data = await response.json();
      setKeywords(data);
      setIsSettingsDirty(false);
    } catch (error) {
      console.error('키워드 로딩 에러:', error);
      setMessage({ type: 'error', content: '키워드를 불러오는데 실패했습니다.' });
    }
  };

  const handleAddKeyword = async (keywordText?: string) => {
    const keyword = keywordText || newKeyword.trim();
    if (!keyword) return;

    const keywordData = {
      keyword: keyword,
      category: selectedCategory
    };

    if (status === 'authenticated' && session) {
      try {
        const response = await fetch('/api/keywords', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(keywordData),
        });

        if (!response.ok) throw new Error('API 요청 실패');

        const savedKeyword = await response.json();
        setKeywords([...keywords, savedKeyword]);
        setNewKeyword('');
        setMessage({ type: 'success', content: '키워드가 추가되었습니다.' });
      } catch (error) {
        console.error('키워드 추가 에러:', error);
        setMessage({ type: 'error', content: '키워드 추가에 실패했습니다.' });
      }
    } else {
      const tempKeyword = { ...keywordData, id: crypto.randomUUID() };
      setKeywords([...keywords, tempKeyword]);
      setNewKeyword('');
      setMessage({ type: 'info', content: '로그인하면 키워드가 저장됩니다.' });
    }
  };

  const handleDeleteKeyword = async (keywordToDelete: Keyword) => {
    if (status === 'authenticated' && session) {
      try {
        const response = await fetch(`/api/keywords/${keywordToDelete.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('API 요청 실패');

        setKeywords(keywords.filter(k => k.id !== keywordToDelete.id));
        setMessage({ type: 'success', content: '키워드가 삭제되었습니다.' });
      } catch (error) {
        console.error('키워드 삭제 에러:', error);
        setMessage({ type: 'error', content: '키워드 삭제에 실패했습니다.' });
      }
    } else {
      setKeywords(keywords.filter(k => k.id !== keywordToDelete.id));
    }
  };
  
  const handleSettingsComplete = () => {
    // 디버깅 로그 추가
    console.log('=== KeywordManager.handleSettingsComplete 호출됨 ===');
    console.log('시간:', new Date().toISOString());
    console.log('키워드 수:', keywords.length);
    console.log('키워드 목록:', keywords);
    
    // 버튼 로딩 상태 활성화
    setIsButtonLoading(true);
    
    if (onSettingsComplete) {
      console.log('onSettingsComplete 콜백 존재, 호출 준비');
      
      // 상태 메시지 업데이트
      setMessage({ type: 'info', content: '맞춤형 뉴스를 불러오는 중입니다...' });
      
      // 키워드가 없으면 기본 키워드 하나 추가
      const finalKeywords = keywords.length === 0 
                  ? [...keywords, { keyword: '최신뉴스', category: '일반', id: crypto.randomUUID() }]
        : keywords;
      
      console.log('최종 키워드:', finalKeywords);
      
      // 완료 콜백 호출
      try {
        console.log('onSettingsComplete 콜백 호출 시작');
        onSettingsComplete(finalKeywords);
        console.log('onSettingsComplete 콜백 호출 완료');
      } catch (error) {
        console.error('onSettingsComplete 콜백 호출 중 오류:', error);
      }
    } else {
      console.warn('onSettingsComplete 콜백이 정의되지 않음');
      // 콜백이 없는 경우 로딩 상태 해제 (중요)
      setIsButtonLoading(false);
      setMessage({ 
        type: 'error', 
        content: '맞춤형 뉴스를 불러올 수 없습니다. 시스템 오류가 발생했습니다.' 
      });
    }
    
    setIsSettingsDirty(false);
  };

  const getCategoryColor = (categoryName: string) => {
    return CATEGORIES.find(cat => cat.name === categoryName)?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryIcon = (categoryName: string) => {
    return CATEGORIES.find(cat => cat.name === categoryName)?.icon || '📝';
  };

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* 메인 카드 */}
      <Card className="bg-[#F9FAFB] dark:bg-[#2C2C2E] shadow-none border-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-bold text-[#121212] dark:text-[#F0F0F0] flex items-center justify-center gap-2">
            <span className="text-2xl">🎯</span>
            나만의 뉴스 키워드 설정
          </CardTitle>
          <p className="text-[#4B5563] dark:text-[#9CA3AF] mt-2">
            관심 있는 키워드를 추가하여 맞춤형 뉴스를 받아보세요
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {message.content && (
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="animate-elegant-fade-in">
              <AlertDescription>
                {message.content}
              </AlertDescription>
            </Alert>
          )}

          {keywords.length === 0 && (
            <div className="col-span-full text-center py-12 bg-[#F9FAFB] dark:bg-[#1C1C1E] rounded-xl border-none">
              <div className="text-6xl mb-4 text-[#3B82F6]">🎯</div>
              <p className="text-xl text-[#121212] dark:text-[#F0F0F0] mb-3 font-semibold">
                아직 추가된 키워드가 없습니다
              </p>
              <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">
                위의 입력란에서 관심 있는 키워드를 추가해보세요!
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Button 
                  variant="outline" 
                  className="interactive-element"
                  onClick={() => setShowSuggestions(true)}
                >
                  추천 키워드 보기
                </Button>
                <Button 
                  className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white interactive-element"
                  onClick={() => {
                    const randomCategory = CATEGORIES[0]; // 첫 번째 카테고리 사용
                    const randomKeyword = SUGGESTED_KEYWORDS[randomCategory.name as keyof typeof SUGGESTED_KEYWORDS][0];
                    setSelectedCategory(randomCategory.name);
                    handleAddKeyword(randomKeyword);
                  }}
                >
                  랜덤 키워드 추가
                </Button>
              </div>
            </div>
          )}

          {/* 키워드 추가 섹션을 가로로 확장 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="예: 인공지능, 주식투자, 건강관리..."
                className="w-full bg-[#F9FAFB] dark:bg-[#2C2C2E] border-none focus:border-[#3B82F6]"
                onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1 bg-[#F9FAFB] dark:bg-[#2C2C2E] border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category.name} value={category.name}>
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        {category.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={() => handleAddKeyword()}
                disabled={!newKeyword.trim()}
                className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white interactive-element"
              >
                추가
              </Button>
            </div>
          </div>

          {/* 추천 키워드 섹션 가로 확장 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CATEGORIES.slice(0, 4).map(category => (
              <div 
                key={category.name} 
                className="bg-[#F9FAFB] dark:bg-[#1C1C1E] rounded-xl p-4 border-none hover:shadow-none transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold flex items-center gap-2 text-[#121212] dark:text-[#F0F0F0]">
                    <span>{category.icon}</span>
                    {category.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {}}
                    className="text-[#4B5563] dark:text-[#9CA3AF] hover:text-[#121212] dark:hover:text-[#F0F0F0]"
                  >
                    더보기
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_KEYWORDS[category.name as keyof typeof SUGGESTED_KEYWORDS]?.slice(0, 4).map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSelectedCategory(category.name);
                        handleAddKeyword(suggestion);
                      }}
                      className="text-xs px-2 py-1 bg-[#F9FAFB] dark:bg-[#2C2C2E] hover:bg-[#F9FAFB] dark:hover:bg-[#2C2C2E] border-none rounded-full transition-all duration-200 hover:scale-105 hover:shadow-none"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 내 키워드 목록 가로 확장 및 그리드 레이아웃 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map(category => {
              const categoryKeywords = keywords.filter(k => k.category === category.name);
              if (categoryKeywords.length === 0) return null;

              return (
                <div 
                  key={category.name} 
                  className="bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-xl p-4 border-none shadow-none hover:shadow-none transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{category.icon}</span>
                    <h4 className="font-semibold text-[#121212] dark:text-[#F0F0F0]">{category.name}</h4>
                    <span className="text-xs bg-[#F9FAFB] dark:bg-[#1C1C1E] text-[#4B5563] dark:text-[#9CA3AF] px-2 py-1 rounded-full">
                      {categoryKeywords.length}개
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categoryKeywords.map((keyword) => (
                      <Badge
                        key={keyword.id || keyword.keyword}
                        className={`${getCategoryColor(keyword.category)} cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-105 interactive-element`}
                        onClick={() => handleDeleteKeyword(keyword)}
                      >
                        {keyword.keyword}
                        <span className="ml-2 hover:text-red-600">×</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="pt-6">
          <Button
            onClick={handleSettingsComplete}
            disabled={!isSettingsDirty || isButtonLoading}
            className="w-full bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white text-lg py-6 interactive-element"
          >
            {isButtonLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                맞춤형 뉴스를 불러오는 중...
              </>
            ) : (
              <>
                <span className="mr-2">🚀</span>
                맞춤형 뉴스 받기 시작하기
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 