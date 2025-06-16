import Link from 'next/link';
import { CTASectionProps } from '../../types/sections';

export default function CTASection({ className = '', id = 'cta' }: CTASectionProps) {
  return (
    <section 
      id={id}
      className={`py-24 dark-premium-gradient text-white relative overflow-hidden ${className}`}
      aria-label="행동 유도"
    >
      {/* 배경 효과 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 premium-gradient rounded-full blur-3xl opacity-30 animate-subtle-float"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 premium-gradient rounded-full blur-3xl opacity-30 animate-subtle-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* 메인 헤딩 */}
          <h2 className="text-5xl md:text-6xl font-black mb-8 elite-heading">
            지금 바로 <span className="premium-text-gradient">시작하세요</span>
          </h2>
          
          {/* 서브 텍스트 */}
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            매일 아침 7시, 당신만을 위한 뉴스가 도착합니다.<br />
            <span className="font-bold">설정 3분, 평생 무료</span>
          </p>

          {/* 긴급성 메시지 */}
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 rounded-full backdrop-blur-sm">
              <svg className="w-5 h-5 mr-2 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-white font-medium">런칭 기념 평생 무료 혜택 - 선착순 1,000명</span>
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/register"
              className="premium-button px-12 py-5 rounded-full text-white font-bold text-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                무료로 시작하기
              </span>
            </Link>
            
            <Link 
              href="#preview"
              className="px-12 py-5 rounded-full border-2 border-white/50 bg-white/20 text-white font-bold text-xl hover:bg-white/30 hover:border-white/70 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                샘플 먼저 보기
              </span>
            </Link>
          </div>

          {/* 신뢰 지표 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '1,000+', label: '만족한 사용자' },
              { value: '4.9★', label: '평점' },
              { value: '0원', label: '평생 무료' },
              { value: '2분', label: '읽기 시간' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-black premium-text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* 보장 메시지 */}
          <div className="mt-16">
            <div className="inline-flex items-center px-8 py-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-left">
                <div className="font-bold text-white">100% 만족 보장</div>
                <div className="text-sm text-white/80">신용카드 불필요 • 언제든 구독 취소 가능</div>
              </div>
            </div>
          </div>

          {/* 소셜 프루프 */}
          <div className="mt-12">
            <p className="text-white/60 text-sm mb-4">이미 많은 분들이 뉴스직송과 함께하고 있습니다</p>
            <div className="flex justify-center items-center space-x-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-10 h-10 premium-gradient rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {String.fromCharCode(65 + (i % 26))}
                </div>
              ))}
              <div className="text-white/60 ml-4">+988명 더</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 