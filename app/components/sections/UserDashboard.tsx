"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';
import { 
  UserIcon,
  ChartBarIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  AdjustmentsHorizontalIcon,
  CalendarDaysIcon,
  TrophyIcon,
  FireIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  TagIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/solid';

interface ReadingStats {
  articlesRead: number;
  timeSpent: string;
  streak: number;
  favoriteCategory: string;
  weeklyGoal: number;
  weeklyProgress: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  progress: number;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface RecentActivity {
  id: string;
  type: 'read' | 'bookmark' | 'share' | 'like';
  title: string;
  timestamp: Date;
  category: string;
}

interface PersonalizationSettings {
  interests: string[];
  readingTime: 'short' | 'medium' | 'long';
  frequency: 'daily' | 'weekly' | 'realtime';
  categories: string[];
}

const UserDashboard = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { getInteractiveProps } = useMicroInteractions();

  const [activeTab, setActiveTab] = useState<'overview' | 'stats' | 'settings'>('overview');
  const [user] = useState({
    name: '김○○',
    email: 'user@example.com',
    joinedAt: new Date('2024-01-01'),
    avatar: 'user-avatar.jpg',
    plan: 'Premium'
  });

  // 사용자 읽기 통계
  const [readingStats] = useState<ReadingStats>({
    articlesRead: 127,
    timeSpent: '18시간 24분',
    streak: 12,
    favoriteCategory: 'AI & 기술',
    weeklyGoal: 25,
    weeklyProgress: 18
  });

  // 업적 시스템
  const achievements: Achievement[] = [
    {
      id: 'first-read',
      title: '첫 걸음',
      description: '첫 번째 기사를 읽었습니다',
      icon: DocumentTextIcon,
      color: 'from-green-400 to-green-600',
      progress: 100,
      unlocked: true,
      unlockedAt: new Date('2024-01-01')
    },
    {
      id: 'week-streak',
      title: '꾸준한 독자',
      description: '7일 연속 기사를 읽었습니다',
      icon: FireIcon,
      color: 'from-orange-400 to-red-500',
      progress: 100,
      unlocked: true,
      unlockedAt: new Date('2024-01-08')
    },
    {
      id: 'hundred-reads',
      title: '백 번의 독서',
      description: '100개의 기사를 읽었습니다',
      icon: TrophyIcon,
      color: 'from-yellow-400 to-yellow-600',
      progress: 100,
      unlocked: true,
      unlockedAt: new Date('2024-01-20')
    },
    {
      id: 'social-sharer',
      title: '공유의 달인',
      description: '50개의 기사를 공유했습니다',
      icon: ShareIcon,
      color: 'from-blue-400 to-blue-600',
      progress: 76,
      unlocked: false
    },
    {
      id: 'early-adopter',
      title: '얼리 어답터',
      description: '새로운 기능을 먼저 사용했습니다',
      icon: StarIcon,
      color: 'from-purple-400 to-purple-600',
      progress: 100,
      unlocked: true,
      unlockedAt: new Date('2024-01-15')
    }
  ];

  // 최근 활동
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'read',
      title: 'AI 반도체 시장 전망',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      category: '기술'
    },
    {
      id: '2',
      type: 'bookmark',
      title: '지속가능한 에너지 정책',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      category: '환경'
    },
    {
      id: '3',
      type: 'share',
      title: '스타트업 투자 트렌드',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      category: '경제'
    },
    {
      id: '4',
      type: 'like',
      title: '메타버스 기술 발전',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      category: '기술'
    }
  ]);

  // 개인화 설정
  const [settings, setSettings] = useState<PersonalizationSettings>({
    interests: ['AI & 기술', '경제', '환경'],
    readingTime: 'medium',
    frequency: 'daily',
    categories: ['기술', '경제', '정치', '환경', '스포츠']
  });

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'read': return EyeIcon;
      case 'bookmark': return BookmarkIcon;
      case 'share': return ShareIcon;
      case 'like': return HeartIcon;
      default: return DocumentTextIcon;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'read': return 'text-blue-500';
      case 'bookmark': return 'text-yellow-500';
      case 'share': return 'text-green-500';
      case 'like': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* 주요 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: '읽은 기사', 
            value: readingStats.articlesRead, 
            icon: EyeIcon, 
            color: 'from-blue-500 to-cyan-500',
            suffix: '개'
          },
          { 
            label: '읽은 시간', 
            value: readingStats.timeSpent, 
            icon: ClockIcon, 
            color: 'from-green-500 to-emerald-500',
            suffix: ''
          },
          { 
            label: '연속 일수', 
            value: readingStats.streak, 
            icon: FireIcon, 
            color: 'from-orange-500 to-red-500',
            suffix: '일'
          },
          { 
            label: '주간 목표', 
            value: `${readingStats.weeklyProgress}/${readingStats.weeklyGoal}`, 
            icon: TrophyIcon, 
            color: 'from-purple-500 to-indigo-500',
            suffix: ''
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {stat.value}{stat.suffix}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 주간 진행률 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5 text-blue-500" aria-hidden="true" />
          이번 주 읽기 목표
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {readingStats.weeklyProgress}개 / {readingStats.weeklyGoal}개
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {Math.round((readingStats.weeklyProgress / readingStats.weeklyGoal) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={isVisible ? { 
                width: `${(readingStats.weeklyProgress / readingStats.weeklyGoal) * 100}%` 
              } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            목표까지 {readingStats.weeklyGoal - readingStats.weeklyProgress}개 남았습니다
          </p>
        </div>
      </motion.div>

      {/* 업적 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TrophyIcon className="w-5 h-5 text-yellow-500" aria-hidden="true" />
          업적
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked 
                  ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20' 
                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center ${
                  !achievement.unlocked ? 'opacity-50' : ''
                }`}>
                  <achievement.icon className="w-4 h-4 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.unlocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h4>
                  {achievement.unlocked && achievement.unlockedAt && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">
                      {achievement.unlockedAt.toLocaleDateString()}에 달성
                    </p>
                  )}
                </div>
              </div>
              
              <p className={`text-sm mb-3 ${
                achievement.unlocked ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.description}
              </p>
              
              {!achievement.unlocked && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 최근 활동 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-green-500" aria-hidden="true" />
          최근 활동
        </h3>
        
        <div className="space-y-3">
          {recentActivities.map((activity, index) => {
            const ActivityIcon = getActivityIcon(activity.type);
            return (
              <motion.div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <div className={`w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                  <ActivityIcon className={`w-4 h-4 ${getActivityColor(activity.type)}`} aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.category} • {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );

  const StatsTab = () => (
    <div className="space-y-6">
      {/* 카테고리별 읽기 통계 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">카테고리별 읽기 통계</h3>
        
        <div className="space-y-4">
          {[
            { category: 'AI & 기술', count: 45, percentage: 35 },
            { category: '경제', count: 32, percentage: 25 },
            { category: '환경', count: 25, percentage: 20 },
            { category: '정치', count: 15, percentage: 12 },
            { category: '스포츠', count: 10, percentage: 8 }
          ].map((stat, index) => (
            <div key={stat.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stat.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.count}개 ({stat.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${stat.percentage}%` } : {}}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 읽기 패턴 분석 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">읽기 패턴 분석</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">선호 시간대</h4>
            <div className="space-y-2">
              {[
                { time: '오전 (6-12시)', percentage: 35 },
                { time: '오후 (12-18시)', percentage: 28 },
                { time: '저녁 (18-24시)', percentage: 37 }
              ].map((time, index) => (
                <div key={time.time} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{time.time}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{time.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">평균 읽기 시간</h4>
            <div className="space-y-2">
              {[
                { length: '짧은 글 (1-3분)', percentage: 40 },
                { length: '중간 글 (3-7분)', percentage: 45 },
                { length: '긴 글 (7분+)', percentage: 15 }
              ].map((length, index) => (
                <div key={length.length} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{length.length}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{length.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      {/* 관심사 설정 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-blue-500" aria-hidden="true" />
          관심사 설정
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              관심 분야
            </label>
            <div className="flex flex-wrap gap-2">
              {['AI & 기술', '경제', '정치', '환경', '스포츠', '문화', '과학', '건강'].map(interest => (
                <motion.button
                  key={interest}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    settings.interests.includes(interest)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => {
                    setSettings(prev => ({
                      ...prev,
                      interests: prev.interests.includes(interest)
                        ? prev.interests.filter(i => i !== interest)
                        : [...prev.interests, interest]
                    }));
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  {...getInteractiveProps()}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              선호 읽기 시간
            </label>
            <select 
              value={settings.readingTime}
              onChange={(e) => setSettings(prev => ({ ...prev, readingTime: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="short">짧은 글 (1-3분)</option>
              <option value="medium">중간 글 (3-7분)</option>
              <option value="long">긴 글 (7분 이상)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              알림 빈도
            </label>
            <select 
              value={settings.frequency}
              onChange={(e) => setSettings(prev => ({ ...prev, frequency: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="realtime">실시간</option>
              <option value="daily">일일</option>
              <option value="weekly">주간</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* 알림 설정 */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BellIcon className="w-5 h-5 text-yellow-500" aria-hidden="true" />
          알림 설정
        </h3>
        
        <div className="space-y-4">
          {[
            { label: '새 추천 뉴스', description: '맞춤 추천 뉴스가 있을 때 알림' },
            { label: '주간 요약', description: '매주 읽기 통계 및 요약 전송' },
            { label: '목표 달성', description: '읽기 목표 달성시 알림' },
            { label: '인기 뉴스', description: '실시간 인기 뉴스 알림' }
          ].map((notification, index) => (
            <div key={notification.label} className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {notification.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {notification.description}
                </p>
              </div>
              <motion.button
                className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-200 focus:ring-2 focus:ring-blue-500"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full shadow-md"
                  animate={{ x: index % 2 === 0 ? 24 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20"
      aria-label="사용자 대시보드"
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
            id="dashboard-heading"
          >
            📊 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">나만의</span> 대시보드
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            개인화된 읽기 통계와 설정을 한눈에 확인하고 관리하세요
          </motion.p>
        </motion.div>

        {/* 사용자 프로필 카드 */}
        <motion.div 
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
              <UserIcon className="w-10 h-10 text-white" aria-hidden="true" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {user.name}님, 안녕하세요! 👋
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {user.email} • {user.plan} 플랜
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.joinedAt.toLocaleDateString()}부터 함께하고 있습니다
              </p>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                className="glass-card px-4 py-2 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...getInteractiveProps()}
              >
                <CogIcon className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">설정</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 탭 네비게이션 */}
        <motion.div 
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          role="tablist"
          aria-label="대시보드 탭"
        >
          {[
            { id: 'overview', label: '개요', icon: ChartBarIcon },
            { id: 'stats', label: '통계', icon: ArrowTrendingUpIcon },
            { id: 'settings', label: '설정', icon: AdjustmentsHorizontalIcon }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg'
                  : 'glass-card text-gray-700 dark:text-gray-300 hover:text-indigo-500'
              }`}
              onClick={() => setActiveTab(tab.id as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...getInteractiveProps()}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <tab.icon className="w-4 h-4" aria-hidden="true" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* 탭 컨텐츠 */}
        <motion.div 
          role="tabpanel"
          aria-labelledby="dashboard-heading"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <OverviewTab />
              </motion.div>
            )}
            
            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <StatsTab />
              </motion.div>
            )}
            
            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <SettingsTab />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default UserDashboard;