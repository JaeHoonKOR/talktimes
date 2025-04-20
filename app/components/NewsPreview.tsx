'use client';

import Image from 'next/image';
import { useState } from 'react';
import { NewsItem } from '../api/news';

interface NewsPreviewProps {
  initialNews: NewsItem[];
}

export default function NewsPreview({ initialNews }: NewsPreviewProps) {
  const [news, setNews] = useState(initialNews);

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
    <section className="py-8">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="heading-2">뉴스 직송 미리보기</h2>
          <p className="mt-3 text-lg text-gray-600">
            매일 아침 이런 뉴스를 받아보실 수 있습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{item.publishedAt}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 