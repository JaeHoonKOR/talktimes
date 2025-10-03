"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseImageOptimizationOptions {
  threshold?: number;
  rootMargin?: string;
  enableWebP?: boolean;
  quality?: number;
}

interface UseImageOptimizationReturn {
  imageRef: React.RefObject<HTMLElement>;
  isLoaded: boolean;
  isInView: boolean;
  shouldLoad: boolean;
  optimizedSrc: (src: string) => string;
  handleImageLoad: () => void;
  handleImageError: () => void;
}

export const useImageOptimization = (
  options: UseImageOptimizationOptions = {}
): UseImageOptimizationReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px 0px',
    enableWebP = true,
    quality = 80
  } = options;

  const imageRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);

  // WebP 지원 확인
  useEffect(() => {
    if (!enableWebP) return;

    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const dataURL = canvas.toDataURL('image/webp');
      return dataURL.indexOf('data:image/webp') === 0;
    };

    setSupportsWebP(checkWebPSupport());
  }, [enableWebP]);

  // Intersection Observer를 사용한 lazy loading
  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          setShouldLoad(true);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  // 이미지 소스 최적화
  const optimizedSrc = useCallback((src: string): string => {
    if (!src) return '';

    // 이미 최적화된 URL인지 확인
    if (src.includes('w_') || src.includes('q_')) {
      return src;
    }

    // placeholder URL인 경우 그대로 반환
    if (src.includes('via.placeholder.com')) {
      return src;
    }

    // 실제 이미지 URL에 대한 최적화 (실제 CDN 사용시 적용)
    const url = new URL(src, window.location.origin);
    
    // 품질 설정
    if (quality !== 80) {
      url.searchParams.set('q', quality.toString());
    }

    // WebP 형식 지원시 변환
    if (supportsWebP && enableWebP) {
      url.searchParams.set('f', 'webp');
    }

    return url.toString();
  }, [supportsWebP, enableWebP, quality]);

  // 이미지 로드 완료 핸들러
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // 이미지 로드 실패 핸들러
  const handleImageError = useCallback(() => {
    console.warn('Image failed to load');
    setIsLoaded(false);
  }, []);

  return {
    imageRef,
    isLoaded,
    isInView,
    shouldLoad,
    optimizedSrc,
    handleImageLoad,
    handleImageError
  };
};

// 이미지 preload 유틸리티
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// 중요한 이미지들을 preload하는 훅
export const useImagePreload = (imageSources: string[]) => {
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageSources.map(async (src) => {
        try {
          await preloadImage(src);
          setPreloadedImages(prev => new Set(prev).add(src));
        } catch (error) {
          console.warn(`Failed to preload image: ${src}`, error);
        }
      });

      await Promise.allSettled(promises);
    };

    if (imageSources.length > 0) {
      preloadImages();
    }
  }, [imageSources]);

  return preloadedImages;
};

// 반응형 이미지 크기 계산
export const getResponsiveSizes = (sizes?: {
  mobile?: number;
  tablet?: number;
  desktop?: number;
}): string => {
  const { mobile = 100, tablet = 50, desktop = 33 } = sizes || {};
  
  return `(max-width: 640px) ${mobile}vw, (max-width: 1024px) ${tablet}vw, ${desktop}vw`;
};

// 스켈레톤 로딩을 위한 유틸리티
export const generateSkeletonDataURL = (width: number, height: number): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect width="100%" height="100%" fill="url(#shimmer)"/>
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#f3f4f6"/>
          <stop offset="50%" style="stop-color:#e5e7eb"/>
          <stop offset="100%" style="stop-color:#f3f4f6"/>
          <animateTransform
            attributeName="gradientTransform"
            attributeType="XML"
            values="translateX(-100%);translateX(100%);translateX(-100%)"
            dur="2s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};