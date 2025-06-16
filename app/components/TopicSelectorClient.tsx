'use client';

import React, { useState } from 'react';
import TopicSelector from './TopicSelector';

// 토픽 인터페이스
interface Topic {
  title: string;
  icon: ({ className }: { className: string }) => React.ReactNode;
}

interface TopicSelectorClientProps {
  topics?: Topic[];
  onTopicsSelected?: (topics: string[]) => void;
}

export default function TopicSelectorClient({ 
  topics = [], 
  onTopicsSelected 
}: TopicSelectorClientProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  // 토픽 선택 처리
  const handleTopicsSelected = (topics: string[]) => {
    setSelectedTopics(topics);
    if (onTopicsSelected) {
      onTopicsSelected(topics);
    }
  };

  return (
    <div>
      {topics.length > 0 && (
        <TopicSelector topics={topics} onTopicsSelected={handleTopicsSelected} />
      )}
    </div>
  );
} 