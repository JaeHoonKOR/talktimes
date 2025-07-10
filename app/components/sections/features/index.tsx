"use client";

import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import AICurationCard from './cards/AICurationCard';
import NewsIntegrationCard from './cards/NewsIntegrationCard';
import RealtimeNotificationCard from './cards/RealtimeNotificationCard';

interface NewFeaturesSectionProps {
  className?: string;
  id?: string;
}

export default function NewFeaturesSection({ 
  className = '', 
  id = 'features',
}: NewFeaturesSectionProps) {
  const features = [
    {
      visualContent: <AICurationCard />,
      title: "AI 큐레이션",
      description: "인공지능이 당신의 관심사를 분석하여 맞춤형 뉴스를 선별해드립니다."
    },
    {
      visualContent: <NewsIntegrationCard />,
      title: "뉴스 통합",
      description: "50개 이상의 신뢰할 수 있는 뉴스 소스를 통합하여 다양한 관점을 제공합니다."
    },
    {
      visualContent: <RealtimeNotificationCard />,
      title: "실시간 알림",
      description: "중요한 뉴스가 업데이트되면 즉시 알림을 받아보세요."
    }
  ];

  const handleCTAClick = () => {
    // 스크롤을 개인화 섹션으로 이동
    const personalizationSection = document.getElementById('personalization');
    if (personalizationSection) {
      personalizationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={id}
      className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}
      data-testid="features-section"
    >
      <div className="container mx-auto px-4">
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            혁신적인 기능들
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            최신 기술을 활용하여 뉴스 읽기 경험을 완전히 새롭게 만들어보세요
          </p>
        </motion.div>

        {/* 기능 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={`feature-${index}-${feature.title}`}
              visualContent={feature.visualContent}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* CTA 섹션 */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            지금 시작하기
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 