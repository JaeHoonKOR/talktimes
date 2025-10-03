"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EyeIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon 
} from '@heroicons/react/24/solid';

interface AccessibilityControlsProps {
  className?: string;
}

export default function AccessibilityControls({ className = '' }: AccessibilityControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  // 시스템 설정 감지
  useEffect(() => {
    // prefers-reduced-motion 감지
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    motionQuery.addEventListener('change', handleMotionChange);
    
    // localStorage에서 설정 불러오기
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setHighContrast(settings.highContrast || false);
      setFontSize(settings.fontSize || 100);
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // 설정 저장
  useEffect(() => {
    const settings = {
      reducedMotion,
      highContrast,
      fontSize
    };
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // 전역 CSS 변수 적용
    document.documentElement.style.setProperty('--font-size-scale', `${fontSize}%`);
    
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    if (reducedMotion) {
      document.body.classList.add('reduce-motion');
    } else {
      document.body.classList.remove('reduce-motion');
    }
  }, [reducedMotion, highContrast, fontSize]);

  const handleReducedMotionToggle = () => {
    setReducedMotion(!reducedMotion);
  };

  const handleHighContrastToggle = () => {
    setHighContrast(!highContrast);
  };

  const handleFontSizeChange = (newSize: number) => {
    if (newSize >= 75 && newSize <= 150) {
      setFontSize(newSize);
    }
  };

  return (
    <>
      {/* 접근성 패널 토글 버튼 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-40 flex items-center justify-center transition-colors ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="접근성 설정 열기"
        title="접근성 설정"
      >
        <AdjustmentsHorizontalIcon className="w-6 h-6" />
      </motion.button>

      {/* 접근성 패널 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 백드롭 */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* 접근성 패널 */}
            <motion.div
              className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* 헤더 */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  ♿ 접근성 설정
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="접근성 패널 닫기"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* 설정 항목들 */}
              <div className="p-6 space-y-6">
                
                {/* 애니메이션 줄이기 */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <div className="flex-shrink-0">
                        {reducedMotion ? (
                          <SpeakerXMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                          <SpeakerWaveIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          애니메이션 줄이기
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          화면 움직임을 최소화합니다
                        </p>
                      </div>
                    </label>
                  </div>
                  <motion.button
                    onClick={handleReducedMotionToggle}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      reducedMotion ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: reducedMotion ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                {/* 고대비 모드 */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <div className="flex-shrink-0">
                        <EyeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          고대비 모드
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          텍스트와 배경 대비를 높입니다
                        </p>
                      </div>
                    </label>
                  </div>
                  <motion.button
                    onClick={handleHighContrastToggle}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      highContrast ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                      animate={{ x: highContrast ? 24 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.button>
                </div>

                {/* 글자 크기 조절 */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      글자 크기
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({fontSize}%)
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleFontSizeChange(fontSize - 25)}
                      disabled={fontSize <= 75}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      A-
                    </button>
                    
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${((fontSize - 75) / 75) * 100}%` }}
                      />
                    </div>
                    
                    <button
                      onClick={() => handleFontSizeChange(fontSize + 25)}
                      disabled={fontSize >= 150}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      A+
                    </button>
                  </div>
                  
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => handleFontSizeChange(100)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      기본값으로 초기화
                    </button>
                  </div>
                </div>

                {/* 정보 섹션 */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                    💡 접근성 도움말
                  </h4>
                  <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                    <li>• Tab 키로 요소 간 이동 가능</li>
                    <li>• Enter/Space로 버튼 활성화</li>
                    <li>• 설정은 브라우저에 자동 저장됩니다</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}