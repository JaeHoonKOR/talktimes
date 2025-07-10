"use client";

import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

interface AppIcon {
  name: string;
  color: string;
  icon: string;
  delay?: number;
  isMain?: boolean;
}

interface HeroBackgroundProps {
  appIcons: AppIcon[];
  className?: string;
}

// 앱 아이콘 컴포넌트
const AppIcon = React.memo(({ 
  name, 
  color, 
  icon, 
  delay = 0,
  isMain = false
}: AppIcon) => {
  const iconRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (iconRef.current) {
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

      if (isMain) {
        gsap.to(iconRef.current, {
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
          duration: 2,
          repeat: 1,
          yoyo: true,
          ease: "power2.inOut",
          delay: delay + 1
        });
      }
    }
  }, [delay, isMain]);

  return (
    <div
      ref={iconRef}
      className="flex flex-col items-center"
    >
      <div 
        className={`${isMain ? 'w-16 h-16' : 'w-14 h-14'} rounded-xl ${color} flex items-center justify-center text-white ${isMain ? 'text-2xl' : 'text-xl'} font-bold relative overflow-hidden mb-1 cursor-pointer will-change-transform`}
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          boxShadow: isMain 
            ? '0 4px 12px rgba(0,0,0,0.2)'
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
    </div>
  );
});
AppIcon.displayName = 'AppIcon';

export default function HeroBackground({ appIcons, className = '' }: HeroBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* 그라데이션 배경 */}
      <div 
        className="w-full h-full"
        style={{
          background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.1)'
        }}
      />
      
      {/* 앱 아이콘들 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 md:gap-12">
          {appIcons.map((app, index) => (
            <AppIcon
              key={index}
              name={app.name}
              color={app.color}
              icon={app.icon}
              delay={app.delay}
              isMain={app.isMain}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 