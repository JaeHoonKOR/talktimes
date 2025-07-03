'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // 현재 활성화된 링크인지 확인하는 함수
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.includes(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F9FAFB]/30 dark:bg-[#1C1C1E]/30 backdrop-blur-lg border-b border-[#E5E7EB]/5 dark:border-[#3A3A3C]/5 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-transparent dark:from-black/60 dark:via-black/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-black/20 animate-shimmer pointer-events-none"></div>
      <div className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-4rem)] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 - 프리미엄 디자인 */}
          <Link href="/" className="flex items-center group" aria-label="뉴스직송 홈페이지로 이동">
            <div className="relative">
              <Image
                src="/logos/mainlogo.png"
                alt="뉴스직송 로고"
                width={48}
                height={48}
                className="w-12 h-12"
                priority
              />
            </div>
          </Link>

          {/* 데스크톱 메뉴 - 트렌디한 스타일 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/#personalization" 
              className={`relative text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563] font-medium transition-all duration-300 group py-2 px-3 ${
                isActiveLink('/#personalization') ? 'text-[#3B82F6]' : ''
              }`}
              aria-current={isActiveLink('/#personalization') ? 'page' : undefined}
            >
              관심 주제 설정
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#3B82F6] transition-all duration-300 ${
                isActiveLink('/#personalization') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              href="/#preview" 
              className={`relative text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563] font-medium transition-all duration-300 group py-2 px-3 ${
                isActiveLink('/#preview') ? 'text-[#3B82F6]' : ''
              }`}
              aria-current={isActiveLink('/#preview') ? 'page' : undefined}
            >
              뉴스 미리보기
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#3B82F6] transition-all duration-300 ${
                isActiveLink('/#preview') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link 
                href="/register" 
                className={`text-[#4B5563] font-semibold hover:text-[#121212] transition-colors py-2 px-3 ${
                  isActiveLink('/register') ? 'text-[#3B82F6]' : ''
                }`}
                aria-current={isActiveLink('/register') ? 'page' : undefined}
              >
                회원가입
              </Link>
              <Link 
                href="/login" 
                className={`bg-[#9CA3AF] hover:bg-[#4B5563] px-6 py-2.5 rounded-full text-[#F0F0F0] font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 ${
                  isActiveLink('/login') ? 'bg-[#3B82F6]' : ''
                }`}
                aria-current={isActiveLink('/login') ? 'page' : undefined}
              >
                로그인
              </Link>
            </div>
          </div>

          {/* 모바일 메뉴 버튼 - 터치 영역 최적화 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-12 h-12 flex flex-col justify-center items-center"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-12 h-12 absolute inset-0"></div>
            <span className={`w-6 h-0.5 bg-[#10B981] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#10B981] transition-all duration-300 mt-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#10B981] transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* 모바일 메뉴 - 글래스모피즘 스타일 */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 bg-[#FFFFFF]/95 dark:bg-[#181818]/95 backdrop-blur-xl border-b border-[#E5E7EB]/20 dark:border-[#3A3A3C]/20 shadow-xl"
            role="menu"
          >
            <div className="px-4 py-3 space-y-2">
              <Link 
                href="/#personalization" 
                className={`block font-medium transition-colors py-4 px-3 min-h-[44px] flex items-center ${
                  isActiveLink('/#personalization') 
                    ? 'text-[#3B82F6] bg-[#EBF5FF]/50 rounded-md' 
                    : 'text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563]'
                }`}
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                aria-current={isActiveLink('/#personalization') ? 'page' : undefined}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                관심 주제 설정
              </Link>
              <Link 
                href="/#preview" 
                className={`block font-medium transition-colors py-4 px-3 min-h-[44px] flex items-center ${
                  isActiveLink('/#preview') 
                    ? 'text-[#3B82F6] bg-[#EBF5FF]/50 rounded-md' 
                    : 'text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563]'
                }`}
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
                aria-current={isActiveLink('/#preview') ? 'page' : undefined}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                뉴스 미리보기
              </Link>
              <div className="border-t border-[#E5E7EB] dark:border-[#3A3A3C] pt-4 space-y-3">
                <Link 
                  href="/register" 
                  className={`block font-semibold transition-colors py-4 px-3 min-h-[44px] flex items-center ${
                    isActiveLink('/register') 
                      ? 'text-[#3B82F6] bg-[#EBF5FF]/50 rounded-md' 
                      : 'text-[#4B5563] hover:text-[#121212]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                  aria-current={isActiveLink('/register') ? 'page' : undefined}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  회원가입
                </Link>
                <Link 
                  href="/login" 
                  className={`block bg-[#9CA3AF] hover:bg-[#4B5563] px-6 py-4 rounded-full text-[#F0F0F0] font-semibold text-center shadow-lg min-h-[44px] flex items-center justify-center ${
                    isActiveLink('/login') ? 'bg-[#3B82F6]' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  role="menuitem"
                  aria-current={isActiveLink('/login') ? 'page' : undefined}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  로그인
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 

const shimmerAnimation = `
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 8s infinite linear;
}
`;

<style jsx global>{shimmerAnimation}</style> 