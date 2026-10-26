import React from 'react';
import { Bookmark, Clock, ArrowRight, UserCheck } from 'lucide-react';
import { Article } from '../utils/blogUtils';
import { InfographicVisual } from './InfographicVisual';

interface Props {
  article: Article;
  viewMode: 'grid' | 'list';
  onSelect: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string, e: React.MouseEvent) => void;
  customImageAsset?: string;
}

export const ArticleCard: React.FC<Props> = ({
  article,
  viewMode,
  onSelect,
  isSaved,
  onToggleSave,
  customImageAsset,
}) => {
  if (viewMode === 'list') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="gamer-card-transition gamer-card-hover group cursor-pointer bg-[#002414] border-2 border-emerald-800/80 rounded-sm overflow-hidden flex flex-col md:flex-row gap-5 p-4 relative shadow-lg"
      >
        {/* Left Thumbnail */}
        <div className="w-full md:w-72 lg:w-80 shrink-0 rounded-xs overflow-hidden border border-emerald-900/60 shadow-inner">
          <InfographicVisual
            article={article}
            mode="card"
            customImageAsset={customImageAsset}
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="font-bold text-[#FFE600] uppercase tracking-wider text-[11px]">
                {article.categoryLabel}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                {article.readTime}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-[11px] text-[#00e5ff] font-bold">
                {article.wordCount ? `${article.wordCount} words` : '1,400+ words'}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-[11px] text-emerald-400/80">By {article.author.name}</span>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-lg font-display font-extrabold text-white group-hover:text-[#FFE600] transition-colors leading-snug mb-2">
              {article.title}
            </h2>

            {/* Technical Excerpt */}
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed mb-3 line-clamp-2">
              {article.excerpt}
            </p>

            {/* Hardware Tags */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {article.hardwareTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-emerald-300/80 bg-black/40 border border-emerald-900/60 px-1.5 py-0.5 rounded-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="flex items-center justify-between pt-2.5 border-t border-emerald-900/60 mt-auto">
            <span className="text-xs font-mono text-emerald-300/80">
              {article.author.role}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleSave(article.id, e)}
                className={`p-1.5 rounded-xs border transition-colors ${
                  isSaved
                    ? 'bg-[#FFE600] text-black border-[#FFE600]'
                    : 'bg-black/40 text-emerald-300 hover:text-[#FFE600] border-emerald-800'
                }`}
                title={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
              </button>

              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase font-mono tracking-wider text-black bg-[#FFE600] group-hover:bg-white px-2.5 py-1 rounded-xs transition-colors shadow-sm">
                <span>Read</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid View: Compact Smaller Card (Designed for 3 cards per row)
  return (
    <article
      onClick={() => onSelect(article)}
      className="gamer-card-transition gamer-card-hover group cursor-pointer bg-[#002414] border-2 border-emerald-800/80 rounded-sm overflow-hidden flex flex-col justify-between relative shadow-md h-full"
    >
      {/* Top 16:9 Image Visual */}
      <div className="w-full relative overflow-hidden border-b border-emerald-900/80">
        <InfographicVisual
          article={article}
          mode="card"
          customImageAsset={customImageAsset}
        />
      </div>

      {/* Compact Content Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono text-emerald-400 mb-1.5">
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-bold text-[#FFE600] uppercase tracking-wider text-[10px] truncate">
                {article.categoryLabel}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-0.5 text-emerald-300 shrink-0">
                <Clock className="w-2.5 h-2.5 text-emerald-500" />
                {article.readTime}
              </span>
            </div>

            <button
              onClick={(e) => onToggleSave(article.id, e)}
              className={`p-1 rounded-xs border transition-colors shrink-0 ${
                isSaved
                  ? 'bg-[#FFE600] text-black border-[#FFE600]'
                  : 'bg-black/40 text-emerald-300 hover:text-[#FFE600] border-emerald-800/60'
              }`}
              title={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
            >
              <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-black' : ''}`} />
            </button>
          </div>

          {/* Compact Title (Optimized for 3 side-by-side cards) */}
          <h2 className="text-xs sm:text-sm font-display font-black text-white group-hover:text-[#FFE600] transition-colors leading-snug line-clamp-2 mb-1.5">
            {article.title}
          </h2>

          {/* Compact Excerpt */}
          <p className="text-[11px] sm:text-xs text-emerald-200/80 leading-relaxed line-clamp-2 mb-2 font-sans">
            {article.excerpt}
          </p>

          {/* Hardware Tags Chips */}
          <div className="flex flex-wrap gap-1">
            {article.hardwareTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono text-emerald-300/80 bg-black/50 border border-emerald-900/70 px-1.5 py-0.5 rounded-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Compact Footer */}
        <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between text-[10px] font-mono">
          <span className="text-emerald-400 font-semibold truncate max-w-[120px]">
            {article.author.name}
          </span>

          <span className="inline-flex items-center gap-1 text-[#FFE600] group-hover:text-white font-bold tracking-wider text-[10px] uppercase transition-colors shrink-0">
            <span>Read Guide</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
