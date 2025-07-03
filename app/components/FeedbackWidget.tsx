'use client';

import { Button } from '@/src/components/ui/button';
import { Textarea } from '@/src/components/ui/textarea';
import { useState } from 'react';
import { useFeedback } from './AnalyticsProvider';

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { submitFeedback } = useFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating !== null) {
      try {
        setSubmitting(true);
        setError(null);
        
        await submitFeedback(rating, comment);
        
        setSubmitted(true);
        setSubmitting(false);
        
        // 3초 후 피드백 폼 리셋
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
          setRating(null);
          setComment('');
        }, 3000);
      } catch (err) {
        setSubmitting(false);
        setError('피드백 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };
  
  const handleCancel = () => {
    setIsOpen(false);
    setRating(null);
    setComment('');
    setError(null);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-[#3B82F6] text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="피드백 남기기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 w-72 z-50 border border-gray-200" role="dialog" aria-labelledby="feedback-title">
      <div className="flex justify-between items-center mb-3">
        <h3 id="feedback-title" className="text-lg font-semibold text-gray-800">피드백</h3>
        <button 
          onClick={handleCancel}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="피드백 창 닫기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {submitted ? (
        <div className="text-center py-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-700 mb-2">피드백을 보내주셔서 감사합니다!</p>
          <p className="text-sm text-gray-500">소중한 의견으로 서비스를 개선하겠습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-600 mb-4">서비스에 대한 만족도를 평가해주세요.</p>
          
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  rating === value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`${value}점`}
                aria-pressed={rating === value}
              >
                {value}
              </button>
            ))}
          </div>
          
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="의견을 자유롭게 남겨주세요 (선택사항)"
            className="w-full mb-4 resize-none"
            rows={3}
            aria-label="피드백 내용"
          />
          
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded text-red-600 text-sm">
              <p>{error}</p>
            </div>
          )}
          
          <div className="flex space-x-2">
            <Button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700"
              disabled={submitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={rating === null || submitting}
              className="flex-1 bg-[#3B82F6] hover:bg-blue-600 text-white"
            >
              {submitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  전송 중
                </div>
              ) : '피드백 보내기'}
            </Button>
          </div>
          
          {rating === null && (
            <p className="text-xs text-center text-gray-500 mt-2">
              별점을 선택해주세요
            </p>
          )}
        </form>
      )}
      
      <div className="text-xs text-gray-400 text-center mt-3">
        <p>더 자세한 의견은 <a href="mailto:support@jiksong.com" className="text-blue-500 hover:underline">support@jiksong.com</a>으로 보내주세요</p>
      </div>
    </div>
  );
} 