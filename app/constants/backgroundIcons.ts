// 배경 아이콘 데이터 구조
export interface BackgroundIconData {
  name: string;
  url: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: {
    width: string;
    height: string;
  };
  animation: {
    delay: string;
    duration: string;
  };
  opacity: number;
  rotate?: number;
  zIndex?: number;
}

// 배경 아이콘 데이터
export const BACKGROUND_ICONS: BackgroundIconData[] = [
  // 기술 아이콘
  {
    name: 'react',
    url: '/icons/react.svg',
    position: { top: '15%', left: '10%' },
    size: { width: '40px', height: '40px' },
    animation: { delay: '0s', duration: '15s' },
    opacity: 0.6,
    rotate: 15,
  },
  {
    name: 'news',
    url: '/icons/news.svg',
    position: { top: '20%', right: '20%' },
    size: { width: '44px', height: '44px' },
    animation: { delay: '0.5s', duration: '22s' },
    opacity: 0.7,
  },
  {
    name: 'tag',
    url: '/icons/tag.svg',
    position: { top: '40%', left: '8%' },
    size: { width: '30px', height: '30px' },
    animation: { delay: '1.5s', duration: '19s' },
    opacity: 0.5,
  },
  {
    name: 'ai',
    url: '/icons/ai.svg',
    position: { top: '10%', left: '30%' },
    size: { width: '42px', height: '42px' },
    animation: { delay: '1s', duration: '23s' },
    opacity: 0.7,
  },
  {
    name: 'cloud',
    url: '/icons/cloud.svg',
    position: { bottom: '20%', left: '25%' },
    size: { width: '35px', height: '35px' },
    animation: { delay: '3.5s', duration: '16s' },
    opacity: 0.5,
    rotate: 5,
  }
]; 