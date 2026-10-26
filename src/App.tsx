import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LayoutGrid,
  List,
  Filter,
  Flame,
  Search,
  CheckCircle,
  X,
  Crosshair,
  SlidersHorizontal,
  Bookmark,
  Tag,
  Hash,
} from 'lucide-react';
import { ARTICLES_DATA, CATEGORIES } from './utils/blogData';
import { Article, paginateArticles, filterArticles } from './utils/blogUtils';
import { Header } from './components/Header';
import { TickerBar } from './components/TickerBar';
import { HeroSection } from './components/HeroSection';
import { ArticleCard } from './components/ArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { Pagination } from './components/Pagination';
import { EdpiCalculatorModal } from './components/EdpiCalculatorModal';
import { ContactModal } from './components/ContactModal';
import { ComplianceView, CompliancePageType } from './components/ComplianceView';
import { SidebarBlogPosts } from './components/SidebarBlogPosts';
import { Footer } from './components/Footer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isCalcOpen, setIsCalcOpen] = useState<boolean>(false);
  const [compliancePage, setCompliancePage] = useState<CompliancePageType | null>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('gv_saved_articles');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showingSavedOnly, setShowingSavedOnly] = useState<boolean>(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  const blogSectionRef = useRef<HTMLElement>(null);

  // All 20 target keywords for taxonomy
  const allKeywords = useMemo(() => {
    return Array.from(new Set(ARTICLES_DATA.map((art) => art.keyword)));
  }, []);

  const handleSelectKeyword = (kw: string | null) => {
    setSelectedKeyword((prev) => (prev === kw ? null : kw));
    setCurrentPage(1);
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync compliance page with URL hash for SEO & direct bookmarks
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').toLowerCase();
      if (['about', 'contact', 'privacy', 'terms', 'disclaimer'].includes(rawHash)) {
        setCompliancePage(rawHash as CompliancePageType);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gv_saved_articles', JSON.stringify(savedIds));
    } catch {
      // ignore
    }
  }, [savedIds]);

  // Fetch any generated images on mount
  useEffect(() => {
    fetch('/api/generated-images')
      .then((res) => res.json())
      .then((data) => {
        if (data.images) {
          setGeneratedImages(data.images);
        }
      })
      .catch(() => {});
  }, []);

  const toggleSaveArticle = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  // Reset page when category or search changes
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedKeyword(null);
    setShowingSavedOnly(false);
    setCurrentPage(1);
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (blogSectionRef.current) {
      blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered dataset
  const filteredArticles = useMemo(() => {
    let list = ARTICLES_DATA;

    if (showingSavedOnly) {
      list = list.filter((art) => savedIds.includes(art.id));
    }

    if (selectedKeyword) {
      const kw = selectedKeyword.toLowerCase();
      list = list.filter(
        (art) =>
          art.keyword.toLowerCase() === kw ||
          art.title.toLowerCase().includes(kw) ||
          art.slug.toLowerCase().includes(kw.replace(/\s+/g, '-')) ||
          art.hardwareTags.some((t) => t.toLowerCase().includes(kw))
      );
    }

    return filterArticles(list, searchQuery, activeCategory);
  }, [searchQuery, activeCategory, showingSavedOnly, savedIds, selectedKeyword]);

  // Paginated dataset: Page 1 = 12 articles, Page 2 = 8 articles
  const { articles: paginatedArticles, totalPages } = useMemo(() => {
    return paginateArticles(filteredArticles, currentPage, { page1Size: 12, page2Size: 8 });
  }, [filteredArticles, currentPage]);

  const handleSelectArticleById = (articleId: string) => {
    const art = ARTICLES_DATA.find((a) => a.id === articleId);
    if (art) {
      setSelectedArticle(art);
    }
  };

  const handleNavigateArticle = (delta: number) => {
    if (!selectedArticle) return;
    const currentIndex = ARTICLES_DATA.findIndex((a) => a.id === selectedArticle.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + delta + ARTICLES_DATA.length) % ARTICLES_DATA.length;
    setSelectedArticle(ARTICLES_DATA[nextIndex]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#00180d] text-emerald-100 selection:bg-[#FFE600] selection:text-black">
      {/* 1. Header with Bold Yellow Theme */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onOpenAbout={() => setCompliancePage('about')}
        onOpenContact={() => setCompliancePage('contact')}
        onOpenCalculator={() => setIsCalcOpen(true)}
        bookmarkCount={savedIds.length}
        onToggleSavedOnly={() => {
          setShowingSavedOnly(!showingSavedOnly);
          setCurrentPage(1);
        }}
        showingSavedOnly={showingSavedOnly}
      />

      {/* 2. Breaking News / Live Ticker Tape (پٹی) */}
      <TickerBar onSelectArticle={handleSelectArticleById} />

      {/* 3. Hero Section (Dedicated High-Tech Visual, No Duplicate Blog) */}
      <HeroSection
        onExplorePlaybooks={() => {
          if (blogSectionRef.current) {
            blogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenCalculator={() => setIsCalcOpen(true)}
      />

      {/* 4. Main Section: 2-Column Responsive Layout (Main Feed with 3-Card Grid + Compact Right Sidebar) */}
      <main ref={blogSectionRef} className="flex-1 max-w-7xl xl:max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Main Area: Pro Gaming Playbooks Feed with 3-Cards Per Row */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Section Controls Toolbar (Category Chips, Active Filter Banner, View Switcher) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-800/80">
              {/* Active Context Title & Count */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#FFE600] rounded-xs" />
                  <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight">
                    {selectedKeyword
                      ? `Guides for "${selectedKeyword}"`
                      : showingSavedOnly
                      ? 'Saved Playbooks'
                      : searchQuery
                      ? `Search: "${searchQuery}"`
                      : activeCategory === 'all'
                      ? 'All Gaming Playbooks'
                      : CATEGORIES.find((c) => c.id === activeCategory)?.label}
                  </h2>
                </div>
                <p className="text-xs font-mono text-emerald-400 mt-1">
                  {selectedKeyword
                    ? `Showing ${filteredArticles.length} guides linked to target keyword`
                    : showingSavedOnly
                    ? `${filteredArticles.length} bookmarked guides saved on this machine`
                    : activeCategory === 'all' && !searchQuery
                    ? `Complete 20-article encyclopedia (Page 1: 12 Guides · Page 2: 8 Guides)`
                    : `Showing ${filteredArticles.length} matching pro playbooks`}
                </p>
              </div>

              {/* Controls: Reset Filter & View Switcher */}
              <div className="flex items-center gap-2.5 shrink-0">
                {(activeCategory !== 'all' || searchQuery || showingSavedOnly || selectedKeyword) && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedKeyword(null);
                      setSearchQuery('');
                      setShowingSavedOnly(false);
                      setCurrentPage(1);
                    }}
                    className="px-2.5 py-1.5 text-xs font-mono font-bold uppercase bg-black/60 text-emerald-300 hover:text-[#FFE600] border border-emerald-800/80 rounded-xs flex items-center gap-1.5 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                )}

                {/* View Switcher: Grid View vs List View */}
                <div
                  className="flex items-center bg-black/70 p-1 rounded-sm border border-emerald-800/80"
                  role="group"
                  aria-label="Article layout switcher"
                >
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-xs transition-all ${
                      viewMode === 'grid'
                        ? 'bg-[#FFE600] text-black shadow-xs font-black'
                        : 'text-emerald-400 hover:text-white'
                    }`}
                    aria-label="Switch to Grid View"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>

                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-xs transition-all ${
                      viewMode === 'list'
                        ? 'bg-[#FFE600] text-black shadow-xs font-black'
                        : 'text-emerald-400 hover:text-white'
                    }`}
                    aria-label="Switch to List View"
                    aria-pressed={viewMode === 'list'}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Active Keyword Notice Banner */}
            {selectedKeyword && (
              <div className="p-3 bg-black/60 border-l-4 border-[#FFE600] border-y border-r border-emerald-800 rounded-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-gray-400 uppercase">Linked Keyword:</span>
                  <span className="text-[#FFE600] font-bold">#{selectedKeyword}</span>
                  <span className="text-emerald-400">({filteredArticles.length} matching playbooks)</span>
                </div>
                <button
                  onClick={() => handleSelectKeyword(null)}
                  className="text-xs font-mono text-gray-400 hover:text-white underline"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Article Cards Grid / List: 3 compact cards fitting side-by-side in each row */}
            {paginatedArticles.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch'
                    : 'space-y-4'
                }
              >
                {paginatedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    viewMode={viewMode}
                    onSelect={(art) => setSelectedArticle(art)}
                    isSaved={savedIds.includes(article.id)}
                    onToggleSave={toggleSaveArticle}
                    customImageAsset={generatedImages[article.id]}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-black/40 border border-emerald-800/60 rounded-xs p-8 space-y-4">
                <SlidersHorizontal className="w-12 h-12 text-[#FFE600] mx-auto opacity-70" />
                <h3 className="text-xl font-display font-extrabold text-white uppercase">
                  No matching gaming playbooks found
                </h3>
                <p className="text-xs sm:text-sm text-emerald-300/80 max-w-md mx-auto font-sans">
                  We couldn't find any guides matching your criteria. Try adjusting your search query or
                  clearing the active keyword tag.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSelectedKeyword(null);
                    setSearchQuery('');
                    setShowingSavedOnly(false);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-white transition-colors"
                >
                  Reset and View All 20 Playbooks
                </button>
              </div>
            )}

            {/* 5. Pagination (Exact 2-Page Flow) */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalArticles={filteredArticles.length}
              shownCount={paginatedArticles.length}
            />
          </div>

          {/* Sidebar Column: Target Keyword Taxonomy + Trending Playbooks */}
          <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-20 space-y-5">
            <SidebarBlogPosts
              articles={ARTICLES_DATA}
              keywords={allKeywords}
              selectedKeyword={selectedKeyword}
              onSelectKeyword={handleSelectKeyword}
              onSelectArticle={(art) => setSelectedArticle(art)}
              onOpenCalculator={() => setIsCalcOpen(true)}
              onOpenContact={() => setCompliancePage('contact')}
            />
          </div>
        </div>
      </main>

      {/* 6. Comprehensive Article Reader Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          isSaved={savedIds.includes(selectedArticle.id)}
          onToggleSave={toggleSaveArticle}
          onNavigateArticle={handleNavigateArticle}
          customImageAsset={generatedImages[selectedArticle.id]}
          onImageGenerated={(artId, url) => {
            setGeneratedImages((prev) => ({ ...prev, [artId]: url }));
          }}
        />
      )}

      {/* 7. eDPI & Sens Calculator Modal */}
      {isCalcOpen && (
        <EdpiCalculatorModal
          onClose={() => setIsCalcOpen(false)}
          onReadAimGuide={() => {
            const aimGuide = ARTICLES_DATA.find((a) => a.id === 'art-13');
            if (aimGuide) setSelectedArticle(aimGuide);
          }}
        />
      )}

      {/* 8. Full Legal & Editorial Compliance Center (About, Contact, Privacy, Terms, Disclaimer) */}
      <ComplianceView
        isOpen={compliancePage !== null}
        initialPage={compliancePage || 'about'}
        onClose={() => {
          setCompliancePage(null);
          if (window.location.hash) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />

      {/* 9. Standalone Quick Contact Modal fallback */}
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}

      {/* 10. High-Contrast Bold Yellow Footer with 5 Dedicated Legal Links */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenContact={() => setCompliancePage('contact')}
        onOpenCompliance={(page) => {
          setCompliancePage(page);
          window.location.hash = page;
        }}
      />
    </div>
  );
}
