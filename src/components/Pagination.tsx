import React from 'react';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  totalArticles: number;
  shownCount: number;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalArticles,
  shownCount,
}) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className="mt-12 py-6 border-t-2 border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 select-none"
      aria-label="Article navigation"
    >
      {/* Left Item Count Status */}
      <div className="text-xs font-mono text-emerald-400 flex items-center gap-2">
        <Hash className="w-3.5 h-3.5 text-[#FFE600]" />
        <span>
          Showing <strong className="text-[#FFE600] font-bold">{shownCount}</strong> of{' '}
          <strong className="text-[#FFE600] font-bold">{totalArticles}</strong> Pro Gaming Playbooks
        </span>
      </div>

      {/* Center & Right Navigation Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Previous Page Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-sm border flex items-center gap-1.5 transition-all ${
            currentPage <= 1
              ? 'opacity-40 cursor-not-allowed bg-black/40 text-emerald-600 border-emerald-900/60'
              : 'bg-black text-[#FFE600] hover:bg-[#FFE600] hover:text-black border-black cursor-pointer shadow-sm active:scale-95'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        {/* Numbered Page Selectors (Page 1 and Page 2) */}
        <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-sm border border-emerald-800/80">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-xs text-xs font-mono font-black transition-all ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-md scale-105'
                    : 'text-emerald-300 hover:text-[#FFE600] hover:bg-emerald-950/60'
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Page Button */}
        <button
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-sm border flex items-center gap-1.5 transition-all ${
            currentPage >= totalPages
              ? 'opacity-40 cursor-not-allowed bg-black/40 text-emerald-600 border-emerald-900/60'
              : 'bg-[#FFE600] text-black hover:bg-white border-black cursor-pointer shadow-sm active:scale-95'
          }`}
          aria-label="Next Page"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Styled Active Indicator */}
      <div className="bg-[#FFE600] text-black px-3 py-1 font-mono text-xs font-black uppercase rounded-xs shadow-xs">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};
