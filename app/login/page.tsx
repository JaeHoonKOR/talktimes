import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 메타데이터 설정
export const metadata: Metadata = {
  title: '로그인 - 뉴스직송 JikSend',
  description: '뉴스직송 JikSend 로그인 페이지입니다. 계정에 로그인하여 맞춤형 뉴스를 받아보세요.',
};

// 정적 페이지로 설정
export const pageConfig = 'force-static';

// 동적으로 로딩되는 컴포넌트
const LoginForm = dynamic(() => import('../components/auth/LoginForm'), {
  loading: () => <div className="p-6 text-center">로그인 폼 로딩 중...</div>,
});

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <LoginForm />
    </div>
  );
} 