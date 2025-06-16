'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const staticTexts = {
  title: '환영합니다',
  description: '이 사이트는 뉴스 번역 서비스를 제공합니다.',
  features: [
    '실시간 뉴스 번역',
    '다국어 지원',
    '개인화된 뉴스 피드'
  ]
};

export const StaticContent = () => {
  const { translateText, translateBatch, language } = useTranslation();
  const [translatedContent, setTranslatedContent] = useState(staticTexts);

  useEffect(() => {
    const translateContent = async () => {
      try {
        // 제목과 설명 번역
        const [translatedTitle, translatedDesc] = await Promise.all([
          translateText(staticTexts.title),
          translateText(staticTexts.description)
        ]);

        // 기능 목록 일괄 번역
        const translatedFeatures = await translateBatch(staticTexts.features);

        setTranslatedContent({
          title: translatedTitle,
          description: translatedDesc,
          features: translatedFeatures
        });
      } catch (error) {
        console.error('콘텐츠 번역 오류:', error);
      }
    };

    // 한국어가 아닌 경우에만 번역 실행
    if (language !== 'ko') {
      translateContent();
    } else {
      setTranslatedContent(staticTexts);
    }
  }, [language, translateText, translateBatch]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{translatedContent.title}</h1>
      <p className="text-gray-600 mb-6">{translatedContent.description}</p>
      <ul className="space-y-2">
        {translatedContent.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2">•</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}; 