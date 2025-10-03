"use client";

import { useEffect } from 'react';

interface PreloadResource {
  href: string;
  as: 'font' | 'image' | 'style' | 'script';
  type?: string;
  crossOrigin?: 'anonymous' | 'use-credentials';
}

const criticalResources: PreloadResource[] = [
  // 중요한 폰트 프리로딩
  {
    href: '/fonts/inter-variable.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  },
  // 히어로 섹션 배경 이미지
  {
    href: '/hero-bg-optimized.webp',
    as: 'image'
  },
  // 중요한 스타일시트
  {
    href: '/styles/critical.css',
    as: 'style'
  }
];

export const usePreloadCriticalResources = () => {
  useEffect(() => {
    const preloadedLinks: HTMLLinkElement[] = [];

    // 중요한 리소스들을 프리로딩
    criticalResources.forEach((resource) => {
      // 이미 프리로딩된 리소스인지 확인
      const existingLink = document.querySelector(`link[href="${resource.href}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossOrigin) {
        link.crossOrigin = resource.crossOrigin;
      }

      // 로딩 우선순위 설정
      if (resource.as === 'font' || resource.as === 'style') {
        link.setAttribute('importance', 'high');
      }

      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // DNS 프리페치
    const dnsPrefetchDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://api.talktimes.com'
    ];

    dnsPrefetchDomains.forEach(domain => {
      const existingLink = document.querySelector(`link[href="${domain}"]`);
      if (existingLink) return;

      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // 컴포넌트 언마운트시 정리
    return () => {
      preloadedLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, []);

  // 중요한 이미지에 대한 프리로딩 함수
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  };

  // 폰트 로딩 상태 확인
  const checkFontLoading = async (): Promise<boolean> => {
    if ('fonts' in document) {
      try {
        await document.fonts.ready;
        return true;
      } catch (error) {
        console.warn('Font loading check failed:', error);
        return false;
      }
    }
    return false;
  };

  return {
    preloadImage,
    checkFontLoading
  };
};

// 중요한 컨텐츠 영역의 이미지 프리로딩을 위한 훅
export const useCriticalImagePreload = (imageSrcs: string[]) => {
  const { preloadImage } = usePreloadCriticalResources();

  useEffect(() => {
    // 첫 번째 뷰포트에 표시될 이미지들만 프리로딩
    const criticalImages = imageSrcs.slice(0, 3); // 상위 3개 이미지만
    
    criticalImages.forEach(src => {
      preloadImage(src).catch(error => {
        console.warn(`Failed to preload critical image: ${src}`, error);
      });
    });
  }, [imageSrcs, preloadImage]);
};

// LCP 요소 관찰을 위한 훅
export const useLCPObserver = () => {
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime, 'ms');
          
          // LCP가 2.5초를 초과하는 경우 경고
          if (lastEntry.startTime > 2500) {
            console.warn('LCP exceeds 2.5s threshold:', lastEntry.startTime);
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);
};