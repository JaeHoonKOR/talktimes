import { FeatureWithIcon, StatData } from '../types/sections';

// 통계 데이터
export const HERO_STATS: StatData[] = [
  {
    value: '1,000+',
    label: '구독자',
    delay: '0s',
  },
  {
    value: '50+',
    label: '뉴스 소스',
    delay: '0.5s',
  },
  {
    value: 'AI',
    label: '맞춤 추천',
    delay: '1s',
  },
];

// 아이콘 컴포넌트 - JSX 요소로 미리 렌더링
export const ICONS = {
  personalized: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 2.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 9l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  sources: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
  ),
  customizing: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  ),
};

// 뉴스레터 기능 데이터
export const NEWSLETTER_FEATURES: FeatureWithIcon[] = [
  {
    title: '개인화된 콘텐츠',
    description: '원하는 정보만 골라 받을 수 있는 다양한 기능을 제공합니다',
    points: [
      '원하는 토픽 선택',
      '맞춤형 뉴스 추천',
      '개인화된 콘텐츠 제공',
    ],
    icon: ICONS.personalized,
  },
  {
    title: '다양한 소스 통합',
    description: '여러 플랫폼의 콘텐츠를 한 곳에서 모아보세요',
    points: [
      '다양한 소스 통합',
      '최신 뉴스 및 트렌드 파악',
      '커뮤니티와의 연결',
    ],
    icon: ICONS.sources,
  },
  {
    title: '커스터마이징 옵션',
    description: '원하는 뉴스만 받아볼 수 있도록 다양한 설정 옵션을 제공합니다',
    points: [
      '키워드 필터링',
      '발송 시간 설정',
      '콘텐츠 우선순위 설정',
    ],
    icon: ICONS.customizing,
  },
];

// 사용자 후기 데이터
export const TESTIMONIALS = [
  {
    name: '김개발',
    comment: '매일 아침 2분이면 업계 트렌드 완료!',
    rating: 5,
  },
  {
    name: '박마케팅',
    comment: '광고 없어서 진짜 깔끔해요',
    rating: 5,
  },
];

// 신뢰 지표 데이터
export const TRUST_INDICATORS = [
  { value: '1,000+', label: '만족한 사용자' },
  { value: '4.9★', label: '평점' },
  { value: '100%', label: '광고 없음' },
  { value: '평생', label: '무료 혜택' },
];

// 뉴스 소스 데이터
export const NEWS_SOURCES = [
  // 국내 주요 언론사
  { name: 'Naver News', logo: 'https://logo.clearbit.com/naver.com', category: 'portal' },
  { name: 'Daum News', logo: 'https://logo.clearbit.com/daum.net', category: 'portal' },
  { name: 'Chosun Ilbo', logo: 'https://logo.clearbit.com/chosun.com', category: 'news' },
  { name: 'JoongAng Ilbo', logo: 'https://logo.clearbit.com/joongang.co.kr', category: 'news' },
  { name: 'Dong-A Ilbo', logo: 'https://logo.clearbit.com/donga.com', category: 'news' },
  { name: 'Hankyoreh', logo: 'https://logo.clearbit.com/hani.co.kr', category: 'news' },
  { name: 'KBS News', logo: 'https://logo.clearbit.com/kbs.co.kr', category: 'broadcast' },
  { name: 'MBC News', logo: 'https://logo.clearbit.com/mbc.co.kr', category: 'broadcast' },
  { name: 'SBS News', logo: 'https://logo.clearbit.com/sbs.co.kr', category: 'broadcast' },
  { name: 'YTN', logo: 'https://logo.clearbit.com/ytn.co.kr', category: 'broadcast' },
  
  // 국제 주요 언론사
  { name: 'CNN', logo: 'https://logo.clearbit.com/cnn.com', category: 'international' },
  { name: 'BBC', logo: 'https://logo.clearbit.com/bbc.com', category: 'international' },
  { name: 'Reuters', logo: 'https://logo.clearbit.com/reuters.com', category: 'international' },
  { name: 'Bloomberg', logo: 'https://logo.clearbit.com/bloomberg.com', category: 'business' },
  { name: 'Financial Times', logo: 'https://logo.clearbit.com/ft.com', category: 'business' },
  { name: 'The Guardian', logo: 'https://logo.clearbit.com/theguardian.com', category: 'international' },
  { name: 'New York Times', logo: 'https://logo.clearbit.com/nytimes.com', category: 'international' },
  { name: 'Wall Street Journal', logo: 'https://logo.clearbit.com/wsj.com', category: 'business' },
  { name: 'The Economist', logo: 'https://logo.clearbit.com/economist.com', category: 'business' },
  { name: 'Forbes', logo: 'https://logo.clearbit.com/forbes.com', category: 'business' },
  
  // 테크 뉴스
  { name: 'TechCrunch', logo: 'https://logo.clearbit.com/techcrunch.com', category: 'tech' },
  { name: 'The Verge', logo: 'https://logo.clearbit.com/theverge.com', category: 'tech' },
  { name: 'Wired', logo: 'https://logo.clearbit.com/wired.com', category: 'tech' },
  { name: 'Ars Technica', logo: 'https://logo.clearbit.com/arstechnica.com', category: 'tech' },
  { name: 'Engadget', logo: 'https://logo.clearbit.com/engadget.com', category: 'tech' },
  { name: 'VentureBeat', logo: 'https://logo.clearbit.com/venturebeat.com', category: 'tech' },
  { name: 'TechRadar', logo: 'https://logo.clearbit.com/techradar.com', category: 'tech' },
  { name: 'The Next Web', logo: 'https://logo.clearbit.com/thenextweb.com', category: 'tech' },
  
  // 비즈니스 & 경제
  { name: 'CNBC', logo: 'https://logo.clearbit.com/cnbc.com', category: 'business' },
  { name: 'Business Insider', logo: 'https://logo.clearbit.com/businessinsider.com', category: 'business' },
  { name: 'Fortune', logo: 'https://logo.clearbit.com/fortune.com', category: 'business' },
  { name: 'Fast Company', logo: 'https://logo.clearbit.com/fastcompany.com', category: 'business' },
  
  // 라이프스타일 & 문화
  { name: 'Vox', logo: 'https://logo.clearbit.com/vox.com', category: 'lifestyle' },
  { name: 'BuzzFeed', logo: 'https://logo.clearbit.com/buzzfeed.com', category: 'lifestyle' },
  { name: 'Vice', logo: 'https://logo.clearbit.com/vice.com', category: 'lifestyle' },
  { name: 'Time', logo: 'https://logo.clearbit.com/time.com', category: 'lifestyle' },
  { name: 'National Geographic', logo: 'https://logo.clearbit.com/nationalgeographic.com', category: 'science' },
  
  // 스포츠
  { name: 'ESPN', logo: 'https://logo.clearbit.com/espn.com', category: 'sports' },
  { name: 'The Athletic', logo: 'https://logo.clearbit.com/theathletic.com', category: 'sports' },
  { name: 'Sky Sports', logo: 'https://logo.clearbit.com/skysports.com', category: 'sports' },
];

// 파이프라인 단계 데이터
export const PIPELINE_STEPS = [
  {
    step: 1,
    title: '뉴스 수집',
    description: '50+ 신뢰할 수 있는 소스에서 실시간 뉴스 수집',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    step: 2,
    title: 'AI 분석',
    description: '관심사 기반 콘텐츠 분석 및 중복 제거',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: '개인화 큐레이션',
    description: '당신의 취향에 맞춘 뉴스 선별',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    step: 4,
    title: '뉴스레터 생성',
    description: '깔끔한 디자인으로 자동 포맷팅',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: 5,
    title: '자동 배송',
    description: '매일 아침 7시 이메일로 전송',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]; 