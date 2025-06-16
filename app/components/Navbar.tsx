'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F9FAFB]/30 dark:bg-[#1C1C1E]/30 backdrop-blur-lg border-b border-[#E5E7EB]/5 dark:border-[#3A3A3C]/5 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-transparent dark:from-black/60 dark:via-black/30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-black/20 animate-shimmer pointer-events-none"></div>
      <div className="relative w-full max-w-[calc(100vw-2rem)] lg:max-w-[calc(100vw-4rem)] mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 로고 - 프리미엄 디자인 */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/logos/mainlogo.png"
                alt="뉴스직송 로고"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </div>
          </Link>

          {/* 데스크톱 메뉴 - 트렌디한 스타일 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#personalization" className="relative text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563] font-medium transition-all duration-300 group">
              토픽 설정
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B5563] group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/#preview" className="relative text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563] font-medium transition-all duration-300 group">
              뉴스 미리보기
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4B5563] group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link href="/register" className="text-[#4B5563] font-semibold hover:text-[#121212] transition-colors">
                회원가입
              </Link>
              <Link href="/login" className="bg-[#9CA3AF] hover:bg-[#4B5563] px-6 py-2.5 rounded-full text-[#F0F0F0] font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300">
                로그인
              </Link>
            </div>
          </div>

          {/* 모바일 메뉴 버튼 - 트렌디한 햄버거 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1 group"
          >
            <span className={`w-6 h-0.5 bg-[#10B981] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#10B981] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#10B981] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* 모바일 메뉴 - 글래스모피즘 스타일 */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#FFFFFF]/95 dark:bg-[#181818]/95 backdrop-blur-xl border-b border-[#E5E7EB]/20 dark:border-[#3A3A3C]/20 shadow-xl">
            <div className="px-4 py-3 space-y-2">
              <Link 
                href="/#personalization" 
                className="block text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                토픽 설정
              </Link>
              <Link 
                href="/#preview" 
                className="block text-[#121212] dark:text-[#F0F0F0] hover:text-[#4B5563] font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                뉴스 미리보기
              </Link>
              <div className="border-t border-[#E5E7EB] dark:border-[#3A3A3C] pt-4 space-y-3">
                <Link 
                  href="/register" 
                  className="block text-[#4B5563] font-semibold hover:text-[#121212] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  회원가입
                </Link>
                <Link 
                  href="/login" 
                  className="block bg-[#9CA3AF] hover:bg-[#4B5563] px-6 py-3 rounded-full text-[#F0F0F0] font-semibold text-center shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
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