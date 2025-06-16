'use client';

import React, { useCallback, useMemo } from 'react';
import { TopicSelectorProps } from '../types';

const TopicSelector: React.FC<TopicSelectorProps> = ({ 
  topics, 
  onTopicsSelected, 
  selectedTopics = [] 
}) => {
  // 토픽 선택/해제 핸들러
  const handleTopicToggle = useCallback((topicTitle: string) => {
    const newSelectedTopics = selectedTopics.includes(topicTitle)
      ? selectedTopics.filter(topic => topic !== topicTitle)
      : [...selectedTopics, topicTitle];
    
    onTopicsSelected(newSelectedTopics);
  }, [selectedTopics, onTopicsSelected]);

  // 선택된 토픽 개수 메모이제이션
  const selectedCount = useMemo(() => selectedTopics.length, [selectedTopics]);

  // 토픽 버튼 렌더링 최적화
  const renderTopicButton = useCallback((topic: typeof topics[0]) => {
    const isSelected = selectedTopics.includes(topic.title);
    
    return (
      <button
        key={topic.title}
        onClick={() => handleTopicToggle(topic.title)}
        className={`
          relative p-6 rounded-2xl border-2 transition-all duration-300 group
          ${isSelected 
            ? 'border-[#3B82F6] bg-[#3B82F6]/10 shadow-lg scale-105' 
            : 'border-[#E5E7EB] bg-[#FFFFFF] dark:bg-[#181818] hover:border-[#3B82F6]/50 hover:shadow-md hover:scale-102'
          }
        `}
        aria-pressed={isSelected}
        aria-label={`${topic.title} 토픽 ${isSelected ? '선택됨' : '선택'}`}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className={`
            p-3 rounded-xl transition-colors duration-300
            ${isSelected 
              ? 'bg-[#3B82F6]/10 text-[#3B82F6]' 
              : 'bg-[#EFEFEF] dark:bg-[#2C2C2E] text-[#4B5563] dark:text-[#9CA3AF] group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6]'
            }
          `}>
            {topic.icon({ className: "w-8 h-8" })}
          </div>
          <span className={`
            font-semibold text-lg transition-colors duration-300
            ${isSelected 
              ? 'text-[#3B82F6]' 
              : 'text-[#121212] dark:text-[#F0F0F0] group-hover:text-[#3B82F6]'
            }
          `}>
            {topic.title}
          </span>
        </div>
        
        {/* 선택 표시 */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        )}
      </button>
    );
  }, [selectedTopics, handleTopicToggle]);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          관심 있는 토픽을 선택해주세요
        </h3>
        <p className="text-gray-600">
          선택한 토픽: <span className="font-semibold text-[#3B82F6]">{selectedCount}개</span>
        </p>
      </div>

      {/* 토픽 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topics.map(renderTopicButton)}
      </div>

      {/* 선택 완료 안내 */}
      {selectedCount > 0 && (
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">
            ✅ {selectedCount}개의 토픽이 선택되었습니다
          </p>
        </div>
      )}
    </div>
  );
};

export default React.memo(TopicSelector); 