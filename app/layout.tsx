import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import Navbar from './components/Navbar'
import Providers from './components/Providers'
import SkipNavigation from './components/SkipNavigation'
import './globals.css'

export const metadata: Metadata = {
  title: '뉴스직송 JikSong | AI 맞춤형 뉴스 큐레이션',
  description: '🚀 딱 당신 취향, 바로 도착! AI가 엄선한 맞춤형 뉴스를 매일 아침 직송해드립니다. 평생 무료, 광고 없음, 개인화 완벽.',
  keywords: '뉴스, 맞춤형 뉴스, AI 뉴스, 뉴스레터, 개인화, 뉴스 큐레이션, 뉴스직송, JikSong',
  authors: [{ name: '뉴스직송 팀' }],
  creator: '뉴스직송 JikSong',
  publisher: '뉴스직송 JikSong',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://jiksong.com',
    title: '뉴스직송 JikSong | AI 맞춤형 뉴스 큐레이션',
    description: '🚀 딱 당신 취향, 바로 도착! AI가 엄선한 맞춤형 뉴스를 매일 아침 직송해드립니다.',
    siteName: '뉴스직송 JikSong',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '뉴스직송 JikSong - AI 맞춤형 뉴스 서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '뉴스직송 JikSong | AI 맞춤형 뉴스 큐레이션',
    description: '🚀 딱 당신 취향, 바로 도착! AI가 엄선한 맞춤형 뉴스를 매일 아침 직송해드립니다.',
    images: ['/og-image.png'],
    creator: '@jiksong_news',
  },
  icons: {
    icon: [
      { url: '/logos/mainlogo.png', type: 'image/png', sizes: '32x32' },
      { url: '/logos/mainlogo.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/logos/mainlogo.png',
    apple: [
      { url: '/logos/mainlogo.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/logos/mainlogo.png',
      },
    ],
  },
  manifest: '/manifest.json',
  category: 'news',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#667eea',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm203Tq4JJWq209pU0DPdWuqxJFA4GNDCBYtw.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="뉴스직송" />
        <meta name="theme-color" content="#667eea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="뉴스직송" />
        <meta name="msapplication-navbutton-color" content="#667eea" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
      </head>
      <body className="antialiased">
        <SkipNavigation />
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          strategy="beforeInteractive"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
        />
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main id="main-content" className="flex-grow pt-16">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
} 