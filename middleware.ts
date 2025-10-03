import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

// 지원하는 언어 목록 (next-intl과 동일하게)
const locales = ['ko', 'en'] as const;
const defaultLocale = 'ko';

// next-intl 미들웨어 생성
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
  localePrefix: 'always'
});


// 정적 파일 및 API 경로 제외 패턴
const publicFiles = /\.(.*)$/;
const excludedPaths = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/locales',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 정적 파일이나 제외된 경로는 처리하지 않음
  if (
    publicFiles.test(pathname) ||
    excludedPaths.some(path => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  // next-intl 미들웨어 실행
  const response = intlMiddleware(request);
  
  // 보안 헤더 추가
  if (response) {
    response.headers.set(
      'Content-Security-Policy',
      `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://t1.kakaocdn.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://via.placeholder.com https://i.imgur.com https://imgur.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.jiksong.com; frame-src 'self'; object-src 'none';`
    );
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  }
  
  return response;
}

// 미들웨어 실행 조건 설정
export const config = {
  matcher: [
    /*
     * 다음 경로들은 제외:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|locales|.*\\.).*)$',
  ],
}; 