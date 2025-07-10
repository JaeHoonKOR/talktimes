"use client";

import { motion } from 'framer-motion';

interface FeatureCardProps {
  visualContent: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ visualContent, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center mb-4">
        {visualContent}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
} 