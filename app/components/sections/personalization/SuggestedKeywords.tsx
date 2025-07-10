"use client";

import { Button } from '@/src/components/ui/button';
import { Plus } from 'lucide-react';

interface SuggestedKeywordsProps {
  onKeywordClick: (keyword: string) => void;
  selectedKeywords: string[];
}

const suggestedKeywords = [
  '인공지능', '블록체인', '메타버스', '전기차', '바이오', '핀테크',
  '코로나19', '부동산', '주식', '암호화폐', '기후변화', '우주항공',
  '5G', '반도체', '자율주행', '로봇', 'ESG', '디지털헬스케어'
];

export default function SuggestedKeywords({ onKeywordClick, selectedKeywords }: SuggestedKeywordsProps) {
  const availableKeywords = suggestedKeywords.filter(
    keyword => !selectedKeywords.includes(keyword)
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        추천 키워드
      </h3>
      <div className="flex flex-wrap gap-2">
        {availableKeywords.map((keyword) => (
          <Button
            key={keyword}
            variant="outline"
            size="sm"
            className="text-sm border-gray-300 hover:border-blue-500 hover:text-blue-600"
            onClick={() => onKeywordClick(keyword)}
          >
            <Plus className="w-3 h-3 mr-1" />
            {keyword}
          </Button>
        ))}
      </div>
      {availableKeywords.length === 0 && (
        <p className="text-gray-500 text-sm">
          모든 추천 키워드가 선택되었습니다.
        </p>
      )}
    </div>
  );
} 