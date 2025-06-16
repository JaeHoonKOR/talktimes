import { CacheStatus, TranslationService } from '@/app/services/translation/translation.service';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { Input } from '@/src/components/ui/input';
import { useToast } from '@/src/components/ui/use-toast';
import React, { useCallback, useEffect, useState } from 'react';

export const TranslationCacheManager: React.FC = () => {
  const [cacheStatus, setCacheStatus] = useState<CacheStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cleanupDays, setCleanupDays] = useState('30');
  const { toast } = useToast();
  const translationService = TranslationService.getInstance();

  const loadCacheStatus = useCallback(async () => {
    try {
      const status = await translationService.getCacheStatus();
      setCacheStatus(status);
    } catch (error) {
      toast({
        title: '캐시 상태 조회 중 오류가 발생했습니다.',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive'
      });
    }
  }, [toast]);

  useEffect(() => {
    loadCacheStatus();
  }, [loadCacheStatus]);

  const handleCleanupCache = async () => {
    setIsLoading(true);
    try {
      const message = await translationService.cleanupCache(Number(cleanupDays));
      toast({
        title: '캐시 정리 완료',
        description: message,
        variant: 'default'
      });
      loadCacheStatus();
    } catch (error) {
      toast({
        title: '캐시 정리 중 오류가 발생했습니다.',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearLanguageCache = async (targetLang: string) => {
    setIsLoading(true);
    try {
      const message = await translationService.clearLanguageCache(targetLang);
      toast({
        title: '언어별 캐시 삭제 완료',
        description: message,
        variant: 'default'
      });
      loadCacheStatus();
    } catch (error) {
      toast({
        title: '캐시 삭제 중 오류가 발생했습니다.',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAllCache = async () => {
    if (!window.confirm('모든 번역 캐시를 삭제하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const message = await translationService.clearAllCache();
      toast({
        title: '전체 캐시 삭제 완료',
        description: message,
        variant: 'default'
      });
      loadCacheStatus();
    } catch (error) {
      toast({
        title: '캐시 삭제 중 오류가 발생했습니다.',
        description: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!cacheStatus) {
    return <div>캐시 상태를 불러오는 중...</div>;
  }

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">번역 캐시 관리</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">캐시 통계</h3>
          <div className="space-y-2">
            <p>총 번역 수: {cacheStatus.totalTranslations}</p>
            <p>캐시 크기: {cacheStatus.cacheSize.toFixed(2)} MB</p>
            <p>캐시 히트율: {cacheStatus.hitRate.toFixed(2)}%</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">언어별 통계</h3>
          <div className="space-y-2">
            {cacheStatus.languageBreakdown.map((lang) => (
              <div key={lang.targetLang} className="flex justify-between items-center">
                <span>{lang.targetLang}</span>
                <span>{lang._count} 개</span>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleClearLanguageCache(lang.targetLang)}
                  disabled={isLoading}
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">인기 번역</h3>
          <div className="space-y-2">
            {cacheStatus.popularTranslations.map((translation, index) => (
              <div key={index} className="text-sm">
                <p className="font-medium">{translation.sourceText.substring(0, 30)}...</p>
                <p className="text-gray-600">
                  {translation.targetLang} • {translation.usageCount}회 사용
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4 mt-6">
        <div className="flex items-center space-x-4">
          <Input
            type="number"
            value={cleanupDays}
            onChange={(e) => setCleanupDays(e.target.value)}
            min="1"
            max="365"
            className="w-32"
          />
          <span>일 이상 된 캐시 정리</span>
          <Button
            onClick={handleCleanupCache}
            disabled={isLoading}
          >
            정리하기
          </Button>
        </div>

        <Button
          variant="destructive"
          onClick={handleClearAllCache}
          disabled={isLoading}
          className="w-full"
        >
          전체 캐시 삭제
        </Button>
      </div>
    </div>
  );
}; 