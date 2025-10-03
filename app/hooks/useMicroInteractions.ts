"use client";

import { useCallback, useRef, useState } from 'react';

interface RippleOptions {
  color?: string;
  duration?: number;
  size?: number;
}

interface HapticFeedbackOptions {
  type?: 'impact' | 'selection' | 'notification';
  intensity?: 'light' | 'medium' | 'heavy';
}

interface MicroInteractionOptions {
  enableRipple?: boolean;
  enableHaptic?: boolean;
  enableScaleAnimation?: boolean;
  enableParticles?: boolean;
}

export const useMicroInteractions = (options: MicroInteractionOptions = {}) => {
  const {
    enableRipple = true,
    enableHaptic = true,
    enableScaleAnimation = true,
    enableParticles = false
  } = options;

  const [isAnimating, setIsAnimating] = useState(false);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  // 리플 효과 생성
  const createRipple = useCallback((
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
    rippleOptions: RippleOptions = {}
  ) => {
    if (!enableRipple) return;

    const {
      color = 'rgba(255, 255, 255, 0.3)',
      duration = 600,
      size
    } = rippleOptions;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // 기존 리플 제거
    const existingRipple = button.querySelector('.ripple-effect');
    if (existingRipple) {
      existingRipple.remove();
    }

    // 터치/클릭 위치 계산
    let x: number, y: number;
    if ('touches' in event) {
      const touch = event.touches[0] || event.changedTouches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }

    // 리플 크기 계산
    const rippleSize = size || Math.max(rect.width, rect.height) * 2;

    // 리플 요소 생성
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect absolute rounded-full pointer-events-none';
    ripple.style.cssText = `
      left: ${x - rippleSize / 2}px;
      top: ${y - rippleSize / 2}px;
      width: ${rippleSize}px;
      height: ${rippleSize}px;
      background: ${color};
      transform: scale(0);
      opacity: 1;
      animation: ripple-expand ${duration}ms cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 0;
    `;

    // 버튼에 상대적 위치 설정
    if (getComputedStyle(button).position === 'static') {
      button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';

    button.appendChild(ripple);

    // 애니메이션 종료 후 리플 제거
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, duration);

    rippleRef.current = ripple;
  }, [enableRipple]);

  // 햅틱 피드백
  const triggerHapticFeedback = useCallback((options: HapticFeedbackOptions = {}) => {
    if (!enableHaptic || typeof window === 'undefined') return;

    const { type = 'impact', intensity = 'light' } = options;

    // iOS Safari 햅틱 피드백
    if ('webkit' in window && 'webkitHapticFeedback' in (window as any)) {
      try {
        const hapticTypes = {
          impact: intensity === 'light' ? 'impactLight' : intensity === 'medium' ? 'impactMedium' : 'impactHeavy',
          selection: 'selectionChanged',
          notification: intensity === 'light' ? 'notificationSuccess' : 'notificationWarning'
        };
        
        (window as any).webkit.webkitHapticFeedback(hapticTypes[type]);
      } catch (error) {
        console.debug('Haptic feedback not available');
      }
    }

    // Android Chrome 진동 API
    if ('vibrate' in navigator) {
      const vibrationPatterns = {
        impact: intensity === 'light' ? [10] : intensity === 'medium' ? [15] : [20],
        selection: [5],
        notification: [10, 50, 10]
      };

      try {
        navigator.vibrate(vibrationPatterns[type]);
      } catch (error) {
        console.debug('Vibration not available');
      }
    }
  }, [enableHaptic]);

  // 스케일 애니메이션
  const createScaleAnimation = useCallback((element: HTMLElement, scale: number = 0.95) => {
    if (!enableScaleAnimation) return;

    setIsAnimating(true);
    
    element.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
    element.style.transform = `scale(${scale})`;

    const resetAnimation = () => {
      element.style.transform = 'scale(1)';
      setTimeout(() => {
        element.style.transition = '';
        setIsAnimating(false);
      }, 100);
    };

    // 마우스 업이나 터치 엔드에서 리셋
    const handleInteractionEnd = () => {
      resetAnimation();
      document.removeEventListener('mouseup', handleInteractionEnd);
      document.removeEventListener('touchend', handleInteractionEnd);
    };

    document.addEventListener('mouseup', handleInteractionEnd);
    document.addEventListener('touchend', handleInteractionEnd);

    // 안전장치: 200ms 후 강제 리셋
    setTimeout(resetAnimation, 200);
  }, [enableScaleAnimation]);

  // 파티클 효과 (선택적)
  const createParticleEffect = useCallback((
    element: HTMLElement,
    particleCount: number = 6
  ) => {
    if (!enableParticles) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle-effect fixed pointer-events-none z-50';
      
      const angle = (360 / particleCount) * i;
      const velocity = 100 + Math.random() * 50;
      const size = 4 + Math.random() * 4;
      
      particle.style.cssText = `
        left: ${centerX}px;
        top: ${centerY}px;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 50%;
        animation: particle-burst 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        --angle: ${angle}deg;
        --velocity: ${velocity}px;
      `;

      document.body.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 600);
    }
  }, [enableParticles]);

  // 통합 인터랙션 핸들러
  const handleInteraction = useCallback((
    event: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
    options: {
      ripple?: RippleOptions;
      haptic?: HapticFeedbackOptions;
      scale?: number;
      particles?: boolean;
    } = {}
  ) => {
    const element = event.currentTarget;
    
    // 리플 효과
    if (enableRipple) {
      createRipple(event, options.ripple);
    }

    // 햅틱 피드백
    if (enableHaptic) {
      triggerHapticFeedback(options.haptic);
    }

    // 스케일 애니메이션
    if (enableScaleAnimation) {
      createScaleAnimation(element, options.scale);
    }

    // 파티클 효과
    if (enableParticles && options.particles) {
      createParticleEffect(element);
    }
  }, [createRipple, triggerHapticFeedback, createScaleAnimation, createParticleEffect, enableRipple, enableHaptic, enableScaleAnimation, enableParticles]);

  // 버튼 속성 생성기
  const getInteractiveProps = useCallback((
    interactionOptions: Parameters<typeof handleInteraction>[1] = {}
  ) => ({
    onMouseDown: (e: React.MouseEvent<HTMLElement>) => handleInteraction(e, interactionOptions),
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => handleInteraction(e, interactionOptions),
    className: 'relative overflow-hidden transition-all duration-200 ease-out',
    style: {
      WebkitTapHighlightColor: 'transparent',
      touchAction: 'manipulation'
    } as React.CSSProperties
  }), [handleInteraction]);

  return {
    createRipple,
    triggerHapticFeedback,
    createScaleAnimation,
    createParticleEffect,
    handleInteraction,
    getInteractiveProps,
    isAnimating
  };
};

// 특정 컴포넌트를 마이크로 인터랙션으로 래핑하는 HOC
export const withMicroInteractions = <T extends object>(
  Component: React.ComponentType<T>,
  defaultOptions?: MicroInteractionOptions
) => {
  return React.forwardRef<HTMLElement, T & { microInteractionOptions?: MicroInteractionOptions }>((props, ref) => {
    const { microInteractionOptions, ...componentProps } = props as any;
    const { getInteractiveProps } = useMicroInteractions({
      ...defaultOptions,
      ...microInteractionOptions
    });

    return (
      <div {...getInteractiveProps()} ref={ref}>
        <Component {...(componentProps as T)} />
      </div>
    );
  });
};