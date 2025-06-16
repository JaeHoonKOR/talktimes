'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { signup } from '../../api/auth';
import { isValidEmail, isValidPassword } from '../../utils/validation';

// 소셜 로그인 버튼을 동적으로 임포트
const SocialLoginButtons = dynamic(() => import('./SocialLoginButtons'), {
  ssr: true
});

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
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
    } else if (!isValidPassword(password)) {
      newErrors.password = '비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.';
    }
    
    // 비밀번호 확인 검증
    if (!confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
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
      const result = await signup(email, password);
      
      if (result.success) {
        setIsSuccess(true);
        // 폼 초기화
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // 회원가입 성공 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setErrors({ general: result.message || '회원가입 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      setErrors({ general: '서버와 통신 중 오류가 발생했습니다. 나중에 다시 시도해주세요.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (provider === 'kakao') {
      console.log('카카오 회원가입 시도...');
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
      console.log('구글 회원가입 시도...');
      window.location.href = 'http://localhost:4000/api/auth/google';
    } else {
      console.log(`${provider} 회원가입 시도`);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#1C1C1E] flex items-center justify-center p-4">
        <div className="glass-morphism border border-[#10B981]/20 rounded-3xl p-12 text-center animate-elegant-fade-in max-w-md w-full">
          <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-black elite-heading premium-text-gradient mb-4">가입 완료!</h3>
          <p className="text-[#4B5563] dark:text-[#9CA3AF] premium-subtitle mb-6">환영합니다! 로그인 페이지로 이동합니다...</p>
          <div className="w-full bg-[#CBD5E1] rounded-full h-2">
            <div className="premium-gradient h-2 rounded-full animate-loading-bar"></div>
          </div>
        </div>
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
        {/* 메인 회원가입 카드 */}
        <div className="dark-elite-card glass-morphism rounded-3xl p-8 shadow-2xl border border-white/20 animate-elegant-fade-in">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-premium-glow">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black elite-heading premium-text-gradient mb-2">함께 시작해요</h2>
            <p className="text-[#4B5563] dark:text-[#9CA3AF] premium-subtitle">뉴스직송 계정을 만들어보세요</p>
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
              <div className="mt-2 glass-morphism rounded-lg p-3 border border-blue-200/30">
                <p className="text-xs text-gray-600 flex items-center">
                  <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  8자 이상, 영문·숫자·특수문자 포함
                </p>
              </div>
            </div>
            
            {/* 비밀번호 확인 */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.confirmPassword}
              </p>}
            </div>
            
            {/* 회원가입 버튼 */}
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
                  가입 처리 중...
                </div>
              ) : (
                '🚀 지금 시작하기'
              )}
            </button>
          </form>
          
          {/* 소셜 회원가입 */}
          <SocialLoginButtons onSocialLogin={handleSocialLogin} />
          
          {/* 로그인 링크 */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 premium-subtitle">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="premium-text-gradient font-bold hover:underline transition-all duration-300">
                로그인하기
              </Link>
            </p>
          </div>
        </div>

        {/* 혜택 미리보기 카드 */}
        <div className="mt-6">
          <div className="glass-morphism rounded-2xl p-6 border border-white/20">
            <h3 className="font-bold text-center mb-4 premium-text-gradient">🎁 가입 즉시 혜택</h3>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                평생 무료 프리미엄 기능
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                내일 아침 첫 번째 맞춤 뉴스
              </div>
              <div className="flex items-center text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                광고 없는 깔끔한 뉴스레터
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 