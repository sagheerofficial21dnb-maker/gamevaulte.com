import React from 'react';
import { Tag, Flame, Clock, Crosshair, ArrowRight, X, Phone, Layers } from 'lucide-react';
import { Article } from '../utils/blogUtils';

interface Props {
  articles: Article[];
  keywords: string[];
  selectedKeyword: string | null;
  onSelectKeyword: (keyword: string | null) => void;
  onSelectArticle: (article: Article) => void;
  onOpenCalculator: () => void;
  onOpenContact: () => void;
}

export const SidebarBlogPosts: React.FC<Props> = ({
  articles,
  keywords,
  selectedKeyword,
  onSelectKeyword,
  onSelectArticle,
  onOpenCalculator,
  onOpenContact,
}) => {
  // Take top trending playbooks to display
  const trendingArticles = articles.slice(0, 10);

  return (
    <aside className="space-y-5 select-none" aria-label="Sidebar navigation and highlights">
      {/* SECTION 1 (TOP): Target Keyword Taxonomy & Tag Index */}
      <section className="bg-[#002012] border-2 border-emerald-800/80 rounded-sm p-4 shadow-xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#FFE600] text-black">
              <Tag className="w-3.5 h-3.5 fill-black" />
            </span>
            <div>
              <h3 className="text-xs font-display font-black text-white uppercase tracking-wider">
                Target Keyword Taxonomy
              </h3>
              <p className="text-[10px] font-mono text-emerald-400">
                Tag Index ({keywords.length} Pro Keywords)
              </p>
            </div>
          </div>

          {selectedKeyword && (
            <button
              onClick={() => onSelectKeyword(null)}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-950/80 border border-red-500/80 text-red-200 text-[10px] font-mono font-bold uppercase rounded-xs hover:bg-red-900 transition-colors shadow-xs"
              title="Clear tag filter"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Compact Vertically Scrollable Keywords Container */}
        <div
          className="max-h-[220px] overflow-y-auto cyber-scrollbar pr-1.5 space-y-1.5"
          role="group"
          aria-label="Filter articles by target keyword"
        >
          {/* All Keywords Option */}
          <button
            onClick={() => onSelectKeyword(null)}
            className={`w-full text-left px-2.5 py-1.5 text-xs font-mono uppercase rounded-xs transition-all flex items-center justify-between ${
              selectedKeyword === null
                ? 'bg-[#FFE600] text-black font-black shadow-md border border-black'
                : 'bg-black/50 border border-emerald-800/80 text-emerald-300 hover:text-white hover:border-[#FFE600]'
            }`}
          >
            <span className="flex items-center gap-1">
              <Layers className="w-3 h-3" />
              <span>ALL PRO KEYWORDS</span>
            </span>
            <span className="text-[10px] font-bold opacity-80">({articles.length})</span>
          </button>

          {/* Keyword Tags List */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {keywords.map((kw) => {
              const isSelected = selectedKeyword === kw;
              return (
                <button
                  key={kw}
                  onClick={() => onSelectKeyword(kw)}
                  className={`px-2 py-1 text-[11px] font-mono font-bold rounded-xs transition-all flex items-center gap-1 text-left ${
                    isSelected
                      ? 'bg-[#FFE600] text-black font-black shadow-[0_0_10px_rgba(255,230,0,0.5)] border border-black scale-102'
                      : 'bg-black/60 border border-emerald-800/80 text-emerald-200/90 hover:border-[#FFE600] hover:text-[#FFE600]'
                  }`}
                >
                  <span className={isSelected ? 'text-black' : 'text-[#FFE600]'}>#</span>
                  <span className="truncate max-w-[240px]">{kw}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2 (DIRECTLY BELOW): Trending Playbooks */}
      <section className="bg-[#002012] border-2 border-emerald-800/80 rounded-sm p-4 shadow-xl space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-800 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-xs bg-[#FFE600] text-black">
              <Flame className="w-3.5 h-3.5 fill-black" />
            </span>
            <h3 className="text-xs font-display font-black text-white uppercase tracking-wider">
              Trending Playbooks
            </h3>
          </div>
          <span className="text-[9px] font-mono bg-black text-[#FFE600] px-2 py-0.5 rounded-xs font-bold border border-emerald-800">
            TOP READS
          </span>
        </div>

        {/* Compact Vertically Scrollable Smaller Blog Posts */}
        <div
          className="max-h-[340px] overflow-y-auto cyber-scrollbar pr-1.5 space-y-2.5 divide-y divide-emerald-900/60"
          role="feed"
          aria-label="Trending playbooks list"
        >
          {trendingArticles.map((art, idx) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="pt-2.5 first:pt-0 group cursor-pointer flex items-start gap-3 hover:bg-black/40 p-1.5 -mx-1.5 rounded-xs transition-all"
            >
              {/* Miniature Thumbnail */}
              <div className="w-18 h-13 shrink-0 rounded-xs overflow-hidden border border-emerald-700/80 bg-black relative shadow-sm">
                <img
                  src={art.imageAsset}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-0 right-0 bg-black/90 text-[#FFE600] text-[8px] font-mono font-bold px-1 rounded-tl-xs">
                  #{idx + 1}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="text-[#FFE600] font-bold uppercase truncate max-w-[110px]">
                    {art.categoryLabel}
                  </span>
                  <span className="text-emerald-400/80 flex items-center gap-1 shrink-0">
                    <Clock className="w-2.5 h-2.5" />
                    {art.readTime}
                  </span>
                </div>

                <h4 className="text-xs font-display font-bold text-white group-hover:text-[#FFE600] transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h4>

                <p className="text-[9px] font-mono text-emerald-400/80 truncate">
                  Target: #{art.keyword}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Quick Esports Aim Tool & Help Desk */}
      <div className="p-3.5 bg-black/70 border border-emerald-800 rounded-sm space-y-2 text-xs font-mono">
        <button
          onClick={onOpenCalculator}
          className="w-full py-2 bg-[#00e5ff] hover:bg-white text-black font-mono font-black text-xs uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <Crosshair className="w-3.5 h-3.5 text-black" />
          <span>Launch eDPI Aim Calculator</span>
        </button>

        <div className="pt-2 border-t border-emerald-900/80 flex items-center justify-between text-[11px]">
          <span className="text-emerald-400 flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#FFE600]" />
            <span>03069256639</span>
          </span>
          <button
            onClick={onOpenContact}
            className="text-[#FFE600] hover:text-white underline font-bold uppercase text-[10px]"
          >
            Contact Desk
          </button>
        </div>
      </div>
    </aside>
  );
};
