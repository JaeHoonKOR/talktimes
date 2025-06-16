import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { TranslationCacheManager } from '../components/sections/TranslationCacheManager';
import { TranslationSection } from '../components/sections/TranslationSection';

export const metadata: Metadata = {
  title: '번역 서비스 | TalkTimes',
  description: '다국어 번역 서비스를 제공합니다.'
};

export default async function TranslationPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const isAdmin = session.user?.role === 'ADMIN';

  return (
    <main className="container mx-auto py-8 space-y-8">
      <TranslationSection />
      {isAdmin && <TranslationCacheManager />}
    </main>
  );
} 