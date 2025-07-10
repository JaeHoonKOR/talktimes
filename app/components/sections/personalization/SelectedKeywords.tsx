"use client";

import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import { X } from 'lucide-react';

interface SelectedKeywordsProps {
  keywords: string[];
  onDeleteKeyword: (keyword: string) => void;
}

export default function SelectedKeywords({ keywords, onDeleteKeyword }: SelectedKeywordsProps) {
  if (keywords.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>아직 선택된 키워드가 없습니다.</p>
        <p className="text-sm mt-1">위에서 관심 주제를 추가해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">
        선택된 키워드 ({keywords.length})
      </h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <Badge
            key={keyword}
            variant="secondary"
            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
          >
            {keyword}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0 text-blue-600 hover:text-blue-800"
              onClick={() => onDeleteKeyword(keyword)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
} 