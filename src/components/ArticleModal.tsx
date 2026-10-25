import React, { useState } from 'react';
import {
  X,
  Clock,
  Calendar,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  CheckCircle,
  Wrench,
  BookOpen,
  FileText,
} from 'lucide-react';
import { Article } from '../utils/blogUtils';
import { InfographicVisual } from './InfographicVisual';

interface Props {
  article: Article;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onNavigateArticle?: (delta: number) => void;
  customImageAsset?: string;
  onImageGenerated?: (articleId: string, url: string) => void;
  onRequestPaidPlan?: () => void;
}

export const ArticleModal: React.FC<Props> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
  onNavigateArticle,
  customImageAsset,
  onImageGenerated,
  onRequestPaidPlan,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Image Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [genSuccess, setGenSuccess] = useState<string | null>(null);
  const [needsPaid, setNeedsPaid] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  const activeImage = customImageAsset || article.imageAsset;

  const handleCopyLink = () => {
    const url = `${window.location.origin}#${article.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out this gaming playbook on gamevaulte: "${article.title}" - ${window.location.origin}#${article.slug}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleGenerateGeminiImage = async () => {
    setIsGenerating(true);
    setGenError(null);
    setGenSuccess(null);
    setNeedsPaid(false);

    try {
      const promptToUse = article.imagePrompt || article.buyingGuide.centerpieceDescription;
      const res = await fetch('/api/generate-infographic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: article.id,
          prompt: promptToUse,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.needsPaidKey || res.status === 429) {
          setNeedsPaid(true);
          setGenError(
            'Gemini Image Quota Note: Free Tier image generation quota is currently exhausted (limit: 0 / rate-limited). To unlock unrestricted Gemini 3.1 & Nano Banana generation, please activate your Paid Plan.'
          );
        } else {
          setGenError(data.error || 'Failed to generate image via Gemini API.');
        }
        return;
      }

      if (data.imageAsset) {
        setGenSuccess('Realistic 16:9 infographic generated and saved successfully with Gemini!');
        if (onImageGenerated) {
          onImageGenerated(article.id, data.imageAsset);
        }
      }
    } catch (err: any) {
      setGenError(err.message || 'Network error communicating with the generation server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-article-title"
    >
      <div className="relative w-full max-w-4xl bg-[#001f11] border-2 border-emerald-700/80 rounded-sm shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Modal Sticky Top Header */}
        <div className="sticky top-0 z-20 bg-[#FFE600] text-black px-4 sm:px-6 py-3 flex items-center justify-between border-b-2 border-black/80 shadow-md">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="font-mono text-xs font-black uppercase tracking-wider bg-black text-[#FFE600] px-2 py-0.5 rounded-xs">
              {article.categoryLabel}
            </span>
            <span className="hidden sm:inline font-mono text-xs text-black/70 font-semibold truncate">
              Target: {article.keyword}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Font size toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="px-2 py-1 text-xs font-mono font-bold bg-black/10 hover:bg-black/20 text-black rounded-xs border border-black/30"
              title="Toggle reading font size"
            >
              {fontSize === 'normal' ? 'A+' : 'A-'}
            </button>

            {/* Bookmark button */}
            <button
              onClick={(e) => onToggleSave(article.id, e)}
              className={`p-1.5 rounded-xs border transition-colors ${
                isSaved
                  ? 'bg-black text-[#FFE600] border-black'
                  : 'bg-black/10 hover:bg-black/20 text-black border-black/30'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark this guide'}
              aria-label="Bookmark guide"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#FFE600]' : ''}`} />
            </button>

            {/* Share / WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="p-1.5 rounded-xs bg-[#25D366] text-white hover:bg-green-600 transition-colors"
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-xs bg-black text-[#FFE600] hover:bg-neutral-800 transition-colors"
              title="Copy link"
              aria-label="Copy guide link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xs bg-black text-white hover:bg-red-600 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-emerald-700">
          {/* 16:9 Cyber Infographic Header */}
          <div className="rounded-xs overflow-hidden border-2 border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.25)]">
            <InfographicVisual
              article={article}
              mode="detailed"
              customImageAsset={activeImage}
            />
          </div>

          {/* GEMINI AI IMAGE GENERATOR ACTION BAR */}
          <div className="bg-[#050a1e] border-2 border-[#00d4ff]/70 rounded-xs p-3.5 sm:p-4 space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff] flex items-center justify-center text-[#00d4ff] shrink-0">
                  <Sparkles className="w-4 h-4 text-[#ffe600]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-mono font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span>GEMINI REALISTIC PICTURE GENERATOR</span>
                    <span className="text-[9px] bg-[#FFE600] text-black font-bold px-1.5 py-0.2 rounded-xs">
                      16:9
                    </span>
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans">
                    Generate or regenerate this guide's professional 3D infographic using Gemini models.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowPromptDetails(!showPromptDetails)}
                  className="px-2.5 py-1.5 text-xs font-mono font-bold text-[#00d4ff] bg-black/40 hover:bg-[#00d4ff]/10 border border-[#00d4ff]/50 rounded-xs transition-colors"
                >
                  {showPromptDetails ? 'Hide Prompt' : 'View Prompt'}
                </button>

                <button
                  onClick={handleGenerateGeminiImage}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE600] hover:bg-white text-black font-mono font-black text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Generate with Gemini</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt Preview */}
            {showPromptDetails && (
              <div className="p-3 bg-black/60 border border-[#00d4ff]/30 rounded-xs text-[11px] font-mono text-gray-300 space-y-1">
                <div className="text-[10px] text-[#00d4ff] font-bold uppercase tracking-wider">
                  Target Gemini Generation Prompt:
                </div>
                <p className="leading-relaxed text-gray-300 select-all">
                  {article.imagePrompt || article.buyingGuide.centerpieceDescription}
                </p>
              </div>
            )}

            {/* Success Alert */}
            {genSuccess && (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-500 rounded-xs flex items-center gap-2 text-xs text-emerald-200 font-sans">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{genSuccess}</span>
              </div>
            )}

            {/* Error / Quota Notice */}
            {genError && (
              <div className="p-3 bg-amber-950/80 border border-amber-500/80 rounded-xs space-y-2 text-xs text-amber-200 font-sans">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{genError}</span>
                </div>
                {needsPaid && onRequestPaidPlan && (
                  <div className="pt-1">
                    <button
                      onClick={onRequestPaidPlan}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-white transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Open AI Studio Billing / Paid Setup</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 6 Cyber Buying Guide Panels Grid in Modal */}
          <div className="p-4 sm:p-5 bg-[#060a1f] border-2 border-[#00f0ff]/50 rounded-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#00f0ff]/30 pb-2">
              <div>
                <h3 className="text-xs sm:text-sm font-display font-black text-[#00f0ff] uppercase tracking-wider">
                  {article.buyingGuide.mainHeading}
                </h3>
                <p className="text-[10px] font-mono text-[#ffe600] uppercase">
                  {article.buyingGuide.subHeading}
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#00f0ff] text-black px-2 py-0.5 font-bold rounded-xs">
                6-PANEL BLUEPRINT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { label: 'TOP LEFT', ...article.buyingGuide.panels.topLeft, color: 'border-[#00f0ff] text-[#00f0ff]' },
                { label: 'MID LEFT', ...article.buyingGuide.panels.midLeft, color: 'border-[#a855f7] text-[#a855f7]' },
                { label: 'BOTTOM LEFT', ...article.buyingGuide.panels.bottomLeft, color: 'border-[#00f0ff] text-[#00f0ff]' },
                { label: 'TOP RIGHT', ...article.buyingGuide.panels.topRight, color: 'border-[#ffe600] text-[#ffe600]' },
                { label: 'MID RIGHT', ...article.buyingGuide.panels.midRight, color: 'border-[#00f0ff] text-[#00f0ff]' },
                { label: 'BOTTOM RIGHT', ...article.buyingGuide.panels.bottomRight, color: 'border-[#a855f7] text-[#a855f7]' },
              ].map((panel, idx) => (
                <div key={idx} className={`p-3 bg-black/60 border-l-2 ${panel.color} rounded-xs space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-400 font-bold">{panel.label}</span>
                    <span className={`text-[10px] font-mono font-black uppercase ${panel.color}`}>
                      {panel.title}
                    </span>
                  </div>
                  <ul className="text-xs font-sans text-gray-200 space-y-1 pt-1">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#ffe600] font-bold">›</span>
                      <span>{panel.bullets[0]}</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#ffe600] font-bold">›</span>
                      <span>{panel.bullets[1]}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Title and Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span className="text-[#FFE600] font-bold uppercase">{article.categoryLabel}</span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishDate}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="flex items-center gap-1 text-[#FFE600] font-bold">
                <FileText className="w-3.5 h-3.5" />
                {article.wordCount ? `${article.wordCount} Words` : '1,400+ Words'}
              </span>
              <span aria-hidden="true" className="text-emerald-700">·</span>
              <span className="text-emerald-400">By {article.author.name} ({article.author.role})</span>
            </div>

            <h1
              id="modal-article-title"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white leading-tight mb-4"
            >
              {article.title}
            </h1>

            {/* Hardware Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {article.hardwareTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-emerald-300 bg-black/40 border border-emerald-800 px-2.5 py-1 rounded-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Specs Callout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-black/40 border border-emerald-800/80 rounded-xs">
            {article.content.quickStats.map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <p className="text-[10px] font-mono uppercase text-emerald-400/80 tracking-wider">
                  {stat.label}
                </p>
                <p className="text-sm sm:text-base font-mono font-bold text-[#FFE600] mt-0.5 truncate">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Article Introduction */}
          <div className={`prose prose-invert max-w-none ${fontSize === 'large' ? 'text-lg leading-relaxed' : 'text-base leading-relaxed'} text-emerald-100`}>
            <p className="font-sans text-emerald-200/90 font-medium">
              {article.content.intro}
            </p>
          </div>

          {/* Deep-Dive Architectural & Tactical Analysis */}
          {article.content.deepDiveSections && article.content.deepDiveSections.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-display font-black text-[#00f0ff] uppercase tracking-wide border-b border-emerald-800/80 pb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#00f0ff]" />
                <span>Deep-Dive Tactical & Hardware Analysis</span>
              </h3>
              <div className="space-y-4">
                {article.content.deepDiveSections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 bg-[#001c10]/80 border-l-3 border-[#00f0ff] border-y border-r border-emerald-900/60 rounded-xs space-y-2"
                  >
                    <h4 className="text-base font-display font-bold text-white flex items-center gap-2">
                      <span className="text-[#00f0ff] font-mono font-bold text-sm">›</span>
                      <span>{section.title}</span>
                    </h4>
                    <p className={`font-sans text-emerald-200/90 leading-relaxed ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-Step Tactical Guide */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-black text-[#FFE600] uppercase tracking-wide border-b border-emerald-800/80 pb-2 flex items-center gap-2">
              <span>Step-by-Step Execution Guide</span>
            </h3>

            <div className="space-y-4">
              {article.content.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#002b18]/60 border border-emerald-800/80 rounded-xs space-y-2 hover:border-emerald-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#FFE600] text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-base font-display font-bold text-white">
                      {step.title}
                    </h4>
                  </div>
                  <p className={`font-sans text-emerald-200/90 pl-9 ${fontSize === 'large' ? 'text-base' : 'text-sm'} leading-relaxed`}>
                    {step.detail}
                  </p>
                  {step.tip && (
                    <div className="ml-9 p-2.5 bg-black/40 border-l-2 border-[#FFE600] text-xs font-mono text-emerald-300">
                      <span className="text-[#FFE600] font-bold">PRO TIP: </span>
                      {step.tip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Benchmark Data Table (if available) */}
          {article.content.benchmarkData && article.content.benchmarkData.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-display font-black text-white uppercase tracking-wider flex items-center gap-2">
                <span>Performance Benchmarks & Metrics</span>
              </h3>
              <div className="overflow-x-auto rounded-xs border border-emerald-800 bg-black/40">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#FFE600] text-black uppercase font-black text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Benchmark Metric</th>
                      <th className="py-2.5 px-4">Stock / Baseline</th>
                      <th className="py-2.5 px-4">Tuned / Result</th>
                      <th className="py-2.5 px-4">Net Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-900/60 text-emerald-200">
                    {article.content.benchmarkData.map((item, rIdx) => (
                      <tr key={rIdx} className="hover:bg-emerald-950/40">
                        <td className="py-2.5 px-4 font-bold text-white">{item.benchmark}</td>
                        <td className="py-2.5 px-4 text-gray-400">{item.before}</td>
                        <td className="py-2.5 px-4 text-[#00e5ff] font-bold">{item.after}</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">{item.gain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Troubleshooting Common Bottlenecks */}
          {article.content.troubleshooting && article.content.troubleshooting.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-display font-black text-[#FFE600] uppercase tracking-wider flex items-center gap-2 border-b border-emerald-800/80 pb-2">
                <Wrench className="w-4 h-4 text-[#FFE600]" />
                <span>Troubleshooting Common Bottlenecks & Pitfalls</span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {article.content.troubleshooting.map((item, tIdx) => (
                  <div key={tIdx} className="p-3.5 bg-black/60 border border-amber-900/40 rounded-xs space-y-1.5">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 font-mono font-bold text-xs shrink-0 mt-0.5">[ISSUE]</span>
                      <p className="text-xs sm:text-sm font-sans font-semibold text-gray-200">
                        {item.problem}
                      </p>
                    </div>
                    <div className="flex items-start gap-2 pl-2 border-l-2 border-emerald-500/80 pt-1">
                      <span className="text-emerald-400 font-mono font-bold text-xs shrink-0 mt-0.5">[FIX]</span>
                      <p className="text-xs sm:text-sm font-sans text-emerald-200/90">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pro Tips Box */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/40 via-yellow-950/30 to-black/40 border-l-4 border-[#FFE600] rounded-xs space-y-2">
            <h4 className="text-xs font-mono font-black uppercase text-[#FFE600] tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#FFE600]" />
              <span>Pro Analyst Tips</span>
            </h4>
            <ul className="text-xs sm:text-sm font-sans text-amber-100/90 space-y-1.5 list-disc list-inside">
              {article.content.proTips.map((tip, idx) => (
                <li key={idx} className="leading-relaxed">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Tactical Verdict & Conclusion */}
          {article.content.verdict && (
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#00381e] via-[#002414] to-black/80 border-2 border-[#00ff88]/60 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-[#00ff88] font-mono text-xs font-black uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                <span>Tactical Verdict & Engineering Summary</span>
              </div>
              <p className={`font-sans text-emerald-100 font-medium leading-relaxed ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
                {article.content.verdict}
              </p>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Navigation Footer */}
        {onNavigateArticle && (
          <div className="sticky bottom-0 z-20 bg-[#00170c] border-t-2 border-emerald-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
            <button
              onClick={() => onNavigateArticle(-1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/60 hover:bg-black text-emerald-300 hover:text-[#FFE600] border border-emerald-800 rounded-xs font-mono text-xs font-bold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Guide</span>
            </button>

            <span className="font-mono text-xs text-emerald-400/80">
              gamevaulte Blueprint #{article.id.replace('art-', '')} of 20
            </span>

            <button
              onClick={() => onNavigateArticle(1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE600] hover:bg-white text-black font-mono text-xs font-bold uppercase rounded-xs transition-colors shadow-sm"
            >
              <span>Next Guide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
