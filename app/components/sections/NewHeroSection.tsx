"use client";

import NeumorphicButton from '../ui/NeumorphicButton';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useScrollAnimation, useParallax } from '../../hooks/useScrollAnimation';
import { useLayoutStabilization } from '../../hooks/useLayoutStabilization';

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
      whileHover={{ 
        scale: isMain ? 1.1 : 1.05,
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className={`${isMain ? 'w-14 h-14' : 'w-12 h-12'} rounded-2xl flex items-center justify-center text-white ${isMain ? 'text-xl' : 'text-lg'} font-bold relative overflow-hidden mb-2 cursor-pointer will-change-transform`}
        style={{
          background: isMain 
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' // 메인 앱: 그라데이션
            : 'linear-gradient(135deg, #6B7280, #9CA3AF)', // 일반 앱: 회색 그라데이션
          boxShadow: isMain 
            ? '0 8px 20px rgba(102, 126, 234, 0.3), 0 4px 8px rgba(0,0,0,0.1)' 
            : '0 4px 12px rgba(107, 114, 128, 0.2), 0 2px 4px rgba(0,0,0,0.1)'
        }}
        whileHover={{
          boxShadow: isMain 
            ? '0 12px 30px rgba(102, 126, 234, 0.4), 0 6px 12px rgba(0,0,0,0.15)'
            : '0 6px 18px rgba(107, 114, 128, 0.3), 0 3px 6px rgba(0,0,0,0.15)'
        }}
      >
        {/* 글래스모피즘 효과 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-white/10 to-transparent rounded-2xl"></div>
        
        {/* 메인 앱에 특별한 효과 */}
        {isMain && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: delay + 2
              }}
            />
          </>
        )}
        
        <span className="relative z-10 text-white drop-shadow-sm">{icon}</span>
      </motion.div>
      <span className={`text-xs text-gray-900 dark:text-gray-100 font-medium text-center leading-tight max-w-[60px] truncate ${isMain ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}>
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
      initial={{ opacity: 0, y: -30, scale: 0.9, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -30, scale: 0.9, rotateX: -15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute top-12 left-1/2 transform -translate-x-1/2 w-64 sm:w-72 md:w-80 glass-card cursor-pointer z-40 smooth-lift"
      onClick={onDismiss}
      whileHover={{ 
        scale: 1.05,
        y: -4,
        rotateY: 2,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <motion.div 
            className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-white text-sm font-bold">📱</span>
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900 dark:text-white text-sm font-bold">
                🔥 뉴스 알림
              </span>
              <motion.span 
                className="glass-card px-2 py-1 text-xs text-green-600 dark:text-green-400 font-semibold"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                방금 전
              </motion.span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
              ✨ AI가 선별한 맞춤 뉴스가 도착했습니다!
            </p>
            <motion.div 
              className="modern-button text-xs px-3 py-2 flex items-center space-x-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>📖 지금 확인하기</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </div>
        
        {/* 하단 액션 표시기 */}
        <div className="mt-3 pt-2 border-t border-white/20 dark:border-gray-600/20">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">클릭하여 열기</span>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
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
          <div className="w-0.5 h-0.5 bg-white dark:bg-gray-300 rounded-full"></div>
          <div className="w-0.5 h-0.5 bg-white dark:bg-gray-300 rounded-full"></div>
          <div className="w-0.5 h-0.5 bg-white dark:bg-gray-300 rounded-full"></div>
          <div className="w-0.5 h-0.5 bg-white/50 dark:bg-gray-300/50 rounded-full"></div>
        </div>
        <svg width="20" height="10" viewBox="0 0 24 12" className="text-white dark:text-gray-300">
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
      {/* 헤더 - 글래스모피즘 스타일 */}
      <div className="h-16 glass-card shadow-lg flex items-center px-4 relative z-30 border-b border-white/20 dark:border-gray-600/20">
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mr-3 flex items-center justify-center shadow-lg"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-white text-lg">📱</span>
        </motion.div>
        <div>
          <div className="font-bold text-gray-900 dark:text-white text-lg">TalkTimes</div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 dark:text-green-400 font-semibold">온라인</span>
          </div>
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

        {/* 메시지 영역 - 개선된 스타일 */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          {messages.map((message) => (
            <motion.div
              key={message.uniqueKey}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                type: "spring",
                damping: 20
              }}
              className={`max-w-[80%] ${message.isUser ? 'ml-auto' : ''}`}
            >
              <motion.div 
                className={`rounded-2xl p-3 relative overflow-hidden ${
                  message.isUser 
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg' 
                    : 'glass-card text-gray-800 dark:text-gray-200'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {/* 메시지 내용 */}
                <p className="text-sm leading-relaxed relative z-10">
                  {message.text}
                </p>
                
                {/* 사용자 메시지에 특별한 효과 */}
                {message.isUser && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                )}
                
                {/* AI 메시지에 미묘한 아이콘 */}
                {!message.isUser && (
                  <motion.div 
                    className="absolute bottom-1 right-2 text-xs opacity-50"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🤖
                  </motion.div>
                )}
              </motion.div>
              
              {/* 메시지 시간 표시 */}
              <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
                방금 전
              </div>
            </motion.div>
          ))}
        </div>

        {/* 입력창 - 글래스모피즘 스타일 */}
        <div className="p-4 glass-card border-t border-white/20 dark:border-gray-600/20">
          <div className="flex items-center space-x-3">
            <div className="flex-1 glass-card px-4 py-3 rounded-full">
              <span className="text-gray-600 dark:text-gray-400 text-sm">💬 메시지 입력...</span>
            </div>
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                rotate: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-white text-lg"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ➤
              </motion.span>
            </motion.div>
          </div>
          
          {/* 하단 기능 버튼들 */}
          <div className="flex items-center justify-center space-x-4 mt-3 pt-2 border-t border-white/10 dark:border-gray-600/10">
            <motion.div 
              className="glass-card p-2 rounded-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">📎</span>
            </motion.div>
            <motion.div 
              className="glass-card p-2 rounded-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">📷</span>
            </motion.div>
            <motion.div 
              className="glass-card p-2 rounded-full cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-sm">🎤</span>
            </motion.div>
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

  // 개선된 애니메이션: 초기 상태를 완전히 숨김으로 설정하여 깜빡임 방지
  React.useLayoutEffect(() => {
    if (cardRef.current) {
      // 초기 상태를 더 확실하게 숨김
      gsap.set(cardRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        y: 20,
        willChange: 'transform, opacity' 
      });
      
      // 부드러운 등장 애니메이션
      gsap.to(cardRef.current, {
        opacity: 1, 
        scale: 1, 
        y: 0,
        duration: 0.4, 
        delay: delay, 
        ease: 'power2.out',
        clearProps: 'willChange'
      });
    }
  }, [delay]);

  // 카드 클릭 시 특징 섹션으로 이동 (두 번째 섹션)
  const handleCardClick = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute glass-card cursor-pointer transform-gpu z-40 w-[180px] sm:w-[200px] h-[160px] sm:h-[180px] md:w-[220px] md:h-[200px] opacity-0 focus-modern smooth-lift"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        willChange: 'transform, opacity'
      }}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`뉴스 기사: ${title}. 클릭하여 특징 섹션으로 이동`}
      whileHover={{ 
        scale: 1.08,
        y: -8,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      transition={{
        duration: 0.4,
        ease: "easeInOut"
      }}
    >
      <div className="h-full flex flex-col p-3 sm:p-4">
        {/* 뉴스 이미지 - 형광색 플레이스홀더 */}
        <div className="neon-placeholder h-16 sm:h-20 mb-3 text-xs sm:text-sm">
          📰 뉴스 이미지
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <motion.span 
                className="glass-card px-2 py-1 text-xs font-bold text-blue-600 dark:text-blue-400"
                whileHover={{ scale: 1.05 }}
              >
                💼 경제
              </motion.span>
              <motion.div 
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.6, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <h3 className="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mb-2">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-2 mb-2">
              {summary}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/20 dark:border-gray-600/20">
            <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              ⏰ {timestamp}
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold">실시간</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D 효과를 위한 하이라이트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl pointer-events-none" />
    </motion.div>
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
    // 특징 섹션으로 스크롤 (두 번째 섹션)
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
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

  // 스크롤 애니메이션과 패럴랙스 훅
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  const parallaxY = useParallax(0.3);

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
        ref={heroRef}
        id={id}
        className={`relative min-h-screen flex items-center justify-center overflow-hidden py-20 ${className} scroll-animate ${heroVisible ? 'visible' : ''}`}
        aria-label="히어로 섹션"
        style={{
          transform: `translateY(${parallaxY * 0.5}px)`,
        }}
      >
        {/* 배경 패럴랙스 요소들 */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            transform: `translateY(${parallaxY * 0.8}px)`,
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 70%)
            `,
          }}
        />
        
        {/* 움직이는 배경 원들 */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translateY(${parallaxY * 0.6}px)`,
          }}
        />
        
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 20, -40, 0],
            scale: [1, 0.8, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transform: `translateY(${parallaxY * 0.4}px)`,
          }}
        />
        
        {/* 콘텐츠 컨테이너 */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* 텍스트 섹션 */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                <span className="text-[#3B82F6]">2분만에</span> 나에게<br className="hidden sm:block" /><span className="sm:hidden"> </span>중요한 뉴스만
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
                AI가 당신의 관심사를 분석하고 꼭 필요한 뉴스만 골라 매일 아침 전달합니다. 광고 없이, 깔끔하게.
              </p>
              
              {/* 핵심 가치 배지 - 글래스모피즘 스타일로 업그레이드 */}
              <motion.div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center lg:justify-start">
                <motion.span 
                  className="glass-card px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 smooth-lift micro-bounce"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ✨ 개인 맞춤형 뉴스
                </motion.span>
                <motion.span 
                  className="glass-card px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 smooth-lift micro-bounce"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ⚡ 시간 절약
                </motion.span>
                <motion.span 
                  className="glass-card px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400 smooth-lift micro-bounce"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🚫 광고 없음
                </motion.span>
                <motion.span 
                  className="glass-card px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 smooth-lift micro-bounce"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  💎 무료
                </motion.span>
              </motion.div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  onClick={handleCardClick}
                  className="modern-button px-8 py-4 text-lg font-semibold ripple gradient-animate"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  🚀 무료로 시작하기
                </motion.button>
                <motion.button 
                  className="glass-card px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-200 smooth-lift"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  👀 서비스 둘러보기
                </motion.button>
              </div>
              
              {/* 사용자 수치 - 글래스모피즘 카드로 업그레이드 */}
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div 
                  className="glass-card text-center py-4 px-2 smooth-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">1,000+</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">활성 사용자</div>
                </motion.div>
                <motion.div 
                  className="glass-card text-center py-4 px-2 smooth-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-1">50+</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">뉴스 소스</div>
                </motion.div>
                <motion.div 
                  className="glass-card text-center py-4 px-2 smooth-lift"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 mb-1">100%</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">광고 없음</div>
                </motion.div>
              </motion.div>
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