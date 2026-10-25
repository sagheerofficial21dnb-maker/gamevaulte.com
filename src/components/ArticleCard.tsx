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
        className="gamer-card-transition gamer-card-hover group cursor-pointer bg-[#002414] border-2 border-emerald-800/80 rounded-sm overflow-hidden flex flex-col md:flex-row gap-6 p-4 sm:p-5 relative shadow-lg"
      >
        {/* Left Thumbnail (Infographic) */}
        <div className="w-full md:w-80 lg:w-96 shrink-0 rounded-xs overflow-hidden border border-emerald-900/60 shadow-inner">
          <InfographicVisual
            article={article}
            mode="card"
            customImageAsset={customImageAsset}
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="font-bold text-[#FFE600] uppercase tracking-wider">
                {article.categoryLabel}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                {article.readTime}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-[#00e5ff] font-bold">
                {article.wordCount ? `${article.wordCount} words` : '1,400+ words'}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-emerald-400/80">{article.publishDate}</span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-emerald-400/80">By {article.author.name}</span>
            </div>

            {/* Title with target keyword accent */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-extrabold text-white group-hover:text-[#FFE600] transition-colors leading-snug mb-3">
              {article.title}
            </h2>

            {/* Technical Excerpt */}
            <p className="text-sm text-emerald-200/90 leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>

            {/* Hardware Tags list */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              {article.hardwareTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono text-emerald-300/80 bg-black/40 border border-emerald-900/60 px-2 py-0.5 rounded-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action Row */}
          <div className="flex items-center justify-between pt-3 border-t border-emerald-900/60 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-200 font-mono text-[10px] flex items-center justify-center font-bold">
                {article.author.avatarInitials}
              </div>
              <span className="text-xs font-mono text-emerald-300/80">
                {article.author.role}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => onToggleSave(article.id, e)}
                className={`p-2 rounded-xs border transition-colors ${
                  isSaved
                    ? 'bg-[#FFE600] text-black border-[#FFE600]'
                    : 'bg-black/40 text-emerald-300 hover:text-[#FFE600] border-emerald-800'
                }`}
                title={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
              </button>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase font-mono tracking-wider text-black bg-[#FFE600] group-hover:bg-white px-3 py-1.5 rounded-xs transition-colors shadow-sm">
                <span>Read Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (3-column responsive card)
  return (
    <article
      onClick={() => onSelect(article)}
      className="gamer-card-transition gamer-card-hover group cursor-pointer bg-[#002414] border-2 border-emerald-800/80 rounded-sm overflow-hidden flex flex-col justify-between relative shadow-lg h-full"
    >
      {/* Top Infographic Visual */}
      <div className="w-full relative overflow-hidden border-b border-emerald-900/80">
        <InfographicVisual
          article={article}
          mode="card"
          customImageAsset={customImageAsset}
        />
      </div>

      {/* Body Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Clean unboxed text with typographic separators */}
          <div className="flex items-center justify-between gap-2 text-xs font-mono text-emerald-400 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#FFE600] uppercase tracking-wider text-[11px]">
                {article.categoryLabel}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                <Clock className="w-3 h-3 text-emerald-500" />
                {article.readTime}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-[11px] text-[#00e5ff] font-bold">
                {article.wordCount ? `${article.wordCount}w` : '1.4kw'}
              </span>
            </div>

            <button
              onClick={(e) => onToggleSave(article.id, e)}
              className={`p-1.5 rounded-xs border transition-colors ${
                isSaved
                  ? 'bg-[#FFE600] text-black border-[#FFE600]'
                  : 'bg-black/30 text-emerald-300 hover:text-[#FFE600] border-emerald-800/60'
              }`}
              title={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark guide'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-black' : ''}`} />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-lg font-display font-extrabold text-white group-hover:text-[#FFE600] transition-colors leading-snug mb-2 line-clamp-2">
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          {/* Quick Hardware Tag preview */}
          <div className="flex flex-wrap gap-1 mb-4">
            {article.hardwareTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono text-emerald-300/70 bg-black/40 border border-emerald-900/60 px-1.5 py-0.5 rounded-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Row */}
        <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 truncate">
            <span className="text-emerald-400 font-semibold truncate">
              {article.author.name}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-[#FFE600] group-hover:text-white font-bold tracking-wider text-[11px] uppercase transition-colors shrink-0">
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </article>
  );
};
