import { TESTIMONIALS, TRUST_INDICATORS } from '../../constants/landing';
import { SectionProps } from '../../types/sections';

export default function ValuePropositionSection({ className = '', id = 'value' }: SectionProps) {
  return (
    <section 
      id={id}
      className={`py-24 bg-white ${className}`}
      aria-label="서비스 가치 제안"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 mb-6 elite-heading">
            왜 <span className="premium-text-gradient">뉴스직송</span>인가요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            기존 뉴스 앱의 불편함을 해결하고, 정말 필요한 정보만 전달하는 것이 우리의 목표입니다.
          </p>
        </div>

        {/* 비교 테이블 */}
        <div className="mb-20">
          <div className="elite-card rounded-3xl p-8 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-left py-4 px-6 font-bold text-gray-900">기능</th>
                    <th className="text-center py-4 px-6 font-bold text-red-600">기존 뉴스앱</th>
                    <th className="text-center py-4 px-6 font-bold premium-text-gradient">뉴스직송</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      feature: '광고',
                      existing: '많음 😵',
                      ours: '없음 ✨'
                    },
                    {
                      feature: '개인화',
                      existing: '부정확 😐',
                      ours: 'AI 맞춤 🎯'
                    },
                    {
                      feature: '읽기 시간',
                      existing: '30분+ ⏰',
                      ours: '2분 ⚡'
                    },
                    {
                      feature: '중복 기사',
                      existing: '많음 🔄',
                      ours: '자동 제거 🎯'
                    },
                    {
                      feature: '가격',
                      existing: '유료 💰',
                      ours: '평생 무료 🎁'
                    }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-gray-600">{row.existing}</td>
                      <td className="py-4 px-6 text-center font-medium text-blue-600">{row.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 사용자 후기 */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            실제 사용자 <span className="premium-text-gradient">후기</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="elite-card p-8 rounded-2xl bg-white">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 premium-gradient rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
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

        {/* 신뢰 지표 */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            <span className="premium-text-gradient">1,000+</span> 사용자가 선택한 이유
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TRUST_INDICATORS.map((indicator, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black premium-text-gradient mb-2">
                  {indicator.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {indicator.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 보장 배지 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
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