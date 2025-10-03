import {
  ContactSection,
  NewFeaturesSection,
  NewHeroSection,
  NewsPreviewSection,
  PersonalizationSection,
  ServiceValueSection
} from './components/sections';
// Three.js 기반 FeaturesSection을 제거하고 새로운 NewFeaturesSection 사용
// import FeaturesSection from './components/sections/FeaturesSection';
import FeedbackWidget from './components/FeedbackWidget';
import { TranslationToggle } from './components/TranslationToggle';
import { AISummary, NewsItem } from './types';
import TrustElements from './components/sections/TrustElements';
import TestimonialsSection from './components/sections/TestimonialsSection';
import PrivacySecuritySection from './components/sections/PrivacySecuritySection';
import RealTimeActivityFeed from './components/sections/RealTimeActivityFeed';
import PersonalizedRecommendations from './components/sections/PersonalizedRecommendations';
import SocialBookmarks from './components/sections/SocialBookmarks';
import AdvancedSearch from './components/sections/AdvancedSearch';
import AccessibilityControls from './components/ui/AccessibilityControls';
import SkipToContent from './components/ui/SkipToContent';
import PerformanceOptimizer from './components/ui/PerformanceOptimizer';

// Next.js 15의 ISR 설정
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// 샘플 뉴스 데이터
const sampleNewsData: NewsItem[] = [
  {
    id: 'sample1',
    title: '세계 경제 전망: 2023년 회복의 신호',
    excerpt: '2022년의 불확실성 이후, 전문가들은 2023년에 점진적인 경제 회복을 예측하고 있습니다...',
    category: '경제',
    imageUrl: '/news_sample/economy.jpg',
    publishedAt: '2023-01-15T09:00:00Z',
    source: 'Economist'
  },
  {
    id: 'sample2',
    title: '새로운 AI 모델의 윤리적 도전과제',
    excerpt: '최근 출시된 AI 모델들이 가져오는 윤리적 문제들과 해결 방안에 대한 논의가 활발히 진행 중입니다...',
    category: '기술',
    imageUrl: '/news_sample/ai.jpg',
    publishedAt: '2023-01-17T14:30:00Z',
    source: 'TechCrunch'
  },
  {
    id: 'sample3',
    title: '기후 변화: 북극 빙하 면적 역대 최저치 기록',
    excerpt: '과학자들은 2022년 북극 빙하 면적이 관측 이래 최저치를 기록했다고 발표했습니다...',
    category: '환경',
    imageUrl: '/news_sample/climate.jpg',
    publishedAt: '2023-01-18T11:15:00Z',
    source: 'National Geographic'
  }
];

// 샘플 AI 요약 데이터
const sampleSummaryData: AISummary[] = [
  {
    id: 'summary1',
    title: '금주의 경제 동향',
    summary: '이번 주 글로벌 경제는 인플레이션 우려 속에서도 안정적인 성장세를 보였습니다. 미국과 유럽의 중앙은행은 금리 인상을 유지하는 한편, 아시아 시장은 혼조세를 보였습니다. 전문가들은 2023년 하반기에 점진적인 금리 인하를 예상하고 있습니다.',
    category: '경제',
    publishedAt: '2023-01-20T09:00:00Z',
    source: '경제분석연구소'
  },
  {
    id: 'summary2',
    title: '기술 산업의 주요 트렌드',
    summary: 'AI와 기계학습 기술이 계속해서 다양한 산업에 혁신을 가져오고 있습니다. 특히 의료, 금융, 교육 분야에서의 AI 도입이 가속화되고 있으며, 빅테크 기업들은 생성형 AI에 대한 투자를 확대하고 있습니다. 개인정보 보호와 AI 윤리에 대한 논의도 함께 증가하고 있습니다.',
    category: '기술',
    publishedAt: '2023-01-19T14:30:00Z',
    source: '테크리서치'
  }
];

// 메인 페이지
export default async function Home() {
  // 실제 백엔드 API에서 데이터 가져오기
  let newsData = sampleNewsData;
  let summaryData = sampleSummaryData;
  
  try {
    // 백엔드에서 실제 뉴스 데이터 가져오기
    const response = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:4000'}/api/v2/news?limit=10&sort=latest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // 5분마다 재검증
    });

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.news && data.data.news.length > 0) {
        // 백엔드 데이터를 프론트엔드 형식으로 변환
        newsData = data.data.news.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt || item.title,
          category: item.category || '일반',
          imageUrl: item.imageUrl || '/news_sample/news_sample_1.png',
          publishedAt: item.publishedAt,
          source: item.source
        }));
      }
    }

    // AI 요약 데이터도 가져오기 시도
    const summaryResponse = await fetch(`${process.env.BACKEND_API_URL || 'http://localhost:4000'}/api/v2/news/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 600 } // 10분마다 재검증
    });

    if (summaryResponse.ok) {
      const summaryApiData = await summaryResponse.json();
      if (summaryApiData.data) {
        const dynamicSummary = [];
        
        if (summaryApiData.data.totalCount) {
          dynamicSummary.push({
            id: 'stats-total',
            title: `총 ${summaryApiData.data.totalCount}개의 뉴스 수집`,
            summary: `현재 데이터베이스에 ${summaryApiData.data.totalCount}개의 뉴스가 저장되어 있습니다. 다양한 카테고리와 소스에서 수집된 최신 뉴스를 제공합니다.`,
            category: '뉴스 통계',
            publishedAt: new Date().toISOString(),
            source: '뉴스 통계'
          });
        }

        if (summaryApiData.data.categoryCounts && summaryApiData.data.categoryCounts.length > 0) {
          const topCategory = summaryApiData.data.categoryCounts[0];
          dynamicSummary.push({
            id: 'stats-category',
            title: `'${topCategory.category}' 카테고리가 가장 활발`,
            summary: `현재 '${topCategory.category}' 카테고리에서 ${topCategory.count}개의 뉴스가 수집되어 가장 많은 비중을 차지하고 있습니다.`,
            category: '카테고리 분석',
            publishedAt: new Date().toISOString(),
            source: '카테고리 분석'
          });
        }

        if (dynamicSummary.length > 0) {
          summaryData = dynamicSummary;
        }
      }
    }
  } catch (error) {
    console.error('백엔드 API 연결 실패, 샘플 데이터 사용:', error);
    // 에러 발생시 기본 샘플 데이터 사용
  }

  return (
    <main className="min-h-screen bg-primary" id="main-content">
      {/* Skip to content 링크 */}
      <SkipToContent />
      
      {/* 상단 번역 토글 */}
      <div className="absolute top-4 right-4 z-50">
        <TranslationToggle />
      </div>
      
      {/* 히어로 섹션 - 안정화된 버전 */}
      <NewHeroSection />
      
      {/* 신뢰성 요소 섹션 - Phase 1 */}
      <TrustElements />
      
      {/* 특징 섹션 - Three.js 대신 Framer Motion + GSAP 사용 */}
      <NewFeaturesSection />
      
      {/* 개인화 설정 및 맞춤형 뉴스 섹션 */}
      <PersonalizationSection />

      {/* 뉴스레터 미리보기 섹션 */}
      <NewsPreviewSection 
        id="news"
        newsData={newsData} 
        summaryData={summaryData} 
      />

      {/* 사용자 후기 섹션 - Phase 1 */}
      <TestimonialsSection />

      {/* 실시간 활동 피드 - Phase 3 */}
      <RealTimeActivityFeed />

      {/* 개인화된 뉴스 추천 - Phase 3 */}
      <PersonalizedRecommendations />

      {/* 소셜 북마크 및 공유 - Phase 3 */}
      <SocialBookmarks />

      {/* 고급 검색 시스템 - Phase 4 */}
      <AdvancedSearch />

      {/* 통합 서비스 가치 및 구독 섹션 */}
      <ServiceValueSection />

      {/* 개인정보 보호 및 보안 섹션 - Phase 1 */}
      <PrivacySecuritySection />

      {/* 연락처/푸터 섹션 */}
      <ContactSection />
      
      {/* 피드백 위젯 */}
      <FeedbackWidget />
      
      {/* 접근성 컨트롤 */}
      <AccessibilityControls />
      
      {/* 성능 최적화 */}
      <PerformanceOptimizer />
    </main>
  );
} 