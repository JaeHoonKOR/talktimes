import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import Script from 'next/script'
import Navbar from './components/Navbar'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: '뉴스직송 JikSong',
  description: '딱 당신 취향, 바로 도착. 관심있는 뉴스와 토픽을 선택하면 매일 아침 당신만의 뉴스를 직송해 드립니다.',
  icons: {
    icon: [
      { url: '/logos/mainlogo.png', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/logos/mainlogo.png',
    apple: '/logos/mainlogo.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logos/mainlogo.png',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          strategy="beforeInteractive"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
        />
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  )
} 