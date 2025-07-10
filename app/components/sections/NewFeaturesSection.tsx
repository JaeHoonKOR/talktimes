"use client";

import { Card } from '@/src/components/ui/card';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

// 정적 키워드 태그 컴포넌트
const KeywordTag = ({ 
  text, 
  position 
}: { 
  text: string; 
  position: { x: number; y: number; rotation: number };
}) => {
  return (
    <div
      className="absolute bg-white border border-[#E5E7EB] text-[#121212] px-3 py-1 rounded-full text-sm font-bold shadow-sm"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `rotate(${position.rotation}deg)`
      }}
      aria-label={text}
      role="note"
    >
      {text}
    </div>
  );
};

// 정적 언론사 로고 컴포넌트 (두 번째 카드용)
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

// 시계 컴포넌트 (세 번째 카드용)
const ClockIcon = () => {
  const clockRef = useRef<HTMLDivElement>(null);
  const hourHandRef = useRef<HTMLDivElement>(null);
  const minuteHandRef = useRef<HTMLDivElement>(null);
  const sunraysRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clockRef.current && hourHandRef.current && minuteHandRef.current && sunraysRef.current && notificationRef.current) {
      // 시계 본체 등장 애니메이션
      gsap.fromTo(
        clockRef.current,
        { scale: 0, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
      
      // 시침 회전 애니메이션 (18초에 한 바퀴)
      gsap.to(hourHandRef.current, {
        rotation: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "bottom center"
      });
      
      // 분침 회전 애니메이션 (6초에 한 바퀴)
      gsap.to(minuteHandRef.current, {
        rotation: 360,
        duration: 6, // 6초에 한 바퀴
        repeat: -1,
        ease: "none",
        transformOrigin: "bottom center"
      });
      
      // 햇살 회전 애니메이션
      gsap.to(sunraysRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
      
      // 알림 아이콘 펄스 애니메이션
      gsap.fromTo(
        notificationRef.current,
        { scale: 0 },
        { 
          scale: 1, 
          duration: 0.5, 
          delay: 1,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(notificationRef.current, {
              scale: 1.2,
              duration: 0.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );
    }
  }, []);

  return (
    <div className="relative w-32 h-32" aria-label="실시간 알림 시계" role="img">
      {/* 햇살 */}
      <div ref={sunraysRef} className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: '50% 64px',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
            }}
            whileHover={{
              opacity: 1,
              height: 36
            }}
          />
        ))}
      </div>
      
      {/* 시계 본체 */}
      <div 
        ref={clockRef}
        className="absolute inset-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full shadow-lg border-4 border-blue-200 flex items-center justify-center overflow-hidden"
      >
        {/* 시간 표시 점들 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-44px)`
            }}
            whileHover={{
              scale: 2,
              backgroundColor: "#3B82F6"
            }}
          />
        ))}
        
        {/* 시침 */}
        <div
          ref={hourHandRef}
          className="absolute w-1 h-6 bg-gradient-to-t from-gray-800 to-gray-600 rounded-full origin-bottom"
          style={{ 
            bottom: '50%',
            transform: 'rotate(210deg)'
          }}
        />
        
        {/* 분침 */}
        <div
          ref={minuteHandRef}
          className="absolute w-0.5 h-8 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full origin-bottom"
          style={{ 
            bottom: '50%',
            transform: 'rotate(0deg)'
          }}
        />
        
        {/* 중심점 */}
        <motion.div 
          className="absolute w-3 h-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* 알림 아이콘 */}
      <div 
        ref={notificationRef}
        className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm shadow-lg cursor-pointer"
        aria-label="알림"
        role="alert"
      >
        !
      </div>
    </div>
  );
};

// 정적 특징 카드 컴포넌트
const FeatureCard = ({ 
  visualContent,
  title, 
  description
}: {
  visualContent: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-80 group cursor-pointer overflow-hidden"
      role="article"
      tabIndex={0}
    >
      {/* 시각적 콘텐츠 영역 (70%) */}
      <div className="flex-1 relative p-6 flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
        {visualContent}
      </div>
      
      {/* 텍스트 영역 (30%) */}
      <div className="p-4 text-center bg-white">
        <h3 className="text-base font-semibold text-[#121212] mb-1">
          {title}
        </h3>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// AI 큐레이션 카드 컴포넌트
const AICurationCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  // 사용된 키워드 추적
  const usedKeywordsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (containerRef.current && filterRef.current) {
      // AI 필터 회전 애니메이션
      gsap.to(filterRef.current, {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none"
      });

      // 다양한 뉴스 키워드 배열 (3글자 이하로 제한)
      const allKeywords = [
        // 일반 주제
        'NEW', 'HOT', 'TOP', 'NOW', 'WOW', 'YES', 'HEY', 'BIG', 'TIP', 'FYI',
        // 기술
        'AI', 'ML', 'AR', 'VR', 'APP', 'WEB', 'DEV', 'API', 'PC', 'MAC', '5G', 'UI', 'UX',
        // 스포츠
        'NBA', 'NFL', 'MLB', 'UFC', 'FIFA', 'F1', 'MVP', 'WIN', 'RUN', 'GYM',
        // 경제
        'CEO', 'IPO', 'NFT', 'USD', 'YEN', 'TAX', 'BUY', 'PAY', 'FEE', 'VIP',
        // 음식
        'EAT', 'BBQ', 'TEA', 'PIE', 'ICE', 'SOY', 'JAM', 'HAM', 'EGG', 'OIL',
        // 엔터테인먼트
        'TV', 'POP', 'RAP', 'DJ', 'OST', 'GIF', 'FUN', 'LOL', 'OMG', 'TMI',
        // 라이프스타일
        'DIY', 'SPA', 'GYM', 'ZEN', 'ECO', 'PET', 'DOG', 'CAT', 'KID', 'DAD',
        // 과학
        'LAB', 'DNA', 'RNA', 'BIO', 'SCI', 'PH', 'CO2', 'H2O', 'O2', 'UV',
        // 기타
        'ART', 'LAW', 'GOV', 'PRO', 'CON', 'RED', 'SUN', 'SKY', 'SEA', 'MAP'
      ];
      
      // 뉴스 카드들이 AI 브레인 중심에 도달하도록
      const createFallingNews = () => {
        // 사용 가능한 키워드 필터링 (이미 사용 중인 키워드 제외)
        const availableKeywords = allKeywords.filter(keyword => !usedKeywordsRef.current.has(keyword));
        
        // 모든 키워드가 사용 중이면 사용된 키워드 목록 초기화
        if (availableKeywords.length === 0) {
          usedKeywordsRef.current.clear();
        }
        
        // 랜덤 키워드 선택 (중복 방지)
        const keyword = availableKeywords.length > 0 
          ? availableKeywords[Math.floor(Math.random() * availableKeywords.length)]
          : allKeywords[Math.floor(Math.random() * allKeywords.length)];
        
        // 사용된 키워드 추적
        usedKeywordsRef.current.add(keyword);
        
        // 뉴스 카드 생성
        const newsCard = document.createElement('div');
        newsCard.className = 'absolute w-10 h-10 rounded-full opacity-90 flex items-center justify-center text-white text-xs font-bold shadow-md';
        
        // 랜덤 색상 선택
        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        newsCard.style.backgroundColor = randomColor;
        
        // 키워드 텍스트 추가
        newsCard.textContent = keyword;
        
        if (!containerRef.current) return;
        
        // 시작 위치 (상단 랜덤)
        const startX = Math.random() * 200 + 50; // 50~250px
        const startY = 20;
        
        newsCard.style.left = startX + 'px';
        newsCard.style.top = startY + 'px';
        newsCard.style.zIndex = '15';
        
        containerRef.current.appendChild(newsCard);

        // AI 브레인 위치 (CSS와 정확히 일치)
        // bottom-2 = 8px, left-1/2 = 중앙, w-16 = 64px
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        
        const aiCenterX = containerWidth / 2; // 컨테이너 중앙
        const aiCenterY = containerHeight - 8 - 32; // bottom-2(8px) + 반지름(32px)
        
        // 뉴스가 AI 브레인 중심에 도달하도록
        const targetX = aiCenterX - 20; // 뉴스 중심 맞춤 (w-10이므로 20px)
        const targetY = aiCenterY - 20; // 뉴스 중심 맞춤 (h-10이므로 20px)
        
        // 애니메이션
        gsap.to(newsCard, {
          left: targetX,
          top: targetY,
          duration: 1.8, // 속도 더 빠르게
          ease: "none", // 직선 이동
          onComplete: () => {
            // 정확히 도달한 후 사라짐
            gsap.to(newsCard, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                newsCard.remove();
                // 키워드 사용 해제 (일정 시간 후)
                setTimeout(() => {
                  usedKeywordsRef.current.delete(keyword);
                }, 2000);
              }
            });
          }
        });
      };

      // 주기적으로 뉴스 생성 (개수 늘림)
      const interval = setInterval(createFallingNews, 500); // 더 빠른 생성 속도

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* 하단 AI 브레인 */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2" style={{ zIndex: 25 }}>
        <div ref={filterRef} className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-teal-400 shadow-lg flex items-center justify-center relative overflow-hidden">
          {/* AI 뉴럴 네트워크 패턴 */}
          <div className="absolute inset-0 opacity-60">
            {/* 중앙 노드들 */}
            <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-3 right-3 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-2 left-3 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-3 right-2 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-0.5 h-0.5 bg-white rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-white rounded-full"></div>
            {/* 연결선들 */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
              <line x1="8" y1="8" x2="32" y2="32" stroke="white" strokeWidth="0.5" opacity="0.8"/>
              <line x1="56" y1="12" x2="32" y2="32" stroke="white" strokeWidth="0.5" opacity="0.8"/>
              <line x1="12" y1="56" x2="32" y2="32" stroke="white" strokeWidth="0.5" opacity="0.8"/>
              <line x1="52" y1="52" x2="32" y2="32" stroke="white" strokeWidth="0.5" opacity="0.8"/>
            </svg>
          </div>
          {/* 중앙 코어 */}
          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center relative z-10 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
          </div>
        </div>
      </div>
      {/* 배경 효과 제거 */}
    </div>
  );
};

// 언론사 통합 카드 컴포넌트 (물리 법칙 기반 자석 효과)
const NewsIntegrationCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let logos: HTMLElement[] = [];
    let observer: IntersectionObserver;

    // 언론사 로고들을 동적으로 생성하여 사방에 배치
    const createNewsLogos = () => {
      // 기존 로고들 제거
      logos.forEach(logo => logo.remove());
      logos = [];
      
      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#84CC16'];
      
      for (let i = 0; i < 8; i++) {
        const logo = document.createElement('div');
        logo.className = 'absolute w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shadow-sm';
        logo.style.backgroundColor = colors[i];
        logo.style.zIndex = '10';
        logo.textContent = String.fromCharCode(65 + i); // A, B, C...
        
        // 컨테이너 크기 기준으로 사방에 배치
        const containerWidth = containerRef.current!.offsetWidth;
        const containerHeight = containerRef.current!.offsetHeight;
        
        // 사방 가장자리에서 시작 (물리적으로 자연스러운 위치)
        let startX, startY;
        if (i < 2) { // 상단
          startX = (containerWidth / 3) * (i + 1);
          startY = 20;
        } else if (i < 4) { // 우측
          startX = containerWidth - 40;
          startY = (containerHeight / 3) * (i - 1);
        } else if (i < 6) { // 하단
          startX = (containerWidth / 3) * (i - 3);
          startY = containerHeight - 40;
        } else { // 좌측
          startX = 20;
          startY = (containerHeight / 3) * (i - 5);
        }
        
        logo.style.left = startX + 'px';
        logo.style.top = startY + 'px';
        
        containerRef.current!.appendChild(logo);
        logos.push(logo);
      }
    };

    // 중앙 자석 효과 - 물리 법칙처럼 끌려들어감
    const animateToCenter = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const containerHeight = containerRef.current!.offsetHeight;
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      
      logos.forEach((logo, index) => {
        // 각 로고가 원형으로 배치될 최종 위치 계산
        const angle = (index / logos.length) * Math.PI * 2;
        const radius = 40; // 중앙에서 40px 반지름
        const finalX = centerX + Math.cos(angle) * radius - 16; // 로고 중심 맞춤
        const finalY = centerY + Math.sin(angle) * radius - 16;
        
        // 물리 법칙 시뮬레이션 - 자석에 끌려가는 효과
        gsap.to(logo, {
          left: finalX,
          top: finalY,
          duration: 2 + Math.random() * 0.5, // 약간의 랜덤성
          delay: index * 0.1, // 순차적 시작
          ease: "power2.inOut", // 자석 효과
          onComplete: () => {
            // 도달 후 미세한 진동 효과
            gsap.to(logo, {
              rotation: "+=5",
              duration: 0.1,
              yoyo: true,
              repeat: 3
            });
          }
        });
      });
      
      // 중앙 통합 아이콘 등장
      if (centerRef.current) {
        gsap.fromTo(centerRef.current,
          { scale: 0, opacity: 0 },
          { 
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 2.5,
            ease: "back.out(1.7)"
          }
        );
      }
    };

    // 애니메이션 사이클 실행
    const runAnimationCycle = () => {
      createNewsLogos();
      setTimeout(animateToCenter, 500);
    };

    // Intersection Observer로 해당 카드만 정확히 감지
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 해당 카드가 화면 중앙 근처에 보이면 애니메이션 시작
            runAnimationCycle();
          }
        });
      },
      {
        threshold: 0.6, // 60% 보이면 트리거 (카드 대부분이 보일 때)
        rootMargin: '-50px 0px -50px 0px' // 상하 50px 마진으로 더 정확한 감지
      }
    );

    observer.observe(containerRef.current);

    // 정리 함수
    return () => {
      observer?.disconnect();
      logos.forEach(logo => logo.remove());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* 중앙 통합 아이콘 */}
      <div ref={centerRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg flex items-center justify-center" style={{ zIndex: 20 }}>
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
        </div>
      </div>
      {/* 배경 효과 제거 */}
    </div>
  );
};

export function NewFeaturesSection({ 
  className = '', 
  id = 'features',
}: {
  className?: string;
  id?: string;
}) {
  // 키워드 태그 데이터
  const keywords = [
    { text: 'AI', position: { x: 15, y: 20, rotation: -5 } },
    { text: 'FOOD', position: { x: 60, y: 15, rotation: 8 } },
    { text: 'MLB', position: { x: 25, y: 50, rotation: -3 } },
    { text: 'TECH', position: { x: 70, y: 45, rotation: 5 } },
    { text: 'GAME', position: { x: 40, y: 25, rotation: -8 } },
    { text: 'K-POP', position: { x: 10, y: 70, rotation: 3 } }
  ];

  const features = [
    {
      icon: <AICurationCard />,
      title: "AI 맞춤 큐레이션",
      description: "개인화된 뉴스 선별"
    },
    {
      icon: <NewsIntegrationCard />,
      title: "주요 언론사 통합",
      description: "신뢰할 수 있는 소스"
    },
    {
      icon: (
        <div className="flex items-center justify-center">
          <ClockIcon />
        </div>
      ),
      title: "실시간 알림",
      description: "중요 뉴스 즉시 전달"
    }
  ];

  const handleCTAClick = () => {
    const personalizationSection = document.querySelector('#personalization');
    if (personalizationSection) {
      personalizationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section
      id={id}
      className={`min-h-screen w-full flex items-center justify-center -mt-16 pt-16 bg-[#F9FAFB] dark:bg-[#1C1C1E] text-[#121212] dark:text-[#F0F0F0] overflow-hidden py-2 lg:py-4 ${className}`}
      aria-label="서비스 주요 특징 소개"
    >
      <div className="w-full max-w-[90%] mx-auto rounded-xl bg-[#F9FAFB] dark:bg-[#1C1C1E] flex flex-col items-center px-8 lg:px-12 py-4 lg:py-6 gap-8 lg:gap-10 relative">
        {/* 섹션 제목 */}
        <div className="text-center w-full max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-[#121212] dark:text-[#F0F0F0]">
            뉴스직송의 <span className="premium-text-gradient">특별함</span>
          </h2>
          <p className="text-lg text-[#4B5563] dark:text-[#9CA3AF]">
            AI 기술로 당신만을 위한 뉴스를 선별하여 매일 아침 전달합니다
          </p>
        </div>

        {/* 특징 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {features.map((feature, index) => (
            <Card 
              key={`feature-card-${index}-${feature.title}`}
              className="h-72 flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 p-0 bg-white border border-[#E5E7EB] rounded-xl hover:scale-[1.02]"
            >
              {/* 시각적 콘텐츠 영역 - 70%, 여백 없음 */}
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#F3F4F6]">
                {feature.icon}
              </div>
              
              {/* 텍스트 영역 - 30% */}
              <div className="flex-shrink-0 p-4 text-center bg-white border-t border-[#E5E7EB]">
                <h3 className="text-lg font-bold mb-1 text-[#121212]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#9CA3AF]">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* 강조된 CTA 버튼 */}
        <div className="text-center mt-4">
          <motion.button
            onClick={handleCTAClick}
            className="px-10 py-5 bg-[#3B82F6] text-white rounded-full font-bold text-xl shadow-xl hover:bg-[#2563EB] transition-all duration-300"
            whileHover={{ 
              scale: 1.08,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            role="button"
            aria-label="키워드 설정하러 가기"
          >
            키워드 설정하기
          </motion.button>
        </div>
      </div>
    </section>
  );
} 

export default NewFeaturesSection; 