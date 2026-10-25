import React from 'react';
import { Crosshair, ArrowRight, Radio } from 'lucide-react';

interface Props {
  onExplorePlaybooks: () => void;
  onOpenCalculator: () => void;
}

export const HeroSection: React.FC<Props> = ({
  onExplorePlaybooks,
  onOpenCalculator,
}) => {
  return (
    <section className="relative overflow-hidden border-b-2 border-emerald-800/80 bg-gradient-to-b from-[#002814] via-[#001c0e] to-[#00140a] py-8 sm:py-12 select-none">
      {/* High-Tech Cyber Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(255, 230, 0, 0.15) 0%, transparent 70%),
            linear-gradient(rgba(16, 185, 129, 0.25) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 36px 36px, 36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Mission, Branding & Tagline */}
          <div className="lg:col-span-6 space-y-5">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/70 border border-[#FFE600] rounded-xs shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFE600] animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#FFE600]">
                THE ULTIMATE GAMER'S PLAYBOOK - GEAR, GUIDES & ESPORTS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight leading-[1.1] uppercase">
              Master the meta with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE600] via-emerald-300 to-[#FFE600]">
                lab-tested
              </span>{' '}
              hardware & tactics.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed font-sans max-w-xl">
              20 comprehensive engineering blueprints covering balanced 1440p PC builds, zero-delay
              Windows latency tuning, high-FPS mobile emulation, and pro esports aim calibration.
            </p>

            {/* Hero Quick Stat Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-black/60 border border-emerald-800/80 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                  Target Guides
                </span>
                <span className="text-xl font-display font-black text-[#FFE600] tabular-nums">
                  20 / 20
                </span>
              </div>
              <div className="p-3 bg-black/60 border border-emerald-800/80 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                  Sensor Latency
                </span>
                <span className="text-xl font-display font-black text-emerald-300 tabular-nums">
                  &lt; 0.8ms
                </span>
              </div>
              <div className="p-3 bg-black/60 border border-emerald-800/80 rounded-xs">
                <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
                  Exact Flow
                </span>
                <span className="text-xl font-display font-black text-white tabular-nums">
                  2-Page
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExplorePlaybooks}
                className="px-5 py-2.5 bg-[#FFE600] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xs hover:bg-white flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Explore Playbooks</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="px-4 py-2.5 bg-black/70 hover:bg-black text-[#FFE600] border border-emerald-700 font-mono font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Crosshair className="w-4 h-4 text-[#FFE600]" />
                <span>eDPI Aim Calculator</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Quality High-Tech Hero Image Showcase (ONLY IMAGE, NO DUPLICATE BLOG) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border-2 border-[#00e5ff] shadow-[0_0_35px_rgba(0,229,255,0.28)] bg-[#010810] group">
              {/* Only Image - Cyber Battlestation Command Center */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src="/assets/gamevaulte_hero_battlestation.jpg"
                  alt="GameVaulte Pro Gaming Battlestation & Esports Hardware Setup"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Cyber HUD Vignette & Framing Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Corner Tech Brackets */}
                <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#FFE600] drop-shadow-[0_0_6px_#FFE600]" />
                <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#FFE600] drop-shadow-[0_0_6px_#FFE600]" />
                <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#FFE600] drop-shadow-[0_0_6px_#FFE600]" />
                <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#FFE600] drop-shadow-[0_0_6px_#FFE600]" />

                {/* Minimal Tech HUD Indicator Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-black/85 border border-[#FFE600] text-[#FFE600] font-mono font-black text-[10px] uppercase rounded-xs flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
                    <span>COMMAND STATION</span>
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 bg-black/80 border border-[#00e5ff] text-[#00e5ff] font-mono text-[9px] uppercase rounded-xs">
                    4K HDR DUAL-MONITOR
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-black/85 border border-emerald-500/80 text-emerald-300 font-mono text-[10px] font-bold rounded-xs flex items-center gap-1">
                    <Radio className="w-3 h-3 text-[#FFE600] animate-pulse" />
                    <span>LIVE LAB RIG</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
