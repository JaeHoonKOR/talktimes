"use client";

import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
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
        className={`${isMain ? 'w-12 h-12' : 'w-10 h-10'} rounded-xl flex items-center justify-center text-white ${isMain ? 'text-lg' : 'text-base'} font-bold relative overflow-hidden mb-1 cursor-pointer will-change-transform`}
        style={{
          background: isMain 
            ? 'linear-gradient(135deg, #374151, #4B5563)' // 메인 앱: 짙은 회색
            : 'linear-gradient(135deg, #6B7280, #9CA3AF)', // 일반 앱: 밝은 회색
          boxShadow: isMain 
            ? '0 3px 8px rgba(0,0,0,0.2)' // 그림자 효과 경량화
            : '0 2px 6px rgba(0,0,0,0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
        {isMain && (
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
        )}
        <span className="relative z-10 text-white">{icon}</span>
      </div>
      <span className={`text-xs text-gray-900 dark:text-gray-100 font-medium text-center leading-tight max-w-[50px] truncate ${isMain ? 'font-bold' : ''}`}>
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
  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-12 left-1/2 transform -translate-x-1/2 w-56 sm:w-60 md:w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl border border-white/30 dark:border-gray-700/30 p-3 shadow-xl cursor-pointer z-40 hover:scale-105 transition-transform duration-200"
      onClick={onDismiss}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-start space-x-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
          <span className="text-white text-xs font-bold">뉴</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-gray-900 dark:text-white text-sm font-semibold">뉴스 알림</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">방금</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed">
            🔥 AI가 선별한 맞춤 뉴스가 도착했습니다!
          </p>
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
            클릭하여 확인 →
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
    <div className="flex justify-between items-center px-4 py-1.5 text-white dark:text-gray-200 text-xs font-semibold">
      <div className="flex items-center space-x-1">
        <span>{currentTime}</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="flex space-x-0.5">
          <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
          <div className="w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        </div>
        <svg width="20" height="10" viewBox="0 0 24 12" className="text-white">
          <rect x="2" y="3" width="16" height="5" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
          <rect x="19" y="4.5" width="1.5" height="1.5" rx="0.5" fill="currentColor"/>
          <rect x="4" y="4.5" width="12" height="1.5" rx="1" fill="currentColor"/>
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
        className="w-full h-full bg-gray-100 dark:bg-gray-900"
      />
    </div>
  );
});
HomeScreenBackground.displayName = 'HomeScreenBackground';

// Dock 컴포넌트
const Dock = React.memo(() => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md rounded-xl px-3 py-2 flex space-x-2">
      <AppIcon name="전화" icon="📞" color="bg-gray-600" />
      <AppIcon name="메시지" icon="💬" color="bg-gray-600" />
      <AppIcon name="카메라" icon="📷" color="bg-gray-600" />
      <AppIcon name="설정" icon="⚙️" color="bg-gray-600" />
    </div>
  );
});
Dock.displayName = 'Dock';

// 메신저 인터페이스 컴포넌트
const MessengerScreen = React.memo(({ onChatComplete }: { onChatComplete: () => void }) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, isUser: boolean, delay: number, uniqueKey: string}>>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 이미 초기화되었으면 중복 실행 방지
    if (isInitialized) return;

    // 메시지 상태 초기화
    setMessages([]);
    setIsInitialized(true);

    // 채팅 메시지들 정의 - 고유한 key 추가
    const chatMessages = [
      { id: 1, text: "안녕하세요! 오늘의 맞춤 뉴스를 준비했습니다.", isUser: false, delay: 0, uniqueKey: `msg-1-${Date.now()}` },
      { id: 2, text: "어떤 뉴스가 있나요?", isUser: true, delay: 800, uniqueKey: `msg-2-${Date.now()}` },
      { id: 3, text: "오늘의 뉴스가 도착했습니다! 📰", isUser: false, delay: 1600, uniqueKey: `msg-3-${Date.now()}` },
      { id: 4, text: "AI가 선별한 경제, 기술, 정치 뉴스입니다.", isUser: false, delay: 2400, uniqueKey: `msg-4-${Date.now()}` },
      { id: 5, text: "와! 어떤 뉴스들이 있나요?", isUser: true, delay: 3200, uniqueKey: `msg-5-${Date.now()}` },
      { id: 6, text: "🔥 실시간 업데이트된 중요 뉴스들입니다.", isUser: false, delay: 4000, uniqueKey: `msg-6-${Date.now()}` },
      { id: 7, text: "자세히 보여주세요!", isUser: true, delay: 4800, uniqueKey: `msg-7-${Date.now()}` },
      { id: 8, text: "네, 바로 보여드릴게요! 📰", isUser: false, delay: 5600, uniqueKey: `msg-8-${Date.now()}` }
    ];

    // 메시지들을 순차적으로 추가 - 중복 방지
    chatMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => {
          // 이미 존재하는 메시지인지 확인
          const exists = prev.some(existingMsg => existingMsg.id === msg.id);
          if (exists) return prev;
          return [...prev, msg];
        });
      }, msg.delay);
    });

    // 채팅이 끝난 후 카드 표시 (마지막 메시지 + 1초)
    setTimeout(() => {
      onChatComplete();
    }, 6600); // 5600 + 1000ms

  }, [isInitialized, onChatComplete]); // onChatComplete 의존성 추가

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900 flex flex-col">
      {/* 헤더 */}
      <div className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center px-4 relative z-30">
        <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 mr-3 flex items-center justify-center">
          <span className="text-white text-sm">📱</span>
        </div>
        <div>
          <div className="font-medium text-gray-900 dark:text-white">TalkTimes</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">온라인</div>
        </div>
      </div>
      
      {/* 메신저 화면 내부 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 메신저 헤더 */}
        <div className="flex items-center justify-between px-3 py-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">뉴</span>
            </div>
            <span className="text-white dark:text-gray-200 text-sm font-medium">뉴스 알림</span>
          </div>
          <div className="text-white/60 dark:text-gray-400 text-xs">지금</div>
        </div>

        {/* 메시지 영역 */}
        <div className="flex-1 p-3 space-y-2 overflow-hidden">
          {messages.map((message) => (
            <motion.div
              key={message.uniqueKey}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`max-w-[85%] ${message.isUser ? 'ml-auto' : ''}`}
            >
              <div className={`rounded-lg p-2 ${
                message.isUser 
                  ? 'bg-blue-500/90 backdrop-blur-sm' 
                  : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm'
              }`}>
                <p className={`text-xs leading-relaxed ${
                  message.isUser ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {message.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 입력창 */}
        <div className="px-3 py-2 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md border-t border-white/20 dark:border-gray-700/30">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-white/20 dark:bg-gray-700/30 rounded-full px-3 py-1.5">
              <span className="text-white/60 dark:text-gray-400 text-xs">메시지 입력...</span>
            </div>
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">→</span>
            </div>
          </div>
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
  const cardRef = useRef<HTMLDivElement>(null);

  // 공식 권장: useLayoutEffect + ref + willChange + 최적화
  React.useLayoutEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.85, willChange: 'transform, opacity' },
        { opacity: 1, scale: 1, duration: 0.18, delay: delay, ease: 'power1.out', clearProps: 'willChange' }
      );
    }
  }, [delay]);

  // 카드 클릭 시 개인화 섹션으로 이동
  const handleCardClick = () => {
    const personalizationSection = document.getElementById('personalization');
    if (personalizationSection) {
      personalizationSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="absolute bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-lg border border-white/30 dark:border-gray-600/30 p-3 shadow-lg cursor-pointer transform-gpu z-40 w-[180px] h-[140px] hover:scale-105 hover:shadow-xl transition-all duration-300"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        willChange: 'transform, opacity'
      }}
      onClick={handleCardClick}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              경제
            </span>
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2">
            {summary}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {timestamp}
          </span>
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">실시간</span>
          </div>
        </div>
      </div>
    </div>
  );
});
NewsCard.displayName = 'NewsCard';

// iPhone 인터페이스 메인 컴포넌트
const IPhoneInterface = React.memo(({ 
  showNotification, 
  showMessenger, 
  showCards,
  onNotificationDismiss,
  onChatComplete
}: { 
  showNotification: boolean;
  showMessenger: boolean;
  showCards: boolean;
  onNotificationDismiss: () => void;
  onChatComplete: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 앱 데이터 메모이제이션
  const apps = useMemo(() => [
    { name: 'TalkTimes', color: '#374151', icon: '📱', isMain: true },
    { name: 'News', color: '#6B7280', icon: '📰', isMain: false },
    { name: 'AI Chat', color: '#6B7280', icon: '🤖', isMain: false },
    { name: 'Trends', color: '#6B7280', icon: '📈', isMain: false },
    // 앱 아이콘 수 감소 (12개 → 8개)
    { name: 'Weather', color: '#6B7280', icon: '☀️', isMain: false },
    { name: 'Photos', color: '#6B7280', icon: '📸', isMain: false },
    { name: 'Music', color: '#6B7280', icon: '🎵', isMain: false },
    { name: 'Calendar', color: '#6B7280', icon: '📅', isMain: false },
  ], []);

  // 뉴스 카드 데이터 메모이제이션
  const newsCards = useMemo(() => [
    // 카드 수 감소 (3개 → 2개) - 위치를 화면 안으로 수정
    {
      title: "AI 기술의 새로운 돌파구", 
      summary: "최신 인공지능 기술이 일상생활에 미치는 영향에 대해 알아보세요.",
      position: { x: 10, y: 25, z: 40, rotation: 15 }, // 화면 안으로 수정
      timestamp: "5분 전"
    },
    {
      title: "전 세계 경제 동향", 
      summary: "글로벌 시장의 최신 동향과 투자 기회를 분석합니다.",
      position: { x: 70, y: 55, z: 80, rotation: -10 }, // 화면 안으로 수정
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
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-64 h-[480px] sm:w-72 sm:h-[540px] md:w-80 md:h-[600px] relative ml-0 will-change-transform"
    >
      {/* iPhone 베젤 */}
      <div 
        className="absolute inset-0 rounded-[3rem] shadow-xl"
        style={{
          background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
          padding: '4px'
        }}
      >
        {/* 다크모드에서 크림색/은색 베젤 */}
        <div 
          className="absolute inset-0 rounded-[3rem] dark:bg-gradient-to-br dark:from-amber-100 dark:to-gray-200"
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
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-30"
            >
              <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-gray-800 dark:bg-gray-600 rounded-full"></div>
            </div>

            {showMessenger ? (
              /* 메신저 화면 - key 제거로 안정성 확보 */
              <MessengerScreen onChatComplete={onChatComplete} />
            ) : (
              <>
                {/* 홈 화면 배경 */}
                <HomeScreenBackground />

                {/* 상태바 */}
                <div className="relative z-20 pt-8">
                  <StatusBar />
                </div>

                {/* 알림 - iPhone 스크린 내부 */}
                <Notification 
                  isVisible={showNotification} 
                  onDismiss={onNotificationDismiss} 
                />

                {/* 앱 아이콘 그리드 */}
                <div className="px-4 py-4 grid grid-cols-4 gap-3 relative z-10">
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
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-white/60 dark:bg-gray-400/60 rounded-full"></div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 물리적 버튼들 */}
      <div className="absolute right-[-3px] top-24 w-1 h-10 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>
      <div className="absolute right-[-3px] top-36 w-1 h-12 bg-gray-700 dark:bg-gray-600 rounded-l-sm"></div>
      <div className="absolute left-[-3px] top-30 w-1 h-16 bg-gray-700 dark:bg-gray-600 rounded-r-sm"></div>
      
      {/* 3D 뉴스 카드들 - 채팅이 끝난 후에만 표시 */}
      {showCards && (
        <div className="absolute inset-0 z-40" style={{ perspective: '800px' }}>
          {newsCards.map((card, index) => (
            <NewsCard
              key={`news-card-${index}-${card.title}`}
              title={card.title}
              summary={card.summary}
              position={card.position}
              timestamp={card.timestamp}
              delay={0.2 + index * 0.3} // 0.3초 앞당김 (0.5 → 0.2)
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
const HeroMobileArea = React.memo(({ 
  isLoaded,
  showNotification,
  showMessenger,
  showCards,
  onNotificationDismiss,
  onChatComplete
}: { 
  isLoaded: boolean;
  showNotification: boolean;
  showMessenger: boolean;
  showCards: boolean;
  onNotificationDismiss: () => void;
  onChatComplete: () => void;
}) => {
  return (
    <motion.div 
      className="flex-1 flex justify-center items-center will-change-transform"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} // 더 간단한 이징 함수
    >
      <div>
        <IPhoneInterface 
          showNotification={showNotification}
          showMessenger={showMessenger}
          showCards={showCards}
          onNotificationDismiss={onNotificationDismiss}
          onChatComplete={onChatComplete}
        />
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
  const [showCards, setShowCards] = useState(false);
  
  // 핸들러 함수들 - 메모이제이션으로 안정성 확보
  const handleCardClick = useCallback(() => {
    // 개인화 섹션으로 스크롤
    const personalizationSection = document.getElementById('personalization');
    if (personalizationSection) {
      personalizationSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  const handleNotificationDismiss = useCallback(() => {
    setShowNotification(false);
    
    // 알림 닫은 후 잠시 대기 후 메신저 표시
    setTimeout(() => {
      setShowMessenger(true);
    }, 500);
  }, []);

  const handleChatComplete = useCallback(() => {
    setShowCards(true);
  }, []);

  useEffect(() => {
    // 컴포넌트 마운트 시 즉시 로드 상태로 변경
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // 0.8초 후 알림 표시
    const notificationTimer = setTimeout(() => {
      setShowNotification(true);
    }, 800);

    return () => clearTimeout(notificationTimer);
  }, []);

  return (
    <>
      <style jsx global>{`
        .frozen-glass-card {
          position: relative;
          overflow: hidden;
        }
        
        .frozen-glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
          pointer-events: none;
          border-radius: inherit;
        }
        
        .frozen-glass-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 30%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
          border-radius: inherit;
          pointer-events: none;
        }
        
        .frozen-glass-card:hover {
          background: 
            linear-gradient(135deg, 
              rgba(0, 0, 0, 0.2) 0%, 
              rgba(0, 0, 0, 0.08) 25%, 
              rgba(0, 0, 0, 0.05) 50%, 
              rgba(0, 0, 0, 0.08) 75%, 
              rgba(0, 0, 0, 0.15) 100%
            ),
            radial-gradient(circle at 30% 20%, rgba(0, 0, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(0, 0, 0, 0.1) 0%, transparent 50%) !important;
        }
        
        .dark .frozen-glass-card {
          background: 
            linear-gradient(135deg, 
              rgba(156, 163, 175, 0.15) 0%, 
              rgba(156, 163, 175, 0.05) 25%, 
              rgba(156, 163, 175, 0.02) 50%, 
              rgba(156, 163, 175, 0.05) 75%, 
              rgba(156, 163, 175, 0.1) 100%
            ),
            radial-gradient(circle at 30% 20%, rgba(156, 163, 175, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(156, 163, 175, 0.1) 0%, transparent 50%) !important;
          border: 1px solid rgba(156, 163, 175, 0.2) !important;
          box-shadow: 
            inset 0 1px 0 rgba(156, 163, 175, 0.3),
            inset 0 -1px 0 rgba(156, 163, 175, 0.1),
            inset 1px 0 0 rgba(156, 163, 175, 0.15),
            inset -1px 0 0 rgba(156, 163, 175, 0.05),
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 4px 16px rgba(0, 0, 0, 0.2) !important;
        }
        
        .dark .frozen-glass-card:hover {
          background: 
            linear-gradient(135deg, 
              rgba(156, 163, 175, 0.2) 0%, 
              rgba(156, 163, 175, 0.08) 25%, 
              rgba(156, 163, 175, 0.05) 50%, 
              rgba(156, 163, 175, 0.08) 75%, 
              rgba(156, 163, 175, 0.15) 100%
            ),
            radial-gradient(circle at 30% 20%, rgba(156, 163, 175, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(156, 163, 175, 0.15) 0%, transparent 50%) !important;
        }
      `}</style>
      
      <section 
        id={id}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden py-20 ${className}`}
        aria-label="히어로 섹션"
      >
        
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
                <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800">
                  개인 맞춤형 뉴스
                </span>
                <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-100 dark:border-green-800">
                  시간 절약
                </span>
                <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-100 dark:border-amber-800">
                  광고 없음
                </span>
                <span className="bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-100 dark:border-gray-700">
                  무료
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={handleCardClick} 
                  className="bg-[#3B82F6] dark:bg-[#60A5FA] hover:bg-blue-600 dark:hover:bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  무료로 시작하기
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-lg text-lg font-medium transition-colors"
                >
                  서비스 둘러보기
                </Button>
              </div>
              
              {/* 사용자 수치 - 새로 추가 */}
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1,000+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">활성 사용자</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">뉴스 소스</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">광고 없음</div>
                </div>
              </div>
            </div>
            
            {/* 아이폰 인터페이스 */}
            <div className="w-full lg:w-1/2 flex justify-center mt-[-40px] md:mt-[-60px]">
              <HeroMobileArea 
                isLoaded={isLoaded}
                showNotification={showNotification}
                showMessenger={showMessenger}
                showCards={showCards}
                onNotificationDismiss={handleNotificationDismiss}
                onChatComplete={handleChatComplete}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}