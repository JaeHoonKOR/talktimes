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
      <div className="glass-morphism border border-green-200/50 rounded-2xl p-8 mt-8 text-center animate-elegant-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold elite-heading premium-text-gradient mb-3">로그인 성공!</h3>
        <p className="text-[#4B5563] dark:text-[#9CA3AF] premium-subtitle">메인 페이지로 이동합니다...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#1C1C1E] flex items-center justify-center p-4">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 premium-gradient rounded-full blur-3xl opacity-20 animate-subtle-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 premium-gradient rounded-full blur-3xl opacity-20 animate-subtle-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* 메인 로그인 카드 */}
        <div className="dark-elite-card glass-morphism rounded-3xl p-8 shadow-2xl border border-white/20 animate-elegant-fade-in">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-premium-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h2 className="text-3xl font-black elite-heading premium-text-gradient mb-2">환영합니다</h2>
            <p className="text-[#4B5563] dark:text-[#9CA3AF] premium-subtitle">뉴스직송 계정으로 로그인하세요</p>
          </div>
          
          {errors.general && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-4 py-3 rounded-xl mb-6 animate-shake" role="alert">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.general}
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 입력 */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                이메일 주소
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </p>}
            </div>
            
            {/* 비밀번호 입력 */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.password && <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password}
              </p>}
            </div>
            
            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full premium-button py-4 px-6 rounded-xl text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  로그인 중...
                </div>
              ) : (
                '로그인'
              )}
            </button>
          </form>
          
          {/* 소셜 로그인 버튼 */}
          <SocialLoginButtons onSocialLogin={handleSocialLogin} />
          
          {/* 회원가입 링크 */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 premium-subtitle">
              계정이 없으신가요?{' '}
              <Link href="/register" className="premium-text-gradient font-bold hover:underline transition-all duration-300">
                회원가입하기
              </Link>
            </p>
          </div>
        </div>

        {/* 추가 정보 카드 */}
        <div className="mt-6 text-center">
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                안전한 로그인
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
                개인정보 보호
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 