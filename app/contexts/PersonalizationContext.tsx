'use client';

import { createContext, ReactNode, useCallback, useContext, useReducer } from 'react';
import { Keyword } from '../types';

// 상태 타입 정의
interface PersonalizationState {
  selectedTopics: string[];
  selectedKeywords: Keyword[];
  isInitialized: boolean;
}

// 액션 타입 정의
type PersonalizationAction =
  | { type: 'SET_TOPICS'; payload: string[] }
  | { type: 'SET_KEYWORDS'; payload: Keyword[] }
  | { type: 'ADD_KEYWORD'; payload: Keyword }
  | { type: 'REMOVE_KEYWORD'; payload: string }
  | { type: 'RESET' }
  | { type: 'INITIALIZE' };

// 초기 상태
const initialState: PersonalizationState = {
  selectedTopics: [],
  selectedKeywords: [],
  isInitialized: false,
};

// 리듀서
function personalizationReducer(
  state: PersonalizationState,
  action: PersonalizationAction
): PersonalizationState {
  switch (action.type) {
    case 'SET_TOPICS':
      return {
        ...state,
        selectedTopics: action.payload,
      };
    case 'SET_KEYWORDS':
      return {
        ...state,
        selectedKeywords: action.payload,
      };
    case 'ADD_KEYWORD':
      return {
        ...state,
        selectedKeywords: [...state.selectedKeywords, action.payload],
      };
    case 'REMOVE_KEYWORD':
      return {
        ...state,
        selectedKeywords: state.selectedKeywords.filter(
          (keyword) => keyword.keyword !== action.payload
        ),
      };
    case 'RESET':
      return initialState;
    case 'INITIALIZE':
      return {
        ...state,
        isInitialized: true,
      };
    default:
      return state;
  }
}

// Context 타입 정의
interface PersonalizationContextType {
  state: PersonalizationState;
  setTopics: (topics: string[]) => void;
  setKeywords: (keywords: Keyword[]) => void;
  addKeyword: (keyword: Keyword) => void;
  removeKeyword: (keyword: string) => void;
  reset: () => void;
  isPersonalizationComplete: boolean;
}

// Context 생성
const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

// Provider 컴포넌트
interface PersonalizationProviderProps {
  children: ReactNode;
}

export function PersonalizationProvider({ children }: PersonalizationProviderProps) {
  const [state, dispatch] = useReducer(personalizationReducer, initialState);

  // 액션 생성자들
  const setTopics = useCallback((topics: string[]) => {
    dispatch({ type: 'SET_TOPICS', payload: topics });
  }, []);

  const setKeywords = useCallback((keywords: Keyword[]) => {
    dispatch({ type: 'SET_KEYWORDS', payload: keywords });
  }, []);

  const addKeyword = useCallback((keyword: Keyword) => {
    dispatch({ type: 'ADD_KEYWORD', payload: keyword });
  }, []);

  const removeKeyword = useCallback((keyword: string) => {
    dispatch({ type: 'REMOVE_KEYWORD', payload: keyword });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // 개인화 설정 완료 여부 계산
  const isPersonalizationComplete = 
    state.selectedTopics.length > 0 || state.selectedKeywords.length > 0;

  // Context 값
  const contextValue: PersonalizationContextType = {
    state,
    setTopics,
    setKeywords,
    addKeyword,
    removeKeyword,
    reset,
    isPersonalizationComplete,
  };

  return (
    <PersonalizationContext.Provider value={contextValue}>
      {children}
    </PersonalizationContext.Provider>
  );
}

// Hook for using the context
export function usePersonalization() {
  const context = useContext(PersonalizationContext);
  if (context === undefined) {
    throw new Error('usePersonalization must be used within a PersonalizationProvider');
  }
  return context;
} 