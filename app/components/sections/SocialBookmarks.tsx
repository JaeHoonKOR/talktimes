"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useMicroInteractions } from '../../hooks/useMicroInteractions';
import { 
  BookmarkIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  LinkIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  ArrowUpOnSquareIcon,
  FolderIcon,
  TagIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid';
import { 
  BookmarkIcon as BookmarkOutlineIcon,
  HeartIcon as HeartOutlineIcon,
  ShareIcon as ShareOutlineIcon
} from '@heroicons/react/24/outline';

interface BookmarkedArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  tags: string[];
  folder: string;
  addedAt: Date;
  isRead: boolean;
  notes?: string;
  sharedCount: number;
  likesCount: number;
}

interface ShareStats {
  platform: string;
  icon: string;
  count: number;
  color: string;
}

interface BookmarkFolder {
  id: string;
  name: string;
  color: string;
  count: number;
  description: string;
}

const SocialBookmarks = () => {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const { getInteractiveProps, triggerHapticFeedback } = useMicroInteractions();

  const [selectedFolder, setSelectedFolder] = useState('all');
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>(['1', '3']);
  const [likedItems, setLikedItems] = useState<string[]>(['2', '4']);

  // 북마크 폴더 데이터
  const bookmarkFolders: BookmarkFolder[] = [
    {
      id: 'all',
      name: '전체',
      color: 'from-gray-500 to-gray-600',
      count: 24,
      description: '모든 북마크'
    },
    {
      id: 'tech',
      name: '기술',
      color: 'from-blue-500 to-cyan-500',
      count: 8,
      description: 'AI, 개발, 혁신'
    },
    {
      id: 'business',
      name: '비즈니스',
      color: 'from-green-500 to-emerald-500',
      count: 6,
      description: '경제, 투자, 스타트업'
    },
    {
      id: 'env',
      name: '환경',
      color: 'from-emerald-500 to-teal-500',
      count: 4,
      description: '기후, 에너지, 지속가능성'
    },
    {
      id: 'read-later',
      name: '나중에 읽기',
      color: 'from-purple-500 to-indigo-500',
      count: 6,
      description: '읽을 예정인 글'
    }
  ];

  // 북마크된 글 데이터
  const bookmarkedArticles: BookmarkedArticle[] = [
    {
      id: '1',
      title: 'AI 반도체 혁신이 가져올 패러다임 변화',
      summary: '차세대 AI 반도체 기술이 컴퓨팅 패러다임을 근본적으로 바꾸고 있습니다.',
      category: '기술',
      source: 'TechCrunch',
      publishedAt: '2024-01-15',
      readTime: '5분',
      thumbnail: 'ai-semiconductor.jpg - AI 반도체 칩 클로즈업 이미지 (미래지향적, 첨단기술)',
      tags: ['AI', '반도체', '혁신'],
      folder: 'tech',
      addedAt: new Date('2024-01-15T10:30:00'),
      isRead: true,
      notes: '투자 관련 내용 주목',
      sharedCount: 234,
      likesCount: 89
    },
    {
      id: '2',
      title: '지속가능한 에너지 전환의 경제적 효과',
      summary: '재생에너지로의 전환이 경제에 미치는 긍정적 영향을 분석합니다.',
      category: '환경',
      source: '환경경제',
      publishedAt: '2024-01-14',
      readTime: '7분',
      thumbnail: 'renewable-energy.jpg - 태양광 패널과 풍력발전기 (친환경, 지속가능)',
      tags: ['재생에너지', '경제', '정책'],
      folder: 'env',
      addedAt: new Date('2024-01-14T15:20:00'),
      isRead: false,
      sharedCount: 156,
      likesCount: 67
    },
    {
      id: '3',
      title: '스타트업 생태계의 새로운 트렌드 분석',
      summary: '2024년 스타트업 투자 및 성장 트렌드를 심층 분석합니다.',
      category: '비즈니스',
      source: 'Startup Today',
      publishedAt: '2024-01-13',
      readTime: '6분',
      thumbnail: 'startup-ecosystem.jpg - 스타트업 오피스 환경 (협업, 혁신, 성장)',
      tags: ['스타트업', '투자', '트렌드'],
      folder: 'business',
      addedAt: new Date('2024-01-13T09:15:00'),
      isRead: true,
      sharedCount: 198,
      likesCount: 145
    },
    {
      id: '4',
      title: '메타버스 기술과 미래 사회 변화',
      summary: '메타버스 기술이 사회 구조와 인간 관계에 미칠 영향을 전망합니다.',
      category: '기술',
      source: 'Future Tech',
      publishedAt: '2024-01-12',
      readTime: '8분',
      thumbnail: 'metaverse-future.jpg - 가상현실 속 미래 도시 (디지털, 혁신적)',
      tags: ['메타버스', 'VR', '미래'],
      folder: 'read-later',
      addedAt: new Date('2024-01-12T14:45:00'),
      isRead: false,
      sharedCount: 302,
      likesCount: 203
    }
  ];

  // 공유 통계 데이터
  const shareStats: ShareStats[] = [
    { platform: 'Twitter', icon: '🐦', count: 1234, color: 'from-sky-400 to-sky-600' },
    { platform: 'Facebook', icon: '📘', count: 856, color: 'from-blue-500 to-blue-700' },
    { platform: 'LinkedIn', icon: '💼', count: 432, color: 'from-blue-600 to-blue-800' },
    { platform: 'KakaoTalk', icon: '💬', count: 2341, color: 'from-yellow-400 to-yellow-600' }
  ];

  const [filteredArticles, setFilteredArticles] = useState(bookmarkedArticles);

  useEffect(() => {
    if (selectedFolder === 'all') {
      setFilteredArticles(bookmarkedArticles);
    } else {
      setFilteredArticles(bookmarkedArticles.filter(article => article.folder === selectedFolder));
    }
  }, [selectedFolder]);

  const handleBookmark = (articleId: string) => {
    setBookmarkedItems(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
    triggerHapticFeedback({ type: 'impact', intensity: 'light' });
  };

  const handleLike = (articleId: string) => {
    setLikedItems(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
    triggerHapticFeedback({ type: 'impact', intensity: 'light' });
  };

  const handleShare = (articleId: string, platform: string) => {
    // 실제 공유 로직 구현
    triggerHapticFeedback({ type: 'selection' });
    setShowShareMenu(null);
  };

  const handleCopyLink = (articleId: string) => {
    // 링크 복사 로직
    const url = `https://talktimes.com/article/${articleId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(articleId);
    triggerHapticFeedback({ type: 'selection' });
    
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const ArticleCard = ({ article, index }: { article: BookmarkedArticle; index: number }) => {
    const isBookmarked = bookmarkedItems.includes(article.id);
    const isLiked = likedItems.includes(article.id);
    const isShareMenuOpen = showShareMenu === article.id;
    const isLinkCopied = copiedLink === article.id;

    return (
      <motion.article
        className="glass-card p-6 group"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -4 }}
        layout
      >
        {/* 썸네일 및 메타데이터 */}
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center px-1 leading-tight">
              {article.thumbnail}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                {article.category}
              </span>
              {!article.isRead && (
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                  읽지 않음
                </span>
              )}
            </div>
            
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {article.title}
            </h3>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{article.source}</span>
              <span>{article.readTime}</span>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" aria-hidden="true" />
                <span>{new Date(article.addedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 요약 */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {article.summary}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map(tag => (
            <span 
              key={tag}
              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full flex items-center gap-1"
            >
              <TagIcon className="w-3 h-3" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        {/* 노트 (있는 경우) */}
        {article.notes && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/30 rounded-lg p-3 mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              📝 {article.notes}
            </p>
          </div>
        )}

        {/* 상호작용 버튼들 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 북마크 버튼 */}
            <motion.button
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
              }`}
              onClick={() => handleBookmark(article.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              {...getInteractiveProps()}
              aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
            >
              {isBookmarked ? (
                <BookmarkIcon className="w-5 h-5" />
              ) : (
                <BookmarkOutlineIcon className="w-5 h-5" />
              )}
            </motion.button>

            {/* 좋아요 버튼 */}
            <motion.button
              className={`p-2 rounded-full transition-colors flex items-center gap-1 ${
                isLiked 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'
              }`}
              onClick={() => handleLike(article.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              {...getInteractiveProps()}
              aria-label={isLiked ? '좋아요 취소' : '좋아요'}
            >
              {isLiked ? (
                <HeartIcon className="w-5 h-5" />
              ) : (
                <HeartOutlineIcon className="w-5 h-5" />
              )}
              <span className="text-xs">{article.likesCount}</span>
            </motion.button>

            {/* 공유 버튼 */}
            <div className="relative">
              <motion.button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 flex items-center gap-1"
                onClick={() => setShowShareMenu(isShareMenuOpen ? null : article.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                {...getInteractiveProps()}
                aria-label="공유"
              >
                <ShareIcon className="w-5 h-5" />
                <span className="text-xs">{article.sharedCount}</span>
              </motion.button>

              {/* 공유 메뉴 */}
              <AnimatePresence>
                {isShareMenuOpen && (
                  <motion.div
                    className="absolute bottom-full left-0 mb-2 glass-card p-4 min-w-48 z-10"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">공유하기</h4>
                    
                    <div className="space-y-2">
                      {shareStats.map(platform => (
                        <motion.button
                          key={platform.platform}
                          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          onClick={() => handleShare(article.id, platform.platform)}
                          whileHover={{ x: 4 }}
                          {...getInteractiveProps()}
                        >
                          <span className="text-lg">{platform.icon}</span>
                          <span className="text-sm font-medium">{platform.platform}</span>
                          <span className="text-xs text-gray-500 ml-auto">{platform.count}</span>
                        </motion.button>
                      ))}
                      
                      <motion.button
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => handleCopyLink(article.id)}
                        whileHover={{ x: 4 }}
                        {...getInteractiveProps()}
                      >
                        {isLinkCopied ? (
                          <>
                            <CheckIcon className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-green-500">복사됨!</span>
                          </>
                        ) : (
                          <>
                            <LinkIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">링크 복사</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 읽기 버튼 */}
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...getInteractiveProps()}
          >
            읽기
          </motion.button>
        </div>
      </motion.article>
    );
  };

  return (
    <section 
      ref={elementRef}
      className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
      aria-label="소셜 북마크 및 공유"
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
            id="bookmarks-heading"
          >
            📚 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">북마크</span> & 공유
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            관심 있는 뉴스를 저장하고 정리하여 언제든 다시 읽어보세요
          </motion.p>
        </motion.div>

        {/* 북마크 폴더 및 통계 */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {bookmarkFolders.map((folder, index) => (
            <motion.button
              key={folder.id}
              className={`glass-card p-4 text-center transition-all duration-300 ${
                selectedFolder === folder.id
                  ? 'ring-2 ring-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30'
                  : ''
              }`}
              onClick={() => setSelectedFolder(folder.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              {...getInteractiveProps()}
              aria-label={`${folder.name} 폴더, ${folder.count}개 글`}
            >
              <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br ${folder.color} flex items-center justify-center`}>
                <FolderIcon className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {folder.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {folder.description}
              </p>
              <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full">
                {folder.count}개
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* 공유 통계 */}
        <motion.div 
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <UserGroupIcon className="w-5 h-5 text-purple-500" aria-hidden="true" />
            이번 주 공유 통계
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shareStats.map((stat, index) => (
              <motion.div
                key={stat.platform}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-lg`}>
                  {stat.icon}
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {stat.platform}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.count.toLocaleString()}회
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 북마크된 글 목록 */}
        <motion.div 
          className="space-y-6"
          role="region"
          aria-labelledby="bookmarks-heading"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 빈 상태 */}
        {filteredArticles.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FolderIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              이 폴더가 비어있습니다
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              관심 있는 뉴스를 북마크해서 나중에 읽어보세요
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SocialBookmarks;