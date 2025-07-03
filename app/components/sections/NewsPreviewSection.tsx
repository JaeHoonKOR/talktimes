import { NewsPreviewSectionProps } from '../../types/sections';
import NewsPreview from '../NewsPreview';

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
  return (
    <section 
      id={id}
      className={`py-10 md:py-12 lg:py-16 bg-[#F9FAFB] ${className}`}
      aria-label="뉴스레터 미리보기"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 섹션 헤더 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-medium text-[#121212] mb-2">
            실제 <span className="text-[#3B82F6]">뉴스레터</span> 미리보기
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base">
            매일 아침 받게 될 뉴스레터의 실제 모습을 확인해보세요. 
            깔끔하고 읽기 쉬운 형태로 정리된 맞춤형 뉴스를 경험하실 수 있습니다.
          </p>
        </div>

        {/* 뉴스레터 미리보기 */}
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-[#E5E7EB] will-change-transform mb-6">
          <NewsPreview initialNews={newsData || []} />
        </div>

        {/* 미리보기 특징 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          {[
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: '2분 읽기',
              description: '바쁜 아침, 핵심만 빠르게'
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: '검증된 소스',
              description: '신뢰할 수 있는 언론사만'
            },
            {
              icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: '모바일 최적화',
              description: '어디서든 편리하게'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-3 border border-[#E5E7EB]"
            >
              <div className="flex flex-col items-center text-center space-y-1">
                <div className="w-7 h-7 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-1 text-[#3B82F6]">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-medium text-[#121212]">{feature.title}</h3>
                <p className="text-xs text-[#4B5563]">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg border border-[#E5E7EB] text-[#3B82F6] text-sm">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            매일 아침 7시, 이런 뉴스레터가 도착합니다
          </div>
        </div>
      </div>
    </section>
  );
}