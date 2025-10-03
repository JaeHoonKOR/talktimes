"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';
import { 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  CalendarDaysIcon,
  TagIcon,
  ClockIcon,
  ChevronDownIcon,
  FunnelIcon,
  BookOpenIcon,
  GlobeAltIcon,
  TrendingUpIcon,
  StarIcon
} from '@heroicons/react/24/solid';

interface SearchFilters {
  query: string;
  categories: string[];
  sources: string[];
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: 'relevance' | 'date' | 'popularity' | 'readTime';
  readTime: 'any' | 'short' | 'medium' | 'long';
  language: 'all' | 'ko' | 'en';
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'keyword' | 'category' | 'source';
  count: number;
}

interface SearchResult {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: string;
  readTime: string;
  relevanceScore: number;
  tags: string[];
  thumbnail: string;
}

const AdvancedSearch = () => {
  const t = useTranslations('search');
  const tCategories = useTranslations('categories');
  const tCommon = useTranslations('common');
  
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { getInteractiveProps, triggerHapticFeedback } = useMicroInteractions();

  const [showFilters, setShowFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    sources: [],
    dateRange: { start: '', end: '' },
    sortBy: 'relevance',
    readTime: 'any',
    language: 'all'
  });
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // 검색 카테고리 옵션
  const categoryOptions = [
    { id: 'tech', name: tCategories('tech'), icon: '💻', count: 342 },
    { id: 'economy', name: tCategories('economy'), icon: '💰', count: 428 },
    { id: 'politics', name: tCategories('politics'), icon: '🏛️', count: 156 },
    { id: 'environment', name: tCategories('environment'), icon: '🌱', count: 234 },
    { id: 'sports', name: tCategories('sports'), icon: '⚽', count: 189 },
    { id: 'culture', name: tCategories('culture'), icon: '🎭', count: 167 },
    { id: 'science', name: tCategories('science'), icon: '🔬', count: 298 },
    { id: 'health', name: tCategories('health'), icon: '🏥', count: 203 }
  ];

  // 뉴스 소스 옵션
  const sourceOptions = [
    { id: 'techcrunch', name: 'TechCrunch', count: 89 },
    { id: 'economist', name: 'The Economist', count: 67 },
    { id: 'reuters', name: 'Reuters', count: 134 },
    { id: 'bbc', name: 'BBC News', count: 98 },
    { id: 'cnn', name: 'CNN', count: 76 },
    { id: 'nytimes', name: 'New York Times', count: 102 },
    { id: 'guardian', name: 'The Guardian', count: 87 },
    { id: 'wsj', name: 'Wall Street Journal', count: 93 }
  ];

  // 정렬 옵션
  const sortOptions = [
    { id: 'relevance', name: t('sort_options.relevance'), icon: StarIcon },
    { id: 'date', name: t('sort_options.date'), icon: ClockIcon },
    { id: 'popularity', name: t('sort_options.popularity'), icon: TrendingUpIcon },
    { id: 'readTime', name: t('sort_options.read_time'), icon: BookOpenIcon }
  ];

  // 검색 제안 시뮬레이션
  const generateSuggestions = (query: string): SearchSuggestion[] => {
    if (!query || query.length < 2) return [];
    
    const mockSuggestions: SearchSuggestion[] = [
      { id: '1', text: 'AI 반도체', type: 'keyword', count: 45 },
      { id: '2', text: '기후 변화', type: 'keyword', count: 67 },
      { id: '3', text: '경제 전망', type: 'keyword', count: 89 },
      { id: '4', text: '기술', type: 'category', count: 342 },
      { id: '5', text: 'TechCrunch', type: 'source', count: 89 },
      { id: '6', text: '스타트업 투자', type: 'keyword', count: 34 },
      { id: '7', text: '메타버스', type: 'keyword', count: 56 },
      { id: '8', text: '환경', type: 'category', count: 234 }
    ];

    return mockSuggestions.filter(s => 
      s.text.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);
  };

  // 검색 결과 시뮬레이션
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'AI 반도체 혁신, 차세대 컴퓨팅의 새로운 패러다임',
      summary: '인공지능 전용 반도체 기술이 급속도로 발전하면서 컴퓨팅 성능의 혁신적 변화를 가져오고 있습니다.',
      category: '기술',
      source: 'TechCrunch',
      publishedAt: '2024-01-20T10:30:00Z',
      readTime: '5분',
      relevanceScore: 95,
      tags: ['AI', '반도체', '혁신'],
      thumbnail: 'ai-chip-innovation.jpg - 첨단 AI 반도체 칩셋 이미지'
    },
    {
      id: '2',
      title: '글로벌 경제 전망 2024: 회복과 도전의 균형',
      summary: '2024년 세계 경제는 인플레이션 진정과 함께 점진적 회복세를 보일 것으로 전망되지만 여전히 불확실성이 존재합니다.',
      category: '경제',
      source: 'The Economist',
      publishedAt: '2024-01-19T14:15:00Z',
      readTime: '7분',
      relevanceScore: 88,
      tags: ['경제', '전망', '2024'],
      thumbnail: 'global-economy-2024.jpg - 세계 경제 그래프 및 차트'
    },
    {
      id: '3',
      title: '기후 변화 대응을 위한 새로운 국제 협력 체계',
      summary: '파리협정 이후 기후 변화 대응을 위한 새로운 국제 협력 체계가 논의되고 있으며, 탄소 중립 목표 달성을 위한 구체적 방안들이 제시되고 있습니다.',
      category: '환경',
      source: 'BBC News',
      publishedAt: '2024-01-18T09:45:00Z',
      readTime: '6분',
      relevanceScore: 82,
      tags: ['기후변화', '환경', '국제협력'],
      thumbnail: 'climate-cooperation.jpg - 지구와 친환경 기술 이미지'
    }
  ];

  useEffect(() => {
    if (searchFilters.query) {
      const newSuggestions = generateSuggestions(searchFilters.query);
      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchFilters.query]);

  const handleSearch = async () => {
    if (!searchFilters.query.trim()) return;
    
    setIsSearching(true);
    triggerHapticFeedback({ type: 'selection' });
    
    // 검색 결과 시뮬레이션
    setTimeout(() => {
      setSearchResults(mockSearchResults);
      setIsSearching(false);
      setShowSuggestions(false);
    }, 1000);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSearchFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSourceToggle = (sourceId: string) => {
    setSearchFilters(prev => ({
      ...prev,
      sources: prev.sources.includes(sourceId)
        ? prev.sources.filter(id => id !== sourceId)
        : [...prev.sources, sourceId]
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      query: '',
      categories: [],
      sources: [],
      dateRange: { start: '', end: '' },
      sortBy: 'relevance',
      readTime: 'any',
      language: 'all'
    });
    setSearchResults([]);
    triggerHapticFeedback({ type: 'impact', intensity: 'light' });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchFilters.categories.length > 0) count++;
    if (searchFilters.sources.length > 0) count++;
    if (searchFilters.dateRange.start || searchFilters.dateRange.end) count++;
    if (searchFilters.readTime !== 'any') count++;
    if (searchFilters.language !== 'all') count++;
    return count;
  };

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-white dark:bg-gray-900"
      aria-label="고급 뉴스 검색"
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
            id="search-heading"
          >
            🔍 {t('title')}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* 검색 바 */}
        <motion.div 
          className="relative mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="glass-card p-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('placeholder')}
                    value={searchFilters.query}
                    onChange={(e) => handleFilterChange('query', e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                {/* 검색 제안 */}
                <AnimatePresence>
                  {showSuggestions && (
                    <motion.div
                      className="absolute top-full left-0 right-0 mt-2 glass-card border border-gray-200 dark:border-gray-700 z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-2">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">{t('suggestions')}</p>
                        {suggestions.map((suggestion, index) => (
                          <motion.button
                            key={suggestion.id}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                            onClick={() => {
                              handleFilterChange('query', suggestion.text);
                              setShowSuggestions(false);
                              handleSearch();
                            }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            {...getInteractiveProps()}
                          >
                            <div className="flex items-center gap-3">
                              <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900 dark:text-white">
                                {suggestion.text}
                              </span>
                              {suggestion.type !== 'keyword' && (
                                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                                  {suggestion.type === 'category' ? '카테고리' : '소스'}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {suggestion.count}건
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center gap-2"
                onClick={handleSearch}
                disabled={isSearching}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...getInteractiveProps()}
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('searching')}
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    {t('button')}
                  </>
                )}
              </motion.button>

              <motion.button
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                  showFilters 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...getInteractiveProps()}
              >
                <FunnelIcon className="w-5 h-5" />
                {t('filters')}
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* 고급 필터 패널 */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="glass-card p-6 mb-8"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <AdjustmentsHorizontalIcon className="w-6 h-6 text-blue-500" />
                  {t('advanced_filters')}
                </h3>
                <motion.button
                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                  onClick={clearFilters}
                  whileHover={{ scale: 1.05 }}
                  {...getInteractiveProps()}
                >
                  <XMarkIcon className="w-4 h-4" />
                  {t('clear_all')}
                </motion.button>
              </div>

              <div className="space-y-6">
                {/* 카테고리 필터 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <TagIcon className="w-4 h-4 inline mr-2" />
                    {t('filters_panel.categories')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categoryOptions.map(category => (
                      <motion.button
                        key={category.id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                          searchFilters.categories.includes(category.id)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                        onClick={() => handleCategoryToggle(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        {...getInteractiveProps()}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="text-xs opacity-75">({category.count})</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 소스 필터 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    <GlobeAltIcon className="w-4 h-4 inline mr-2" />
                    {t('filters_panel.sources')}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {sourceOptions.map(source => (
                      <motion.button
                        key={source.id}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors text-left ${
                          searchFilters.sources.includes(source.id)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                        onClick={() => handleSourceToggle(source.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        {...getInteractiveProps()}
                      >
                        <div>{source.name}</div>
                        <div className="text-xs opacity-75">{source.count}건</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 날짜 범위 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <CalendarDaysIcon className="w-4 h-4 inline mr-2" />
                      시작 날짜
                    </label>
                    <input
                      type="date"
                      value={searchFilters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...searchFilters.dateRange, start: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      종료 날짜
                    </label>
                    <input
                      type="date"
                      value={searchFilters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...searchFilters.dateRange, end: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* 정렬 및 기타 옵션 */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      정렬 기준
                    </label>
                    <select
                      value={searchFilters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      읽기 시간
                    </label>
                    <select
                      value={searchFilters.readTime}
                      onChange={(e) => handleFilterChange('readTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="any">전체</option>
                      <option value="short">짧음 (1-3분)</option>
                      <option value="medium">보통 (3-7분)</option>
                      <option value="long">길음 (7분+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      언어
                    </label>
                    <select
                      value={searchFilters.language}
                      onChange={(e) => handleFilterChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">전체 언어</option>
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 검색 결과 */}
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  검색 결과 ({searchResults.length}건)
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  "{searchFilters.query}" 검색 결과
                </div>
              </div>

              <div className="space-y-6">
                {searchResults.map((result, index) => (
                  <motion.article
                    key={result.id}
                    className="glass-card p-6 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    {...getInteractiveProps()}
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center px-1 leading-tight">
                          {result.thumbnail}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                            {result.category}
                          </span>
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full flex items-center gap-1">
                            <StarIcon className="w-3 h-3" />
                            {result.relevanceScore}% 일치
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {result.readTime} 읽기
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {result.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                          {result.summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {result.tags.map(tag => (
                              <span 
                                key={tag}
                                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {result.source} • {new Date(result.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* 더 보기 버튼 */}
              <motion.div 
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  className="glass-card px-8 py-4 text-blue-600 dark:text-blue-400 font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  {...getInteractiveProps()}
                >
                  더 많은 검색 결과 보기
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 검색 결과가 없을 때 */}
        {searchResults.length === 0 && searchFilters.query && !isSearching && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              검색 결과를 찾을 수 없습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              다른 검색어를 시도하거나 필터를 조정해보세요
            </p>
            <motion.button
              className="text-blue-600 dark:text-blue-400 hover:underline"
              onClick={clearFilters}
              {...getInteractiveProps()}
            >
              필터 초기화
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AdvancedSearch;