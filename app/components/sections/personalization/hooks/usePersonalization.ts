import { useCallback, useState } from 'react';
import { Keyword } from '../../../../types';

export function usePersonalization() {
  const [showNewsSection, setShowNewsSection] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

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

  // 키워드 추가 핸들러
  const handleAddKeyword = useCallback((keyword: Keyword) => {
    setSelectedKeywords(prev => [...prev, keyword]);
  }, []);

  // 키워드 삭제 핸들러
  const handleDeleteKeyword = useCallback((keywordToDelete: Keyword) => {
    setSelectedKeywords(prev => prev.filter(k => k.id !== keywordToDelete.id));
  }, []);

  // 추천 키워드 클릭 핸들러
  const handleSuggestedKeywordClick = useCallback((keyword: string, category: string) => {
    // 이미 추가된 키워드인지 확인
    const isDuplicate = selectedKeywords.some(k => 
      k.keyword.toLowerCase() === keyword.toLowerCase()
    );
    
    if (isDuplicate) {
      return; // 중복 키워드는 무시
    }
    
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const tempKeyword = { 
      id: tempId,
      keyword: keyword,
      category: category
    } as Keyword;
    
    setSelectedKeywords(prev => [...prev, tempKeyword]);
  }, [selectedKeywords]);

  return {
    showNewsSection,
    selectedKeywords,
    isLoading,
    error,
    isButtonLoading,
    setIsButtonLoading,
    handleSettingsComplete,
    handleBackToSettings,
    handleKeywordsUpdate,
    handleCloseError,
    handleAddKeyword,
    handleDeleteKeyword,
    handleSuggestedKeywordClick,
  };
} 