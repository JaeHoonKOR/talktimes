"use client";

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface KeywordInputProps {
  onAddKeyword: (keyword: string) => void;
  selectedKeywords: string[];
}

export default function KeywordInput({ onAddKeyword, selectedKeywords }: KeywordInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    
    if (trimmedValue && !selectedKeywords.includes(trimmedValue)) {
      onAddKeyword(trimmedValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="관심 주제를 입력하세요"
        className="flex-1"
      />
      <Button 
        type="submit" 
        size="sm"
        disabled={!inputValue.trim() || selectedKeywords.includes(inputValue.trim())}
        className="px-3"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </form>
  );
} 