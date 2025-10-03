"use client";

import { motion } from 'framer-motion';
import { NewsPreviewSectionProps } from '../../types/sections';
import NewsPreview from '../NewsPreview';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * NewsPreviewSection 컴포넌트
 * 
 * Apple Human Interface Guidelines 영감 디자인 원칙:
 * - 타이포그래피 중심 레이아웃
 * - 넉넉한 여백과 간격
 * - 절제된 색상 팔레트
 * - 명확한 시각적 계층 구조
 * - 부드러운 곡선과 자연스러운 그림자
 * - 네오모피즘 디자인 요소 적용
 */
export default function NewsPreviewSection({ 
  className = '', 
  id = 'preview',
  newsData,
  summaryData 
}: NewsPreviewSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section 
      ref={elementRef}
      id={id}
      className={`py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10 ${className} scroll-animate ${isVisible ? 'visible' : ''}`}
      aria-label="뉴스레터 미리보기"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 섹션 헤더 - 글래스모피즘 스타일 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            실제 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">뉴스레터</span> 미리보기
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            ✨ 매일 아침 받게 될 뉴스레터의 실제 모습을 확인해보세요. 
            깔끔하고 읽기 쉬운 형태로 정리된 맞춤형 뉴스를 경험하실 수 있습니다.
          </motion.p>
        </motion.div>

        {/* 뉴스레터 미리보기 - 모던 카드 스타일 */}
        <motion.div 
          className="neo-card glass-card p-6 md:p-8 lg:p-10 smooth-lift mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          whileHover={{ 
            y: -4,
            transition: { duration: 0.3 }
          }}
        >
          {/* 카드 내부 이미지 플레이스홀더 */}
          <div className="neon-placeholder h-24 mb-6 text-lg font-bold">
            📧 뉴스레터 미리보기 이미지
          </div>
          
          <NewsPreview initialNews={newsData || []} />
          
          {/* 3D 하이라이트 효과 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none" />
        </motion.div>

        {/* 미리보기 특징 - 모던 카드 그리드 */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            {
              icon: "⏰",
              iconBg: "from-blue-500 to-purple-600",
              title: "2분 읽기",
              description: "바쁜 아침, 딱 필요한 만큼만"
            },
            {
              icon: "🎯", 
              iconBg: "from-green-500 to-teal-600",
              title: "맞춤 큐레이션",
              description: "AI가 선별한 관심 뉴스만"
            },
            {
              icon: "📱",
              iconBg: "from-purple-500 to-pink-600", 
              title: "모바일 최적화",
              description: "언제 어디서나 편리하게"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center smooth-lift micro-bounce cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              {/* 아이콘 */}
              <motion.div 
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                whileHover={{ 
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {feature.icon}
              </motion.div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
              
              {/* 호버 시 나타나는 액션 표시기 */}
              <motion.div 
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
              </motion.div>
            </motion.div>
          ))
        </motion.div>
        
        {/* CTA 섹션 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.button
            className="modern-button px-10 py-4 text-lg font-bold gradient-animate ripple"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 지금 바로 체험하기
          </motion.button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            ✨ 무료로 시작하고 언제든 취소 가능
          </p>
        </motion.div>
      </div>
    </section>
  );
}