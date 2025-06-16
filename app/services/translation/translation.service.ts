import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface TranslationResponse {
  translatedText: string;
}

export interface BatchTranslationResponse {
  translatedTexts: string[];
}

export interface CacheStatus {
  totalTranslations: number;
  cacheSize: number;
  hitRate: number;
  languageBreakdown: Array<{
    targetLang: string;
    _sum: {
      usageCount: number;
    };
    _count: number;
  }>;
  popularTranslations: Array<{
    sourceText: string;
    targetLang: string;
    translatedText: string;
    usageCount: number;
    lastUsedAt: string;
  }>;
}

export class TranslationService {
  private static instance: TranslationService;
  private readonly baseUrl: string;

  private constructor() {
    this.baseUrl = `${API_BASE_URL}/api/translation`;
  }

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  /**
   * 단일 텍스트 번역
   */
  async translateText(text: string, targetLang: string): Promise<string> {
    try {
      const response = await axios.post<TranslationResponse>(
        `${this.baseUrl}/text`,
        { text, targetLang }
      );
      return response.data.translatedText;
    } catch (error) {
      console.error('텍스트 번역 중 오류:', error);
      throw new Error('번역 처리 중 오류가 발생했습니다.');
    }
  }

  /**
   * 배치 텍스트 번역
   */
  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    try {
      const response = await axios.post<BatchTranslationResponse>(
        `${this.baseUrl}/batch`,
        { texts, targetLang }
      );
      return response.data.translatedTexts;
    } catch (error) {
      console.error('배치 번역 중 오류:', error);
      throw new Error('배치 번역 처리 중 오류가 발생했습니다.');
    }
  }

  /**
   * 캐시 상태 조회
   */
  async getCacheStatus(): Promise<CacheStatus> {
    try {
      const response = await axios.get<CacheStatus>(
        `${this.baseUrl}/cache/status`
      );
      return response.data;
    } catch (error) {
      console.error('캐시 상태 조회 중 오류:', error);
      throw new Error('캐시 상태 조회 중 오류가 발생했습니다.');
    }
  }

  /**
   * 오래된 캐시 정리
   */
  async cleanupCache(days: number = 30): Promise<string> {
    try {
      const response = await axios.post<{ message: string }>(
        `${this.baseUrl}/cache/cleanup`,
        null,
        { params: { days } }
      );
      return response.data.message;
    } catch (error) {
      console.error('캐시 정리 중 오류:', error);
      throw new Error('캐시 정리 중 오류가 발생했습니다.');
    }
  }

  /**
   * 특정 언어의 캐시 삭제
   */
  async clearLanguageCache(targetLang: string): Promise<string> {
    try {
      const response = await axios.delete<{ message: string }>(
        `${this.baseUrl}/cache/language/${targetLang}`
      );
      return response.data.message;
    } catch (error) {
      console.error('언어별 캐시 삭제 중 오류:', error);
      throw new Error('언어별 캐시 삭제 중 오류가 발생했습니다.');
    }
  }

  /**
   * 전체 캐시 삭제
   */
  async clearAllCache(): Promise<string> {
    try {
      const response = await axios.delete<{ message: string }>(
        `${this.baseUrl}/cache/all`
      );
      return response.data.message;
    } catch (error) {
      console.error('전체 캐시 삭제 중 오류:', error);
      throw new Error('전체 캐시 삭제 중 오류가 발생했습니다.');
    }
  }
} 