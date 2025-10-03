import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-fs-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 다국어화 설정
const i18nConfig = {
  // 기본 언어
  fallbackLng: 'ko',
  
  // 지원 언어 목록
  supportedLngs: ['ko', 'en', 'ja', 'zh-CN', 'es', 'fr', 'de'],
  
  // 개발 모드에서 디버그 활성화
  debug: process.env.NODE_ENV === 'development',
  
  // 번역 네임스페이스
  defaultNS: 'common',
  ns: ['common', 'navigation', 'auth', 'news', 'feedback', 'errors', 'ui'],
  
  // 보간 설정
  interpolation: {
    escapeValue: false, // React에서는 XSS 보호가 기본으로 제공됨
  },
  
  // 백엔드 설정 (파일 시스템에서 번역 파일 로드)
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  
  // 언어 감지 설정
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    caches: ['cookie', 'localStorage'],
    excludeCacheFor: ['cimode'],
    cookieMinutes: 60 * 24 * 30, // 30일
    cookieOptions: {
      sameSite: 'strict' as const,
      secure: process.env.NODE_ENV === 'production'
    }
  },
};

// 서버 사이드 렌더링 환경에서는 Backend를 사용하지 않음
if (typeof window !== 'undefined') {
  i18n.use(Backend);
}

// 브라우저 환경에서만 언어 감지기 사용
if (typeof window !== 'undefined') {
  i18n.use(LanguageDetector);
}

// React와 연동
i18n.use(initReactI18next);

// 초기화
if (!i18n.isInitialized) {
  i18n.init(i18nConfig);
}

export default i18n;

// 타입 정의
export type SupportedLocale = 'ko' | 'en' | 'ja' | 'zh-CN' | 'es' | 'fr' | 'de';

// 언어 정보
export const localeNames: Record<SupportedLocale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

// 언어별 플래그 이모지
export const localeFlags: Record<SupportedLocale, string> = {
  ko: '🇰🇷',
  en: '🇺🇸',
  ja: '🇯🇵',
  'zh-CN': '🇨🇳',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
};

// 언어 변경 함수
export const changeLanguage = (locale: SupportedLocale) => {
  if (typeof window !== 'undefined') {
    // 클라이언트 사이드에서 언어 변경
    i18n.changeLanguage(locale);
    
    // 쿠키에 언어 설정 저장
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Strict${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`;
    
    // 페이지 새로고침으로 서버 사이드 언어 적용
    window.location.reload();
  }
};

// 현재 언어 가져오기
export const getCurrentLanguage = (): SupportedLocale => {
  return (i18n.language || 'ko') as SupportedLocale;
};

// RTL 언어 체크 (아랍어, 히브리어 등을 위한 확장성)
export const isRTL = (locale: string): boolean => {
  const rtlLocales = ['ar', 'he', 'fa'];
  return rtlLocales.includes(locale);
};