// 모든 섹션 컴포넌트를 한 곳에서 내보내기
// 이 파일을 통해 섹션 컴포넌트를 쉽게 가져올 수 있습니다

// 컴포넌트 간 데이터 흐름 검증 주석:
// - PersonalizationSection: KeywordManager에 onSettingsComplete 콜백 전달 필요
// - PersonalizationSection: PersonalizedNewsSection에 initialKeywords 전달 필요
// - PersonalizedNewsSection: 키워드 설정 상태와 뉴스 표시 상태 간 전환 로직 포함

// 메인 섹션 컴포넌트들
export { default as ContactSection } from './ContactSection';
export { default as CTASection } from './CTASection';
export { default as FeaturesSection } from './FeaturesSection';
export { default as HowItWorksSection } from './HowItWorksSection';
export { default as NewFeaturesSection } from './NewFeaturesSection';
export { default as NewHeroSection } from './NewHeroSection';
export { default as NewsPreviewSection } from './NewsPreviewSection';
export { default as PersonalizationSection } from './PersonalizationSection';
export { default as PricingSection } from './PricingSection';
export { default as ValuePropositionSection } from './ValuePropositionSection';

