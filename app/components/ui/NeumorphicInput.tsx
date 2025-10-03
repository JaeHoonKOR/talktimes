"use client";

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes, ReactNode, useState } from 'react';

interface NeumorphicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  pressed?: boolean;
  className?: string;
  containerClassName?: string;
}

const NeumorphicInput = forwardRef<HTMLInputElement, NeumorphicInputProps>(
  ({ 
    label, 
    error, 
    icon, 
    pressed = false,
    className, 
    containerClassName,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const baseClasses = [
      "w-full",
      "bg-neumorphic-primary dark:bg-neumorphic-dark-primary",
      "text-neumorphic-text-primary dark:text-neumorphic-dark-text-primary",
      "placeholder-neumorphic-text-muted dark:placeholder-neumorphic-dark-text-muted",
      "transition-all duration-neuro ease-neuro",
      "focus:outline-none focus:ring-2 focus:ring-neumorphic-accent-primary dark:focus:ring-neumorphic-dark-accent-primary focus:ring-opacity-50",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ].join(" ");

    const shadowClasses = error 
      ? "shadow-neuro-inset dark:shadow-neuro-dark-inset border-2 border-neumorphic-error dark:border-neumorphic-dark-error"
      : isFocused 
        ? "shadow-neuro-focus dark:shadow-neuro-dark-focus"
        : "shadow-neuro-inset dark:shadow-neuro-dark-inset";

    const inputClasses = cn(
      baseClasses,
      shadowClasses,
      icon ? "pl-10 pr-4" : "px-4",
      "py-3 rounded-neuro",
      className
    );

    const containerClasses = cn(
      "relative",
      containerClassName
    );

    return (
      <div className={containerClasses}>
        {label && (
          <label className="block text-neuro-sm font-medium text-neumorphic-text-secondary dark:text-neumorphic-dark-text-secondary mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neumorphic-text-muted dark:text-neumorphic-dark-text-muted">
              {icon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            className={inputClasses}
            onFocus={handleFocus}
            onBlur={handleBlur}
            animate={{
              scale: isFocused ? 1.01 : 1,
            }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            {...props}
          />
        </div>

        {error && (
          <motion.p 
            className="mt-2 text-neuro-sm text-neumorphic-error dark:text-neumorphic-dark-error"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

NeumorphicInput.displayName = "NeumorphicInput";

export default NeumorphicInput;