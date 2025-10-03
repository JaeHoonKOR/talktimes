'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import NeumorphicCard from './ui/NeumorphicCard';
import NeumorphicButton from './ui/NeumorphicButton';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neumorphic-primary p-2">
      <NeumorphicCard 
        variant="elevated" 
        className="w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-4rem)] mx-auto"
      >
        <div className="flex justify-between items-center h-16 px-4">
          {/* 로고 - Neumorphic 디자인 */}
          <Link href="/" className="flex items-center group" aria-label="뉴스직송 홈페이지로 이동">
            <NeumorphicCard variant="floating" size="sm" className="p-2">
              <Image
                src="/logos/mainlogo.png"
                alt="뉴스직송 로고"
                width={48}
                height={48}
                className="w-12 h-12"
                priority
              />
            </NeumorphicCard>
          </Link>

          {/* 데스크톱 중 - Neumorphic 스타일 */}
          <div className="hidden md:flex items-center space-x-4">
            <NeumorphicButton
              variant={isActiveLink('/#personalization') ? 'accent' : 'ghost'}
              size="sm"
              className="font-medium"
            >
              <Link href="/#personalization">
                관심 주제 설정
              </Link>
            </NeumorphicButton>
            <NeumorphicButton
              variant={isActiveLink('/#preview') ? 'accent' : 'ghost'}
              size="sm"
              className="font-medium"
            >
              <Link href="/#preview">
                뉴스 미리보기
              </Link>
            </NeumorphicButton>
            
            <div className="flex items-center space-x-3">
              <ThemeToggle />
              <NeumorphicButton
                variant={isActiveLink('/register') ? 'primary' : 'secondary'}
                size="sm"
                className="font-medium"
              >
                <Link href="/register">
                  회원가입
                </Link>
              </NeumorphicButton>
              <NeumorphicButton
                variant="accent"
                size="sm"
                className="font-semibold"
              >
                <Link href="/login">
                  로그인
                </Link>
              </NeumorphicButton>
            </div>
          </div>

          {/* 모바일 메뉴 버튼 - Neumorphic 스타일 */}
          <NeumorphicCard
            variant="default"
            size="sm"
            interactive
            pressed={isMenuOpen}
            className="md:hidden w-12 h-12 flex justify-center items-center cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col justify-center items-center">
              <span className={`w-6 h-0.5 bg-neumorphic-text-primary transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-neumorphic-text-primary transition-all duration-200 mt-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-neumorphic-text-primary transition-all duration-200 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </NeumorphicCard>
        </div>

        {/* 모바일 메뉴 - Neumorphic 스타일 */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2"
            role="menu"
          >
            <NeumorphicCard variant="elevated" className="overflow-hidden">
              <div className="px-4 py-3 space-y-3">
                <NeumorphicButton
                  variant={isActiveLink('/#personalization') ? 'accent' : 'secondary'}
                  className="w-full justify-start font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/#personalization" className="flex items-center w-full">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    관심 주제 설정
                  </Link>
                </NeumorphicButton>
                <NeumorphicButton
                  variant={isActiveLink('/#preview') ? 'accent' : 'secondary'}
                  className="w-full justify-start font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/#preview" className="flex items-center w-full">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    뉴스 미리보기
                  </Link>
                </NeumorphicButton>
                
                <div className="pt-4 space-y-3 border-t border-neumorphic-shadow-dark/20">
                  <NeumorphicButton
                    variant={isActiveLink('/register') ? 'primary' : 'secondary'}
                    className="w-full justify-start font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/register" className="flex items-center w-full">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      회원가입
                    </Link>
                  </NeumorphicButton>
                  <NeumorphicButton
                    variant="accent"
                    className="w-full justify-center font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login" className="flex items-center w-full justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      로그인
                    </Link>
                  </NeumorphicButton>
                </div>
              </div>
            </NeumorphicCard>
          </div>
        )}
      </NeumorphicCard>
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