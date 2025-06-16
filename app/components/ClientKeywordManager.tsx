'use client';

import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { usePersonalization } from '../contexts/PersonalizationContext';
import { Keyword } from '../types';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './LoadingSpinner';

const KeywordManager = dynamic(() => import('./KeywordManager'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-gray-100 rounded-xl h-96 flex items-center justify-center">
      <LoadingSpinner size="lg" text="키워드 관리자 로딩 중..." />
    </div>
  )
});

interface ClientKeywordManagerProps {
  selectedTopics?: string[];
}

export default function ClientKeywordManager({ selectedTopics = [] }: ClientKeywordManagerProps) {
  const { state, setKeywords } = usePersonalization();

  // KeywordManager로부터 키워드 목록 업데이트 받기 - 메모이제이션
  const handleKeywordsUpdate = useCallback((keywords: Keyword[]) => {
    setKeywords(keywords);
  }, [setKeywords]);

  return (
    <ErrorBoundary
      fallback={
        <div className="p-8 text-center">
          <p className="text-red-600 mb-4">키워드 관리자를 불러오는 중 오류가 발생했습니다.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            새로고침
          </button>
        </div>
      }
    >
      <KeywordManager 
        onKeywordsUpdate={handleKeywordsUpdate}
        selectedTopics={selectedTopics.length > 0 ? selectedTopics : state.selectedTopics}
      />
    </ErrorBoundary>
  );
} 