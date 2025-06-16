"use client";

import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { BackgroundIconData } from '../constants/backgroundIcons';

interface BackgroundIconsProps {
  icons: BackgroundIconData[];
  className?: string;
}

const BackgroundIcons = memo(({ icons, className = '' }: BackgroundIconsProps) => {
  const [isClient, setIsClient] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '200px 0px',
  });

  // 클라이언트 사이드 렌더링 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 화면 밖으로 나갔을 때 애니메이션 일시정지 기능
  useEffect(() => {
    if (!isClient) return;
    
    const iconElements = document.querySelectorAll('.background-icon');
    
    if (inView) {
      iconElements.forEach((icon) => {
        (icon as HTMLElement).style.animationPlayState = 'running';
      });
    } else {
      iconElements.forEach((icon) => {
        (icon as HTMLElement).style.animationPlayState = 'paused';
      });
    }
  }, [inView, isClient]);

  // 서버 사이드 렌더링에서는 아이콘을 렌더링하지 않음
  if (!isClient) return null;

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className="background-icon absolute"
          style={{
            top: icon.position.top,
            bottom: icon.position.bottom,
            left: icon.position.left,
            right: icon.position.right,
            opacity: icon.opacity,
            zIndex: icon.zIndex || 0,
            transform: `rotate(${icon.rotate || 0}deg)`,
            animation: `subtle-float ${icon.animation.duration} ease-in-out infinite`,
            animationDelay: icon.animation.delay,
            // 성능 최적화
            willChange: inView ? 'transform' : 'auto',
          }}
        >
          <div className="gpu-accelerated">
            <Image
              src={icon.url}
              alt=""
              aria-hidden="true"
              width={parseInt(icon.size.width)}
              height={parseInt(icon.size.height)}
              loading="lazy"
              decoding="async"
              style={{
                width: icon.size.width,
                height: icon.size.height,
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
});

BackgroundIcons.displayName = 'BackgroundIcons';

export default BackgroundIcons; 