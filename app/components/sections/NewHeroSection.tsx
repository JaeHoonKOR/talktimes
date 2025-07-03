"use client";

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';

// 앱 아이콘 컴포넌트
const AppIcon = React.memo(({ 
  name, 
  color, 
  icon, 
  delay = 0,
  isMain = false
}: { 
  name: string; 
  color: string; 
  icon: string; 
  delay?: number;
  isMain?: boolean;
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (iconRef.current) {
      // 애니메이션 최적화: 더 가벼운 애니메이션 효과 적용
      gsap.fromTo(
        iconRef.current,
        { 
          scale: 0.8, 
          opacity: 0
        },
        { 
          scale: 1, 
          opacity: 1,
          duration: isMain ? 0.6 : 0.4,
          delay: delay,
          ease: "back.out(1.5)"
        }
      );

      // TalkTimes 앱에 펄스 효과 추가 - 메인 앱 아이콘에만 적용
      if (isMain) {
        gsap.to(iconRef.current, {
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
          duration: 2,
          repeat: 1, // 무한 반복 대신 한 번만 반복
          yoyo: true,
          ease: "power2.inOut",
          delay: delay + 1
        });
      }
    }
  }, [delay, isMain]);

  return (
    <motion.div
      ref={iconRef}
      className="flex flex-col items-center"
      whileHover={{ scale: isMain ? 1.05 : 1.03 }} // 호버 효과 경량화
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className={`${isMain ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl ${color} flex items-center justify-center text-white ${isMain ? 'text-2xl' : 'text-xl'} font-bold relative overflow-hidden mb-1 cursor-pointer will-change-transform`}
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: isMain 
            ? '0 4px 12px rgba(0,0,0,0.2)' // 그림자 효과 경량화
            : '0 3px 8px rgba(0,0,0,0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
        {isMain && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
        )}
        <span className="relative z-10">{icon}</span>
      </div>
      <span className={`text-xs text-white font-medium text-center leading-tight max-w-[60px] truncate ${isMain ? 'font-bold' : ''}`}>
        {name}
      </span>
    </motion.div>
  );
});
AppIcon.displayName = 'AppIcon';

// 알림 컴포넌트
const Notification = React.memo(({ 
  isVisible, 
  onDismiss 
}: { 
  isVisible: boolean; 
  onDismiss: () => void; 
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notificationRef.current && isVisible) {
      gsap.fromTo(
        notificationRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={notificationRef}
      className="absolute top-12 left-4 right-4 z-40 cursor-pointer"
      whileHover={{ scale: 1.02 }} // 호버 효과 경량화
      whileTap={{ scale: 0.98 }}
      onClick={onDismiss}
    >
      <div className="bg-white/95 rounded-2xl p-4 shadow-lg border border-white/20 transition-colors duration-200 will-change-transform">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-[#3B82F6] rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">💬</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold text-gray-900">TalkTimes</span>
              <span className="text-xs text-gray-500">지금</span>
            </div>
            <p className="text-sm text-gray-700 mt-1">새로운 뉴스가 도착했습니다!</p>
            <p className="text-xs text-[#3B82F6] font-medium mt-1">탭하여 확인하기</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
Notification.displayName = 'Notification';

// 상태바 컴포넌트
const StatusBar = React.memo(() => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };

    updateTime();
    // 시간 업데이트 최적화: 10초마다 업데이트
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-2 text-white text-sm font-semibold">
      <div className="flex items-center space-x-1">
        <span>{currentTime}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
        </div>
        <svg width="24" height="12" viewBox="0 0 24 12" className="text-white">
          <rect x="2" y="3" width="18" height="6" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="21" y="5" width="2" height="2" rx="0.5" fill="currentColor"/>
          <rect x="4" y="5" width="14" height="2" rx="1" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
});
StatusBar.displayName = 'StatusBar';

// 홈 화면 배경
const HomeScreenBackground = React.memo(() => {
  return (
    <div className="absolute inset-0">
      <div 
        className="w-full h-full"
        style={{
          // 그래디언트 단순화
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.1)'
        }}
      />
    </div>
  );
});
HomeScreenBackground.displayName = 'HomeScreenBackground';

// Dock 컴포넌트
const Dock = React.memo(() => {
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dockRef.current) {
      gsap.fromTo(
        dockRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const dockApps = [
    { name: 'News', color: '#FF6B6B', icon: '📰' },
    { name: 'Messages', color: '#4ECDC4', icon: '💬' },
    { name: 'Settings', color: '#45B7D1', icon: '⚙️' },
    { name: 'Camera', color: '#96CEB4', icon: '📷' }
  ];

  return (
    <div 
      ref={dockRef}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 will-change-transform"
    >
      <div 
        className="bg-white/20 rounded-2xl p-3 flex space-x-4"
        style={{
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)'
        }}
      >
        {dockApps.map((app, index) => (
          <AppIcon 
            key={app.name}
            name={app.name}
            color={app.color}
            icon={app.icon}
            delay={1.0 + index * 0.08} // 딜레이 감소
          />
        ))}
      </div>
    </div>
  );
});
Dock.displayName = 'Dock';

// 메신저 인터페이스 컴포넌트
const MessengerScreen = React.memo(() => {
  const messagesRef = useRef<HTMLDivElement>(null);

  // 메시지 데이터 메모이제이션
  const messages = useMemo(() => [
    { id: 1, text: '안녕하세요! TalkTimes입니다.', isUser: false },
    { id: 2, text: '안녕하세요!', isUser: true },
    { id: 3, text: '오늘의 맞춤 뉴스를 준비했어요.', isUser: false },
    { id: 4, text: '어떤 뉴스가 있나요?', isUser: true },
    { id: 5, text: 'AI가 선별한 당신만의 뉴스가 준비되어 있어요!', isUser: false },
  ], []);

  useEffect(() => {
    if (messagesRef.current) {
      gsap.fromTo(
        messagesRef.current.children,
        { opacity: 0, y: 10 }, // y값 감소
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.15, ease: "power2.out" } // 애니메이션 시간 단축
      );
    }
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 flex flex-col">
      {/* 헤더 */}
      <div className="h-16 bg-white shadow-sm flex items-center px-4 relative z-30">
        <div className="w-8 h-8 rounded-full bg-blue-500 mr-3 flex items-center justify-center">
          <span className="text-white text-sm">📱</span>
        </div>
        <div>
          <div className="font-medium text-gray-900">TalkTimes</div>
          <div className="text-xs text-gray-500">온라인</div>
        </div>
      </div>
      
      {/* 메시지 영역 */}
      <div ref={messagesRef} className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex mb-4 ${message.isUser ? 'justify-end' : ''}`}
          >
            <div 
              className={`
                rounded-2xl p-3 max-w-[80%] shadow-sm will-change-transform
                ${message.isUser 
                  ? 'bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-white text-gray-900 rounded-tl-none'
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
      {/* 입력창 */}
      <div className="h-16 bg-white border-t border-gray-200 p-2 flex items-center">
        <input 
          type="text" 
          className="flex-1 bg-gray-100 rounded-full px-4 h-10 focus:outline-none text-gray-900"
          placeholder="메시지 입력..."
        />
        <div className="w-10 h-10 bg-blue-500 rounded-full ml-2 flex items-center justify-center text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
});
MessengerScreen.displayName = 'MessengerScreen';

// 뉴스 카드 컴포넌트
const NewsCard = React.memo(({ 
  title, 
  summary, 
  delay = 0,
  position,
  timestamp
}: { 
  title: string; 
  summary: string; 
  delay?: number;
  position: { x: number; y: number; z: number; rotation: number };
  timestamp: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 딜레이 후 카드 표시
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  // 아래 섹션으로 스크롤하는 함수
  const handleCardClick = () => {
    // NewFeaturesSection (#features)으로 이동
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`absolute w-52 h-36 bg-white/20 rounded-2xl shadow-lg border border-white/30 cursor-pointer transition-transform duration-300 hover:scale-105 will-change-transform ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${position.rotation}deg)`,
        transformStyle: 'preserve-3d'
      }}
      onClick={handleCardClick}
    >
      {/* 내부 컨텐츠 */}
      <div className="p-4 h-full flex flex-col justify-between relative">
        {/* 상단 영역 - 제목과 요약 */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed opacity-90">
            {summary}
          </p>
        </div>
        
        {/* 하단 영역 - 타임스탬프와 아이콘 */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {timestamp}
          </span>
          <div className="w-6 h-6 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-xs">📰</span>
          </div>
        </div>
      </div>
      
      {/* 호버 시 효과 - 단순화 */}
      <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-3 left-3 text-[#3B82F6] text-xs font-bold bg-white/80 px-2 py-1 rounded-full shadow-sm">
          ✨ 읽어보기
        </div>
      </div>
    </div>
  );
});
NewsCard.displayName = 'NewsCard';

// iPhone 인터페이스 메인 컴포넌트
const IPhoneInterface = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);

  // 앱 데이터 메모이제이션
  const apps = useMemo(() => [
    { name: 'TalkTimes', color: '#3B82F6', icon: '📱', isMain: true },
    { name: 'News', color: '#4ECDC4', icon: '📰', isMain: false },
    { name: 'AI Chat', color: '#45B7D1', icon: '🤖', isMain: false },
    { name: 'Trends', color: '#96CEB4', icon: '📈', isMain: false },
    // 앱 아이콘 수 감소 (12개 → 8개)
    { name: 'Weather', color: '#FFEAA7', icon: '☀️', isMain: false },
    { name: 'Photos', color: '#DDA0DD', icon: '📸', isMain: false },
    { name: 'Music', color: '#F7DC6F', icon: '🎵', isMain: false },
    { name: 'Calendar', color: '#AED6F1', icon: '📅', isMain: false },
  ], []);

  // 뉴스 카드 데이터 메모이제이션
  const newsCards = useMemo(() => [
    // 카드 수 감소 (3개 → 2개)
    {
      title: "AI 기술의 새로운 돌파구", 
      summary: "최신 인공지능 기술이 일상생활에 미치는 영향에 대해 알아보세요.",
      position: { x: -280, y: 50, z: 50, rotation: 15 },
      timestamp: "5분 전"
    },
    {
      title: "전 세계 경제 동향", 
      summary: "글로벌 시장의 최신 동향과 투자 기회를 분석합니다.",
      position: { x: 320, y: 120, z: 100, rotation: -10 },
      timestamp: "25분 전"
    }
  ], []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    // 3초 후 알림 표시
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(notificationTimer);
  }, []);

  const handleNotificationDismiss = () => {
    setShowNotification(false);
    // 알림 클릭 후 1초 뒤에 메신저 화면으로 전환
    setTimeout(() => {
      setShowMessenger(true);
    }, 800); // 딜레이 감소
  };

  return (
    <div 
      ref={containerRef}
      className="w-80 h-[640px] relative ml-0 will-change-transform"
    >
      {/* iPhone 베젤 */}
      <div 
        className="absolute inset-0 rounded-[3rem] shadow-xl"
        style={{
          background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
          padding: '4px'
        }}
      >
        {/* 스크린 영역 */}
        <div 
          className="w-full h-full rounded-[2.7rem] relative overflow-hidden"
          style={{
            background: '#000'
          }}
        >
          {/* 노치 */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-b-2xl z-30"
          >
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-800 rounded-full"></div>
          </div>

          {showMessenger ? (
            /* 메신저 화면 */
            <MessengerScreen />
          ) : (
            <>
              {/* 홈 화면 배경 */}
              <HomeScreenBackground />

              {/* 상태바 */}
              <div className="relative z-20 pt-8">
                <StatusBar />
              </div>

              {/* 알림 */}
              <Notification 
                isVisible={showNotification} 
                onDismiss={handleNotificationDismiss} 
              />

              {/* 앱 아이콘 그리드 */}
              <div className="px-8 py-8 grid grid-cols-4 gap-6 relative z-10">
                {apps.map((app, index) => (
                  <AppIcon 
                    key={app.name}
                    name={app.name}
                    color={app.color}
                    icon={app.icon}
                    delay={0.4 + index * 0.04} // 딜레이 감소
                    isMain={app.isMain}
                  />
                ))}
              </div>

              {/* Dock */}
              <Dock />

              {/* 홈 인디케이터 */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full"></div>
            </>
          )}
        </div>
      </div>

      {/* 물리적 버튼들 */}
      <div className="absolute right-[-3px] top-32 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
      <div className="absolute right-[-3px] top-48 w-1 h-16 bg-gray-700 rounded-l-sm"></div>
      <div className="absolute left-[-3px] top-40 w-1 h-20 bg-gray-700 rounded-r-sm"></div>
      
      {/* 3D 뉴스 카드들 - 메신저 화면에서만 표시 */}
      {showMessenger && (
        <div className="absolute inset-0" style={{ perspective: '1000px' }}>
          {newsCards.map((card, index) => (
            <NewsCard
              key={index}
              title={card.title}
              summary={card.summary}
              position={card.position}
              timestamp={card.timestamp}
              delay={1.0 + index * 0.2} // 딜레이 감소
            />
          ))}
        </div>
      )}
    </div>
  );
});
IPhoneInterface.displayName = 'IPhoneInterface';

// 텍스트 영역
const HeroTextArea = React.memo(({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col justify-center items-start z-10 max-w-lg"
      initial={{ opacity: 0, x: -20 }} // x 값 감소
      animate={isLoaded ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }} // 더 간단한 이징 함수
    >
      <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
        Discover Your News
      </h1>
      <p className="text-lg lg:text-xl xl:text-2xl text-gray-600 mb-6 lg:mb-8">
        Your Personalized News Feed
      </p>
      <Link href="/register">
        <motion.button
          className="px-10 py-5 bg-black text-white rounded-full font-bold text-xl shadow-lg hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }} // 호버 효과 경량화
          whileTap={{ scale: 0.98 }}
          style={{
            background: 'linear-gradient(135deg, #000000, #1a1a1a)',
          }}
        >
          Get Started Now
        </motion.button>
      </Link>
    </motion.div>
  );
});
HeroTextArea.displayName = 'HeroTextArea';
        
// 모바일 영역 - iPhone 인터페이스 표시
const HeroMobileArea = React.memo(({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <motion.div 
      className="flex-1 flex justify-center items-center will-change-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // 더 간단한 이징 함수
    >
      <div>
        <IPhoneInterface />
      </div>
    </motion.div>
  );
});
HeroMobileArea.displayName = 'HeroMobileArea';

// 메인 컴포넌트
export default function NewHeroSection({ 
  id = 'hero', 
  className = '' 
}: {
  id?: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);
  
  // 핸들러 함수들
  const handleCardClick = () => {
    // 개인화 섹션으로 스크롤
    const personalizationSection = document.getElementById('personalization');
    if (personalizationSection) {
      personalizationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleNotificationDismiss = () => {
    setShowNotification(false);
    
    // 알림 닫은 후 잠시 대기 후 메신저 표시
    setTimeout(() => {
      setShowMessenger(true);
    }, 1500);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 즉시 로드 상태로 변경
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden py-20 ${className}`}
      aria-label="히어로 섹션"
    >
      {/* 배경 그래디언트 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9FAFB] to-[#F5F5F5] dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* 콘텐츠 컨테이너 */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* 텍스트 섹션 */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              <span className="text-[#3B82F6]">2분만에</span> 나에게<br />중요한 뉴스만
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              AI가 당신의 관심사를 분석하고 꼭 필요한 뉴스만 골라 매일 아침 전달합니다. 광고 없이, 깔끔하게.
            </p>
            
            {/* 핵심 가치 배지 - 새로 추가 */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                개인 맞춤형 뉴스
              </span>
              <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium border border-green-100">
                시간 절약
              </span>
              <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-sm font-medium border border-amber-100">
                광고 없음
              </span>
              <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm font-medium border border-gray-100">
                무료
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handleCardClick} 
                className="bg-[#3B82F6] hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                무료로 시작하기
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                서비스 둘러보기
              </Button>
            </div>
            
            {/* 사용자 수치 - 새로 추가 */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,000+</div>
                <div className="text-sm text-gray-500">활성 사용자</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-500">뉴스 소스</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                <div className="text-sm text-gray-500">광고 없음</div>
              </div>
            </div>
          </div>
          
          {/* 아이폰 인터페이스 (기존 코드 유지) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            {/* ... existing iPhone interface code ... */}
          </div>
        </div>
      </div>
    </section>
  );
}