"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroContentProps {
  className?: string;
}

export default function HeroContent({ className = '' }: HeroContentProps) {
  return (
    <div className={`text-center ${className}`}>
      <motion.h1
        className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        AI가 선별한
        <br />
        <span className="text-blue-200">맞춤형 뉴스</span>
      </motion.h1>
      
      <motion.p
        className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        관심사에 맞는 뉴스만 골라서 전해드리는
        <br />
        지능형 뉴스 큐레이션 서비스
      </motion.p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/#personalization"
            className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
          >
            지금 시작하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/#preview"
            className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            뉴스 미리보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 