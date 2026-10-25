import { Phone, Mail, MessageCircle, Shield, ArrowUp, Zap, Scale, Lock, FileText, HelpCircle } from 'lucide-react';
import { CATEGORIES } from '../utils/blogData';
import { CompliancePageType } from './ComplianceView';

interface Props {
  onSelectCategory: (categoryId: string) => void;
  onOpenContact: () => void;
  onOpenCompliance: (page: CompliancePageType) => void;
}

export const Footer: React.FC<Props> = ({ onSelectCategory, onOpenContact, onOpenCompliance }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 bg-[#FFD700] text-black border-t-4 border-black select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-black rounded-xs flex items-center justify-center p-1.5 shadow-md">
                <svg viewBox="0 0 40 40" className="w-full h-full fill-none">
                  <polygon
                    points="20,4 34,9 34,22 20,36 6,22 6,9"
                    fill="#00180d"
                    stroke="#FFE600"
                    strokeWidth="2.5"
                  />
                  <circle cx="20" cy="20" r="7" stroke="#10b981" strokeWidth="1.5" />
                  <path
                    d="M 15 15 L 20 25 L 25 15"
                    stroke="#FFE600"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-2xl font-display font-black tracking-tighter uppercase text-black">
                game<span className="text-[#004422]">vaulte</span>
              </span>
            </div>

            <p className="text-xs font-mono font-bold text-black/90 uppercase tracking-wider">
              "THE ULTIMATE GAMER'S PLAYBOOK - GEAR, GUIDES & ESPORTS"
            </p>

            <p className="text-xs text-black/80 font-sans leading-relaxed">
              Engineered for high-refresh 240Hz+ precision, PC overclocking, mobile emulation, and
              tactical esports mastery. Every guide is lab-benchmarked and tested in competitive scrims.
            </p>
          </div>

          {/* Col 2: Category Blueprints */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-black border-b border-black/30 pb-1">
              Tactical Categories
            </h4>
            <ul className="space-y-1.5 text-xs font-mono font-bold">
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat.id);
                      window.scrollTo({ top: 500, behavior: 'smooth' });
                    }}
                    className="hover:underline flex items-center gap-1.5 text-black/90 hover:text-black"
                  >
                    <span className="w-1.5 h-1.5 bg-black rounded-xs" />
                    <span>{cat.label}</span>
                    <span className="opacity-60 text-[10px]">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Official Embedded Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-black border-b border-black/30 pb-1">
              Official Contact Desk
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-black text-white rounded-xs space-y-1">
                <span className="text-[10px] text-[#FFE600] uppercase font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#FFE600]" />
                  Phone & WhatsApp
                </span>
                <p className="text-sm font-bold text-white tracking-wider">03069256639</p>
                <div className="flex items-center gap-1.5 pt-1">
                  <a
                    href="https://wa.me/923069256639?text=Hello%20gamevaulte%20Team"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#25D366] text-black font-bold text-[10px] rounded-xs hover:opacity-90"
                  >
                    <MessageCircle className="w-3 h-3" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:03069256639"
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-800 text-[#FFE600] font-bold text-[10px] rounded-xs hover:bg-neutral-700"
                  >
                    Call
                  </a>
                </div>
              </div>

              <div className="p-2.5 bg-black text-white rounded-xs space-y-1">
                <span className="text-[10px] text-[#FFE600] uppercase font-bold flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#FFE600]" />
                  Official Email
                </span>
                <p className="text-[11px] font-bold text-emerald-300 break-all">
                  sagheerofficial21dnb@gmail.com
                </p>
                <a
                  href="mailto:sagheerofficial21dnb@gmail.com?subject=gamevaulte%20Editorial"
                  className="inline-block mt-1 text-[10px] underline text-[#FFE600] hover:text-white"
                >
                  Click to send inquiry →
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Editorial Standards & Direct Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-black uppercase tracking-wider text-black border-b border-black/30 pb-1">
              Editorial Integrity
            </h4>
            <p className="text-xs text-black/80 font-sans leading-relaxed">
              We never accept sponsored benchmark inflation. All FPS tests are verified across
              identical hardware runs with DPC latency logs.
            </p>

            <button
              onClick={onOpenContact}
              className="w-full py-2 bg-black text-[#FFE600] hover:bg-white hover:text-black font-mono font-black text-xs uppercase rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Dispatch Message to Editors</span>
              <Zap className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={scrollToTop}
              className="w-full py-1.5 bg-black/10 hover:bg-black/20 text-black font-mono font-bold text-[11px] uppercase rounded-xs flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Dedicated Compliance & Legal Governance Strip */}
        <div className="pt-8 pb-6 border-t-2 border-black/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-black tracking-widest text-black/70 block">
                LEGAL, EDITORIAL & COMPLIANCE GOVERNANCE
              </span>
              <p className="text-xs font-sans text-black/80 font-medium">
                Verified compliance with Google AdSense, GDPR, CCPA/CPRA, and FTC Endorsement Standards.
              </p>
            </div>

            {/* Dedicated 5 Compliance Links */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-mono font-bold">
              <button
                onClick={() => onOpenCompliance('about')}
                className="px-3 py-1.5 bg-black text-[#FFE600] hover:bg-neutral-900 rounded-xs transition-colors shadow-xs"
              >
                About Us
              </button>
              <button
                onClick={() => onOpenCompliance('contact')}
                className="px-3 py-1.5 bg-black text-[#FFE600] hover:bg-neutral-900 rounded-xs transition-colors shadow-xs"
              >
                Contact Us
              </button>
              <button
                onClick={() => onOpenCompliance('privacy')}
                className="px-3 py-1.5 bg-black/15 hover:bg-black hover:text-[#FFE600] text-black rounded-xs transition-colors border border-black/30"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onOpenCompliance('terms')}
                className="px-3 py-1.5 bg-black/15 hover:bg-black hover:text-[#FFE600] text-black rounded-xs transition-colors border border-black/30"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => onOpenCompliance('disclaimer')}
                className="px-3 py-1.5 bg-black/15 hover:bg-black hover:text-[#FFE600] text-black rounded-xs transition-colors border border-black/30"
              >
                Disclaimer
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Strip */}
        <div className="pt-6 border-t-2 border-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <p className="font-bold text-black text-center sm:text-left">
            © 2026 gamevaulte. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-black/80">
            <span>Official Desk: sagheerofficial21dnb@gmail.com</span>
            <span aria-hidden="true">·</span>
            <span>Tel: 03069256639</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
