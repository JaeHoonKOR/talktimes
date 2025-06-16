import type { Metadata } from 'next';
import LoginForm from '../components/auth/LoginForm';

// 메타데이터 설정
export const metadata: Metadata = {
  title: '로그인 - 뉴스직송 JikSong | AI 맞춤형 뉴스 큐레이션',
  description: '뉴스직송 JikSong 계정으로 로그인하여 AI가 엄선한 맞춤형 뉴스를 받아보세요. 안전하고 빠른 로그인.',
  openGraph: {
    title: '로그인 - 뉴스직송 JikSong',
    description: '뉴스직송 JikSong 계정으로 로그인하여 AI가 엄선한 맞춤형 뉴스를 받아보세요.',
  },
};

export default function LoginPage() {
  return <LoginForm />;
} 