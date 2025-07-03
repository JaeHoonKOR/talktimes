'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

// 이벤트 타입 정의
export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, any>;
};

// 이벤트 추적 함수
export const trackEvent = (event: AnalyticsEvent) => {
  try {
    // 개발 환경에서는 콘솔에 로깅
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
    
    // 프로덕션 환경에서는 실제 분석 서비스로 전송
    // 예: Google Analytics, Mixpanel, Amplitude 등
    if (process.env.NODE_ENV === 'production') {
      // 여기에 실제 분석 서비스 코드 추가
      // 예시: window.gtag('event', event.name, event.properties);
    }
    
    // 로컬 스토리지에 이벤트 저장 (디버깅 및 개발 목적)
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
      ...event,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('analytics_events', JSON.stringify(events.slice(-100))); // 최근 100개만 저장
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

// 페이지 조회 추적
export const trackPageView = (url: string) => {
  trackEvent({
    name: 'page_view',
    properties: { url }
  });
};

// 사용자 행동 추적
export const trackUserAction = (action: string, category: string, label?: string, value?: number) => {
  trackEvent({
    name: 'user_action',
    properties: { action, category, label, value }
  });
};

// 페이지 추적 컴포넌트 (useSearchParams 사용)
function PageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 페이지 변경 추적
  useEffect(() => {
    if (pathname) {
      const url = searchParams.toString() 
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      
      trackPageView(url);
    }
  }, [pathname, searchParams]);
  
  return null;
}

// 분석 컨텍스트 제공자
export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <PageTracker />
      </Suspense>
      {children}
    </>
  );
}

// 사용자 피드백 수집 훅
export const useFeedback = () => {
  const submitFeedback = (rating: number, comment: string, category: string = 'general') => {
    trackEvent({
      name: 'user_feedback',
      properties: { rating, comment, category }
    });
    
    // 여기에 백엔드 API 호출 로직 추가 가능
    // 예: fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ rating, comment, category }) })
    
    return true;
  };
  
  return { submitFeedback };
}; 