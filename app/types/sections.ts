import React, { ReactNode } from 'react';
import { AISummary, NewsItem } from '.';

// 공통 섹션 Props
export interface SectionProps {
  className?: string;
  id?: string;
}

// 아이콘을 포함한 기능 인터페이스
export interface FeatureWithIcon {
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
}

// 통계 데이터 인터페이스
export interface StatData {
  value: string;
  label: string;
  delay?: string;
}

// 뉴스 소스 인터페이스
export interface NewsSource {
  name: string;
  logo: string;
  category: string;
}

// 파이프라인 단계 인터페이스
export interface PipelineStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// 히어로 섹션 Props
export interface HeroSectionProps extends SectionProps {
  stats?: StatData[];
}

// How It Works 섹션 Props
export interface HowItWorksSectionProps extends SectionProps {
  features: FeatureWithIcon[];
  newsSources?: NewsSource[];
  pipelineSteps?: PipelineStep[];
}

// 뉴스 미리보기 컴포넌트 Props
export interface NewsPreviewProps {
  initialNews: NewsItem[];
}

// 뉴스 미리보기 섹션 Props
export interface NewsPreviewSectionProps extends SectionProps {
  newsData: NewsItem[];
  summaryData: AISummary[];
}

// 가격 섹션 Props
export interface PricingSectionProps extends SectionProps {
  // 향후 가격 플랜 데이터 추가 가능
}

// CTA 섹션 Props
export interface CTASectionProps extends SectionProps {
  // CTA 관련 데이터 추가 가능
} 