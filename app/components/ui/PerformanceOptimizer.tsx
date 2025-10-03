"use client";

import { useEffect } from 'react';
import { usePreloadCriticalResources, useLCPObserver } from '../../hooks/usePreloadCriticalResources';
import { useLayoutStabilization } from '../../hooks/useLayoutStabilization';

export default function PerformanceOptimizer() {
  const { checkFontLoading } = usePreloadCriticalResources();
  const { clsScore } = useLayoutStabilization();
  
  // LCP 관찰
  useLCPObserver();

  // 성능 메트릭 모니터링
  useEffect(() => {
    const monitorPerformance = async () => {
      // 폰트 로딩 상태 확인
      const fontsLoaded = await checkFontLoading();
      if (fontsLoaded) {
        console.log('✅ Fonts loaded successfully');
      }

      // Core Web Vitals 체크
      if ('web-vitals' in window) {
        console.log('📊 Core Web Vitals monitoring active');
      }

      // 개발 환경에서만 성능 로그
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => {
          if (clsScore > 0) {
            console.log(`📏 Current CLS score: ${clsScore.toFixed(4)}`);
            if (clsScore > 0.1) {
              console.warn('⚠️ CLS exceeds recommended threshold (0.1)');
            }
          }
        }, 3000);
      }
    };

    monitorPerformance();
  }, [checkFontLoading, clsScore]);

  // 이 컴포넌트는 시각적 요소가 없음
  return null;
}