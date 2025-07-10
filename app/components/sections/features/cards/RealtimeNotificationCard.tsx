"use client";

import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

// 시계 컴포넌트
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
        duration: 6,
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
          <div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60"
            style={{
              left: '50%',
              top: '50%',
              transformOrigin: '50% 64px',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`
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
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-44px)`
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
        <div className="absolute w-3 h-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-full" />
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

export default function RealtimeNotificationCard() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ClockIcon />
    </div>
  );
} 