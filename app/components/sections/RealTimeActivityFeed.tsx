"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';
import { 
  UserGroupIcon, 
  EyeIcon, 
  HeartIcon,
  ShareIcon,
  ClockIcon,
  TrendingUpIcon,
  GlobeAltIcon
} from '@heroicons/react/24/solid';

interface ActivityItem {
  id: string;
  type: 'user_joined' | 'article_read' | 'article_liked' | 'article_shared' | 'trending';
  message: string;
  timestamp: Date;
  count?: number;
  location?: string;
  article?: string;
  user?: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface ActivityStats {
  activeUsers: number;
  totalReads: number;
  articlesShared: number;
  averageReadTime: string;
}

const RealTimeActivityFeed = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { getInteractiveProps } = useMicroInteractions();

  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [stats, setStats] = useState<ActivityStats>({
    activeUsers: 1247,
    totalReads: 8530,
    articlesShared: 234,
    averageReadTime: '2.3분'
  });

  // 실시간 활동 시뮬레이션
  useEffect(() => {
    const generateActivity = (): ActivityItem => {
      const activityTypes: (Omit<ActivityItem, 'id' | 'timestamp'>)[] = [
        {
          type: 'user_joined',
          message: '새로운 사용자가 가입했습니다',
          icon: UserGroupIcon,
          color: 'from-green-500 to-emerald-500',
          location: '서울'
        },
        {
          type: 'article_read',
          message: '경제 뉴스를 읽고 있습니다',
          icon: EyeIcon,
          color: 'from-blue-500 to-cyan-500',
          article: '글로벌 경제 전망 2024',
          user: '김○○'
        },
        {
          type: 'article_liked',
          message: '기술 뉴스에 좋아요를 눌렀습니다',
          icon: HeartIcon,
          color: 'from-pink-500 to-rose-500',
          article: 'AI 혁신의 새로운 전환점',
          count: Math.floor(Math.random() * 50) + 1
        },
        {
          type: 'article_shared',
          message: '정치 뉴스를 공유했습니다',
          icon: ShareIcon,
          color: 'from-purple-500 to-indigo-500',
          article: '2024년 정책 변화 분석',
          user: '박○○'
        },
        {
          type: 'trending',
          message: '실시간 인기 급상승',
          icon: TrendingUpIcon,
          color: 'from-orange-500 to-red-500',
          article: '환경 정책 새로운 방향',
          count: Math.floor(Math.random() * 100) + 50
        }
      ];

      const activity = activityTypes[Math.floor(Math.random() * activityTypes.length)];
      return {
        ...activity,
        id: Date.now().toString() + Math.random(),
        timestamp: new Date()
      };
    };

    // 초기 활동 생성
    const initialActivities = Array.from({ length: 5 }, generateActivity);
    setActivities(initialActivities);

    // 실시간 활동 업데이트
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      
      // 통계 업데이트
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        totalReads: prev.totalReads + Math.floor(Math.random() * 10) + 1,
        articlesShared: prev.articlesShared + Math.floor(Math.random() * 2),
        averageReadTime: prev.averageReadTime
      }));
    }, 3000 + Math.random() * 2000); // 3-5초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}초 전`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`;
    return `${Math.floor(diffInSeconds / 3600)}시간 전`;
  };

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
      aria-label="실시간 활동 피드"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* 섹션 헤더 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="activity-feed-heading"
          >
            📊 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">실시간</span> 활동 현황
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            지금 이 순간 TalkTimes를 이용하고 있는 사용자들의 활동을 실시간으로 확인하세요
          </motion.p>
        </motion.div>

        {/* 실시간 통계 */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          role="region"
          aria-labelledby="activity-feed-heading"
          aria-label="실시간 통계"
        >
          {[
            { 
              label: '현재 접속자', 
              value: stats.activeUsers.toLocaleString(), 
              icon: UserGroupIcon, 
              color: 'from-green-500 to-emerald-500',
              suffix: '명'
            },
            { 
              label: '오늘 읽은 뉴스', 
              value: stats.totalReads.toLocaleString(), 
              icon: EyeIcon, 
              color: 'from-blue-500 to-cyan-500',
              suffix: '건'
            },
            { 
              label: '오늘 공유', 
              value: stats.articlesShared.toLocaleString(), 
              icon: ShareIcon, 
              color: 'from-purple-500 to-indigo-500',
              suffix: '회'
            },
            { 
              label: '평균 읽기 시간', 
              value: stats.averageReadTime, 
              icon: ClockIcon, 
              color: 'from-orange-500 to-red-500',
              suffix: ''
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              {...getInteractiveProps()}
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}>
                <stat.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <motion.div 
                className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-2`}
                initial={{ scale: 1 }}
                animate={isVisible ? { 
                  scale: [1, 1.05, 1],
                  transition: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                } : {}}
                aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 실시간 활동 피드 */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 
                className="text-xl font-bold text-gray-900 dark:text-white"
                id="live-activity-heading"
              >
                🔴 실시간 활동
              </h3>
            </div>
            
            <div 
              className="space-y-4 max-h-96 overflow-y-auto scroll-optimized"
              role="log"
              aria-labelledby="live-activity-heading"
              aria-label="실시간 사용자 활동 목록"
              aria-live="polite"
            >
              <AnimatePresence mode="popLayout">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20"
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.95 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05,
                      layout: { duration: 0.2 }
                    }}
                    layout
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.color} flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className="w-4 h-4 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        {activity.user && (
                          <span className="font-medium text-blue-600 dark:text-blue-400">
                            {activity.user}님이{' '}
                          </span>
                        )}
                        {activity.message}
                        {activity.location && (
                          <span className="text-gray-500 dark:text-gray-400">
                            {' '}• {activity.location}
                          </span>
                        )}
                      </p>
                      {activity.article && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          📰 {activity.article}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" aria-hidden="true" />
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        {activity.count && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                            +{activity.count}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 글로벌 활동 지도 */}
          <motion.div 
            className="glass-card p-6"
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <GlobeAltIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
              <h3 
                className="text-xl font-bold text-gray-900 dark:text-white"
                id="global-activity-heading"
              >
                🌍 글로벌 활동
              </h3>
            </div>
            
            <div 
              className="space-y-4"
              role="region"
              aria-labelledby="global-activity-heading"
              aria-label="전 세계 사용자 활동 현황"
            >
              {[
                { region: '대한민국', users: 1247, percentage: 45, flag: '🇰🇷' },
                { region: '일본', users: 834, percentage: 30, flag: '🇯🇵' },
                { region: '미국', users: 456, percentage: 16, flag: '🇺🇸' },
                { region: '기타', users: 234, percentage: 9, flag: '🌏' }
              ].map((region, index) => (
                <motion.div
                  key={region.region}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-gray-800/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={region.region}>
                      {region.flag}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {region.region}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {region.users.toLocaleString()}명 접속중
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {region.percentage}%
                    </p>
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${region.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 1.2 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 추가 인사이트 */}
            <motion.div 
              className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 실시간 인사이트
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• 경제 뉴스가 가장 인기 (34% 점유)</li>
                <li>• 평균 체류시간이 전주 대비 15% 증가</li>
                <li>• 모바일 사용자 비율 72%</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RealTimeActivityFeed;