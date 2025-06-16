'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export const useTranslation = () => {
  const { data: session } = useSession();
  const [language, setLanguage] = useState<string>('ko');

  useEffect(() => {
    if (session?.user?.language) {
      setLanguage(session.user.language);
    }
  }, [session?.user?.language]);

  const translateText = useCallback(async (text: string, targetLang?: string) => {
    try {
      // 인증된 사용자는 개인화된 API 사용
      if (session?.accessToken) {
        const response = await fetch('/api/translation/text', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            text,
            targetLang: targetLang || language,
          }),
        });

        if (!response.ok) {
          throw new Error('번역에 실패했습니다.');
        }

        const data = await response.json();
        return data.data.translatedText;
      }
      
      // 인증되지 않은 사용자는 공개 API 사용
      const response = await fetch('/api/translation/public/text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLang: targetLang || language,
        }),
      });

      if (!response.ok) {
        throw new Error('번역에 실패했습니다.');
      }

      const data = await response.json();
      return data.data.translatedText;
    } catch (error) {
      console.error('번역 오류:', error);
      return text;
    }
  }, [session?.accessToken, language]);

  const translateBatch = useCallback(async (texts: string[], targetLang?: string) => {
    try {
      // 인증된 사용자는 개인화된 API 사용
      if (session?.accessToken) {
        const response = await fetch('/api/translation/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            texts,
            targetLang: targetLang || language,
          }),
        });

        if (!response.ok) {
          throw new Error('배치 번역에 실패했습니다.');
        }

        const data = await response.json();
        return data.data.translatedTexts;
      }

      // 인증되지 않은 사용자는 공개 API 사용 (최대 10개 텍스트)
      const response = await fetch('/api/translation/public/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts: texts.slice(0, 10), // 최대 10개로 제한
          targetLang: targetLang || language,
        }),
      });

      if (!response.ok) {
        throw new Error('배치 번역에 실패했습니다.');
      }

      const data = await response.json();
      return data.data.translatedTexts;
    } catch (error) {
      console.error('배치 번역 오류:', error);
      return texts;
    }
  }, [session?.accessToken, language]);

  return {
    language,
    setLanguage,
    translateText,
    translateBatch,
  };
}; 