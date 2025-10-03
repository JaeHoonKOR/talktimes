"use client";

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  StarIcon, 
  NewspaperIcon,
  LockClosedIcon,
  CheckBadgeIcon 
} from '@heroicons/react/24/solid';

interface TrustStat {
  number: string;
  label: string;
  icon: React.ComponentType<any>;
  color: string;
}

const trustStats: TrustStat[] = [
  {
    number: "12,847",
    label: "활성 구독자",
    icon: UserGroupIcon,
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "4.8",
    label: "평균 만족도",
    icon: StarIcon,
    color: "from-yellow-400 to-orange-500"
  },
  {
    number: "150+",
    label: "일일 큐레이션",
    icon: NewspaperIcon,
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "99.9%",
    label: "보안 신뢰도",
    icon: ShieldCheckIcon,
    color: "from-purple-500 to-indigo-500"
  }
];

const partners = [
  { name: "네이버 뉴스", placeholder: "partner-logo-naver.png - 네이버뉴스 공식 로고 (신뢰할 수 있는 뉴스 파트너임을 보여주는 브랜드 로고)" },
  { name: "조선일보", placeholder: "partner-logo-chosun.png - 조선일보 로고 (전통 언론사 신뢰도, 기존 미디어와의 협력 관계 강조)" },
  { name: "연합뉴스", placeholder: "partner-logo-yonhap.png - 연합뉴스 로고 (국가 대표 통신사, 뉴스 신뢰성과 정확성 강조)" },
  { name: "한겨레", placeholder: "partner-logo-hankyoreh.png - 한겨레 로고 (진보 언론 대표, 다양한 시각의 뉴스 제공 파트너)" }
];

export default function TrustElements() {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/10"
      aria-label="신뢰성 및 파트너십 정보"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* 신뢰 통계 섹션 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="trust-heading"
          >
            🏆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">믿을 수 있는</span> 뉴스 서비스
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            수많은 사용자들이 선택한 신뢰할 수 있는 뉴스 큐레이션 서비스입니다
          </motion.p>
        </motion.div>

        {/* 통계 카드들 */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          role="region"
          aria-labelledby="trust-heading"
          aria-label="신뢰성 통계 정보"
        >
          {trustStats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <motion.div 
                className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-2`}
                animate={isVisible ? { 
                  scale: [1, 1.05, 1],
                  transition: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                } : {}}
                aria-label={`${stat.label}: ${stat.number}`}
              >
                {stat.number}
              </motion.div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 파트너사 로고 섹션 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 
            className="text-xl font-bold text-gray-900 dark:text-white mb-2"
            id="partners-heading"
          >
            🤝 신뢰할 수 있는 뉴스 파트너
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            검증된 언론사들과 함께 정확하고 신뢰할 수 있는 뉴스를 제공합니다
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          role="region"
          aria-labelledby="partners-heading"
          aria-label="파트너 언론사 정보"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="h-16 flex items-center justify-center mb-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center px-2 leading-tight">
                  {partner.placeholder}
                </div>
              </div>
              <h4 
                className="font-semibold text-gray-900 dark:text-white text-sm"
                aria-label={`파트너 언론사: ${partner.name}`}
              >
                {partner.name}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        {/* 보안 및 인증 배지 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {[
            { icon: LockClosedIcon, text: "SSL 보안 인증", color: "from-green-500 to-emerald-500" },
            { icon: ShieldCheckIcon, text: "개인정보보호", color: "from-blue-500 to-cyan-500" },
            { icon: CheckBadgeIcon, text: "GDPR 준수", color: "from-purple-500 to-indigo-500" }
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 glass-card text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center`}>
                <badge.icon className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}