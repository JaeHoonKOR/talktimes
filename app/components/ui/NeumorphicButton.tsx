"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  pressed?: boolean;
  className?: string;
  enableRipple?: boolean;
  enableHaptic?: boolean;
}

const NeumorphicButton = forwardRef<HTMLButtonElement, NeumorphicButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    pressed = false,
    disabled, 
    className,
    enableRipple = true,
    enableHaptic = true,
    onClick,
    ...props 
  }, ref) => {
    const { handleInteraction, triggerHapticFeedback } = useMicroInteractions({
      enableRipple,
      enableHaptic,
      enableScaleAnimation: false // Framer Motion이 스케일 처리
    });

    const baseClasses = [
      "font-semibold",
      "transition-all duration-neuro ease-neuro",
      "focus:outline-none focus:ring-2 focus:ring-neumorphic-accent-primary dark:focus:ring-neumorphic-dark-accent-primary focus:ring-opacity-50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "relative overflow-hidden",
    ].join(" ");
    
    const getVariantClasses = (variant: string, pressed: boolean) => {
      const baseVariants = {
        primary: [
          "bg-neumorphic-primary dark:bg-neumorphic-dark-primary",
          "text-neumorphic-text-primary dark:text-neumorphic-dark-text-primary",
        ],
        secondary: [
          "bg-neumorphic-secondary dark:bg-neumorphic-dark-secondary",
          "text-neumorphic-text-secondary dark:text-neumorphic-dark-text-secondary",
        ],
        accent: [
          "bg-gradient-to-r from-neumorphic-accent-primary to-neumorphic-accent-secondary",
          "dark:from-neumorphic-dark-accent-primary dark:to-neumorphic-dark-accent-secondary",
          "text-white dark:text-white",
        ],
        ghost: [
          "bg-transparent text-neumorphic-text-primary dark:text-neumorphic-dark-text-primary",
          "hover:bg-neumorphic-elevated dark:hover:bg-neumorphic-dark-elevated",
        ],
      };

      const shadowClasses = pressed ? {
        primary: "shadow-neuro-inset dark:shadow-neuro-dark-inset",
        secondary: "shadow-neuro-inset-sm dark:shadow-neuro-dark-inset-sm",
        accent: "shadow-neuro-inset dark:shadow-neuro-dark-inset",
        ghost: "shadow-neuro-inset-sm dark:shadow-neuro-dark-inset-sm",
      } : {
        primary: [
          "shadow-neuro-outset dark:shadow-neuro-dark-outset",
          "hover:shadow-neuro-outset-sm dark:hover:shadow-neuro-dark-outset-sm",
          "active:shadow-neuro-button-pressed dark:active:shadow-neuro-dark-inset",
        ].join(" "),
        secondary: [
          "shadow-neuro-outset-sm dark:shadow-neuro-dark-outset-sm",
          "hover:shadow-neuro-outset dark:hover:shadow-neuro-dark-outset",
          "active:shadow-neuro-inset-sm dark:active:shadow-neuro-dark-inset-sm",
        ].join(" "),
        accent: [
          "shadow-neuro-outset dark:shadow-neuro-dark-outset",
          "hover:shadow-neuro-outset-md dark:hover:shadow-neuro-dark-outset-md",
          "active:shadow-neuro-inset dark:active:shadow-neuro-dark-inset",
        ].join(" "),
        ghost: [
          "hover:shadow-neuro-outset-sm dark:hover:shadow-neuro-dark-outset-sm",
          "active:shadow-neuro-inset-sm dark:active:shadow-neuro-dark-inset-sm",
        ].join(" "),
      };

      return [...baseVariants[variant as keyof typeof baseVariants], shadowClasses[variant as keyof typeof shadowClasses]].join(" ");
    };

    const sizeClasses = {
      sm: "px-3 py-2 text-neuro-sm rounded-neuro-sm",
      md: "px-4 py-3 text-neuro-base rounded-neuro",
      lg: "px-6 py-4 text-neuro-lg rounded-neuro-md",
    };

    const buttonClasses = cn(
      baseClasses,
      getVariantClasses(variant, pressed),
      sizeClasses[size],
      "micro-ripple", // 마이크로 인터랙션 클래스 추가
      className
    );

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      
      // 마이크로 인터랙션 실행
      handleInteraction(e, {
        ripple: {
          color: variant === 'accent' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(102, 126, 234, 0.3)',
          duration: 600
        },
        haptic: {
          type: 'impact',
          intensity: 'light'
        }
      });

      // 원래 onClick 핸들러 실행
      onClick?.(e);
    };

    const buttonContent = (
      <>
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
        <span className={loading ? "opacity-0" : "opacity-100"}>
          {children}
        </span>
      </>
    );

    return (
      <motion.button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        whileHover={{ 
          y: -1,
          transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
        }}
        whileTap={{ 
          y: 1,
          transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
        }}
        onClick={handleClick}
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation'
        }}
        {...props}
      >
        {buttonContent}
      </motion.button>
    );
  }
);

NeumorphicButton.displayName = "NeumorphicButton";

export default NeumorphicButton;