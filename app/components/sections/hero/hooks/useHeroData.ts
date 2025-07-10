import { useMemo } from 'react';

interface StatItem {
  number: string;
  label: string;
  suffix?: string;
}

interface AppIcon {
  name: string;
  color: string;
  icon: string;
  delay?: number;
  isMain?: boolean;
}

export function useHeroData() {
  const stats = useMemo<StatItem[]>(() => [
    {
      number: '50',
      label: '뉴스 소스',
      suffix: '+'
    },
    {
      number: '10',
      label: '분야별 큐레이션',
      suffix: '개'
    },
    {
      number: '24',
      label: '실시간 업데이트',
      suffix: '시간'
    },
    {
      number: '99',
      label: '정확도',
      suffix: '%'
    }
  ], []);

  const appIcons = useMemo<AppIcon[]>(() => [
    {
      name: 'TalkTimes',
      color: 'bg-blue-500',
      icon: '📰',
      delay: 0.2,
      isMain: true
    },
    {
      name: '뉴스',
      color: 'bg-green-500',
      icon: '📱',
      delay: 0.4
    },
    {
      name: 'AI',
      color: 'bg-purple-500',
      icon: '🤖',
      delay: 0.6
    },
    {
      name: '개인화',
      color: 'bg-orange-500',
      icon: '🎯',
      delay: 0.8
    },
    {
      name: '실시간',
      color: 'bg-red-500',
      icon: '⚡',
      delay: 1.0
    },
    {
      name: '번역',
      color: 'bg-indigo-500',
      icon: '🌐',
      delay: 1.2
    }
  ], []);

  return {
    stats,
    appIcons
  };
} 