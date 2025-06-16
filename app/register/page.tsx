import type { Metadata } from 'next';
import RegisterForm from '../components/auth/RegisterForm';

// 메타데이터 설정
export const metadata: Metadata = {
  title: '회원가입 - 뉴스직송 JikSong | AI 맞춤형 뉴스 큐레이션',
  description: '뉴스직송 JikSong에 가입하고 AI가 엄선한 맞춤형 뉴스를 받아보세요. 평생 무료, 광고 없음, 30초 가입.',
  openGraph: {
    title: '회원가입 - 뉴스직송 JikSong',
    description: '뉴스직송 JikSong에 가입하고 AI가 엄선한 맞춤형 뉴스를 받아보세요. 평생 무료 혜택!',
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
} 