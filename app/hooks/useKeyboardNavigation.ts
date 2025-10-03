"use client";

import { useEffect, useRef, useCallback, useState } from 'react';

interface UseKeyboardNavigationOptions {
  enabled?: boolean;
  loop?: boolean;
  orientation?: 'horizontal' | 'vertical' | 'both';
  selector?: string;
  onItemSelect?: (index: number, element: HTMLElement) => void;
  onEscape?: () => void;
}

interface UseKeyboardNavigationReturn {
  containerRef: React.RefObject<HTMLElement>;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  focusItem: (index: number) => void;
  focusNext: () => void;
  focusPrevious: () => void;
  resetFocus: () => void;
}

export const useKeyboardNavigation = (
  options: UseKeyboardNavigationOptions = {}
): UseKeyboardNavigationReturn => {
  const {
    enabled = true,
    loop = true,
    orientation = 'both',
    selector = '[tabindex], button, a, input, textarea, select',
    onItemSelect,
    onEscape
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // 포커스 가능한 요소들을 찾는 함수
  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    
    const elements = Array.from(
      containerRef.current.querySelectorAll(selector)
    ) as HTMLElement[];
    
    return elements.filter(element => 
      !element.hasAttribute('disabled') &&
      !element.getAttribute('aria-disabled') &&
      element.tabIndex !== -1 &&
      window.getComputedStyle(element).display !== 'none' &&
      window.getComputedStyle(element).visibility !== 'hidden'
    );
  }, [selector]);

  // 특정 인덱스의 요소에 포커스
  const focusItem = useCallback((index: number) => {
    const elements = getFocusableElements();
    if (elements.length === 0) return;

    let targetIndex = index;
    if (loop) {
      targetIndex = ((index % elements.length) + elements.length) % elements.length;
    } else {
      targetIndex = Math.max(0, Math.min(index, elements.length - 1));
    }

    const element = elements[targetIndex];
    if (element) {
      element.focus();
      setCurrentIndex(targetIndex);
      onItemSelect?.(targetIndex, element);
    }
  }, [getFocusableElements, loop, onItemSelect]);

  // 다음 요소로 포커스 이동
  const focusNext = useCallback(() => {
    focusItem(currentIndex + 1);
  }, [currentIndex, focusItem]);

  // 이전 요소로 포커스 이동
  const focusPrevious = useCallback(() => {
    focusItem(currentIndex - 1);
  }, [currentIndex, focusItem]);

  // 포커스 초기화
  const resetFocus = useCallback(() => {
    setCurrentIndex(-1);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !containerRef.current) return;

    const elements = getFocusableElements();
    if (elements.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault();
          focusNext();
        }
        break;
        
      case 'ArrowUp':
        if (orientation === 'vertical' || orientation === 'both') {
          event.preventDefault();
          focusPrevious();
        }
        break;
        
      case 'ArrowRight':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault();
          focusNext();
        }
        break;
        
      case 'ArrowLeft':
        if (orientation === 'horizontal' || orientation === 'both') {
          event.preventDefault();
          focusPrevious();
        }
        break;
        
      case 'Home':
        event.preventDefault();
        focusItem(0);
        break;
        
      case 'End':
        event.preventDefault();
        focusItem(elements.length - 1);
        break;
        
      case 'Enter':
      case ' ':
        if (currentIndex >= 0 && currentIndex < elements.length) {
          event.preventDefault();
          const element = elements[currentIndex];
          if (element) {
            element.click();
            onItemSelect?.(currentIndex, element);
          }
        }
        break;
        
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        resetFocus();
        break;
    }
  }, [enabled, getFocusableElements, orientation, focusNext, focusPrevious, focusItem, currentIndex, onItemSelect, onEscape, resetFocus]);

  // 포커스 이벤트 핸들러
  const handleFocus = useCallback((event: FocusEvent) => {
    if (!enabled || !containerRef.current) return;

    const elements = getFocusableElements();
    const targetElement = event.target as HTMLElement;
    const index = elements.indexOf(targetElement);
    
    if (index >= 0) {
      setCurrentIndex(index);
    }
  }, [enabled, getFocusableElements]);

  // 이벤트 리스너 등록
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('keydown', handleKeyDown);
    container.addEventListener('focusin', handleFocus);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('focusin', handleFocus);
    };
  }, [enabled, handleKeyDown, handleFocus]);

  return {
    containerRef,
    currentIndex,
    setCurrentIndex,
    focusItem,
    focusNext,
    focusPrevious,
    resetFocus
  };
};

// 모달/드롭다운을 위한 포커스 트랩 훅
export const useFocusTrap = (
  isActive: boolean = false
) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // 첫 번째 요소에 포커스
    firstElement?.focus();

    container.addEventListener('keydown', handleTabKey);

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return { containerRef };
};

// Skip to content 링크를 위한 훅
export const useSkipToContent = () => {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const targetRef = useRef<HTMLElement>(null);

  const skipToContent = useCallback((event: React.KeyboardEvent) => {
    event.preventDefault();
    if (targetRef.current) {
      targetRef.current.focus();
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    skipLinkRef,
    targetRef,
    skipToContent
  };
};

// 그리드 내비게이션을 위한 훅
export const useGridNavigation = (
  columns: number,
  options: Omit<UseKeyboardNavigationOptions, 'orientation'> = {}
) => {
  const {
    enabled = true,
    loop = false,
    selector = '[tabindex], button, a',
    onItemSelect,
    onEscape
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return [];
    
    const elements = Array.from(
      containerRef.current.querySelectorAll(selector)
    ) as HTMLElement[];
    
    return elements.filter(element => 
      !element.hasAttribute('disabled') &&
      element.tabIndex !== -1 &&
      window.getComputedStyle(element).display !== 'none'
    );
  }, [selector]);

  const focusItem = useCallback((index: number) => {
    const elements = getFocusableElements();
    if (elements.length === 0 || index < 0 || index >= elements.length) return;

    const element = elements[index];
    if (element) {
      element.focus();
      setCurrentIndex(index);
      onItemSelect?.(index, element);
    }
  }, [getFocusableElements, onItemSelect]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || !containerRef.current) return;

    const elements = getFocusableElements();
    if (elements.length === 0) return;

    const rows = Math.ceil(elements.length / columns);
    const currentRow = Math.floor(currentIndex / columns);
    const currentCol = currentIndex % columns;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        if (currentCol < columns - 1 && currentIndex + 1 < elements.length) {
          focusItem(currentIndex + 1);
        } else if (loop && currentRow < rows - 1) {
          focusItem((currentRow + 1) * columns);
        }
        break;

      case 'ArrowLeft':
        event.preventDefault();
        if (currentCol > 0) {
          focusItem(currentIndex - 1);
        } else if (loop && currentRow > 0) {
          focusItem(currentRow * columns - 1);
        }
        break;

      case 'ArrowDown':
        event.preventDefault();
        const nextRowIndex = currentIndex + columns;
        if (nextRowIndex < elements.length) {
          focusItem(nextRowIndex);
        } else if (loop) {
          focusItem(currentCol);
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        const prevRowIndex = currentIndex - columns;
        if (prevRowIndex >= 0) {
          focusItem(prevRowIndex);
        } else if (loop) {
          const lastRowStart = (rows - 1) * columns;
          const targetIndex = Math.min(lastRowStart + currentCol, elements.length - 1);
          focusItem(targetIndex);
        }
        break;

      case 'Home':
        event.preventDefault();
        focusItem(currentRow * columns);
        break;

      case 'End':
        event.preventDefault();
        const rowEnd = Math.min((currentRow + 1) * columns - 1, elements.length - 1);
        focusItem(rowEnd);
        break;

      case 'Escape':
        event.preventDefault();
        onEscape?.();
        setCurrentIndex(-1);
        break;
    }
  }, [enabled, getFocusableElements, columns, currentIndex, focusItem, loop, onEscape]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) return;

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);

  return {
    containerRef,
    currentIndex,
    focusItem
  };
};