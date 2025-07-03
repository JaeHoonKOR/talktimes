'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { NewsItem } from '../types';
import { NewsPreviewProps } from '../types/sections';

// 샘플 뉴스 데이터
const sampleNewsData: NewsItem[] = [
  {
    id: 'sample1',
    title: '삼성전자, 차세대 인공지능 반도체 개발 발표',
    excerpt: '삼성전자가 메모리와 AI를 결합한 차세대 반도체 개발을 발표했습니다. 이번 기술은 기존 대비 전력 효율이 40% 향상되었으며, 내년 초부터 생산 예정입니다.',
    category: '기술',
    imageUrl: 'https://via.placeholder.com/300x200?text=Samsung+AI+Chip',
    publishedAt: '2024-01-20T09:00:00Z',
    source: '테크뉴스'
  },
  {
    id: 'sample2',
    title: '한국은행, 기준금리 동결 결정',
    excerpt: '한국은행 금융통화위원회가 기준금리를 현 수준에서 동결하기로 결정했습니다. 이는 글로벌 경제 불확실성과 국내 물가 안정을 고려한 결정입니다.',
    category: '경제',
    imageUrl: 'https://via.placeholder.com/300x200?text=Bank+of+Korea',
    publishedAt: '2024-01-19T14:30:00Z',
    source: '경제일보'
  },
  {
    id: 'sample3',
    title: '네이버, 생성형 AI 서비스 출시',
    excerpt: '네이버가 한국어에 최적화된 생성형 AI 서비스를 정식 출시했습니다. 국내 데이터로 훈련된 이 모델은 국내 환경에 맞는 응답을 제공합니다.',
    category: '기술',
    imageUrl: 'https://via.placeholder.com/300x200?text=Naver+AI',
    publishedAt: '2024-01-18T11:15:00Z',
    source: 'IT뉴스'
  }
];

// 애니메이션 variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      mass: 1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10, 
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    } 
  }
};

// 버튼 애니메이션 variants
const buttonVariants = {
  inactive: { scale: 1, boxShadow: "0px 1px 2px rgba(0,0,0,0.1)" },
  active: { 
    scale: 1.05, 
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

export default function NewsPreview({ initialNews }: NewsPreviewProps) {
  const [news, setNews] = useState(initialNews.length > 0 ? initialNews : sampleNewsData);
  const [viewMode, setViewMode] = useState<'email' | 'kakao'>('email');
  const containerRef = useRef<HTMLDivElement>(null);
  const emailBtnRef = useRef<HTMLButtonElement>(null);
  const kakaoBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // initialNews가 비어있으면 샘플 데이터 사용
    if (initialNews.length === 0) {
      console.log('샘플 뉴스 데이터를 사용합니다.');
    }

    // GSAP 애니메이션 설정
    if (containerRef.current) {
      gsap.set(containerRef.current, { 
        willChange: "transform, opacity",
        perspective: 1000,
        backfaceVisibility: "hidden"
      });
    }
  }, [initialNews]);

  // 모드 전환 시 GSAP 애니메이션 적용
  useEffect(() => {
    if (viewMode === 'email' && emailBtnRef.current && kakaoBtnRef.current) {
      gsap.to(emailBtnRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" });
      gsap.to(kakaoBtnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    } else if (viewMode === 'kakao' && emailBtnRef.current && kakaoBtnRef.current) {
      gsap.to(kakaoBtnRef.current, { scale: 1.05, duration: 0.2, ease: "power2.out" });
      gsap.to(emailBtnRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    }
  }, [viewMode]);

  const handleModeSwitch = (mode: 'email' | 'kakao') => {
    if (mode === viewMode) return;
    setViewMode(mode);
  };

  // 카카오톡 인터페이스
  const KakaoInterface = () => (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm mx-auto">
      {/* 카카오톡 상단 바 */}
      <div className="bg-yellow-400 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button className="text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">뉴</span>
            </div>
            <span className="font-medium text-gray-800">뉴스직송</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 카카오톡 채팅 영역 */}
      <div className="h-96 bg-blue-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* 시간 표시 */}
          <div className="text-center">
            <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
              2024년 1월 20일 오전 7:00
            </span>
          </div>

          {/* 뉴스직송 봇 메시지 */}
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">뉴</span>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-xs">
                <p className="text-sm text-gray-800">
                  안녕하세요! 📰<br/>
                  오늘의 맞춤형 뉴스를 전해드립니다
                </p>
              </div>
              <span className="text-xs text-gray-500 ml-2">오전 7:00</span>
            </div>
        </div>

          {/* 뉴스 카드들 */}
          {news.slice(0, 2).map((item, index) => (
            <div key={item.id} className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">뉴</span>
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-xs">
                  <div className="relative h-32 mb-2 rounded-lg overflow-hidden">
                <Image
                  src={item.imageUrl || "https://via.placeholder.com/300x200?text=News"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 200px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiB2aWV3Qm94PSIwIDAgNDAwIDIyNSI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                  priority={index < 2}
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-xs font-medium px-2 py-1 bg-black/70 text-white rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {item.excerpt}
                  </p>
                  <button className="text-xs text-blue-600 font-medium">
                    자세히 보기 →
                  </button>
                </div>
                <span className="text-xs text-gray-500 ml-2">오전 7:0{index + 1}</span>
              </div>
            </div>
          ))}

          {/* 더보기 메시지 */}
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">뉴</span>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-2xl rounded-tl-sm p-3 shadow-sm max-w-xs">
                <p className="text-sm text-gray-800">
                  더 많은 뉴스는 앱에서 확인하세요! 📱
                </p>
                <button className="mt-2 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                  앱에서 보기
                </button>
              </div>
              <span className="text-xs text-gray-500 ml-2">오전 7:03</span>
            </div>
          </div>
        </div>
      </div>

      {/* 카카오톡 입력창 */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          <button className="text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
            <input 
              type="text" 
              placeholder="메시지를 입력하세요" 
              className="w-full bg-transparent text-sm outline-none"
              disabled
            />
          </div>
          <button className="text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  // Gmail 인터페이스
  const GmailInterface = () => (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
      {/* Gmail 스타일 상단 바 */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <span className="text-lg font-medium text-gray-800">Gmail</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Gmail 스타일 사이드바와 메인 콘텐츠 */}
      <div className="flex">
        {/* 사이드바 */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <button className="w-full bg-blue-600 text-white rounded-full py-3 px-6 font-medium mb-6 hover:bg-blue-700 transition-colors">
            + 작성하기
          </button>
          
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <span className="font-medium">받은편지함</span>
              <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-1 rounded-full">1</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>중요</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>다시 알림</span>
            </div>
            <div className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span>보낸편지함</span>
            </div>
          </nav>
        </div>

        {/* 메인 이메일 콘텐츠 */}
        <div className="flex-1 bg-white">
          {/* 이메일 헤더 */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">뉴</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">뉴스직송 (JikSong)</h3>
                  <p className="text-sm text-gray-600">newsletter@jiksong.com</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('ko-KR')} 오전 7:00
              </div>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              📰 오늘의 맞춤형 뉴스 다이제스트
            </h1>
            <p className="text-gray-600">
              안녕하세요! 오늘도 당신을 위해 엄선한 뉴스를 전해드립니다.
            </p>
          </div>

          {/* 이메일 본문 */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                오늘의 주요 뉴스
              </h2>
              
              <div className="space-y-6">
                {news.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`px-6 py-4 border-t border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors ${index === 0 ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">뉴</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-medium text-gray-900">뉴스직송</p>
                              <span className="text-xs text-gray-500">{new Date().toLocaleDateString('ko-KR')} 오전 7:00</span>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-1">
                              <span className="font-medium">오늘의 맞춤형 뉴스</span>: {item.title}
                            </p>
                          </div>
                        </div>
                        <div className="pl-10">
                          <div className="flex mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                              <p className="text-gray-700 text-sm mb-3">{item.excerpt}</p>
                              <div className="mb-2">
                                <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded-full mr-2">
                                  {item.category}
                                </span>
                                <span className="text-xs text-gray-500">출처: {item.source}</span>
                              </div>
                            </div>
                            <div className="w-32 h-24 relative flex-shrink-0">
                              <Image
                                src={item.imageUrl || "https://via.placeholder.com/300x200?text=News"}
                                alt={item.title}
                                fill
                                className="object-cover rounded-md"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 200px"
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiB2aWV3Qm94PSIwIDAgNDAwIDIyNSI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyMjUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                                priority={index < 2}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-medium hover:bg-blue-700 transition-colors">
                              자세히 보기
                            </button>
                            <button className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium hover:bg-gray-300 transition-colors">
                              저장
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 이메일 푸터 */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  이 뉴스레터가 도움이 되셨나요?
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                    👍 좋아요
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors">
                    설정 변경
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  뉴스직송 | newsletter@jiksong.com | 구독 취소
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 전환 버튼 */}
      <div className="flex justify-center">
        <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
          <div className="flex space-x-1">
            <motion.button
              ref={emailBtnRef}
              onClick={() => handleModeSwitch('email')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium ${
                viewMode === 'email'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              variants={buttonVariants}
              animate={viewMode === 'email' ? 'active' : 'inactive'}
              whileHover={{ scale: viewMode === 'email' ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: "transform" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>이메일</span>
            </motion.button>
            <motion.button
              ref={kakaoBtnRef}
              onClick={() => handleModeSwitch('kakao')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium ${
                viewMode === 'kakao'
                  ? 'bg-yellow-400 text-gray-800'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              variants={buttonVariants}
              animate={viewMode === 'kakao' ? 'active' : 'inactive'}
              whileHover={{ scale: viewMode === 'kakao' ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: "transform" }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>카카오톡</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 인터페이스 컨테이너 */}
      <div ref={containerRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="will-change-transform"
            style={{ 
              willChange: "transform, opacity",
              backfaceVisibility: "hidden"
            }}
          >
            {viewMode === 'email' ? <GmailInterface /> : <KakaoInterface />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 