import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SupportedLocale, changeLanguage, getCurrentLanguage, localeNames, localeFlags } from '../../lib/i18n';

// 번역 타입 정의
type TranslationKey = string;
type TranslationValues = Record<string, string | number>;

// 기본 번역 데이터 (클라이언트 사이드 fallback)
const fallbackTranslations: Record<SupportedLocale, Record<string, any>> = {
  ko: {
    common: {
      appName: '뉴스직송',
      welcome: '환영합니다',
      loading: '로딩 중...',
      error: '오류가 발생했습니다',
      retry: '다시 시도',
      save: '저장',
      cancel: '취소',
    },
    feedback: {
      title: '피드백',
      leaveFeedback: '피드백 남기기',
      submitButton: '피드백 보내기',
    },
    auth: {
      welcome: '환영합니다',
      loginButton: '로그인',
    },
    news: {
      personalizedNews: '나만의 맞춤형 뉴스',
      loadingNews: '뉴스를 불러오는 중...',
    }
  },
  en: {
    common: {
      appName: 'NewsExpress',
      welcome: 'Welcome',
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Try Again',
      save: 'Save',
      cancel: 'Cancel',
    },
    feedback: {
      title: 'Feedback',
      leaveFeedback: 'Leave Feedback',
      submitButton: 'Send Feedback',
    },
    auth: {
      welcome: 'Welcome',
      loginButton: 'Sign In',
    },
    news: {
      personalizedNews: 'Your Personalized News',
      loadingNews: 'Loading news...',
    }
  },
  ja: {
    common: {
      appName: 'ニュース直送',
      welcome: 'いらっしゃいませ',
      loading: '読み込み中...',
      error: 'エラーが発生しました',
      retry: '再試行',
      save: '保存',
      cancel: 'キャンセル',
    },
    feedback: {
      title: 'フィードバック',
      leaveFeedback: 'フィードバックを残す',
      submitButton: 'フィードバックを送信',
    },
    auth: {
      welcome: 'いらっしゃいませ',
      loginButton: 'ログイン',
    },
    news: {
      personalizedNews: 'あなた専用ニュース',
      loadingNews: 'ニュースを読み込み中...',
    }
  },
  'zh-CN': {
    common: {
      appName: '新闻直通',
      welcome: '欢迎',
      loading: '加载中...',
      error: '发生错误',
      retry: '重试',
      save: '保存',
      cancel: '取消',
    },
    feedback: {
      title: '反馈',
      leaveFeedback: '留下反馈',
      submitButton: '发送反馈',
    },
    auth: {
      welcome: '欢迎',
      loginButton: '登录',
    },
    news: {
      personalizedNews: '您的个性化新闻',
      loadingNews: '正在加载新闻...',
    }
  },
  es: {
    common: {
      appName: 'NoticiasExprés',
      welcome: 'Bienvenido',
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      retry: 'Intentar de nuevo',
      save: 'Guardar',
      cancel: 'Cancelar',
    },
    feedback: {
      title: 'Comentarios',
      leaveFeedback: 'Dejar comentarios',
      submitButton: 'Enviar comentarios',
    },
    auth: {
      welcome: 'Bienvenido',
      loginButton: 'Iniciar sesión',
    },
    news: {
      personalizedNews: 'Tus noticias personalizadas',
      loadingNews: 'Cargando noticias...',
    }
  },
  fr: {
    common: {
      appName: 'ActualitésExpress',
      welcome: 'Bienvenue',
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      retry: 'Réessayer',
      save: 'Enregistrer',
      cancel: 'Annuler',
    },
    feedback: {
      title: 'Commentaires',
      leaveFeedback: 'Laisser des commentaires',
      submitButton: 'Envoyer les commentaires',
    },
    auth: {
      welcome: 'Bienvenue',
      loginButton: 'Se connecter',
    },
    news: {
      personalizedNews: 'Vos actualités personnalisées',
      loadingNews: 'Chargement des actualités...',
    }
  },
  de: {
    common: {
      appName: 'NachrichtenExpress',
      welcome: 'Willkommen',
      loading: 'Wird geladen...',
      error: 'Ein Fehler ist aufgetreten',
      retry: 'Erneut versuchen',
      save: 'Speichern',
      cancel: 'Abbrechen',
    },
    feedback: {
      title: 'Feedback',
      leaveFeedback: 'Feedback hinterlassen',
      submitButton: 'Feedback senden',
    },
    auth: {
      welcome: 'Willkommen',
      loginButton: 'Anmelden',
    },
    news: {
      personalizedNews: 'Ihre personalisierten Nachrichten',
      loadingNews: 'Nachrichten werden geladen...',
    }
  }
};

export function useI18n() {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>('ko');
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  // 현재 언어 및 번역 데이터 로드
  useEffect(() => {
    const initializeI18n = async () => {
      try {
        const locale = getCurrentLanguage();
        setCurrentLocale(locale);
        
        // 번역 데이터 로드 시도
        try {
          const response = await fetch(`/locales/${locale}/common.json`);
          if (response.ok) {
            const commonTranslations = await response.json();
            setTranslations(prev => ({ ...prev, common: commonTranslations }));
          } else {
            // 서버에서 로드 실패 시 fallback 사용
            setTranslations(fallbackTranslations[locale] || fallbackTranslations.ko);
          }
        } catch (fetchError) {
          console.warn('Failed to load translations from server, using fallback');
          setTranslations(fallbackTranslations[locale] || fallbackTranslations.ko);
        }
      } catch (error) {
        console.error('Error initializing i18n:', error);
        setTranslations(fallbackTranslations.ko);
      } finally {
        setIsLoading(false);
      }
    };

    initializeI18n();
  }, []);

  // 번역 함수
  const t = (key: TranslationKey, values?: TranslationValues): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    if (typeof value !== 'string') {
      // 키를 찾을 수 없을 때 fallback 시도
      const fallbackValue = getFallbackTranslation(key, currentLocale);
      if (fallbackValue) {
        value = fallbackValue;
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    // 변수 치환
    if (values && typeof value === 'string') {
      return value.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
        return values[variable]?.toString() || match;
      });
    }
    
    return value;
  };

  // Fallback 번역 가져오기
  const getFallbackTranslation = (key: string, locale: SupportedLocale): string | null => {
    const keys = key.split('.');
    let value: any = fallbackTranslations[locale] || fallbackTranslations.ko;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return null;
    }
    
    return typeof value === 'string' ? value : null;
  };

  // 네임스페이스별 번역 로드
  const loadNamespace = async (namespace: string) => {
    if (translations[namespace]) return; // 이미 로드됨
    
    try {
      const response = await fetch(`/locales/${currentLocale}/${namespace}.json`);
      if (response.ok) {
        const namespaceTranslations = await response.json();
        setTranslations(prev => ({ ...prev, [namespace]: namespaceTranslations }));
      } else {
        // Fallback 사용
        const fallback = fallbackTranslations[currentLocale]?.[namespace];
        if (fallback) {
          setTranslations(prev => ({ ...prev, [namespace]: fallback }));
        }
      }
    } catch (error) {
      console.error(`Failed to load namespace ${namespace}:`, error);
      // Fallback 사용
      const fallback = fallbackTranslations[currentLocale]?.[namespace];
      if (fallback) {
        setTranslations(prev => ({ ...prev, [namespace]: fallback }));
      }
    }
  };

  // 언어 변경
  const switchLanguage = async (locale: SupportedLocale) => {
    try {
      setIsLoading(true);
      
      // URL에서 현재 언어 제거하고 새 언어로 교체
      const currentPath = window.location.pathname;
      const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, '') || '/';
      const newPath = `/${locale}${pathWithoutLocale}`;
      
      // 언어 변경 및 쿠키 저장
      changeLanguage(locale);
      
      // 페이지 이동
      router.push(newPath);
      
    } catch (error) {
      console.error('Error switching language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 지원 언어 목록
  const supportedLocales = Object.keys(localeNames) as SupportedLocale[];

  return {
    t,
    currentLocale,
    switchLanguage,
    loadNamespace,
    isLoading,
    supportedLocales,
    localeNames,
    localeFlags,
  };
}

// 컴포넌트에서 사용할 타입
export type UseI18nReturn = ReturnType<typeof useI18n>;