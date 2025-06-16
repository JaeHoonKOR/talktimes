import { NewsPreviewSectionProps } from '../../types/sections';
import NewsPreview from '../NewsPreview';

export default function NewsPreviewSection({ 
  className = '', 
  id = 'preview',
  newsData,
  summaryData 
}: NewsPreviewSectionProps) {
  return (
    <section 
      id={id}
      className={`py-24 bg-gradient-to-br from-gray-50 to-white ${className}`}
      aria-label="뉴스레터 미리보기"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-6 elite-heading">
            실제 <span className="premium-text-gradient">뉴스레터</span> 미리보기
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            매일 아침 받게 될 뉴스레터의 실제 모습을 확인해보세요. 
            깔끔하고 읽기 쉬운 형태로 정리된 맞춤형 뉴스를 경험하실 수 있습니다.
          </p>
        </div>

        {/* 뉴스레터 미리보기 */}
        <div className="max-w-6xl mx-auto">
          <NewsPreview initialNews={newsData || []} />
        </div>

        {/* 미리보기 특징 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: '2분 읽기',
              description: '바쁜 아침, 핵심만 빠르게'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: '검증된 소스',
              description: '신뢰할 수 있는 언론사만'
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: '모바일 최적화',
              description: '어디서든 편리하게'
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="text-center bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full text-indigo-700 font-medium shadow-md hover:shadow-lg transition-all duration-300">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            매일 아침 7시, 이런 뉴스레터가 도착합니다
          </div>
        </div>
      </div>
    </section>
  );
}