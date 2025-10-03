"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface GlassmorphicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'light' | 'medium' | 'strong' | 'dark';
  blur?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  glow?: boolean;
  className?: string;
}

const GlassmorphicCard = forwardRef<HTMLDivElement, GlassmorphicCardProps>(
  ({ 
    children, 
    variant = 'default', 
    blur = 'md',
    size = 'md', 
    interactive = false, 
    glow = false,
    className, 
    ...props 
  }, ref) => {
    const baseClasses = [
      "relative",
      "overflow-hidden",
      "transition-all duration-glass ease-out",
      `backdrop-blur-glass-${blur}`,
      "border border-glass-border dark:border-glass-border-dark",
    ].join(" ");
    
    const variantClasses = {
      default: "bg-glass-white dark:bg-glass-black",
      light: "bg-glass-white-light dark:bg-glass-black-light",
      medium: "bg-glass-white-medium dark:bg-glass-black-medium", 
      strong: "bg-glass-white-strong dark:bg-glass-black-strong",
      dark: "bg-glass-black-medium dark:bg-glass-white-light",
    };

    const sizeClasses = {
      sm: "p-3 rounded-lg",
      md: "p-4 rounded-xl", 
      lg: "p-6 rounded-2xl",
    };

    const glowClasses = glow ? [
      "before:absolute before:inset-0 before:-z-10",
      "before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20",
      "before:blur-xl before:rounded-inherit",
      "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
    ].join(" ") : "";

    const interactiveClasses = interactive ? [
      "cursor-pointer",
      "hover:bg-glass-white-light dark:hover:bg-glass-black-light",
      "hover:border-glass-border-strong dark:hover:border-glass-border-dark-strong", 
      "hover:transform hover:-translate-y-1 hover:shadow-2xl",
      "active:transform active:translate-y-0 active:shadow-lg",
      "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50",
      "hover:backdrop-blur-glass-lg",
    ].join(" ") : "";

    const cardClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      interactiveClasses,
      glowClasses,
      className
    );

    if (interactive) {
      return (
        <motion.div
          ref={ref}
          className={cardClasses}
          tabIndex={0}
          role="button"
          whileHover={{ 
            y: -4,
            scale: 1.02,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }}
          whileTap={{ 
            y: 0,
            scale: 0.98,
            transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
          }}
          {...props}
        >
          {/* Glassmorphism 효과를 위한 내부 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 dark:from-white/5 dark:to-black/10 rounded-inherit pointer-events-none" />
          
          {/* 컨텐츠 */}
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {/* Glassmorphism 효과를 위한 내부 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 dark:from-white/5 dark:to-black/10 rounded-inherit pointer-events-none" />
        
        {/* 컨텐츠 */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

GlassmorphicCard.displayName = "GlassmorphicCard";

export default GlassmorphicCard;