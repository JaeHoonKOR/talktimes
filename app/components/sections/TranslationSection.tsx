'use client';

import { TranslationService } from '@/app/services/translation/translation.service';
import { Button } from '@/src/components/ui/button';
import { Select } from '@/src/components/ui/select';
import { Textarea } from '@/src/components/ui/textarea';
import { useToast } from '@/src/components/ui/use-toast';
import React, { useCallback, useState } from 'react';

const SUPPORTED_LANGUAGES = [
  { value: 'en', label: '영어' },
  { value: 'ja', label: '일본어' },
  { value: 'zh', label: '중국어' },
  { value: 'es', label: '스페인어' },
  { value: 'fr', label: '프랑스어' },
  { value: 'de', label: '독일어' },
  { value: 'ru', label: '러시아어' },
  { value: 'vi', label: '베트남어' },
  { value: 'id', label: '인도네시아어' },
  { value: 'th', label: '태국어' }
];

export const TranslationSection: React.FC = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const translationService = TranslationService.getInstance();

  const handleTranslate = useCallback(async () => {
    if (!sourceText.trim()) {
      toast({
        title: '번역할 텍스트를 입력해주세요.',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await translationService.translateText(sourceText, targetLang);
      setTranslatedText(result);
      toast({
        title: '번역이 완료되었습니다.',
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: '번역 중 오류가 발생했습니다.',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, targetLang, toast]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">텍스트 번역</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">원본 텍스트</label>
          <Textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="번역할 텍스트를 입력하세요"
            className="min-h-[100px]"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">번역할 언어</label>
            <Select
              value={targetLang}
              onValueChange={setTargetLang}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </Select>
          </div>

          <Button
            onClick={handleTranslate}
            disabled={isLoading || !sourceText.trim()}
            className="self-end"
          >
            {isLoading ? '번역 중...' : '번역하기'}
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">번역 결과</label>
          <Textarea
            value={translatedText}
            readOnly
            placeholder="번역 결과가 여기에 표시됩니다"
            className="min-h-[100px] bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}; 