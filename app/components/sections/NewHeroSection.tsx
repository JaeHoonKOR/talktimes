"use client";

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
      gsap.fromTo(
        iconRef.current,
        { 
          scale: 0, 
          opacity: 0, 
          rotationY: 180 
        },
        { 
          scale: 1, 
          opacity: 1, 
          rotationY: 0,
          duration: isMain ? 0.8 : 0.6,
          delay: delay,
          ease: isMain ? "back.out(2)" : "back.out(1.7)"
        }
      );

      // TalkTimes 앱에 펄스 효과 추가
      if (isMain) {
        gsap.to(iconRef.current, {
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          duration: 2,
          repeat: -1,
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
      whileHover={{ scale: isMain ? 1.15 : 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className={`${isMain ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl ${color} shadow-lg flex items-center justify-center text-white ${isMain ? 'text-2xl' : 'text-xl'} font-bold relative overflow-hidden mb-1 cursor-pointer`}
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: isMain 
            ? '0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)' 
            : '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
        {isMain && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl animate-pulse"></div>
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
    if (notificationRef.current) {
      if (isVisible) {
        gsap.fromTo(
          notificationRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(
          notificationRef.current,
          { y: -100, opacity: 0, duration: 0.3, ease: "power2.in" }
        );
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={notificationRef}
      className="absolute top-12 left-4 right-4 z-40 cursor-pointer"
      whileHover={{ 
        scale: 1.03,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onDismiss}
    >
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20 hover:shadow-2xl hover:bg-white/98 hover:border-white/30 transition-all duration-300">
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
    const interval = setInterval(updateTime, 1000);
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
          background: `
            radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(119, 198, 255, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #667eea 0%, #764ba2 100%)
          `
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(20px)',
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
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: "power3.out" }
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
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
    >
      <div 
        className="bg-white/20 backdrop-blur-xl rounded-2xl p-3 flex space-x-4"
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        {dockApps.map((app, index) => (
          <AppIcon 
            key={app.name}
            name={app.name}
            color={app.color}
            icon={app.icon}
            delay={1.4 + index * 0.1}
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

  const messages = [
    { id: 1, text: '안녕하세요! TalkTimes입니다.', isUser: false },
    { id: 2, text: '안녕하세요!', isUser: true },
    { id: 3, text: '오늘의 맞춤 뉴스를 준비했어요.', isUser: false },
    { id: 4, text: '어떤 뉴스가 있나요?', isUser: true },
    { id: 5, text: 'AI가 선별한 당신만의 뉴스가 준비되어 있어요!', isUser: false },
  ];

  useEffect(() => {
    if (messagesRef.current) {
      gsap.fromTo(
        messagesRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: "power2.out" }
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
                rounded-2xl p-3 max-w-[80%] shadow-sm
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
      className={`absolute w-52 h-36 backdrop-blur-md bg-white/20 dark:bg-black/20 rounded-2xl shadow-2xl border border-white/30 dark:border-white/10 cursor-pointer transition-all duration-500 hover:scale-110 hover:bg-white/40 dark:hover:bg-black/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:border-white/50 dark:hover:border-white/30 hover:-translate-y-2 ${
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
          <div className="w-6 h-6 bg-gradient-to-br from-[#3B82F6] to-[#10B981] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-xs">📰</span>
          </div>
        </div>
      </div>
      
      {/* 호버 시 글로우 효과 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 to-[#10B981]/5 opacity-0 hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className="absolute top-3 left-3 text-[#3B82F6] dark:text-[#10B981] text-xs font-bold bg-white/80 dark:bg-black/60 px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
          ✨ 읽어보기
        </div>
      </div>
      
      {/* 미세한 내부 글로우 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-white/5 pointer-events-none" />
    </div>
  );
});
NewsCard.displayName = 'NewsCard';

// iPhone 인터페이스 메인 컴포넌트
const iPhoneInterface = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessenger, setShowMessenger] = useState(false);

  const apps = useMemo(() => [
    { name: 'TalkTimes', color: '#3B82F6', icon: '📱', isMain: true },
    { name: 'News', color: '#4ECDC4', icon: '📰', isMain: false },
    { name: 'AI Chat', color: '#45B7D1', icon: '🤖', isMain: false },
    { name: 'Trends', color: '#96CEB4', icon: '📈', isMain: false },
    { name: 'Weather', color: '#FFEAA7', icon: '☀️', isMain: false },
    { name: 'Photos', color: '#DDA0DD', icon: '📸', isMain: false },
    { name: 'Maps', color: '#98D8C8', icon: '🗺️', isMain: false },
    { name: 'Music', color: '#F7DC6F', icon: '🎵', isMain: false },
    { name: 'Calendar', color: '#AED6F1', icon: '📅', isMain: false },
    { name: 'Notes', color: '#F8C471', icon: '📝', isMain: false },
    { name: 'Health', color: '#82E0AA', icon: '❤️', isMain: false },
    { name: 'Wallet', color: '#D7DBDD', icon: '💳', isMain: false }
  ], []);

  const newsCards = useMemo(() => [
    // 왼쪽 1개
    {
      title: "AI 기술의 새로운 돌파구", 
      summary: "최신 인공지능 기술이 일상생활에 미치는 영향에 대해 알아보세요.",
      position: { x: -280, y: 50, z: 50, rotation: -15 },
      timestamp: "5분 전"
    },
    // 오른쪽 2개
    {
      title: "전 세계 경제 동향", 
      summary: "글로벌 시장의 최신 동향과 투자 기회를 분석합니다.",
      position: { x: 400, y: 120, z: 30, rotation: -10 },
      timestamp: "25분 전"
    },
    {
      title: "스포츠 하이라이트", 
      summary: "이번 주 주요 스포츠 경기 결과와 선수들의 활약상을 정리했습니다.",
      position: { x: 400, y: 280, z: 60, rotation: 10 },
      timestamp: "33분 전"
    }
  ], []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }
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
    }, 1000);
  };

  return (
    <div 
      ref={containerRef}
      className="w-80 h-[640px] relative mx-auto"
      style={{ 
        opacity: 1,
        transform: 'scale(1)',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* iPhone 베젤 */}
      <div 
        className="absolute inset-0 rounded-[3rem] shadow-2xl"
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
            style={{
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}
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
                    delay={0.5 + index * 0.05}
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
        <div className="absolute inset-0" style={{ perspective: '1000px', pointerEvents: 'none' }}>
          {newsCards.map((card, index) => (
            <div key={index} style={{ pointerEvents: 'auto' }}>
              <NewsCard
                title={card.title}
                summary={card.summary}
                position={card.position}
                timestamp={card.timestamp}
                delay={1.5 + index * 0.2}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
});
iPhoneInterface.displayName = 'iPhoneInterface';

// 텍스트 영역
const HeroTextArea = React.memo(({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <motion.div
      className="flex-1 flex flex-col justify-center items-start z-10 max-w-lg"
      initial={{ opacity: 0, x: -40 }}
      animate={isLoaded ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
        Discover Your News
      </h1>
      <p className="text-lg lg:text-xl xl:text-2xl text-gray-600 mb-6 lg:mb-8">
        Your Personalized News Feed
      </p>
      <Link href="/register">
        <motion.button
          className="px-10 py-5 bg-black text-white rounded-full font-bold text-xl shadow-xl hover:bg-gray-900 hover:shadow-2xl transition-all duration-300 cursor-pointer"
          whileHover={{ 
            scale: 1.08,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
          }}
          whileTap={{ scale: 0.95 }}
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
      className="flex-1 flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
    >
      <div
        style={{ 
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        {React.createElement(iPhoneInterface)}
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id={id}
      className={`min-h-screen w-full flex items-center justify-center -mt-16 pt-16 bg-[#F9FAFB] dark:bg-[#1C1C1E] text-[#121212] dark:text-[#F0F0F0] overflow-hidden py-2 lg:py-4 ${className}`}
      aria-label="뉴스 추천 서비스 소개"
    >
      <div className="w-full max-w-[90%] mx-auto rounded-xl bg-[#F9FAFB] dark:bg-[#1C1C1E] flex flex-col lg:flex-row items-center px-8 lg:px-12 py-4 lg:py-6 gap-12 lg:gap-16 relative">
        <HeroTextArea isLoaded={isLoaded} />
        <HeroMobileArea isLoaded={isLoaded} />
      </div>
    </section>
  );
} 