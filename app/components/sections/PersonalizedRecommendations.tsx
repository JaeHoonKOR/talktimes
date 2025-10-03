"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';
import { 
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  TagIcon,
  UserIcon,
  HeartIcon,
  ChevronRightIcon,
  StarIcon
} from '@heroicons/react/24/solid';

interface RecommendationCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ComponentType<any>;
  accuracy: number;
  articles: RecommendedArticle[];
}

interface RecommendedArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  engagement: number;
  publishedAt: string;
  source: string;
  tags: string[];
  personalizedScore: number;
  reason: string;
  thumbnail: string;
}

interface UserPreferences {
  interests: string[];
  readingTime: 'short' | 'medium' | 'long';
  categories: string[];
  sources: string[];
}

const PersonalizedRecommendations = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { getInteractiveProps } = useMicroInteractions();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    interests: ['AI & 기술', '경제', '환경'],
    readingTime: 'medium',
    categories: ['기술', '경제', '정치', '환경'],
    sources: ['TechCrunch', '경제신문', '환경일보']
  });

  // 추천 카테고리 데이터
  const recommendationCategories: RecommendationCategory[] = [
    {
      id: 'trending',
      name: '지금 뜨는 뉴스',
      description: '실시간 인기 급상승 뉴스',
      color: 'from-red-500 to-orange-500',
      icon: ArrowTrendingUpIcon,
      accuracy: 94,
      articles: [
        {
          id: '1',
          title: 'AI 반도체 시장 급성장, 새로운 투자 기회 부상',
          summary: '인공지능 반도체 시장이 예상보다 빠르게 성장하면서 관련 기업들의 주가가 연일 상승세를 보이고 있습니다.',
          category: '기술',
          readTime: '3분',
          engagement: 89,
          publishedAt: '2시간 전',
          source: 'TechNews',
          tags: ['AI', '반도체', '투자'],
          personalizedScore: 95,
          reason: '기술 및 투자 관심사 기반',
          thumbnail: 'ai-chip-news.jpg - AI 반도체 이미지 (고성능 칩셋, 기술적인 느낌)'
        },
        {
          id: '2',
          title: '탄소 중립 정책 강화, 친환경 기업 주목',
          summary: '정부의 탄소 중립 정책 강화로 친환경 기업들이 새로운 성장 동력을 찾고 있습니다.',
          category: '환경',
          readTime: '4분',
          engagement: 76,
          publishedAt: '3시간 전',
          source: '환경일보',
          tags: ['탄소중립', '친환경', '정책'],
          personalizedScore: 88,
          reason: '환경 정책 관심사 기반',
          thumbnail: 'carbon-neutral.jpg - 친환경 에너지 이미지 (태양광, 풍력 등)'
        }
      ]
    },
    {
      id: 'personalized',
      name: '맞춤 추천',
      description: '당신의 관심사 기반 추천',
      color: 'from-blue-500 to-purple-500',
      icon: SparklesIcon,
      accuracy: 92,
      articles: [
        {
          id: '3',
          title: '스타트업 생태계 변화, 새로운 펀딩 트렌드',
          summary: '최근 스타트업 투자 환경이 변화하면서 새로운 펀딩 방식들이 주목받고 있습니다.',
          category: '경제',
          readTime: '5분',
          engagement: 83,
          publishedAt: '1시간 전',
          source: '스타트업 투데이',
          tags: ['스타트업', '투자', '펀딩'],
          personalizedScore: 91,
          reason: '경제 및 스타트업 관심사',
          thumbnail: 'startup-funding.jpg - 스타트업 투자 미팅 이미지'
        },
        {
          id: '4',
          title: '메타버스 기술 발전과 미래 전망',
          summary: '메타버스 기술이 다양한 산업 분야로 확산되면서 새로운 비즈니스 모델들이 등장하고 있습니다.',
          category: '기술',
          readTime: '6분',
          engagement: 77,
          publishedAt: '4시간 전',
          source: 'MetaTech',
          tags: ['메타버스', 'VR', '미래기술'],
          personalizedScore: 89,
          reason: 'AI & 기술 관심사 기반',
          thumbnail: 'metaverse-tech.jpg - 메타버스 기술 이미지 (VR 헤드셋, 가상현실)'
        }
      ]
    },
    {
      id: 'similar',
      name: '비슷한 관심사',
      description: '유사한 사용자들이 읽는 뉴스',
      color: 'from-green-500 to-teal-500',
      icon: UserIcon,
      accuracy: 87,
      articles: [
        {
          id: '5',
          title: '글로벌 공급망 재편, 한국 기업 대응 전략',
          summary: '글로벌 공급망이 재편되면서 한국 기업들이 새로운 대응 전략을 모색하고 있습니다.',
          category: '경제',
          readTime: '4분',
          engagement: 72,
          publishedAt: '5시간 전',
          source: '글로벌 이코노미',
          tags: ['공급망', '글로벌', '전략'],
          personalizedScore: 84,
          reason: '유사 사용자 선호 패턴',
          thumbnail: 'global-supply.jpg - 글로벌 물류 네트워크 이미지'
        }
      ]
    }
  ];

  const [displayedArticles, setDisplayedArticles] = useState(
    recommendationCategories.flatMap(cat => cat.articles)
  );

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setDisplayedArticles(recommendationCategories.flatMap(cat => cat.articles));
    } else {
      const category = recommendationCategories.find(cat => cat.id === categoryId);
      setDisplayedArticles(category ? category.articles : []);
    }
  };

  const ArticleCard = ({ article, index }: { article: RecommendedArticle; index: number }) => (
    <motion.article
      className="glass-card p-6 group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      {...getInteractiveProps({
        ripple: { color: 'rgba(102, 126, 234, 0.3)' },
        haptic: { type: 'selection' }
      })}
      aria-label={`추천 뉴스: ${article.title}`}
    >
      {/* 썸네일 플레이스홀더 */}
      <div className="aspect-ratio-16-9 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center px-2 leading-tight">
          {article.thumbnail}
        </div>
      </div>

      {/* 메타데이터 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <StarIcon className="w-3 h-3 text-yellow-500" aria-hidden="true" />
            <span>{article.personalizedScore}% 일치</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
          <ClockIcon className="w-3 h-3" aria-hidden="true" />
          <span>{article.readTime}</span>
        </div>
      </div>

      {/* 제목 및 요약 */}
      <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {article.summary}
      </p>

      {/* 추천 이유 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-3 rounded-lg mb-4">
        <div className="flex items-center gap-2 mb-1">
          <SparklesIcon className="w-4 h-4 text-blue-500" aria-hidden="true" />
          <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
            추천 이유
          </span>
        </div>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          {article.reason}
        </p>
      </div>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map(tag => (
          <span 
            key={tag}
            className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 하단 메타데이터 */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{article.source} • {article.publishedAt}</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-3 h-3" aria-hidden="true" />
            <span>{article.engagement}%</span>
          </div>
          <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </div>
      </div>
    </motion.article>
  );

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-white dark:bg-gray-900"
      aria-label="개인화된 뉴스 추천"
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
            id="recommendations-heading"
          >
            ✨ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">당신만을 위한</span> 뉴스 추천
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            AI가 당신의 관심사와 읽기 패턴을 분석하여 가장 관련성 높은 뉴스를 추천합니다
          </motion.p>
        </motion.div>

        {/* 추천 정확도 및 설정 */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2">
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-blue-500" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  추천 정확도: <span className="text-blue-600 dark:text-blue-400 font-bold">92%</span>
                </span>
              </div>
            </div>
            <div className="glass-card px-4 py-2">
              <div className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  관심사: {userPreferences.interests.length}개
                </span>
              </div>
            </div>
          </div>
          
          <motion.button
            className="glass-card px-6 py-3 flex items-center gap-2 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...getInteractiveProps()}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-500">
              추천 설정
            </span>
          </motion.button>
        </motion.div>

        {/* 카테고리 필터 */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          role="tablist"
          aria-label="추천 카테고리 필터"
        >
          <motion.button
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'glass-card text-gray-700 dark:text-gray-300 hover:text-blue-500'
            }`}
            onClick={() => handleCategoryFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...getInteractiveProps()}
            role="tab"
            aria-selected={selectedCategory === 'all'}
          >
            전체 추천
          </motion.button>
          
          {recommendationCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'glass-card text-gray-700 dark:text-gray-300 hover:text-blue-500'
              }`}
              onClick={() => handleCategoryFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...getInteractiveProps()}
              role="tab"
              aria-selected={selectedCategory === category.id}
            >
              <category.icon className="w-4 h-4" aria-hidden="true" />
              <span>{category.name}</span>
              <span className="text-xs opacity-75">
                {category.accuracy}%
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* 추천 뉴스 그리드 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-labelledby="recommendations-heading"
        >
          <AnimatePresence mode="popLayout">
            {displayedArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 더 보기 버튼 */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button
            className="glass-card px-8 py-4 text-blue-600 dark:text-blue-400 font-semibold group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            {...getInteractiveProps()}
          >
            <span className="flex items-center gap-2">
              더 많은 추천 뉴스 보기
              <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;