"use client";

import { Button } from '@/src/components/ui/button';
import { motion } from 'framer-motion';
import { SectionProps } from '../../../types/sections';
import PersonalizedNewsSection from '../../PersonalizedNewsSection';
import KeywordInput from './KeywordInput';
import SelectedKeywords from './SelectedKeywords';
import SuggestedKeywords from './SuggestedKeywords';
import { usePersonalization } from './hooks/usePersonalization';

export default function PersonalizationSection({ className = '', id = 'personalization' }: SectionProps) {
  const {
    showNewsSection,
    selectedKeywords,
    isLoading,
    error,
    isButtonLoading,
    setIsButtonLoading,
    handleSettingsComplete,
    handleBackToSettings,
    handleKeywordsUpdate,
    handleCloseError,
    handleAddKeyword,
    handleDeleteKeyword,
    handleSuggestedKeywordClick,
  } = usePersonalization();

  const handleGetPersonalizedNews = async () => {
    if (selectedKeywords.length === 0) return;
    
    setIsButtonLoading(true);
    try {
      await handleSettingsComplete(selectedKeywords);
    } catch (err) {
      console.error('뉴스 가져오기 오류:', err);
    } finally {
      setIsButtonLoading(false);
    }
  };

  if (showNewsSection) {
    return (
      <PersonalizedNewsSection
        keywords={selectedKeywords}
        onBackToSettings={handleBackToSettings}
        onKeywordsUpdate={handleKeywordsUpdate}
        onCloseError={handleCloseError}
        error={error}
        isLoading={isLoading}
      />
    );
  }

  return (
    <section
      id={id}
      className={`py-20 bg-white ${className}`}
      data-testid="personalization-section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* 섹션 헤더 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              관심사 설정
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              관심 있는 키워드를 추가하여 맞춤형 뉴스를 받아보세요
            </p>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 왼쪽: 키워드 입력 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">새 관심 주제 추가</h3>
                <KeywordInput
                  onAddKeyword={handleAddKeyword}
                  selectedKeywords={selectedKeywords}
                />
              </div>
              
              <SelectedKeywords
                keywords={selectedKeywords}
                onDeleteKeyword={handleDeleteKeyword}
              />
            </div>

            {/* 오른쪽: 추천 키워드 */}
            <div>
              <SuggestedKeywords
                onKeywordClick={handleSuggestedKeywordClick}
                selectedKeywords={selectedKeywords}
              />
            </div>
          </div>

          {/* CTA 버튼 */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              onClick={handleGetPersonalizedNews}
              disabled={selectedKeywords.length === 0 || isButtonLoading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isButtonLoading ? '처리 중...' : '맞춤형 뉴스 받기'}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 