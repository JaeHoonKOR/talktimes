'use client';

import Image from 'next/image';
import { useState } from 'react';
import { NewsItem } from '../api/news';

interface NewsPreviewProps {
  initialNews: NewsItem[];
}

export default function NewsPreview({ initialNews }: NewsPreviewProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  // 최신 뉴스 가져오기 - 클라이언트 사이드에서 실행 (선택적)
  // useEffect(() => {
  //   const fetchLatestNews = async () => {
  //     try {
  //       const response = await fetch('/api/news-data');
  //       const data = await response.json();
  //       if (data && Array.isArray(data.news)) {
  //         setNews(data.news);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching latest news:', error);
  //     }
  //   };
  //   fetchLatestNews();
  // }, []);

  return (
    <section id="preview" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="heading-2">뉴스 직송 미리보기</h2>
          <p className="mt-4 text-xl text-gray-600">이런 뉴스들을 직송 받아보실 수 있습니다</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="newsletter-preview">
            <div className="flex items-center border-b border-gray-100 pb-4 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">오늘의 뉴스 다이제스트</h3>
                <p className="text-gray-500 text-sm">{new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}</p>
              </div>
            </div>

            <div className="space-y-8">
              {news.map((item) => (
                <div key={item.id} className="news-item">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 96px, 128px"
                      className="object-cover"
                      loading="lazy"
                      quality={85}
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{item.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 