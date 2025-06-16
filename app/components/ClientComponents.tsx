'use client';

import dynamic from 'next/dynamic';

// 동적 로드할 컴포넌트 (클라이언트 사이드에서만 렌더링)
export const TopicSelectorClient = dynamic(() => import('./TopicSelectorClient'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-100 rounded-xl h-96"></div>
});

// 다른 클라이언트 컴포넌트들 필요하면 여기에 추가 