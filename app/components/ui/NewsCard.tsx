"use client";

import { motion } from 'framer-motion';
import GlassmorphicCard from './GlassmorphicCard';
import NeumorphicButton from './NeumorphicButton';
import { useState } from 'react';

interface NewsCardProps {
  title: string;
  summary: string;
  category: string;
  timeAgo: string;
  imageUrl?: string;
  isTranslated?: boolean;
  originalLanguage?: string;
}

export default function NewsCard({ 
  title, 
  summary, 
  category, 
  timeAgo, 
  imageUrl, 
  isTranslated = false, 
  originalLanguage 
}: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors = {
      'politics': { light: 'from-blue-500 to-blue-600', dark: 'dark:from-blue-400 dark:to-blue-500' },
      'economy': { light: 'from-green-500 to-green-600', dark: 'dark:from-green-400 dark:to-green-500' },
      'technology': { light: 'from-purple-500 to-purple-600', dark: 'dark:from-purple-400 dark:to-purple-500' },
      'sports': { light: 'from-red-500 to-red-600', dark: 'dark:from-red-400 dark:to-red-500' },
      'culture': { light: 'from-yellow-500 to-yellow-600', dark: 'dark:from-yellow-400 dark:to-yellow-500' },
      'international': { light: 'from-indigo-500 to-indigo-600', dark: 'dark:from-indigo-400 dark:to-indigo-500' },
      '정치': { light: 'from-blue-500 to-blue-600', dark: 'dark:from-blue-400 dark:to-blue-500' },
      '경제': { light: 'from-green-500 to-green-600', dark: 'dark:from-green-400 dark:to-green-500' },
      '기술': { light: 'from-purple-500 to-purple-600', dark: 'dark:from-purple-400 dark:to-purple-500' },
      '스포츠': { light: 'from-red-500 to-red-600', dark: 'dark:from-red-400 dark:to-red-500' },
      '문화': { light: 'from-yellow-500 to-yellow-600', dark: 'dark:from-yellow-400 dark:to-yellow-500' },
      '국제': { light: 'from-indigo-500 to-indigo-600', dark: 'dark:from-indigo-400 dark:to-indigo-500' },
    };
    const categoryColors = colors[category as keyof typeof colors];
    return categoryColors ? `${categoryColors.light} ${categoryColors.dark}` : 'from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassmorphicCard
        variant="medium"
        blur="lg"
        size="lg"
        interactive
        glow
        className="group relative overflow-hidden h-full flex flex-col cursor-pointer"
        onClick={() => {
          // 2번째 섹션으로 스크롤 (news section)
          const newsSection = document.getElementById('news');
          if (newsSection) {
            newsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {/* 상단 메타데이터 */}
        <div className="flex items-center justify-between mb-4">
          <GlassmorphicCard variant="light" blur="sm" size="sm" className="px-3 py-1">
            <span className={`text-xs font-semibold bg-gradient-to-r ${getCategoryColor(category)} bg-clip-text text-transparent`}>
              {category}
            </span>
          </GlassmorphicCard>
          
          <div className="flex items-center gap-2">
            {isTranslated && originalLanguage && (
              <GlassmorphicCard variant="light" blur="xs" size="sm" className="px-2 py-1">
                <span className="text-xs text-neumorphic-accent-primary dark:text-neumorphic-dark-accent-primary font-medium">
                  {originalLanguage} → KO
                </span>
              </GlassmorphicCard>
            )}
            
            <NeumorphicButton
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <svg 
                className={`w-4 h-4 transition-colors ${isBookmarked ? 'text-neumorphic-warning dark:text-neumorphic-dark-warning fill-current' : 'text-neumorphic-text-muted dark:text-neumorphic-dark-text-muted'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </NeumorphicButton>
          </div>
        </div>

        {/* 3D 이미지 컨테이너 */}
        {imageUrl && (
          <div className="mb-4 relative">
            <GlassmorphicCard variant="strong" blur="md" className="p-2 overflow-hidden">
              <div className="relative aspect-video overflow-hidden rounded-neuro-sm">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </GlassmorphicCard>
          </div>
        )}

        {/* 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-neumorphic-text-primary dark:text-neumorphic-dark-text-primary mb-3 line-clamp-2 group-hover:text-neumorphic-accent-primary dark:group-hover:text-neumorphic-dark-accent-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-neumorphic-text-secondary dark:text-neumorphic-dark-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {summary}
          </p>

          {/* 하단 액션 영역 */}
          <div className="flex items-center justify-between pt-4 border-t border-neumorphic-shadow-dark/10">
            <span className="text-xs text-neumorphic-text-muted dark:text-neumorphic-dark-text-muted">
              {timeAgo}
            </span>
            
            <div className="flex items-center gap-2">
              <NeumorphicButton variant="secondary" size="sm" className="text-xs">
                원문 보기
              </NeumorphicButton>
              <NeumorphicButton variant="accent" size="sm" className="text-xs">
                더 읽기
              </NeumorphicButton>
            </div>
          </div>
        </div>

        {/* 호버 효과 장식 */}
        <div className="absolute top-4 right-16 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 0.9, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <GlassmorphicCard variant="light" blur="sm" size="sm" className="p-2">
              <div className="w-2 h-2 bg-gradient-to-r from-neumorphic-success to-neumorphic-accent-primary rounded-full"></div>
            </GlassmorphicCard>
          </motion.div>
        </div>

        {/* AI 처리 인디케이터 */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <GlassmorphicCard variant="light" blur="xs" size="sm" className="px-2 py-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-neumorphic-accent-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-neumorphic-text-muted dark:text-neumorphic-dark-text-muted font-medium">AI 요약</span>
            </div>
          </GlassmorphicCard>
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
}