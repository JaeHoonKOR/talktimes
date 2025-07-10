"use client";

import { motion } from 'framer-motion';

interface StatItem {
  number: string;
  label: string;
  suffix?: string;
}

interface HeroStatsProps {
  stats: StatItem[];
  className?: string;
}

export default function HeroStats({ stats, className = '' }: HeroStatsProps) {
  return (
    <motion.div
      className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.8 + index * 0.1, 
            ease: "back.out(1.2)" 
          }}
        >
          <div className="text-2xl md:text-3xl font-bold text-white mb-2">
            {stat.number}
            {stat.suffix && <span className="text-blue-200">{stat.suffix}</span>}
          </div>
          <div className="text-sm md:text-base text-white/80 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 