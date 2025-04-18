import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// 메타데이터 설정
export const metadata: Metadata = {
  title: '회원가입 - 뉴스직송 JikSend',
  description: '뉴스직송 JikSend 회원가입 페이지입니다. 가입하고 맞춤형 뉴스를 받아보세요.',
};

// 동적으로 로딩되는 컴포넌트
const RegisterForm = dynamic(() => import('../components/auth/RegisterForm'), {
  loading: () => <div className="p-6 text-center">회원가입 폼 로딩 중...</div>,
});

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <RegisterForm />
    </div>
  );
} 