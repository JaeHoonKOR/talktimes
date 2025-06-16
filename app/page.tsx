import {
  ContactSection,
  CTASection,
  NewFeaturesSection,
  NewHeroSection,
  NewsPreviewSection,
  PersonalizationSection,
  PricingSection,
  ValuePropositionSection
} from './components/sections';
// Three.js 기반 FeaturesSection을 제거하고 새로운 NewFeaturesSection 사용
// import FeaturesSection from './components/sections/FeaturesSection';
import { TranslationToggle } from './components/TranslationToggle';
import { AISummary, NewsItem } from './types';

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
  // 실제 API 호출이 구현되기 전까지는 샘플 데이터 사용
  const newsData = sampleNewsData;
  const summaryData = sampleSummaryData;

  return (
    <main className="min-h-screen bg-white">
      {/* 상단 번역 토글 */}
      <div className="absolute top-4 right-4 z-50">
        <TranslationToggle />
      </div>
      
      {/* 히어로 섹션 - 안정화된 버전 */}
      <NewHeroSection />
      
      {/* 특징 섹션 - Three.js 대신 Framer Motion + GSAP 사용 */}
      <NewFeaturesSection />
      
      {/* 개인화 설정 및 맞춤형 뉴스 섹션 */}
      <section id="personalization" className="py-24 bg-white relative overflow-hidden" aria-label="개인화 설정 및 맞춤형 뉴스">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PersonalizationSection />
        </div>
      </section>

      {/* 뉴스레터 미리보기 섹션 */}
      <NewsPreviewSection 
        newsData={newsData} 
        summaryData={summaryData} 
      />

      {/* 가치 제안 섹션 */}
      <ValuePropositionSection />

      {/* 가격 섹션 */}
      <PricingSection />

      {/* CTA 섹션 */}
      <CTASection />

      {/* 연락처/푸터 섹션 */}
      <ContactSection />
    </main>
  );
} 