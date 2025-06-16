import Link from 'next/link';
import { PricingSectionProps } from '../../types/sections';

export default function PricingSection({ className = '', id = 'pricing' }: PricingSectionProps) {
  return (
    <section 
      id={id}
      className={`py-24 bg-gradient-to-br from-blue-50 to-purple-50 ${className}`}
      aria-label="가격 정보"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-6 elite-heading">
            <span className="premium-text-gradient">평생 무료</span>로 시작하세요
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            광고 없는 깔끔한 뉴스레터를 평생 무료로 이용하세요. 
            숨겨진 비용이나 제한 사항은 전혀 없습니다.
          </p>
        </div>

        {/* 가격 카드 */}
        <div className="max-w-lg mx-auto">
          <div className="relative">
            {/* 인기 배지 */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
              <div className="premium-gradient px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                🎉 런칭 기념 평생 무료
              </div>
            </div>
            
            {/* 메인 카드 */}
            <div className="elite-card p-12 rounded-3xl bg-white text-center relative overflow-hidden">
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-32 h-32 premium-gradient rounded-full blur-3xl opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 premium-gradient rounded-full blur-2xl opacity-10"></div>
              
              <div className="relative z-10">
                {/* 가격 */}
                <div className="mb-8">
                  <div className="text-6xl font-black premium-text-gradient mb-2">무료</div>
                  <div className="text-gray-600">평생 이용 가능</div>
                  <div className="text-sm text-gray-500 line-through mt-1">월 9,900원 상당</div>
                </div>

                {/* 포함 기능 */}
                <div className="mb-10 text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 text-center">포함된 모든 기능</h3>
                  <ul className="space-y-4">
                    {[
                      '개인화된 뉴스 큐레이션',
                      'AI 기반 맞춤 추천',
                      '50+ 신뢰할 수 있는 뉴스 소스',
                      '광고 없는 깔끔한 디자인',
                      '모바일 최적화',
                      '매일 아침 자동 배송',
                      '키워드 필터링',
                      '3줄 요약 제공',
                      '언제든 구독 취소 가능'
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-6 h-6 premium-gradient rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA 버튼 */}
                <Link 
                  href="/register"
                  className="premium-button w-full py-4 rounded-2xl text-white font-bold text-lg shadow-2xl block text-center"
                >
                  지금 무료로 시작하기
                </Link>
                
                <p className="text-xs text-gray-500 mt-4">
                  신용카드 불필요 • 언제든 취소 가능
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 보장 */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: '개인정보 보호',
                description: '이메일 외 개인정보 수집 안함'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                ),
                title: '스팸 없음',
                description: '뉴스레터 외 마케팅 메일 발송 안함'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '100% 만족 보장',
                description: '만족하지 않으면 언제든 구독 취소'
              }
            ].map((guarantee, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                  {guarantee.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{guarantee.title}</h3>
                <p className="text-gray-600 text-sm">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ 미리보기 */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700 font-medium">궁금한 점이 있으신가요?</span>
          </div>
        </div>
      </div>
    </section>
  );
} 