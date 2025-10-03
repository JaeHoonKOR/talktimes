"use client";

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageIcon, GlobeAltIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { useMicroInteractions } from '../hooks/useMicroInteractions';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
];

export const TranslationToggle = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  
  const currentLang = languages.find(lang => lang.code === locale) || languages[0];
  const [isOpen, setIsOpen] = useState(false);
  const { getInteractiveProps, triggerHapticFeedback } = useMicroInteractions();

  const handleLanguageChange = (language: Language) => {
    if (language.code === locale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    triggerHapticFeedback({ type: 'selection' });
    
    startTransition(() => {
      // 현재 경로에서 언어 코드를 새로운 언어로 변경
      const segments = pathname.split('/');
      segments[1] = language.code; // 첫 번째 세그먼트가 언어 코드
      const newPath = segments.join('/');
      router.push(newPath);
    });
  };

  return (
    <div className="relative">
      <motion.button
        className="glass-card p-3 flex items-center gap-2 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...getInteractiveProps({
          ripple: { color: 'rgba(59, 130, 246, 0.3)' },
          haptic: { type: 'impact', intensity: 'light' }
        })}
        aria-label="언어 선택"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label={currentLang.name}>
            {currentLang.flag}
          </span>
          <GlobeAltIcon className="w-4 h-4 text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
        </div>
        
        {isPending ? (
          <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        ) : (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </motion.div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 배경 오버레이 */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* 언어 선택 드롭다운 */}
            <motion.div
              className="absolute top-full right-0 mt-2 w-56 glass-card border border-white/20 dark:border-gray-700/20 shadow-xl z-50"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="listbox"
              aria-label="언어 목록"
            >
              <div className="p-2">
                <div className="flex items-center gap-2 p-2 mb-2 border-b border-gray-200 dark:border-gray-700">
                  <LanguageIcon className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {locale === 'ko' ? '언어 선택' : 'Select Language'}
                  </span>
                </div>
                
                {languages.map((language, index) => (
                  <motion.button
                    key={language.code}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                      currentLang.code === language.code
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => handleLanguageChange(language)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    {...getInteractiveProps()}
                    role="option"
                    aria-selected={currentLang.code === language.code}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg" role="img" aria-label={language.name}>
                        {language.flag}
                      </span>
                      <div>
                        <div className="font-medium">{language.nativeName}</div>
                        <div className="text-xs opacity-75">{language.name}</div>
                      </div>
                    </div>
                    {currentLang.code === language.code && (
                      <motion.div
                        className="w-2 h-2 bg-blue-500 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}; 