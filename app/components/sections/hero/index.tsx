"use client";

import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroStats from './HeroStats';
import { useHeroData } from './hooks/useHeroData';

interface NewHeroSectionProps {
  id?: string;
  className?: string;
}

export default function NewHeroSection({ 
  id = 'hero', 
  className = '' 
}: NewHeroSectionProps) {
  const { stats, appIcons } = useHeroData();

  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
      data-testid="hero-section"
    >
      {/* 배경 */}
      <HeroBackground appIcons={appIcons} />
      
      {/* 메인 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* 히어로 콘텐츠 */}
          <HeroContent className="mb-16" />
          
          {/* 통계 */}
          <HeroStats stats={stats} />
        </div>
      </div>
    </section>
  );
} 