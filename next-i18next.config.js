const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'ja', 'zh-CN', 'es', 'fr', 'de'],
    localePath: path.resolve('./public/locales'),
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  // 서버 사이드에서 번역이 필요없는 네임스페이스 (성능 최적화)
  react: {
    useSuspense: false,
  },
  // 번역 키가 없을 때 설정
  fallbackLng: {
    'zh-CN': ['zh', 'en'],
    'zh-TW': ['zh', 'en'],
    'es': ['en'],
    'fr': ['en'],
    'de': ['en'],
    'ja': ['en'],
    'default': ['ko']
  },
  // 개발 모드에서 번역 키 누락 경고
  debug: process.env.NODE_ENV === 'development',
  saveMissing: true,
  // 번역 네임스페이스 설정 (모듈별로 분리)
  defaultNS: 'common',
  ns: [
    'common',      // 공통 텍스트
    'navigation',  // 네비게이션
    'auth',        // 인증 관련
    'news',        // 뉴스 관련
    'feedback',    // 피드백
    'errors',      // 에러 메시지
    'ui'          // UI 컴포넌트
  ],
  // 번역 키 보간 설정
  interpolation: {
    escapeValue: false, // React에서는 XSS 보호가 기본 제공됨
  },
  // 브라우저 언어 감지 설정
  detection: {
    order: ['path', 'cookie', 'header', 'querystring', 'localStorage', 'navigator'],
    caches: ['cookie', 'localStorage'],
    excludeCacheFor: ['cimode'],
    cookieMinutes: 60 * 24 * 30, // 30일
    cookieDomain: undefined,
    cookieOptions: { 
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    }
  }
};