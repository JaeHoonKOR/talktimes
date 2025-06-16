'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';

interface TranslationToggleProps {
  className?: string;
}

export const TranslationToggle: React.FC<TranslationToggleProps> = ({ className = '' }) => {
  const { data: session } = useSession();
  const { language, setLanguage } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = async (newLanguage: string) => {
    if (!session?.user) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/translation/user/language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({ language: newLanguage }),
      });

      if (!response.ok) {
        throw new Error('언어 설정 변경에 실패했습니다.');
      }

      setLanguage(newLanguage);
    } catch (error) {
      console.error('언어 설정 변경 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session?.user) return null;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        disabled={isLoading}
        className="px-3 py-1 border rounded-md bg-white dark:bg-gray-800 text-sm"
      >
        <option value="ko">한국어</option>
        <option value="en">English</option>
        <option value="ja">日本語</option>
      </select>
      {isLoading && (
        <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
      )}
    </div>
  );
}; 