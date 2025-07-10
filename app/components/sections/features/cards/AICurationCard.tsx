"use client";

import { motion } from 'framer-motion';
import { Brain, Target, Zap } from 'lucide-react';

export default function AICurationCard() {
  return (
    <div className="relative w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain className="w-16 h-16 text-blue-600" />
        </motion.div>
      </div>
      
      <div className="absolute top-2 left-2">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-4 h-4 text-yellow-500" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-2 right-2">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <Target className="w-4 h-4 text-green-500" />
        </motion.div>
      </div>
    </div>
  );
} 