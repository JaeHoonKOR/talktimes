"use client";

import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { Keyword } from '../../types';
import { SectionProps } from '../../types/sections';
import KeywordManager from '../KeywordManager';
import PersonalizedNewsSection from '../PersonalizedNewsSection';

/**
 * PersonalizationSection 컴포넌트
 * 
 * 데이터 흐름 검증:
 * 1. 상태 관리:
 *    - showNewsSection: KeywordManager와 PersonalizedNewsSection 간 전환 제어
 *    - selectedKeywords: 선택된 키워드 목록 저장
 *
 * 2. KeywordManager와의 통신:
 *    - onSettingsComplete 콜백 필수: 키워드 설정 완료 시 호출됨
 *    - 이 콜백이 누락되면 "맞춤형 뉴스 받기 시작하기" 버튼이 작동하지 않음
 *
 * 3. PersonalizedNewsSection으로 데이터 전달:
 *    - initialKeywords prop: 선택된 키워드 목록 전달
 *    - 이 prop을 통해 PersonalizedNewsSection이 자동으로 뉴스 조회 시작
 *
 * 4. 조건부 렌더링:
 *    - showNewsSection 상태에 따라 적절한 컴포넌트 표시
 *    - 뉴스 섹션 표시 중에는 하단 혜택 컴포넌트들 숨김 처리
 */
const PersonalizationSection = memo(({ className = '', id = 'personalization' }: SectionProps) => {
  const [showNewsSection, setShowNewsSection] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);

  // 키워드 설정 완료 처리
  const handleSettingsComplete = (keywords: Keyword[]) => {
    setSelectedKeywords(keywords);
    setShowNewsSection(true);
  };

  // 애니메이션 변수
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id={id}
      className={`py-20 bg-[#F9FAFB] dark:bg-[#1C1C1E] w-full ${className}`}
      aria-label="개인화 설정"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#121212] dark:text-[#F0F0F0] mb-4">
            당신만의 <span className="text-[#3B82F6]">뉴스 취향</span> 설정
          </h2>
          <p className="text-lg text-[#4B5563] dark:text-[#9CA3AF] max-w-2xl mx-auto">
            관심 키워드를 선택하면 AI가 맞춤형 뉴스를 추천해드립니다
          </p>
        </motion.div>

        {/* 키워드 매니저 또는 맞춤형 뉴스 섹션 */}
        <div className="max-w-4xl mx-auto bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-xl shadow-none border-none p-6 mb-12">
          {showNewsSection ? (
            <PersonalizedNewsSection initialKeywords={selectedKeywords} />
          ) : (
            <KeywordManager onSettingsComplete={handleSettingsComplete} />
          )}
        </div>

        {/* 개인화 혜택 (뉴스 섹션이 표시되지 않을 때만 표시) */}
        {!showNewsSection && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  ),
                  title: '스마트 학습',
                  description: '읽은 기사를 분석해 취향을 파악합니다'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: '실시간 업데이트',
                  description: '트렌드 변화에 맞춰 추천이 진화합니다'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z" />
                    </svg>
                  ),
                  title: '중복 제거',
                  description: '같은 내용의 기사는 자동으로 필터링'
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: '빠른 요약',
                  description: '핵심만 골라 3줄로 요약해드립니다'
                }
              ].map((benefit, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  className="bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-lg p-5 shadow-none border-none"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#F9FAFB] dark:bg-[#1C1C1E] p-3 rounded-lg text-[#3B82F6]">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[#121212] dark:text-[#F0F0F0] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 개인화 통계 */}
            <motion.div 
              className="mt-12 flex justify-center"
              variants={itemVariants}
            >
              <div className="grid grid-cols-3 gap-6 md:gap-12 bg-[#F9FAFB] dark:bg-[#2C2C2E] rounded-xl p-6 shadow-none border-none">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3B82F6]">95%</div>
                  <div className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">정확도</div>
                </div>
                <div className="text-center border-x-0 px-6">
                  <div className="text-2xl font-bold text-[#3B82F6]">2분</div>
                  <div className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">읽기 시간</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3B82F6]">매일</div>
                  <div className="text-sm text-[#4B5563] dark:text-[#9CA3AF]">자동 배송</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
});

PersonalizationSection.displayName = 'PersonalizationSection';

export default PersonalizationSection; 