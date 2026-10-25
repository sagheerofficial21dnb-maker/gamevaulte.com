import React, { useState } from 'react';
import { Article } from '../utils/blogUtils';

interface Props {
  article: Article;
  mode?: 'card' | 'detailed';
  className?: string;
  customImageAsset?: string;
}

export const InfographicVisual: React.FC<Props> = ({
  article,
  mode = 'card',
  className = '',
  customImageAsset,
}) => {
  const guide = article.buyingGuide;
  const [imageError, setImageError] = useState(false);

  const imageSrc = customImageAsset || article.imageAsset;

  return (
    <div
      className={`relative w-full aspect-[16/9] bg-[#02050e] overflow-hidden select-none group border-2 border-[#00e5ff]/80 shadow-[0_0_28px_rgba(0,229,255,0.3)] rounded-xs ${className}`}
    >
      <img
        src={imageSrc}
        alt={`${guide.mainHeading} - ${guide.subHeading}`}
        onError={() => setImageError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        referrerPolicy="no-referrer"
        loading={mode === 'card' ? 'lazy' : 'eager'}
      />

      {/* High-tech corner tech accents */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#00e5ff] pointer-events-none drop-shadow-[0_0_5px_#00e5ff]" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#00e5ff] pointer-events-none drop-shadow-[0_0_5px_#00e5ff]" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#00e5ff] pointer-events-none drop-shadow-[0_0_5px_#00e5ff]" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#00e5ff] pointer-events-none drop-shadow-[0_0_5px_#00e5ff]" />

      {/* Cyber 16:9 Indicator Tag */}
      <div className="absolute top-2.5 left-3.5 z-10 px-2 py-0.5 bg-black/80 border border-[#00e5ff]/90 rounded-xs text-[8px] sm:text-[9.5px] font-mono font-bold text-[#00e5ff] flex items-center gap-1.5 backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
        <span>CYBER GUIDE 16:9</span>
      </div>
    </div>
  );
};
