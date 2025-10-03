'use client';

import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { TESTIMONIALS, TRUST_INDICATORS } from '../../constants/landing';
import { ServiceValueSectionProps } from '../../types/sections';

// GSAP 플러그인 등록
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingPlan = {
  name: "평생 무료 플랜",
  price: "무료",
  originalPrice: "월 9,900원 상당",
  features: [
    '개인화된 뉴스 큐레이션',
    'AI 기반 맞춤 추천',
    '50+ 신뢰할 수 있는 뉴스 소스',
    '광고 없는 깔끔한 디자인',
    '모바일 최적화',
    '매일 아침 자동 배송',
    '키워드 필터링',
    '3줄 요약 제공',
    '언제든 구독 취소 가능'
  ],
  isPopular: true
};

export default function ServiceValueSection({ 
  className = '', 
  id = 'service-value',
  testimonials = TESTIMONIALS,
  trustIndicators = TRUST_INDICATORS,
}: ServiceValueSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // 애니메이션 설정
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 가치 카드 애니메이션
    const cards = cardsRef.current?.querySelectorAll('.value-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // 가격 정보 애니메이션
    if (pricingRef.current) {
      gsap.fromTo(pricingRef.current,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: pricingRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // CTA 애니메이션
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, []);

  // 가치 카드 데이터
  const valueCards = [
    {
      title: "미니멀 디자인",
      description: "불필요한 요소 없이 깔끔하고 직관적인 사용자 경험",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "AI 큐레이션",
      description: "개인 관심사에 맞춘 정확한 뉴스 추천으로 정보 과부하 해소",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "시간 절약",
      description: "2분 만에 중요한 뉴스만 확인하고 하루를 효율적으로 시작",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id={id}
      className={`py-24 bg-gray-50 ${className}`}
      aria-label="서비스 가치 및 구독"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            왜 <span className="text-blue-600">뉴스직송</span>인가요?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            필요한 정보만 간결하게, 당신의 시간을 소중히 여기는 서비스입니다
          </p>
        </div>

        {/* 가치 카드 섹션 */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-20">
          {valueCards.map((card, index) => (
            <div 
              key={index} 
              className="value-card bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{ 
                boxShadow: '8px 8px 16px rgba(200, 200, 200, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)'
              }}
            >
              <div className="w-16 h-16 mb-6 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>

        {/* 가격 정보 슬라이더 */}
        <div ref={pricingRef} className="mb-20">
          <div 
            className="bg-white p-10 rounded-2xl max-w-2xl mx-auto relative"
            style={{ 
              boxShadow: '10px 10px 20px rgba(200, 200, 200, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.8)'
            }}
          >
            {/* 인기 배지 */}
            {pricingPlan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                  🎉 런칭 기념 평생 무료
                </div>
              </div>
            )}
            
            <div className="text-center mb-8 relative">
              <div className="text-5xl font-bold text-blue-600 mb-2">{pricingPlan.price}</div>
              <div className="text-gray-600">평생 이용 가능</div>
              {pricingPlan.originalPrice && (
                <div className="text-sm text-gray-500 line-through mt-1">{pricingPlan.originalPrice}</div>
              )}
            </div>

            <div className="space-y-4 mb-10">
              {pricingPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA 버튼 */}
            <div className="text-center space-y-4">
              {/* 주요 CTA */}
              <Link 
                href="/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl inline-block shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full"
              >
                <span className="flex items-center justify-center gap-2">
                  🚀 7일 무료 체험 시작하기
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              
              {/* 보조 CTA */}
              <Link 
                href="#news"
                className="px-6 py-3 bg-transparent border-2 border-gray-300 text-gray-700 font-medium rounded-xl inline-block hover:border-blue-500 hover:text-blue-600 transition-colors duration-300 w-full"
              >
                📰 뉴스레터 샘플 먼저 보기
              </Link>
              
              {/* 위험 감소 메시지 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-center gap-2 text-green-800 font-medium mb-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  100% 위험 부담 없음
                </div>
                <p className="text-sm text-green-700 text-center">
                  • 신용카드 불필요 • 자동 결제 없음 • 언제든 1클릭 취소<br/>
                  • 개인정보 완전 삭제 가능 • 스팸 메일 절대 없음
                </p>
              </div>
              
              {/* 사회적 증명 */}
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mt-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="font-medium">4.8/5.0</span>
                </div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="font-medium">12,847명이 이미 사용 중</div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div className="text-green-600 font-medium">지금 726명 온라인</div>
              </div>
            </div>
          </div>
        </div>

        {/* 통합 CTA 영역 */}
        <div ref={ctaRef} className="text-center mb-16">
          <motion.div 
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link 
              href="/register"
              className="px-12 py-5 bg-blue-600 text-white font-medium text-lg rounded-full inline-block shadow-lg hover:bg-blue-700 transition-colors duration-300"
              style={{ 
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -4px rgba(59, 130, 246, 0.3)'
              }}
            >
              무료로 시작하기
            </Link>
          </motion.div>
          <p className="text-gray-500 mt-4">신용카드 불필요 • 언제든 취소 가능</p>
        </div>

        {/* 사용자 증언/통계 */}
        <div>
          {/* 신뢰 지표 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {indicator.value}
                </div>
                <div className="text-sm text-gray-600">
                  {indicator.label}
                </div>
              </div>
            ))}
          </div>

          {/* 사용자 후기 */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl"
                style={{ 
                  boxShadow: '5px 5px 10px rgba(200, 200, 200, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.5)'
                }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{testimonial.name}</div>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* 보장 배지 */}
        <div className="mt-16 text-center">
          <div 
            className="inline-flex items-center px-8 py-4 bg-white rounded-2xl"
            style={{ 
              boxShadow: '5px 5px 10px rgba(200, 200, 200, 0.1), -5px -5px 10px rgba(255, 255, 255, 0.5)'
            }}
          >
            <svg className="w-8 h-8 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <div className="font-bold text-gray-900">100% 만족 보장</div>
              <div className="text-sm text-gray-600">언제든 구독 취소 가능</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
