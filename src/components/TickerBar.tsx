import React from 'react';
import { Zap, Flame } from 'lucide-react';
import { TRENDING_TICKER_ITEMS } from '../utils/blogData';

interface Props {
  onSelectArticle: (articleId: string) => void;
}

export const TickerBar: React.FC<Props> = ({ onSelectArticle }) => {
  // Duplicate array so marquee seamlessly loops indefinitely
  const repeatedItems = [...TRENDING_TICKER_ITEMS, ...TRENDING_TICKER_ITEMS];

  return (
    <div
      className="relative z-30 bg-[#FFD700] text-black border-b border-black/40 overflow-hidden select-none shadow-xs"
      role="region"
      aria-label="Breaking Gaming News & Trending Guides Ticker"
    >
      <div className="flex items-center">
        {/* Static Left Badge */}
        <div className="shrink-0 bg-black text-[#FFE600] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider z-10 shadow-md">
          <Zap className="w-3.5 h-3.5 fill-[#FFE600] animate-pulse text-[#FFE600]" />
          <span>TRENDING GUIDES</span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="overflow-hidden whitespace-nowrap py-2 sm:py-2.5 w-full">
          <div className="animate-ticker flex items-center gap-6 text-xs sm:text-sm font-display font-extrabold tracking-tight">
            {repeatedItems.map((item, idx) => (
              <button
                key={`${item.id}-${idx}`}
                onClick={() => onSelectArticle(item.id)}
                className="inline-flex items-center gap-2 text-black hover:text-[#004422] hover:underline focus:outline-hidden transition-colors shrink-0 group cursor-pointer"
              >
                <Flame className="w-3.5 h-3.5 text-black group-hover:text-red-700 transition-colors" />
                <span className="uppercase">{item.text}</span>
                <span className="text-black/40 font-mono font-normal">/</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Indicator Right Trim */}
        <div className="hidden md:flex shrink-0 bg-black/10 px-3 py-2 text-[10px] font-mono font-bold tracking-widest uppercase items-center gap-1.5 border-l border-black/20">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>20 PRO GUIDES</span>
        </div>
      </div>
    </div>
  );
};
