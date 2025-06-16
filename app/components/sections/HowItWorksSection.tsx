"use client";

import { cloneElement, useEffect, useState } from 'react';
import { NEWSLETTER_FEATURES, NEWS_SOURCES } from '../../constants/landing';
import { HowItWorksSectionProps } from '../../types/sections';
import NewsSourceIcon from '../NewsSourceIcon';

// 성능 로거 추가
const howItWorksLogger = {
  render: () => console.log(
    '%c[HowItWorks Section] 렌더링 시작', 
    'color: green; font-weight: bold; background: rgba(0,255,0,0.1); padding: 4px; border-radius: 4px;',
    `타임스탬프: ${new Date().toISOString()}`
  ),
  performance: (label: string, startTime: number) => {
    const duration = performance.now() - startTime;
    console.log(
      '%c[HowItWorks Section] 성능 측정', 
      'color: blue; font-weight: bold; background: rgba(0,0,255,0.1); padding: 4px; border-radius: 4px;',
      `${label}: ${duration.toFixed(2)}ms`
    );
  },
  renderDetails: (details: any) => console.log(
    '%c[HowItWorks Section] 렌더링 세부사항', 
    'color: purple; font-weight: bold; background: rgba(128,0,128,0.1); padding: 4px; border-radius: 4px;',
    details
  )
};

export default function HowItWorksSection({ 
  className = '', 
  id = 'how-it-works', 
  features = NEWSLETTER_FEATURES 
}: HowItWorksSectionProps) {
  const [renderStartTime] = useState(performance.now());

  useEffect(() => {
    howItWorksLogger.render();
    howItWorksLogger.performance('초기 렌더링', renderStartTime);
    howItWorksLogger.renderDetails({
      featureCount: features.length,
      newsSources: NEWS_SOURCES.length
    });
  }, []);

  const positions = [
    { top: '5%', left: '10%' },
    { top: '15%', right: '15%' },
    { top: '25%', left: '5%' },
    { top: '35%', right: '8%' },
    { top: '45%', left: '12%' },
    { top: '55%', right: '20%' },
    { top: '65%', left: '18%' },
    { top: '75%', right: '10%' },
    { top: '85%', left: '8%' },
    { top: '10%', left: '30%' },
    { top: '20%', right: '35%' },
    { top: '30%', left: '25%' },
    { top: '40%', right: '28%' },
    { top: '50%', left: '35%' },
    { top: '60%', right: '40%' },
    { top: '70%', left: '28%' },
    { top: '80%', right: '30%' },
    { top: '90%', left: '20%' },
    { top: '8%', left: '50%' },
    { top: '18%', right: '55%' },
    { top: '28%', left: '45%' },
    { top: '38%', right: '48%' },
    { top: '48%', left: '55%' },
    { top: '58%', right: '60%' },
    { top: '68%', left: '48%' },
    { top: '78%', right: '50%' },
    { top: '88%', left: '40%' },
    { top: '12%', left: '70%' },
    { top: '22%', right: '75%' },
    { top: '32%', left: '65%' },
    { top: '42%', right: '68%' },
    { top: '52%', left: '75%' },
    { top: '62%', right: '80%' },
    { top: '72%', left: '68%' },
    { top: '82%', right: '70%' },
    { top: '92%', left: '60%' },
    { top: '6%', left: '85%' },
    { top: '16%', right: '90%' },
    { top: '26%', left: '80%' },
    { top: '36%', right: '85%' },
  ];

  // 각 카드별 연결선 경로 정의
  const connectionPaths = [
    // 첫 번째 카드 (왼쪽에서 키워드 박스로)
    {
      path: "M 200 0 L 200 60 Q 200 75 220 90 L 280 130 Q 320 155 320 180 L 320 240 Q 320 265 300 280 L 280 295 Q 260 310 240 325 L 200 350 Q 180 365 200 380",
      points: [
        { x: 200, y: 60, color: "#60A5FA", label: "수집" },
        { x: 280, y: 130, color: "#A78BFA", label: "분석" },
        { x: 320, y: 240, color: "#34D399", label: "개인화" },
      ],
      labelPositions: [
        { top: "4rem", left: "-1.5rem" },
        { top: "8rem", left: "3rem" },
        { top: "15rem", left: "1rem" },
      ]
    },
    // 두 번째 카드 (중앙에서 키워드 박스로) - 연결선 강화
    {
      path: "M 200 0 L 200 60 L 200 90 L 200 180 L 200 210 L 200 300 L 200 330 L 200 370 L 200 380",
      points: [
        { x: 200, y: 60, color: "#60A5FA", label: "큐레이션" },
        { x: 200, y: 180, color: "#A78BFA", label: "생성" },
        { x: 200, y: 300, color: "#34D399", label: "배송" },
      ],
      labelPositions: [
        { top: "4rem", left: "-2.5rem" },
        { top: "11rem", left: "-1.5rem" },
        { top: "18rem", left: "-1.5rem" },
      ]
    },
    // 세 번째 카드 (오른쪽에서 키워드 박스로)
    {
      path: "M 200 0 L 200 60 Q 200 75 180 90 L 120 130 Q 80 155 80 180 L 80 240 Q 80 265 100 280 L 120 295 Q 140 310 160 325 L 200 350 Q 220 365 200 380",
      points: [
        { x: 200, y: 60, color: "#60A5FA", label: "학습" },
        { x: 120, y: 130, color: "#A78BFA", label: "피드백" },
        { x: 80, y: 240, color: "#34D399", label: "향상" },
      ],
      labelPositions: [
        { top: "4rem", left: "1.5rem" },
        { top: "8rem", left: "-4rem" },
        { top: "15rem", left: "-5rem" },
      ]
    }
  ];

  return (
    <section 
      id={id}
      className={`py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-visible ${className}`}
      aria-label="뉴스직송 서비스 작동 방식"
    >
      {/* 배경 뉴스 소스 아이콘들 */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {NEWS_SOURCES.map((source, index) => {
          const position = positions[index % positions.length];
          const size = 40 + (index % 3) * 10;
          const delay = (index * 0.2) % 10;
          
          return (
            <NewsSourceIcon
              key={source.name}
              source={source}
              position={position}
              size={size}
              delay={delay}
              index={index}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 섹션 헤더 */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 mb-6 elite-heading">
            어떻게 <span className="premium-text-gradient">작동하나요?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            50개 이상의 신뢰할 수 있는 뉴스 소스에서 AI가 당신만을 위한 뉴스를 선별합니다
          </p>
        </div>

        {/* 기능 카드들 */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* 백그라운드 파이프라인들 - 카드들보다 뒤에 배치 */}
          {features.map((feature, index) => (
            <div 
              key={`pipeline-${index}`}
              className="absolute top-full pointer-events-none"
              style={{ 
                left: `${(index * 33.333) + 16.666}%`,
                transform: 'translateX(-50%)',
                zIndex: index === 1 ? 1 : -1
              }}
            >
              <svg 
                width="400" 
                height="400" 
                viewBox="0 0 400 400" 
                className="absolute -left-48 top-0"
              >
                {/* 메인 연결선 */}
                <path
                  d={connectionPaths[index].path}
                  stroke={index === 1 ? "#A78BFA" : `url(#connectionGradient${index})`}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity={index === 1 ? "0.9" : "0.8"}
                />
                
                {/* 각 SVG별 고유한 그라데이션 정의 */}
                <defs>
                  <linearGradient id={`connectionGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                
                {/* 진행 표시점들 - 가운데 카드는 제외 */}
                {index !== 1 && connectionPaths[index].points.map((point, pointIndex) => (
                  <circle 
                    key={pointIndex}
                    cx={point.x} 
                    cy={point.y} 
                    r="4" 
                    fill={point.color} 
                    opacity="0.9"
                  />
                ))}
                
                {/* 가운데 연결선 디버깅용 추가 요소 - 크기 조정 */}
                {index === 1 && (
                  <>
                    <circle cx="200" cy="80" r="4" fill="#A78BFA" opacity="0.7" />
                    <circle cx="200" cy="200" r="4" fill="#A78BFA" opacity="0.7" />
                    <circle cx="200" cy="320" r="4" fill="#A78BFA" opacity="0.7" />
                  </>
                )}
              </svg>
              
              {/* 깔끔한 텍스트 라벨들 - 가운데 카드는 제외 */}
              {index !== 1 && connectionPaths[index].points.map((point, pointIndex) => (
                <div 
                  key={pointIndex}
                  className="absolute text-xs font-medium px-2 py-1 rounded-md bg-white shadow-sm border"
                  style={{
                    top: connectionPaths[index].labelPositions[pointIndex].top,
                    left: connectionPaths[index].labelPositions[pointIndex].left,
                    color: point.color,
                    borderColor: `${point.color}40`
                  }}
                >
                  {point.label}
                </div>
              ))}
            </div>
          ))}

          {/* 카드들 */}
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative z-10"
            >
              {/* 카드 */}
              <div className="relative z-10 elite-card p-8 rounded-2xl h-full group-hover:shadow-2xl transition-all duration-500 bg-white">
                {/* 아이콘 */}
                <div className="mb-6">
                  <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {cloneElement(feature.icon as any, { className: "w-8 h-8 text-white" })}
                  </div>
                  <div className="w-8 h-1 premium-gradient rounded-full"></div>
                </div>

                {/* 콘텐츠 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* 포인트 리스트 */}
                <ul className="space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 premium-gradient rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-blue-50 rounded-full text-blue-700 font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            설정은 단 3분, 매일 아침 자동 배송
          </div>
        </div>
      </div>
    </section>
  );
} 