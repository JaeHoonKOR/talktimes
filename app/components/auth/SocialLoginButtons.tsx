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

  // 소셜 로그인 아이콘 설정
  const socialIcons = [
    {
      provider: 'kakao',
      src: 'https://i.imgur.com/KvfL6lL.png',
      alt: 'Kakao',
      title: '카카오로 계속하기'
    },
    {
      provider: 'google',
      src: 'https://i.imgur.com/1K3MjDY.png',
      alt: 'Google',
      title: 'Google 로그인'
    },
    {
      provider: 'naver',
      src: 'https://i.imgur.com/XjKJcLA.png',
      alt: 'Naver',
      title: '네이버 로그인'
    }
  ];

  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">소셜 계정으로 계속하기</span>
        </div>
      </div>

      <div className="flex justify-center space-x-5 mb-6">
        {socialIcons.map(icon => (
          <button
            key={icon.provider}
            onClick={() => onSocialLogin(icon.provider)}
            className="p-2 rounded-full hover:bg-gray-50 transition duration-200"
            title={icon.title}
          >
            <Image
              src={icon.src}
              alt={icon.alt}
              width={40}
              height={40}
              className="object-contain w-auto h-[40px]"
              loading="lazy"
              quality={85}
              sizes="40px"
            />
          </button>
        ))}
      </div>
    </>
  );
} 