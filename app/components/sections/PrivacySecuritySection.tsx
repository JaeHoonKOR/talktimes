"use client";

import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { 
  ShieldCheckIcon, 
  LockClosedIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  TrashIcon,
  CheckBadgeIcon 
} from '@heroicons/react/24/solid';

interface SecurityFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: LockClosedIcon,
    title: "256비트 SSL 암호화",
    description: "모든 데이터는 은행급 보안으로 암호화되어 전송됩니다",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: EyeSlashIcon,
    title: "개인정보 최소 수집",
    description: "서비스에 꼭 필요한 정보만 수집하고 저장합니다",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrashIcon,
    title: "데이터 삭제 권리",
    description: "언제든 계정 및 모든 개인정보 완전 삭제 가능",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: CheckBadgeIcon,
    title: "GDPR 완전 준수",
    description: "유럽 개인정보보호법 및 국내 개인정보보호법 준수",
    color: "from-orange-500 to-red-500"
  }
];

const privacyPolicies = [
  {
    title: "개인정보처리방침",
    description: "개인정보 수집, 이용, 보관에 대한 상세 정책",
    link: "#privacy-policy",
    icon: DocumentTextIcon
  },
  {
    title: "이용약관",
    description: "서비스 이용에 관한 권리와 의무",
    link: "#terms-of-service", 
    icon: DocumentTextIcon
  },
  {
    title: "쿠키 정책",
    description: "쿠키 사용 목적과 관리 방법",
    link: "#cookie-policy",
    icon: DocumentTextIcon
  }
];

export default function PrivacySecuritySection() {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white"
      aria-label="개인정보 보호 및 보안 정보"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* 섹션 헤더 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="privacy-security-heading"
          >
            🔒 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">안전하고 투명한</span> 서비스
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            여러분의 개인정보와 데이터 보안을 최우선으로 생각합니다
          </motion.p>
        </motion.div>

        {/* 보안 기능 카드들 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          role="region"
          aria-labelledby="privacy-security-heading"
          aria-label="보안 기능 목록"
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center group hover:scale-105 transition-transform duration-300 bg-white/10 backdrop-blur-lg border border-white/20"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* 개인정보처리방침 링크들 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 
            className="text-2xl font-bold text-white mb-8"
            id="privacy-policies-heading"
          >
            📋 투명한 정책 공개
          </h3>
          
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="navigation"
            aria-labelledby="privacy-policies-heading"
            aria-label="개인정보 정책 문서 링크"
          >
            {privacyPolicies.map((policy, index) => (
              <motion.a
                key={index}
                href={policy.link}
                className="glass-card p-6 text-center group hover:scale-105 transition-all duration-300 bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/30 block"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <policy.icon className="w-6 h-6 text-white" />
                </div>
                <h4 
                  className="font-semibold text-white mb-2"
                  id={`policy-${index}-title`}
                >
                  {policy.title}
                </h4>
                <p className="text-sm text-gray-400 mb-3">
                  {policy.description}
                </p>
                <span className="text-blue-400 text-sm font-medium group-hover:underline">
                  자세히 보기 →
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* 데이터 권리 안내 */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-lg border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-center">
            <ShieldCheckIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 
              className="text-2xl font-bold text-white mb-4"
              id="data-rights-heading"
            >
              개인정보 자기결정권 보장
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              GDPR 및 개인정보보호법에 따른 모든 권리를 보장합니다. 
              언제든지 개인정보 열람, 정정, 삭제를 요청할 수 있습니다.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                📧 privacy@talktimes.com
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-transparent border-2 border-white/30 hover:border-white/50 text-white rounded-full font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                📞 개인정보보호 담당자
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 보안 인증 배지들 */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {[
            { text: "ISO 27001 인증", placeholder: "iso-27001-badge.png - ISO 27001 정보보안관리 인증 배지 (국제 표준 정보보안 인증)" },
            { text: "SOC 2 Type II", placeholder: "soc2-badge.png - SOC 2 Type II 컴플라이언스 배지 (클라우드 보안 감사 인증)" },
            { text: "GDPR Compliant", placeholder: "gdpr-badge.png - GDPR 준수 인증 배지 (유럽 개인정보보호법 준수)" }
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 glass-card text-sm bg-white/5 backdrop-blur-lg border border-white/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                <CheckBadgeIcon className="w-5 h-5 text-white" />
              </div>
              <div className="text-center">
                <span className="text-white font-medium block mb-1">
                  {badge.text}
                </span>
                <div className="text-xs text-gray-400 opacity-0 hover:opacity-100 transition-opacity">
                  {badge.placeholder}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}