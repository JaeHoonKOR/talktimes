'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/" className="text-xl font-bold text-indigo-600">
            뉴스직송
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#topics" className="text-gray-700 hover:text-indigo-600">
              토픽
            </Link>
            <Link href="/#preview" className="text-gray-700 hover:text-indigo-600">
              미리보기
            </Link>
            <Link href="/register" className="text-indigo-600 font-medium hover:text-indigo-700">
              회원가입
            </Link>
            <Link href="/login" className="bg-indigo-600 text-white font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              로그인
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-4">
            <Link 
              href="/#topics" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-indigo-600"
            >
              토픽
            </Link>
            <Link 
              href="/#preview" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-indigo-600"
            >
              미리보기
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-indigo-600 font-medium"
            >
              회원가입
            </Link>
            <Link 
              href="/login" 
              onClick={() => setIsMenuOpen(false)}
              className="block py-2 text-white bg-indigo-600 font-medium px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              로그인
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
} 