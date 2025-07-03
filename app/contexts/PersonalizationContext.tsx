'use client';

import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { trackEvent } from '../components/AnalyticsProvider';
import { Keyword, Topic } from '../types';

// 상태 타입 정의
export interface PersonalizationState {
  keywords: Keyword[];
  selectedTopics: Topic[];
  isPersonalized: boolean;
  readingLevel: 'basic' | 'intermediate' | 'advanced';
  preferredLanguage: string;
  newsFrequency: 'daily' | 'weekly' | 'realtime';
  lastUpdated: string | null;
}

// 액션 타입 정의
type PersonalizationAction =
  | { type: 'SET_KEYWORDS'; payload: Keyword[] }
  | { type: 'ADD_KEYWORD'; payload: Keyword }
  | { type: 'REMOVE_KEYWORD'; payload: string | number }
  | { type: 'SET_TOPICS'; payload: Topic[] }
  | { type: 'ADD_TOPIC'; payload: Topic }
  | { type: 'REMOVE_TOPIC'; payload: string }
  | { type: 'SET_PERSONALIZED'; payload: boolean }
  | { type: 'SET_READING_LEVEL'; payload: 'basic' | 'intermediate' | 'advanced' }
  | { type: 'SET_PREFERRED_LANGUAGE'; payload: string }
  | { type: 'SET_NEWS_FREQUENCY'; payload: 'daily' | 'weekly' | 'realtime' }
  | { type: 'LOAD_STATE'; payload: PersonalizationState }
  | { type: 'RESET_STATE' };

// 컨텍스트 타입 정의
interface PersonalizationContextType {
  state: PersonalizationState;
  dispatch: React.Dispatch<PersonalizationAction>;
  setKeywords: (keywords: Keyword[]) => void;
  addKeyword: (keyword: Keyword) => void;
  removeKeyword: (keywordId: string | number) => void;
  setTopics: (topics: Topic[]) => void;
  addTopic: (topic: Topic) => void;
  removeTopic: (topicId: string) => void;
  setPersonalized: (value: boolean) => void;
  setReadingLevel: (level: 'basic' | 'intermediate' | 'advanced') => void;
  setPreferredLanguage: (language: string) => void;
  setNewsFrequency: (frequency: 'daily' | 'weekly' | 'realtime') => void;
  resetState: () => void;
}

// 초기 상태
const initialState: PersonalizationState = {
  keywords: [],
  selectedTopics: [],
  isPersonalized: false,
  readingLevel: 'intermediate',
  preferredLanguage: 'ko',
  newsFrequency: 'daily',
  lastUpdated: null,
};

// 로컬 스토리지 키
const STORAGE_KEY = 'jiksend_personalization_settings';

// 리듀서 함수
function personalizationReducer(state: PersonalizationState, action: PersonalizationAction): PersonalizationState {
  switch (action.type) {
    case 'SET_KEYWORDS':
      return {
        ...state,
        keywords: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'ADD_KEYWORD':
      return {
        ...state,
        keywords: [...state.keywords, action.payload],
        lastUpdated: new Date().toISOString(),
      };
    case 'REMOVE_KEYWORD':
      return {
        ...state,
        keywords: state.keywords.filter(k => k.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
    case 'SET_TOPICS':
      return {
        ...state,
        selectedTopics: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'ADD_TOPIC':
      if (state.selectedTopics.some(topic => topic.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        selectedTopics: [...state.selectedTopics, action.payload],
        lastUpdated: new Date().toISOString(),
      };
    case 'REMOVE_TOPIC':
      return {
        ...state,
        selectedTopics: state.selectedTopics.filter(topic => topic.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
    case 'SET_PERSONALIZED':
      return {
        ...state,
        isPersonalized: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'SET_READING_LEVEL':
      return {
        ...state,
        readingLevel: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'SET_PREFERRED_LANGUAGE':
      return {
        ...state,
        preferredLanguage: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'SET_NEWS_FREQUENCY':
      return {
        ...state,
        newsFrequency: action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'LOAD_STATE':
      return {
        ...action.payload,
        lastUpdated: new Date().toISOString(),
      };
    case 'RESET_STATE':
      return {
        ...initialState,
        lastUpdated: new Date().toISOString(),
      };
    default:
      return state;
  }
}

// 컨텍스트 생성
const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

// 로컬 스토리지 유틸리티 함수
const saveToLocalStorage = (state: PersonalizationState) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      
      // 분석을 위한 이벤트 로깅 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log('Analytics Event:', {
          name: 'preferences_saved',
          properties: {
            topicCount: state.selectedTopics.length,
            readingLevel: state.readingLevel,
            language: state.preferredLanguage,
            frequency: state.newsFrequency,
          },
          timestamp: new Date().toISOString(),
        });
      }
    }
  } catch (error) {
    console.error('설정 저장 중 오류 발생:', error);
  }
};

const loadFromLocalStorage = (): PersonalizationState | null => {
  try {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        
        // 분석을 위한 이벤트 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log('Analytics Event:', {
            name: 'preferences_loaded',
            properties: {
              topicCount: parsedState.selectedTopics?.length || 0,
              readingLevel: parsedState.readingLevel,
              language: parsedState.preferredLanguage,
              lastUpdated: parsedState.lastUpdated,
            },
            timestamp: new Date().toISOString(),
          });
        }
        
        return parsedState;
      }
    }
    return null;
  } catch (error) {
    console.error('설정 로드 중 오류 발생:', error);
    return null;
  }
};

// 프로바이더 컴포넌트
export const PersonalizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [state, dispatch] = useReducer(personalizationReducer, initialState);

  // 클라이언트 사이드에서만 로컬 스토리지 접근
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 로컬 스토리지에서 상태 로드
  useEffect(() => {
    if (isClient) {
      const savedState = loadFromLocalStorage();
      if (savedState) {
        dispatch({ type: 'LOAD_STATE', payload: savedState });
      }
    }
  }, [isClient]);

  // 상태 변경 시 로컬 스토리지에 저장
  useEffect(() => {
    if (isClient && state.lastUpdated) {
      saveToLocalStorage(state);
    }
  }, [state, isClient]);

  // 액션 디스패치 함수들
  const setKeywords = useCallback((keywords: Keyword[]) => {
    dispatch({ type: 'SET_KEYWORDS', payload: keywords });
    trackEvent({
      name: 'keywords_updated',
      properties: { count: keywords.length }
    });
  }, []);

  const addKeyword = useCallback((keyword: Keyword) => {
    dispatch({ type: 'ADD_KEYWORD', payload: keyword });
    trackEvent({
      name: 'keyword_added',
      properties: { keyword: keyword.text }
    });
  }, []);

  const removeKeyword = useCallback((keywordId: string | number) => {
    dispatch({ type: 'REMOVE_KEYWORD', payload: keywordId });
    trackEvent({
      name: 'keyword_removed',
      properties: { keywordId }
    });
  }, []);

  const setTopics = useCallback((topics: Topic[]) => {
    dispatch({ type: 'SET_TOPICS', payload: topics });
    trackEvent({
      name: 'topics_updated',
      properties: { topics }
    });
  }, []);

  const addTopic = useCallback((topic: Topic) => {
    dispatch({ type: 'ADD_TOPIC', payload: topic });
    trackEvent({
      name: 'topic_added',
      properties: { topic: topic.text }
    });
  }, []);

  const removeTopic = useCallback((topicId: string) => {
    dispatch({ type: 'REMOVE_TOPIC', payload: topicId });
    trackEvent({
      name: 'topic_removed',
      properties: { topicId }
    });
  }, []);

  const setPersonalized = useCallback((value: boolean) => {
    dispatch({ type: 'SET_PERSONALIZED', payload: value });
    trackEvent({
      name: 'personalized_updated',
      properties: { value }
    });
  }, []);

  const setReadingLevel = useCallback((level: 'basic' | 'intermediate' | 'advanced') => {
    dispatch({ type: 'SET_READING_LEVEL', payload: level });
    trackEvent({
      name: 'reading_level_updated',
      properties: { level }
    });
  }, []);

  const setPreferredLanguage = useCallback((language: string) => {
    dispatch({ type: 'SET_PREFERRED_LANGUAGE', payload: language });
    trackEvent({
      name: 'language_updated',
      properties: { language }
    });
  }, []);

  const setNewsFrequency = useCallback((frequency: 'daily' | 'weekly' | 'realtime') => {
    dispatch({ type: 'SET_NEWS_FREQUENCY', payload: frequency });
    trackEvent({
      name: 'news_frequency_updated',
      properties: { frequency }
    });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
    trackEvent({
      name: 'preferences_reset'
    });
  }, []);

  const contextValue = {
    state,
    dispatch,
    setKeywords,
    addKeyword,
    removeKeyword,
    setTopics,
    addTopic,
    removeTopic,
    setPersonalized,
    setReadingLevel,
    setPreferredLanguage,
    setNewsFrequency,
    resetState,
  };

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
};

// 커스텀 훅
export const usePersonalization = () => {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
}; 