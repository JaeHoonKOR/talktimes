'use client';

import Image from 'next/image';
import { useEffect } from 'react';

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: string) => void;
}

export default function SocialLoginButtons({ onSocialLogin }: SocialLoginButtonsProps) {
  useEffect(() => {
    // Kakao SDK 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js';
    script.integrity = 'sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8';
    script.crossOrigin = 'anonymous';
    script.async = true;
    
    script.onload = () => {
      console.log('Kakao SDK 로드 완료');
      if (!window.Kakao?.isInitialized()) {
        console.log('Kakao SDK 초기화 시도...');
        window.Kakao?.init('cfa49dd10296c802acf50222cbe9af7e');
        console.log('Kakao SDK 초기화 완료:', window.Kakao?.isInitialized());
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="my-8">
      {/* 구분선 */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200/50"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-6 glass-morphism rounded-full text-gray-600 font-medium">또는 간편하게</span>
        </div>
      </div>

      {/* 소셜 로그인 버튼들 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 카카오 */}
        <button
          onClick={() => onSocialLogin('kakao')}
          className="group relative flex justify-center items-center w-full h-14 glass-morphism rounded-xl hover:scale-105 transition-all duration-300 border border-yellow-200/30 hover:border-yellow-300/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src="/logos/kakaotalk.png"
            alt="Kakao"
            width={24}
            height={24}
            className="w-6 h-6 relative z-10"
          />
          <span className="ml-2 text-xs font-medium text-gray-700 relative z-10">카카오</span>
        </button>

        {/* 구글 */}
        <button
          onClick={() => onSocialLogin('google')}
          className="group relative flex justify-center items-center w-full h-14 glass-morphism rounded-xl hover:scale-105 transition-all duration-300 border border-gray-200/30 hover:border-gray-300/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-red-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src="/logos/google.png"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5 relative z-10"
          />
          <span className="ml-2 text-xs font-medium text-gray-700 relative z-10">구글</span>
        </button>

        {/* 네이버 */}
        <button
          onClick={() => onSocialLogin('naver')}
          className="group relative flex justify-center items-center w-full h-14 glass-morphism rounded-xl hover:scale-105 transition-all duration-300 border border-green-200/30 hover:border-green-300/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src="/logos/naver.png"
            alt="Naver"
            width={20}
            height={20}
            className="w-5 h-5 relative z-10"
          />
          <span className="ml-2 text-xs font-medium text-gray-700 relative z-10">네이버</span>
        </button>
      </div>

      {/* 추가 정보 */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          소셜 로그인으로 빠르게 시작하세요 • 별도 가입 없이 바로 이용
        </p>
      </div>
    </div>
  );
} 