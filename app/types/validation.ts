import { z } from 'zod';

// Keyword 스키마
export const KeywordSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  keyword: z.string().min(1, '키워드는 필수입니다'),
  category: z.string().min(1, '카테고리는 필수입니다'),
});

// Topic 스키마
export const TopicSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  icon: z.any(), // React.ReactNode는 Zod에서 직접 지원하지 않음
});

// NewsItem 스키마
export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, '제목은 필수입니다'),
  excerpt: z.string(),
  category: z.string(),
  imageUrl: z.string().url().optional(),
  publishedAt: z.string(),
  source: z.string(),
  matchingKeywords: z.array(z.string()).optional(),
});

// AISummary 스키마
export const AISummarySchema = z.object({
  id: z.string(),
  title: z.string().min(1, '제목은 필수입니다'),
  summary: z.string(),
  category: z.string(),
  publishedAt: z.string(),
  source: z.string(),
  originalUrl: z.string().url().optional(),
});

// PersonalizedNewsState 스키마
export const PersonalizedNewsStateSchema = z.object({
  news: z.array(NewsItemSchema),
  keywords: z.array(z.string()),
  isLoading: z.boolean(),
  error: z.string().nullable(),
  message: z.string().nullable(),
});

// 사용자 설정 스키마
export const UserSettingsSchema = z.object({
  keywords: z.array(KeywordSchema),
  selectedTopics: z.array(TopicSchema),
  isPersonalized: z.boolean(),
  readingLevel: z.enum(['basic', 'intermediate', 'advanced']),
  preferredLanguage: z.string(),
  newsFrequency: z.enum(['daily', 'weekly', 'realtime']),
  lastUpdated: z.string().nullable(),
});

// 번역 요청 스키마
export const TranslationRequestSchema = z.object({
  text: z.string().min(1, '번역할 텍스트는 필수입니다'),
  targetLanguage: z.string().min(2, '대상 언어는 필수입니다'),
  sourceLanguage: z.string().optional(),
});

// 배치 번역 요청 스키마
export const BatchTranslationRequestSchema = z.object({
  texts: z.array(z.string()).min(1, '번역할 텍스트 배열은 필수입니다'),
  targetLanguage: z.string().min(2, '대상 언어는 필수입니다'),
  sourceLanguage: z.string().optional(),
});

// API 응답 스키마
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  message: z.string().optional(),
  error: z.string().optional(),
});

// 타입 추론
export type Keyword = z.infer<typeof KeywordSchema>;
export type Topic = z.infer<typeof TopicSchema>;
export type NewsItem = z.infer<typeof NewsItemSchema>;
export type AISummary = z.infer<typeof AISummarySchema>;
export type PersonalizedNewsState = z.infer<typeof PersonalizedNewsStateSchema>;
export type UserSettings = z.infer<typeof UserSettingsSchema>;
export type TranslationRequest = z.infer<typeof TranslationRequestSchema>;
export type BatchTranslationRequest = z.infer<typeof BatchTranslationRequestSchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>; 