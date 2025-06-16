'use client';

import { AVAILABLE_TOPICS } from '../constants/topics';
import { usePersonalization } from '../contexts/PersonalizationContext';
import TopicSelector from './TopicSelector';

export default function ClientTopicRenderer() {
  const { state, setTopics } = usePersonalization();

  return (
    <TopicSelector 
      topics={AVAILABLE_TOPICS} 
      onTopicsSelected={setTopics}
      selectedTopics={state.selectedTopics}
    />
  );
} 