import React, { useState } from 'react';
import { Search, X, Bookmark, Menu, Shield, Crosshair, Wrench, PhoneCall, Sparkles, Info } from 'lucide-react';
import { CATEGORIES } from '../utils/blogData';
import { SiteLogo } from './SiteLogo';

interface Props {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenCalculator: () => void;
  bookmarkCount: number;
  onToggleSavedOnly: () => void;
  showingSavedOnly: boolean;
}

export const Header: React.FC<Props> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenAbout,
  onOpenContact,
  onOpenCalculator,
  bookmarkCount,
  onToggleSavedOnly,
  showingSavedOnly,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (catId: string) => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFE600] text-black shadow-lg border-b-2 border-black/90">
      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('all')}
              className="text-left focus:outline-hidden"
              aria-label="gamevaulte home"
            >
              <SiteLogo variant="header" size="md" />
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search 20 pro guides, keywords, or hardware specs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-black/90 text-[#e6f7ec] placeholder:text-emerald-400/60 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-sm border border-black focus:outline-hidden focus:ring-2 focus:ring-black font-sans transition-all"
                aria-label="Search articles"
              />
              <Search className="w-4 h-4 text-[#FFE600] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  aria-label="Clear search query"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Action Hub (Tools, Saved, Contact, Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Sens Calculator quick tool */}
            <button
              onClick={onOpenCalculator}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-mono uppercase bg-black text-[#FFE600] hover:bg-neutral-900 rounded-sm border border-black shadow-xs transition-colors"
              title="Open eDPI & Sens Calculator"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>Sens Calc</span>
            </button>

            {/* Bookmarks Toggle */}
            <button
              onClick={onToggleSavedOnly}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold font-mono uppercase rounded-sm border transition-colors ${
                showingSavedOnly
                  ? 'bg-black text-[#FFE600] border-black'
                  : 'bg-black/10 hover:bg-black/20 text-black border-black/30'
              }`}
              title="Toggle Saved Articles"
              aria-label="Saved articles"
            >
              <Bookmark className={`w-3.5 h-3.5 ${showingSavedOnly ? 'fill-[#FFE600]' : ''}`} />
              <span className="hidden md:inline">Saved</span>
              <span className="bg-black text-[#FFE600] text-[10px] px-1.5 py-0.2 rounded-xs">
                {bookmarkCount}
              </span>
            </button>

            {/* About Us Primary Nav Link */}
            <button
              onClick={onOpenAbout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider bg-black/10 hover:bg-black hover:text-[#FFE600] text-black rounded-sm border border-black/40 transition-colors shadow-xs"
              title="About gamevaulte & Editorial Standards"
              aria-label="About Us"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Us</span>
            </button>

            {/* Contact & Editors Primary Action */}
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider bg-black text-[#FFE600] hover:bg-[#002814] rounded-sm transition-transform active:scale-95 shadow-md"
              aria-label="Open Contact & Editors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FFE600]" />
              <span className="whitespace-nowrap">Contact Us</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-black hover:bg-black/10 rounded-sm transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Small screens) */}
        <div className="pb-3 lg:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search 20 pro gaming guides..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-black/90 text-white placeholder:text-gray-400 text-xs pl-8 pr-8 py-2 rounded-sm border border-black focus:outline-hidden"
            />
            <Search className="w-3.5 h-3.5 text-[#FFE600] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Category Navigation Tabs */}
        <nav
          className="hidden lg:flex items-center gap-1 border-t border-black/15 py-2 overflow-x-auto scrollbar-none"
          aria-label="Categories"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id && !showingSavedOnly;
            return (
              <button
                key={cat.id}
                onClick={() => handleNavClick(cat.id)}
                className={`px-3 py-1 text-xs font-bold font-mono uppercase tracking-wider whitespace-nowrap rounded-sm transition-colors ${
                  isActive
                    ? 'bg-black text-[#FFE600] shadow-xs'
                    : 'text-black/90 hover:bg-black/10 hover:text-black'
                }`}
              >
                {cat.label}
                <span className="ml-1.5 opacity-60 text-[10px]">({cat.count})</span>
              </button>
            );
          })}

          {/* Quick Nav Links on right of categories */}
          <div className="ml-auto flex items-center gap-1.5 pl-3 border-l border-black/25 shrink-0">
            <button
              onClick={onOpenAbout}
              className="px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-black/10 rounded-xs flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3 h-3" />
              <span>About</span>
            </button>
            <button
              onClick={onOpenContact}
              className="px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-black/10 rounded-xs flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Contact</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black text-white border-t border-emerald-800/80 p-4 space-y-3 animate-in slide-in-from-top-2">
          <p className="text-[11px] font-mono uppercase text-[#FFE600] font-bold">
            Categories & Feeds
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick(cat.id)}
                className={`w-full text-left px-3 py-2 text-xs font-bold uppercase font-mono rounded-sm flex items-center justify-between ${
                  activeCategory === cat.id && !showingSavedOnly
                    ? 'bg-[#FFE600] text-black font-black'
                    : 'bg-neutral-900 text-gray-200 hover:bg-neutral-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75">{cat.count} articles</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenAbout();
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-xs font-mono font-bold uppercase bg-neutral-900 border border-neutral-700 text-gray-200 hover:text-[#FFE600] rounded-sm flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFE600]" />
                About Us
              </button>
              <button
                onClick={() => {
                  onOpenContact();
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-xs font-mono font-bold uppercase bg-[#FFE600] text-black rounded-sm flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Contact Us
              </button>
            </div>

            <button
              onClick={() => {
                onOpenCalculator();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 text-xs font-mono font-bold uppercase bg-emerald-950 border border-emerald-600 text-emerald-300 rounded-sm flex items-center justify-center gap-1.5"
            >
              <Crosshair className="w-3.5 h-3.5" />
              eDPI Calculator
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
