import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getAISummaries, getLatestNews } from './api/news';

// Next.js 15의 ISR 설정
export const revalidate = 3600; // 1시간마다 재검증

// 동적으로 로드되는 컴포넌트
const NewsPreview = dynamic(() => import('./components/NewsPreview'), {
  loading: () => <div className="p-6 text-center">뉴스 섹션 로딩 중...</div>,
  ssr: true, // 서버에서 사전 렌더링 (SSR)
});

const AISummarySection = dynamic(() => import('./components/AISummarySection'), {
  loading: () => <div className="p-6 text-center">AI 요약 섹션 로딩 중...</div>,
  ssr: true, // 서버에서 사전 렌더링 (SSR)
});

// 뉴스레터 기능 인터페이스
interface FeatureWithIcon {
  title: string;
  description: string;
  points: string[];
  icon: ({ className }: { className: string }) => React.ReactNode;
}

// 콘텐츠 소스 인터페이스
interface ContentSource {
  name: string;
  description: string;
  icon: ({ className }: { className: string }) => React.ReactNode;
}

// 커스터마이징 옵션 인터페이스
interface CustomOption {
  title: string;
  description: string;
  icon: ({ className }: { className: string }) => React.ReactNode;
}

// AI 요약 인터페이스
interface AISummary {
  source: string;
  time: string;
  title: string;
  summary: string;
}

export default async function Home() {
  // 서버에서 데이터 가져오기
  const newsData = await getLatestNews();
  const summaryData = await getAISummaries();
  
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
        <div className="container relative pt-24 pb-20">
          <div className="text-center">
            <h1 className="heading-1 text-gray-900">
              <span className="text-indigo-600">뉴스직송</span> JikSend
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              딱 당신 취향, 바로 도착. 관심있는 뉴스와 토픽을 선택하면 
              매일 아침 당신만의 뉴스를 직송해 드립니다.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary">
                무료로 시작하기
              </Link>
              <Link href="#preview" className="btn-secondary">
                뉴스레터 샘플 보기
              </Link>
            </div>
            <div className="mt-16 relative max-w-3xl mx-auto">
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-indigo-100 to-indigo-50 rounded-2xl transform rotate-1"></div>
              <div className="card relative z-10 overflow-hidden">
                <Image 
                  src="https://i.imgur.com/tT9VAZF.png" 
                  alt="뉴스레터 미리보기" 
                  width={1200}
                  height={800}
                  className="w-full h-auto rounded-t-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900">어떻게 작동하나요?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              3단계로 뉴스 직송 서비스를 설정하고 받아보세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-indigo-600">{index + 1}</span>
                </div>
                <h3 className="heading-3 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2">관심 토픽 선택</h2>
            <p className="mt-4 text-xl text-gray-600">
              다양한 토픽 중에서 관심있는 분야를 선택하세요
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <div key={index} className="card p-6 text-center hover:border-indigo-300 cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <topic.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-bold mb-2">{topic.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section - NewsPreview 컴포넌트로 대체 */}
      <NewsPreview initialNews={newsData} />
      
      {/* Newsletter Features */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2">맞춤형 뉴스직송 기능</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              세상의 소식을 직송합니다. 원하는 정보만 골라 받을 수 있는 다양한 기능을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsletterFeatures.map((feature, index) => (
              <div key={index} className="testimonial-card group">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full
                                flex items-center justify-center mb-6
                                group-hover:bg-indigo-600 group-hover:text-white
                                transition-colors duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="heading-3 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2 text-gray-600 mt-auto">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Source Integration */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2">다양한 콘텐츠 소스 통합</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              여러 플랫폼의 콘텐츠를 한 곳에서 모아보세요
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {contentSources.map((source, index) => (
              <div key={index} className="topic-card group">
                <div className="topic-icon">
                  <source.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{source.name}</h3>
                <p className="text-gray-600 text-sm">{source.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="section bg-indigo-50">
        <div className="container">
          <div className="grid md:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="heading-2 mb-6">완벽한 커스터마이징</h2>
              <p className="text-lg text-gray-600 mb-8">
                뉴스는 기다리는 게 아닙니다. 원하는 뉴스만 받아볼 수 있도록 다양한 설정 옵션을 제공합니다.
                키워드 필터링, 발송 시간 설정, 콘텐츠 우선순위 등을 자유롭게 조정하세요.
              </p>
              <ul className="space-y-4">
                {customizationOptions.map((option, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <option.icon className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{option.title}</h3>
                      <p className="text-gray-600">{option.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -translate-x-8 translate-y-8 -rotate-6 bg-indigo-200 rounded-xl"></div>
              <div className="relative bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-10">
                <div className="bg-indigo-600 text-white p-4">
                  <h3 className="font-bold text-lg">맞춤 설정</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">관심 키워드</label>
                    <div className="flex flex-wrap gap-2">
                      {["인공지능", "웹개발", "클라우드", "빅데이터", "사이버보안"].map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">수신 시간</label>
                    <div className="flex items-center justify-between border border-gray-200 p-4 rounded-lg">
                      <span className="font-medium">매일 아침 8시</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">콘텐츠 길이</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input id="short" name="length" type="radio" className="h-4 w-4 text-indigo-600 border-gray-300" defaultChecked />
                        <label htmlFor="short" className="ml-2 text-sm text-gray-700">짧게 (5분 읽기)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="medium" name="length" type="radio" className="h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="medium" className="ml-2 text-sm text-gray-700">중간 (10분 읽기)</label>
                      </div>
                      <div className="flex items-center">
                        <input id="long" name="length" type="radio" className="h-4 w-4 text-indigo-600 border-gray-300" />
                        <label htmlFor="long" className="ml-2 text-sm text-gray-700">길게 (20분 읽기)</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Summary Section - AISummarySection 컴포넌트로 대체 */}
      <AISummarySection initialSummaries={summaryData} />

      {/* CTA Section */}
      <section className="section bg-indigo-50">
        <div className="container text-center">
          <h2 className="heading-2 mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            매일 아침, 나에게 꼭 필요한 뉴스를 직송 받아보세요.
            <span className="font-bold text-indigo-600"> 완전 무료로 제공됩니다!</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              회원가입하기
            </Link>
            <Link href="/login" className="btn-secondary inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
              </svg>
              로그인하기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container">
          <div className="text-center">
            <h2 className="font-bold text-xl text-gray-900 mb-2">뉴스직송 JikSend</h2>
            <p className="text-gray-500 mb-6">세상의 소식을 직송합니다. 완전 무료 맞춤형 뉴스 서비스</p>
            <p className="text-gray-400 text-sm">© 2024 JikSend. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

const steps = [
  {
    title: '관심사 선택',
    description: '기술, 경제, 생활, 스포츠 등 관심있는 분야를 선택하세요.',
  },
  {
    title: '카카오톡 연결',
    description: '카카오톡 채널을 추가하고 간단한 설정을 완료하세요.',
  },
  {
    title: '매일 뉴스 받기',
    description: '매일 아침, 선별된 최고의 뉴스를 카카오톡으로 받아보세요.',
  },
]

const topics = [
  {
    title: '기술',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: '경제',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '정치',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    title: '문화',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    ),
  },
  {
    title: '스포츠',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    title: '과학',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    title: '건강',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: '엔터',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
      </svg>
    ),
  },
]

// 뉴스레터 기능 데이터
const newsletterFeatures: FeatureWithIcon[] = [
  {
    title: '개인화된 콘텐츠',
    description: '원하는 정보만 골라 받을 수 있는 다양한 기능을 제공합니다',
    points: [
      '원하는 토픽 선택',
      '맞춤형 뉴스 추천',
      '개인화된 콘텐츠 제공',
    ],
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: '다양한 소스 통합',
    description: '여러 플랫폼의 콘텐츠를 한 곳에서 모아보세요',
    points: [
      '다양한 소스 통합',
      '최신 뉴스 및 트렌드 파악',
      '커뮤니티와의 연결',
    ],
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
  },
  {
    title: '커스터마이징 옵션',
    description: '원하는 뉴스만 받아볼 수 있도록 다양한 설정 옵션을 제공합니다',
    points: [
      '키워드 필터링',
      '발송 시간 설정',
      '콘텐츠 우선순위 설정',
    ],
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
      </svg>
    ),
  },
]

// 콘텐츠 소스 데이터
const contentSources: ContentSource[] = [
  {
    name: '카카오톡',
    description: '카카오톡을 통해 뉴스를 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    name: '네이버',
    description: '네이버를 통해 뉴스를 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: '트위터',
    description: '트위터를 통해 뉴스를 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    name: '이메일',
    description: '이메일을 통해 뉴스를 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

// 커스터마이징 옵션 데이터
const customizationOptions: CustomOption[] = [
  {
    title: '관심 키워드',
    description: '원하는 키워드를 선택하여 관련된 뉴스만 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: '발송 시간',
    description: '원하는 시간에 뉴스를 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '콘텐츠 길이',
    description: '원하는 길이의 뉴스를 받아보세요',
    icon: ({ className }: { className: string }) => (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
  },
] 