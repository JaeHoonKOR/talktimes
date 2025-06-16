import { SectionProps } from '../../types/sections';

export default function ContactSection({ className = '', id = 'contact' }: SectionProps) {
  return (
    <footer 
      id={id}
      className={`py-16 bg-gray-900 text-white ${className}`}
      aria-label="연락처 및 푸터 정보"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-black mb-4">
              <span className="premium-text-gradient">뉴스직송</span> JikSong
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI가 엄선한 맞춤형 뉴스를 매일 아침 전달하는 개인화 뉴스레터 서비스입니다. 
              광고 없는 깔끔한 디자인으로 정말 필요한 정보만 빠르게 확인하세요.
            </p>
            <div className="flex space-x-4">
              {/* 소셜 미디어 링크 (향후 추가) */}
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-lg font-bold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              {[
                { name: '서비스 소개', href: '#how-it-works' },
                { name: '개인화 설정', href: '#personalization' },
                { name: '뉴스레터 미리보기', href: '#preview' },
                { name: '가격 정보', href: '#pricing' }
              ].map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h4 className="text-lg font-bold mb-4">고객 지원</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@jiksong.com" 
                  className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@jiksong.com
                </a>
              </li>
              <li className="text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  평일 9:00 - 18:00
                </div>
              </li>
              <li className="text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  24시간 이내 답변
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* 저작권 */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 뉴스직송 JikSong. All rights reserved.
            </div>

            {/* 법적 링크 */}
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                개인정보처리방침
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                이용약관
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                구독 취소
              </a>
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-400">
            <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            SSL 보안 • GDPR 준수 • 스팸 없음 보장
          </div>
        </div>
      </div>
    </footer>
  );
} 