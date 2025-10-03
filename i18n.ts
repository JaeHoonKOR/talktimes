import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// 지원하는 언어 목록
export const locales = ['ko', 'en'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  // 유효한 locale인지 검증
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});