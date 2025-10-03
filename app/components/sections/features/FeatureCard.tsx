"use client";

import { motion } from 'framer-motion';
import GlassmorphicCard from '../../ui/GlassmorphicCard';

interface FeatureCardProps {
  visualContent: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ visualContent, title, description }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <GlassmorphicCard
        variant="medium"
        blur="lg"
        size="lg"
        interactive
        glow
        className="group relative overflow-hidden"
      >
        {/* 3D 시각적 콘텐츠 영역 */}
        <div className="flex items-center justify-center mb-6 relative">
          {/* 배경 장식 */}
          <div className="absolute inset-0 bg-gradient-to-br from-neumorphic-accent-primary/10 to-neumorphic-accent-secondary/10 rounded-neuro opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 시각적 콘텐츠 래퍼 */}
          <GlassmorphicCard variant="strong" blur="md" size="md" className="relative z-10">
            <div className="p-4">
              {visualContent}
            </div>
          </GlassmorphicCard>
        </div>
        
        {/* 텍스트 콘텐츠 */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-neumorphic-text-primary mb-4 group-hover:text-neumorphic-accent-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-neumorphic-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* 호버 효과 장식 */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <GlassmorphicCard variant="light" blur="sm" size="sm" className="p-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
          </GlassmorphicCard>
        </div>

        {/* 미묘한 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-neumorphic-primary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </GlassmorphicCard>
    </motion.div>
  );
} 