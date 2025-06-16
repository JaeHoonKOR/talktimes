export const INITIAL_MESSAGES = [
  {
    id: '1',
    type: 'received' as const,
    content: '안녕하세요! Talk Times입니다.',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'sent' as const,
    content: '안녕하세요!',
    timestamp: new Date()
  },
  {
    id: '3',
    type: 'received' as const,
    content: '관심사에 맞는 뉴스를 추천해 드립니다.',
    timestamp: new Date()
  },
  {
    id: '4',
    type: 'sent' as const,
    content: '어떤 뉴스가 있나요?',
    timestamp: new Date()
  },
  {
    id: '5',
    type: 'received' as const,
    content: 'AI가 분석한 당신의 관심사에 맞는 뉴스가 준비되어 있어요!',
    timestamp: new Date()
  }
];

export const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: [0.19, 1, 0.22, 1] as const,
  delay: 0.3
}; 