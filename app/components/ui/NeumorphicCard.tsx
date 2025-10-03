"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface NeumorphicCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'depressed' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  pressed?: boolean;
  className?: string;
}

const NeumorphicCard = forwardRef<HTMLDivElement, NeumorphicCardProps>(
  ({ 
    children, 
    variant = 'default', 
    size = 'md', 
    interactive = false, 
    pressed = false, 
    className, 
    ...props 
  }, ref) => {
    const baseClasses = "transition-all duration-neuro ease-neuro";
    
    const variantClasses = {
      default: pressed 
        ? "bg-neumorphic-primary dark:bg-neumorphic-dark-primary shadow-neuro-inset dark:shadow-neuro-dark-inset" 
        : "bg-neumorphic-primary dark:bg-neumorphic-dark-primary shadow-neuro-outset dark:shadow-neuro-dark-outset",
      elevated: pressed 
        ? "bg-neumorphic-elevated dark:bg-neumorphic-dark-elevated shadow-neuro-inset dark:shadow-neuro-dark-inset" 
        : "bg-neumorphic-elevated dark:bg-neumorphic-dark-elevated shadow-neuro-outset-md dark:shadow-neuro-dark-outset-md",
      depressed: "bg-neumorphic-depressed dark:bg-neumorphic-dark-depressed shadow-neuro-inset dark:shadow-neuro-dark-inset",
      floating: pressed 
        ? "bg-neumorphic-secondary dark:bg-neumorphic-dark-secondary shadow-neuro-inset dark:shadow-neuro-dark-inset" 
        : "bg-neumorphic-secondary dark:bg-neumorphic-dark-secondary shadow-neuro-floating dark:shadow-neuro-dark-floating",
    };

    const sizeClasses = {
      sm: "p-3 rounded-neuro-sm",
      md: "p-4 rounded-neuro",
      lg: "p-6 rounded-neuro-md",
    };

    const interactiveClasses = interactive ? [
      "cursor-pointer",
      "hover:shadow-neuro-outset-sm dark:hover:shadow-neuro-dark-outset-sm",
      "active:shadow-neuro-inset dark:active:shadow-neuro-dark-inset",
      "hover:transform hover:-translate-y-0.5",
      "active:transform active:translate-y-0",
      "focus:shadow-neuro-focus dark:focus:shadow-neuro-dark-focus",
      "focus:outline-none focus:ring-2 focus:ring-neumorphic-accent-primary dark:focus:ring-neumorphic-dark-accent-primary focus:ring-opacity-50",
    ].join(" ") : "";

    const cardClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      interactiveClasses,
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
            y: -2,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          }}
          whileTap={{ 
            y: 0,
            transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
          }}
          {...props}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={cardClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeumorphicCard.displayName = "NeumorphicCard";

export default NeumorphicCard;