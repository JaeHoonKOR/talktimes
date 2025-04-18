'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { login } from '../../api/auth';
import { isValidEmail } from '../../utils/validation';

// 소셜 로그인 버튼을 동적으로 임포트
const SocialLoginButtons = dynamic(() => import('./SocialLoginButtons'), {
  ssr: true
});

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};
    
    // 이메일 검증
    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!isValidEmail(email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.';
    }
    
    // 비밀번호 검증
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setIsSuccess(true);
        // 폼 초기화
        setEmail('');
        setPassword('');
        
        // 로그인 성공 후 메인 페이지로 리다이렉트 (실제 구현에서는 상태 관리 라이브러리에 사용자 정보 저장 필요)
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        setErrors({ general: result.message || '로그인 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      console.error('로그인 오류:', error);
      setErrors({ general: '서버와 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'kakao') {
      console.log('카카오 로그인 시도...');
      if (!window.Kakao) {
        console.error('Kakao SDK를 찾을 수 없습니다.');
        return;
      }
      if (!window.Kakao.isInitialized()) {
        console.error('Kakao SDK가 초기화되지 않았습니다.');
        return;
      }
      try {
        window.Kakao.Auth.authorize({
          redirectUri: 'http://localhost:4000/api/auth/kakao/callback',
        });
      } catch (error) {
        console.error('카카오 로그인 에러:', error);
      }
    } else if (provider === 'google') {
      console.log('구글 로그인 시도...');
      window.location.href = 'http://localhost:4000/api/auth/google';
    } else {
      console.log(`${provider} 로그인 시도`);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-md p-6 mt-8 text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">로그인 성공!</h3>
        <p className="text-green-700 mb-4">메인 페이지로 이동합니다...</p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-4 pb-6 px-6 rounded-xl shadow-sm w-full max-w-[420px] mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">로그인</h2>
      
      {errors.general && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg mb-4" role="alert">
          {errors.general}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1.5">
            이메일
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1.5">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            disabled={isLoading}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 mt-4 font-medium"
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
      
      {/* 소셜 로그인 버튼 */}
      <SocialLoginButtons onSocialLogin={handleSocialLogin} />
      
      <p className="text-sm text-gray-600 text-center">
        계정이 없으신가요?{' '}
        <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
          회원가입하기
        </Link>
      </p>
    </div>
  );
} 