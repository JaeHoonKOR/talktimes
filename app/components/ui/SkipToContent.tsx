"use client";

import { useSkipToContent } from '../../hooks/useKeyboardNavigation';

export default function SkipToContent() {
  const { skipLinkRef, targetRef, skipToContent } = useSkipToContent();

  return (
    <>
      {/* Skip to content 링크 */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="skip-link"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            skipToContent(e);
          }
        }}
        onClick={(e) => {
          e.preventDefault();
          if (targetRef.current) {
            targetRef.current.focus();
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        메인 콘텐츠로 건너뛰기
      </a>

      {/* 메인 콘텐츠 타겟 */}
      <div
        ref={targetRef}
        id="main-content"
        tabIndex={-1}
        className="sr-only"
        aria-label="메인 콘텐츠 시작"
      />
    </>
  );
}