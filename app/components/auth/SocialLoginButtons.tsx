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
    <div className="my-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">간편 로그인</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 justify-items-center max-w-[240px] mx-auto">
        <button
          onClick={() => onSocialLogin('kakao')}
          className="flex justify-center items-center w-12 h-12 rounded-full bg-[#FEE500] hover:bg-[#FEE500]/90 transition-colors"
        >
          <Image
            src="/logos/kakaotalk.png"
            alt="Kakao"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </button>

        <button
          onClick={() => onSocialLogin('google')}
          className="flex justify-center items-center w-12 h-12 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/logos/google.png"
            alt="Google"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </button>

        <button
          onClick={() => onSocialLogin('naver')}
          className="flex justify-center items-center w-12 h-12 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/logos/naver.png"
            alt="Naver"
            width={48}
            height={48}
            className="w-12 h-12"
          />
        </button>
      </div>
    </div>
  );
} 