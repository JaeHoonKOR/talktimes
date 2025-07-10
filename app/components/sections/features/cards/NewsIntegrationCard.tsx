"use client";

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

// 정적 언론사 로고 컴포넌트
const StaticNewsLogo = ({ 
  index 
}: { 
  index: number; 
}) => {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-[#E5E7EB] text-[#4B5563] text-sm font-bold shadow-none"
      aria-label={`언론사 ${String.fromCharCode(65 + index)}`}
      role="img"
    >
      {String.fromCharCode(65 + index)}
    </div>
  );
};

export default function NewsIntegrationCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      
      // 언론사 로고 생성 함수
      const createNewsLogos = () => {
        const logos = [];
        for (let i = 0; i < 6; i++) {
          const logo = document.createElement('div');
          logo.className = 'absolute w-6 h-6 rounded-lg flex items-center justify-center bg-white border border-gray-200 text-gray-600 text-xs font-bold';
          logo.textContent = String.fromCharCode(65 + i);
          logo.style.left = Math.random() * 80 + 10 + '%';
          logo.style.top = Math.random() * 80 + 10 + '%';
          logo.style.opacity = '0';
          logo.style.transform = 'scale(0)';
          
          container.appendChild(logo);
          logos.push(logo);
        }
        return logos;
      };

      // 중앙으로 모이는 애니메이션
      const animateToCenter = (logos: HTMLElement[]) => {
        logos.forEach((logo, index) => {
          gsap.to(logo, {
            x: '50%',
            y: '50%',
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            onComplete: () => {
              gsap.to(logo, {
                scale: 0.8,
                duration: 0.5,
                delay: 2,
                ease: "power2.inOut"
              });
            }
          });
        });
      };

      // 애니메이션 사이클 실행
      const runAnimationCycle = () => {
        const logos = createNewsLogos();
        animateToCenter(logos);
        
        setTimeout(() => {
          logos.forEach(logo => {
            if (container.contains(logo)) {
              container.removeChild(logo);
            }
          });
        }, 4000);
      };

      // 초기 실행
      runAnimationCycle();
      
      // 주기적 실행
      const interval = setInterval(runAnimationCycle, 5000);
      
      return () => {
        clearInterval(interval);
        const logos = container.querySelectorAll('.absolute');
        logos.forEach(logo => {
          if (container.contains(logo)) {
            container.removeChild(logo);
          }
        });
      };
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      aria-label="뉴스 통합 시각화"
      role="img"
    >
      {/* 중앙 통합 아이콘 */}
      <div className="relative z-10">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          📰
        </div>
      </div>
    </div>
  );
} 