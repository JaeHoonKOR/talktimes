'use client';

import { useState } from 'react';

interface NewsSourceIconProps {
  source: {
    name: string;
    logo: string;
    category: string;
  };
  position: any;
  size: number;
  delay: number;
  index: number;
}

export default function NewsSourceIcon({ source, position, size, delay, index }: NewsSourceIconProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="absolute rounded-full bg-white shadow-lg overflow-hidden animate-subtle-float"
      style={{
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${20 + (index % 3) * 5}s`
      }}
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        {!imageError ? (
          <img 
            src={source.logo} 
            alt={source.name}
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-[#EFEFEF] dark:bg-[#2C2C2E] rounded-full flex items-center justify-center">
            <span className="text-xs text-[#9CA3AF] font-medium">
              {source.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 