import { useCallback, useEffect, useState } from 'react';
import { Keyword, LoadingState, NewsResponse, PersonalizedNewsState } from '../types';

interface UsePersonalizedNewsReturn extends PersonalizedNewsState {
  refreshNews: () => void;
  fetchNewsWithKeywords: (keywords: Keyword[]) => Promise<void>;
  loadingState: LoadingState;
}

/**
 * usePersonalizedNews 훅
 * 
 * 데이터 흐름 검증:
 * 1. 외부 컴포넌트(PersonalizedNewsSection)로부터 호출:
 *    - fetchNewsWithKeywords: 키워드 목록을 받아 API 요청 시작
 *    - refreshNews: 마지막으로 사용한 키워드로 API 재요청
 * 
 * 2. 상태 관리:
 *    - news[]: 가져온 뉴스 데이터 목록
 *    - keywords[]: 현재 필터링에 사용된 키워드 목록
 *    - isLoading: 데이터 로딩 상태
 *    - error: 오류 메시지
 *    - message: 사용자에게 표시할 메시지
 * 
 * 3. API 통신:
 *    - '/api/personalized-news' 엔드포인트로 POST 요청
 *    - 오류/타임아웃 처리 및 재시도 로직 포함
 * 
 * 4. 의존성 관리:
 *    - userKeywords 상태를 통해 마지막 사용 키워드 보존
 *    - shouldFetchNews 플래그로 불필요한 재요청 방지
 */
export default function usePersonalizedNews(): UsePersonalizedNewsReturn {
  const [state, setState] = useState<PersonalizedNewsState>({
    news: [],
    keywords: [],
    isLoading: false,
    error: null,
    message: null,
  });
  
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [retryCount, setRetryCount] = useState(0);
  const [userKeywords, setUserKeywords] = useState<Keyword[]>([]);
  const [shouldFetchNews, setShouldFetchNews] = useState(false);

  // 상태 업데이트 헬퍼
  const updateState = useCallback((updates: Partial<PersonalizedNewsState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // 에러 처리 헬퍼
  const handleError = useCallback((error: unknown, context: string) => {
    console.error(`${context}:`, error);
    
    let errorMessage = '알 수 없는 오류가 발생했습니다.';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    updateState({ 
      error: errorMessage, 
      isLoading: false 
    });
    setLoadingState('error');
  }, [updateState]);

  // 뉴스 가져오기 함수
  const fetchPersonalizedNews = useCallback(async (keywords: Keyword[]): Promise<void> => {
    if (keywords.length === 0) {
      updateState({ 
        error: '키워드를 선택해주세요.',
        isLoading: false 
      });
      setLoadingState('error');
      return;
    }

    // 명시적으로 로딩 상태 설정
    updateState({ 
      isLoading: true, 
      error: null,
      message: "맞춤형 뉴스를 불러오는 중입니다..."
    });
    setLoadingState('loading');

    try {
      const controller = new AbortController();
      // 타임아웃 시간을 15초로 늘림
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const keywordTexts = keywords.map(k => k.keyword);
      console.log('=== API 요청 디버그 정보 ===');
      console.log('요청 시작:', new Date().toISOString());
      console.log('키워드:', keywordTexts);
      console.log('요청 URL:', '/api/personalized-news');
      console.log('요청 메서드:', 'POST');
      console.log('요청 데이터:', JSON.stringify({ keywords: keywordTexts }));

      // 사용자 피드백을 위한 최소 로딩 시간 보장
      const startTime = Date.now();
      const MIN_LOADING_TIME = 1000; // 최소 1초 동안 로딩 표시

      const response = await fetch('/api/personalized-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: keywordTexts }),
        signal: controller.signal,
      });

      console.log('응답 수신:', new Date().toISOString());
      console.log('응답 상태:', response.status, response.statusText);
      console.log('응답 헤더:', JSON.stringify(Object.fromEntries([...response.headers.entries()])));

      clearTimeout(timeoutId);

      // 최소 로딩 시간 보장
      const loadingTime = Date.now() - startTime;
      if (loadingTime < MIN_LOADING_TIME) {
        await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME - loadingTime));
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data: NewsResponse = await response.json();
      console.log('API 응답 수신:', data);

      if (data.success && data.data?.news) {
        updateState({
          news: data.data.news,
          keywords: data.data.keywords || keywordTexts,
          message: data.data.message || null,
          error: null,
          isLoading: false,
        });
        setLoadingState('success');
        setRetryCount(0); // 성공 시 재시도 카운트 리셋
      } else {
        updateState({
          news: [],
          keywords: keywordTexts,
          message: data.data?.message || "선택한 키워드에 맞는 뉴스를 찾을 수 없습니다.",
          error: null,
          isLoading: false,
        });
        setLoadingState('success');
      }
    } catch (error) {
      // AbortError 처리 (타임아웃)
      if (error instanceof DOMException && error.name === 'AbortError') {
        if (retryCount < 3) {
          console.log(`재시도 ${retryCount + 1}/3...`);
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchPersonalizedNews(keywords), 2000);
          return;
        } else {
          handleError('요청 시간이 초과되었습니다. 네트워크 연결을 확인해주세요.', 'Timeout Error');
        }
      } else {
        handleError(error, 'Fetch Error');
      }
    }
  }, [updateState, handleError, retryCount]);

  // 키워드로 뉴스 가져오기 시작
  const fetchNewsWithKeywords = useCallback(async (keywords: Keyword[]): Promise<void> => {
    console.log('=== usePersonalizedNews.fetchNewsWithKeywords 호출됨 ===');
    console.log('시간:', new Date().toISOString());
    console.log('수신한 키워드 수:', keywords.length);
    console.log('수신한 키워드 목록:', keywords);
    
    console.log('상태 업데이트: userKeywords 설정');
    setUserKeywords(keywords);
    console.log('상태 업데이트: shouldFetchNews를 true로 설정');
    setShouldFetchNews(true);
    
    console.log('직접 fetchPersonalizedNews 호출');
    try {
      await fetchPersonalizedNews(keywords);
      console.log('fetchPersonalizedNews 호출 완료');
    } catch (error) {
      console.error('fetchPersonalizedNews 호출 중 오류:', error);
    }
  }, [fetchPersonalizedNews]);

  // 수동 새로고침
  const refreshNews = useCallback(() => {
    console.log('뉴스 새로고침');
    if (userKeywords.length > 0) {
      fetchPersonalizedNews(userKeywords);
    }
  }, [fetchPersonalizedNews, userKeywords]);

  // Effect for automatic fetching
  useEffect(() => {
    console.log('=== usePersonalizedNews useEffect 트리거됨 ===');
    console.log('shouldFetchNews:', shouldFetchNews);
    console.log('userKeywords:', userKeywords);
    
    if (shouldFetchNews && userKeywords.length > 0) {
      console.log('useEffect에서 fetchPersonalizedNews 호출');
      fetchPersonalizedNews(userKeywords);
      console.log('shouldFetchNews를 false로 재설정');
      setShouldFetchNews(false);
    }
  }, [shouldFetchNews, userKeywords, fetchPersonalizedNews]);

  return {
    ...state,
    loadingState,
    refreshNews,
    fetchNewsWithKeywords,
  };
} 