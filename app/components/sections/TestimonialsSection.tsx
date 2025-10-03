"use client";

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { StarIcon, UserIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  name: string;
  age: string;
  job: string;
  rating: number;
  content: string;
  highlight: string;
  profilePlaceholder: string;
}

const testimonials: Testimonial[] = [
  {
    name: "김○○",
    age: "28",
    job: "IT 개발자",
    rating: 5,
    content: "매일 아침 2분만 읽어도 하루 뉴스가 끝나요. 바쁜 직장인에게 딱 맞는 서비스입니다!",
    highlight: "2분만 읽어도 하루 뉴스가 끝나요",
    profilePlaceholder: "testimonial-user-1.jpg - 20-30대 남성 직장인 프로필 (IT업계, 신뢰감 있는 표정, 비즈니스캐주얼 복장)"
  },
  {
    name: "박○○",
    age: "34",
    job: "마케팅 매니저",
    rating: 5,
    content: "AI가 내 관심사에 맞춰 뉴스를 골라주니까 정말 편해요. 트렌드도 놓치지 않게 되었어요.",
    highlight: "AI가 내 관심사에 맞춰 뉴스를 골라주니까",
    profilePlaceholder: "testimonial-user-2.jpg - 30대 여성 직장인 프로필 (마케팅 전문가, 세련된 이미지, 스마트한 인상)"
  },
  {
    name: "이○○",
    age: "45",
    job: "의료진",
    rating: 5,
    content: "신뢰할 수 있는 뉴스 소스만 모아서 보여주니까 가짜뉴스 걱정이 없어요. 의료진에게 중요한 부분이죠.",
    highlight: "신뢰할 수 있는 뉴스 소스만 모아서",
    profilePlaceholder: "testimonial-user-3.jpg - 40대 여성 의료진 프로필 (전문가적 인상, 신뢰감 있는 표정, 화이트 계열 의료복)"
  },
  {
    name: "정○○",
    age: "29",
    job: "스타트업 대표",
    rating: 5,
    content: "경제, IT 뉴스를 빠르게 파악할 수 있어서 비즈니스 결정에 많은 도움이 되고 있어요.",
    highlight: "비즈니스 결정에 많은 도움이 되고 있어요",
    profilePlaceholder: "testimonial-user-4.jpg - 20대 후반 남성 창업가 프로필 (젊은 CEO 이미지, 자신감 있는 표정, 캐주얼 정장)"
  }
];

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <motion.article
      ref={elementRef}
      className="glass-card p-6 relative group hover:scale-[1.02] transition-all duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      aria-label={`${testimonial.name}님의 후기`}
    >
      {/* 별점 */}
      <div 
        className="flex items-center gap-1 mb-4"
        role="img" 
        aria-label={`평점 ${testimonial.rating}점 만점에 ${testimonial.rating}점`}
      >
        {[...Array(testimonial.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { 
              opacity: 1, 
              scale: 1,
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ 
              duration: 0.4, 
              delay: 0.3 + i * 0.05,
              rotate: { duration: 0.6, delay: 0.5 + i * 0.1 }
            }}
          >
            <StarIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" />
          </motion.div>
        ))}
      </div>

      {/* 후기 내용 */}
      <motion.blockquote 
        className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        "{testimonial.content}"
      </motion.blockquote>

      {/* 하이라이트 */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg mb-6 border-l-4 border-blue-400"
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
          💡 "{testimonial.highlight}"
        </p>
      </motion.div>

      {/* 사용자 정보 */}
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {/* 프로필 이미지 플레이스홀더 */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
            <UserIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </div>
          <div className="absolute inset-0 text-xs text-transparent opacity-0 hover:opacity-100 hover:text-gray-600 transition-opacity duration-300 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 p-1 text-center leading-none">
            {testimonial.profilePlaceholder}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}님
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.age}세 · {testimonial.job}
          </p>
        </div>
      </motion.div>

      {/* 호버 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  );
};

export default function TestimonialsSection() {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-white dark:bg-gray-900"
      aria-label="사용자 후기"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 섹션 헤더 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="testimonials-heading"
          >
            💬 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">실제 사용자</span> 후기
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            TalkTimes를 사용하고 계신 분들의 솔직한 이야기를 들어보세요
          </motion.p>
        </motion.div>

        {/* 후기 카드 그리드 */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          role="region"
          aria-labelledby="testimonials-heading"
          aria-label="사용자 후기 목록"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>

        {/* 더 많은 후기 CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="glass-card px-8 py-3 text-blue-600 dark:text-blue-400 font-semibold hover:scale-105 transition-transform duration-300"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            📄 더 많은 후기 보기
          </motion.button>
        </div>
      </div>
    </section>
  );
}