'use client';

import { useState } from 'react';
import { AISummary } from '../api/news';

interface AISummarySectionProps {
  initialSummaries: AISummary[];
}

export default function AISummarySection({ initialSummaries }: AISummarySectionProps) {
  const [summaries, setSummaries] = useState<AISummary[]>(initialSummaries);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2">AI로 요약된 뉴스</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            읽기 전에 도착하는 뉴스. 최신 AI 기술로 뉴스를 자동 요약하고 핵심만 전달합니다
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">오늘의 AI 요약</h3>
                    <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })} 요약 - AI로 생성됨</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">
                    GPT 요약
                  </span>
                </div>
              </div>
              
              <div className="space-y-6">
                {summaries.map((summary) => (
                  <div key={summary.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md">{summary.source}</span>
                      <span className="text-xs font-medium text-gray-500">{summary.time}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{summary.title}</h4>
                    <div className="mb-3">
                      <div className="text-sm text-gray-700 leading-relaxed">{summary.summary}</div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <a href="#" className="flex items-center text-indigo-600 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                        </svg>
                        원문 읽기
                      </a>
                      <a href="#" className="flex items-center text-gray-500 hover:text-indigo-600 hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        더 자세히
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <a href="#" className="btn-primary px-8 py-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  모든 뉴스 요약 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 