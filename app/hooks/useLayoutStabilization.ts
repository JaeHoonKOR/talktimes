"use client";

import { useEffect, useCallback, useState } from 'react';

interface LayoutStabilizationOptions {
  enableCLSMonitoring?: boolean;
  reserveImageSpace?: boolean;
  stabilizeAnimations?: boolean;
}

export const useLayoutStabilization = (
  options: LayoutStabilizationOptions = {}
) => {
  const {
    enableCLSMonitoring = true,
    reserveImageSpace = true,
    stabilizeAnimations = true
  } = options;

  const [clsScore, setCLSScore] = useState(0);
  const [layoutShifts, setLayoutShifts] = useState<LayoutShift[]>([]);

  // CLS 모니터링
  useEffect(() => {
    if (!enableCLSMonitoring || !('PerformanceObserver' in window)) return;

    let clsValue = 0;
    const shifts: LayoutShift[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as LayoutShift[]) {
        // 사용자 입력이 없는 경우에만 CLS에 포함
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          shifts.push(entry);
        }
      }
      
      setCLSScore(clsValue);
      setLayoutShifts([...shifts]);
      
      // CLS가 0.1을 초과하는 경우 경고
      if (clsValue > 0.1) {
        console.warn('CLS exceeds 0.1 threshold:', clsValue);
        console.log('Layout shifts:', shifts);
      }
    });

    observer.observe({ entryTypes: ['layout-shift'] });

    return () => observer.disconnect();
  }, [enableCLSMonitoring]);

  // 이미지 공간 예약을 위한 aspect ratio 계산
  const getImagePlaceholder = useCallback((
    width: number, 
    height: number, 
    className?: string
  ) => {
    const aspectRatio = (height / width) * 100;
    
    return {
      className: `${className || ''} relative overflow-hidden`,
      style: {
        paddingBottom: `${aspectRatio}%`,
        height: 0
      },
      'data-aspect-ratio': `${width}:${height}`
    };
  }, []);

  // 텍스트 로딩 스켈레톤 생성
  const getTextSkeleton = useCallback((lines: number = 3, className?: string) => {
    return Array.from({ length: lines }, (_, index) => ({
      key: index,
      className: `${className || ''} animate-pulse bg-gray-200 dark:bg-gray-700 rounded`,
      style: {
        height: '1rem',
        width: index === lines - 1 ? '75%' : '100%',
        marginBottom: '0.5rem'
      }
    }));
  }, []);

  // 폰트 로딩으로 인한 layout shift 방지
  const preventFontLayoutShift = useCallback(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* 폰트 로딩 중 fallback 폰트 크기 조정 */
      @font-face {
        font-family: 'Inter Variable';
        font-display: swap;
        size-adjust: 100%;
      }
      
      /* 폰트 메트릭 오버라이드 */
      .font-inter {
        font-size-adjust: 0.5;
      }
      
      /* 웹폰트 로딩 전까지 최소 높이 보장 */
      .prevent-font-shift {
        min-height: 1.2em;
        line-height: 1.2;
      }
    `;
    
    if (!document.head.querySelector('[data-font-stability]')) {
      style.setAttribute('data-font-stability', 'true');
      document.head.appendChild(style);
    }
  }, []);

  // 동적 컨텐츠 로딩시 layout shift 방지
  const reserveContentSpace = useCallback((
    estimatedHeight: number,
    className?: string
  ) => {
    return {
      className: `${className || ''} transition-all duration-300`,
      style: {
        minHeight: `${estimatedHeight}px`
      },
      'data-reserved-height': estimatedHeight
    };
  }, []);

  // 애니메이션 최적화로 layout shift 방지
  const getStableAnimationProps = useCallback((
    animationType: 'fadeIn' | 'slideUp' | 'scale' = 'fadeIn'
  ) => {
    const baseProps = {
      // GPU 가속 사용으로 layout에 영향 없는 변환
      style: {
        willChange: 'transform, opacity',
        transform: 'translateZ(0)'
      }
    };

    switch (animationType) {
      case 'fadeIn':
        return {
          ...baseProps,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3 }
        };
      
      case 'slideUp':
        return {
          ...baseProps,
          initial: { opacity: 0, transform: 'translateY(20px) translateZ(0)' },
          animate: { opacity: 1, transform: 'translateY(0) translateZ(0)' },
          transition: { duration: 0.4 }
        };
      
      case 'scale':
        return {
          ...baseProps,
          initial: { opacity: 0, transform: 'scale(0.95) translateZ(0)' },
          animate: { opacity: 1, transform: 'scale(1) translateZ(0)' },
          transition: { duration: 0.3 }
        };
      
      default:
        return baseProps;
    }
  }, []);

  // 초기화 실행
  useEffect(() => {
    if (stabilizeAnimations) {
      preventFontLayoutShift();
    }
  }, [stabilizeAnimations, preventFontLayoutShift]);

  return {
    clsScore,
    layoutShifts,
    getImagePlaceholder,
    getTextSkeleton,
    reserveContentSpace,
    getStableAnimationProps,
    preventFontLayoutShift
  };
};

// 특정 컴포넌트의 layout shift 방지를 위한 유틸리티
export const withLayoutStability = <T extends object>(
  Component: React.ComponentType<T>,
  estimatedDimensions?: { width?: number; height?: number }
) => {
  return (props: T) => {
    const { reserveContentSpace } = useLayoutStabilization();
    
    const containerProps = estimatedDimensions?.height 
      ? reserveContentSpace(estimatedDimensions.height)
      : {};

    return (
      <div {...containerProps}>
        <Component {...props} />
      </div>
    );
  };
};