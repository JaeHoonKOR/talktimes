'use client';

import { usePersonalization } from '../contexts/PersonalizationContext';
import ClientKeywordManager from './ClientKeywordManager';

export default function KeywordManagerRenderer() {
  const { state } = usePersonalization();
  
  return (
    <div>
      {state.selectedTopics.length === 0 && (
        <div className="bg-amber-50 p-4 mb-6 rounded-lg border border-amber-200">
          <p className="text-amber-800 text-center">위의 관심 토픽을 먼저 선택하시면 더 맞춤화된 서비스를 이용하실 수 있습니다.</p>
        </div>
      )}
      
      <ClientKeywordManager selectedTopics={state.selectedTopics} />
    </div>
  );
} 