import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  FileText,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Send,
  ExternalLink,
  Printer,
  ChevronRight,
  Sparkles,
  Award,
  Cpu,
  Lock,
  Scale,
  Info,
} from 'lucide-react';

export type CompliancePageType = 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';

interface Props {
  initialPage?: CompliancePageType;
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceView: React.FC<Props> = ({
  initialPage = 'about',
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<CompliancePageType>(initialPage);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    fullName: '',
    emailAddress: '',
    department: 'Editorial Feedback & Correction',
    messageSubject: '',
    messageBody: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Sync activeTab when initialPage changes
  useEffect(() => {
    if (initialPage) {
      setActiveTab(initialPage);
    }
  }, [initialPage]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.fullName || !contactForm.emailAddress || !contactForm.messageBody) return;

    setIsSubmitting(true);
    // Simulate real server-side dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTicketId(`GV-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="compliance-page-title"
    >
      <div className="relative w-full max-w-5xl bg-[#00170c] border-2 border-[#FFE600] rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Sticky Cyber Top Header */}
        <div className="sticky top-0 z-30 bg-[#FFE600] text-black px-4 sm:px-6 py-3.5 flex items-center justify-between border-b-2 border-black/90 shadow-md">
          <div className="flex items-center gap-2.5 truncate">
            <span className="font-mono text-xs font-black uppercase tracking-wider bg-black text-[#FFE600] px-2.5 py-1 rounded-xs">
              gamevaulte
            </span>
            <span className="text-black/60 font-mono text-xs font-bold hidden sm:inline">
              /
            </span>
            <span className="font-mono text-xs text-black/90 font-bold uppercase truncate">
              Legal, Editorial & Compliance Center
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold bg-black/10 hover:bg-black/20 text-black rounded-xs border border-black/30 transition-colors"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xs bg-black text-[#FFE600] hover:bg-neutral-900 transition-colors flex items-center gap-1 font-mono text-xs font-bold"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close [ESC]</span>
            </button>
          </div>
        </div>

        {/* 5-Tab Navigation Bar */}
        <nav
          className="bg-black/90 border-b border-emerald-800/80 px-4 sm:px-6 py-2.5 flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none shrink-0"
          aria-label="Compliance Tabs"
        >
          {[
            { id: 'about' as const, label: 'About Us', icon: Sparkles },
            { id: 'contact' as const, label: 'Contact Us', icon: Phone },
            { id: 'privacy' as const, label: 'Privacy Policy', icon: Lock },
            { id: 'terms' as const, label: 'Terms & Conditions', icon: Scale },
            { id: 'disclaimer' as const, label: 'Disclaimer', icon: AlertTriangle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSubmitSuccess(false);
                }}
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xs font-mono text-xs uppercase font-bold tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-md font-black scale-102'
                    : 'text-emerald-300/80 hover:text-white hover:bg-emerald-950/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#FFE600]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 md:p-10 overflow-y-auto space-y-8 text-emerald-100 font-sans leading-relaxed selection:bg-[#FFE600] selection:text-black">
          {/* ========================================================= */}
          {/* 1. ABOUT US PAGE */}
          {/* ========================================================= */}
          {activeTab === 'about' && (
            <article className="space-y-8 animate-in fade-in duration-150">
              {/* Header Banner */}
              <div className="border-b-2 border-emerald-700/80 pb-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-emerald-500/60 text-[#FFE600] font-mono text-xs font-bold uppercase rounded-xs">
                  <Award className="w-3.5 h-3.5" />
                  <span>The Authority on Competitive PC & Console Gaming</span>
                </div>
                <h1
                  id="compliance-page-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight"
                >
                  About <span className="text-[#FFE600]">gamevaulte</span>
                </h1>
                <p className="text-sm sm:text-base font-mono text-[#00e5ff] font-bold">
                  "THE ULTIMATE GAMER'S PLAYBOOK - GEAR, GUIDES & ESPORTS"
                </p>
                <p className="text-xs font-mono text-emerald-400">
                  Established 2026 · Independent Testing Laboratory · Zero Sponsored Benchmark Bias
                </p>
              </div>

              {/* Core Mission */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-black text-white uppercase tracking-wide flex items-center gap-2 border-l-4 border-[#FFE600] pl-3">
                  <span>Our Core Mission</span>
                </h2>
                <p className="text-emerald-200/90 text-sm sm:text-base">
                  At <strong>gamevaulte</strong>, our mission is singular and uncompromising: to deliver the most mathematically accurate, hardware-benchmarked, and tactically sound gaming intelligence in the modern esports era. In an online landscape flooded with generic AI summaries, shallow listicles, and undisclosed affiliate fluff, gamevaulte stands as a fortress of engineering integrity.
                </p>
                <p className="text-emerald-200/90 text-sm sm:text-base">
                  Whether you are assembling your first AM5 budget battle station, calculating sub-millisecond input lag on an 8000Hz gaming mouse, eliminating micro-stutters via Windows kernel scheduler optimizations, or structuring communications for a Tier-3 esports roster, our playbooks provide verified, reproducible blueprints designed to give you a definitive competitive edge.
                </p>
              </section>

              {/* Editorial Team & Roster */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-black text-white uppercase tracking-wide flex items-center gap-2 border-l-4 border-[#00e5ff] pl-3">
                  <span>Who We Are: The Editorial & Engineering Roster</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  gamevaulte is not run by generalist bloggers. Our staff is comprised of seasoned hardware architects, firmware engineers, competitive tournament veterans, and acoustic specialists:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {[
                    {
                      name: 'Sagheer Tech',
                      role: 'Editor-in-Chief & Lead Hardware Architect',
                      bio: 'Over a decade of experience in silicon silicon architecture, GPU undervolting, and custom thermal loop engineering. Direct desk contact: sagheerofficial21dnb@gmail.com.',
                    },
                    {
                      name: 'Elena Cruz',
                      role: 'Head of Competitive Mechanics & Tactics',
                      bio: 'Former Tier-2 CS & Valorant team analyst specializing in crosshair placement geometry, shotcalling protocols, and neuro-motor aim training methodologies.',
                    },
                    {
                      name: 'Tariq Vance',
                      role: 'Lead Peripherals & Input Latency Specialist',
                      bio: 'Specialist in optical mouse sensors, magnetic Hall Effect switches, Rapid Trigger calibration, and surface friction coefficient testing.',
                    },
                    {
                      name: 'Devon Miles',
                      role: 'Acoustics & Spatial Audio Systems Lead',
                      bio: 'Audio engineer specializing in binaural HRTF algorithms, planar magnetic transducers, open-back soundstages, and squad communications hygiene.',
                    },
                    {
                      name: 'Kaelen Cross',
                      role: 'Workspace Ergonomics & Display Lead',
                      bio: 'Ergonomics consultant analyzing cervical spine postures, 1000R curvature optics, GtG pixel overdrive overshoot, and dual-monitor multi-tasking workflows.',
                    },
                    {
                      name: 'Gavin Thorne',
                      role: 'Thermal Dynamics & Airflow Architect',
                      bio: 'Cooling specialist dedicated to phase-change TIM compounds (PTM7950), positive pressure case aerodynamics, and silent PWM fan curve hysteresis.',
                    },
                  ].map((author, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-black/60 border border-emerald-800/80 rounded-xs space-y-2 hover:border-emerald-500 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#FFE600] text-black font-mono font-bold text-xs flex items-center justify-center">
                          {author.name.slice(0, 2).toUpperCase()}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{author.name}</h4>
                          <p className="text-[10px] font-mono text-[#FFE600] uppercase font-semibold">
                            {author.role}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-emerald-200/80 leading-relaxed pt-1">
                        {author.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Testing Lab & Methodology */}
              <section className="space-y-4">
                <h2 className="text-xl font-display font-black text-white uppercase tracking-wide flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                  <span>Our Testing Lab & Scientific Methodology</span>
                </h2>
                <p className="text-emerald-200/90 text-sm sm:text-base">
                  Every performance figure, frame rate benchmark, latency measurement, and temperature delta reported in our articles is produced inside our dedicated hardware test suite under strictly controlled conditions:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 bg-black/50 border-l-2 border-[#FFE600] rounded-xs space-y-1.5">
                    <span className="text-[#FFE600] font-bold uppercase">1. Ambient Temperature Normalization</span>
                    <p className="text-emerald-200 font-sans">
                      All thermal and acoustic testing is conducted in an isolated, climate-controlled testing environment locked at a constant 21°C (69.8°F) ambient room temperature to ensure cross-component parity.
                    </p>
                  </div>
                  <div className="p-4 bg-black/50 border-l-2 border-[#00e5ff] rounded-xs space-y-1.5">
                    <span className="text-[#00e5ff] font-bold uppercase">2. Oscilloscope & DPC Latency Verification</span>
                    <p className="text-emerald-200 font-sans">
                      Frame pacing, 1% low frame rates, and input delays are analyzed using dedicated hardware capture devices, high-speed camera sensors (up to 1000 FPS), and LatencyMon kernel trace auditing.
                    </p>
                  </div>
                  <div className="p-4 bg-black/50 border-l-2 border-emerald-400 rounded-xs space-y-1.5">
                    <span className="text-emerald-400 font-bold uppercase">3. Repeatable Clean-OS Test Benches</span>
                    <p className="text-emerald-200 font-sans">
                      Software benchmarks are performed on sanitized Windows 11 Enterprise installations with background telemetry, bloatware, and auto-updaters disabled to eliminate irregular driver contention.
                    </p>
                  </div>
                  <div className="p-4 bg-black/50 border-l-2 border-purple-400 rounded-xs space-y-1.5">
                    <span className="text-purple-400 font-bold uppercase">4. Blind Peer Review</span>
                    <p className="text-emerald-200 font-sans">
                      Before any guide or buying recommendation is published, at least two senior editors reproduce the steps and verify the factual integrity of every troubleshooting guideline.
                    </p>
                  </div>
                </div>
              </section>

              {/* Zero-Sponsored Bias Pledge */}
              <section className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/60 to-black/80 border-2 border-[#FFE600] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-[#FFE600] font-mono text-sm font-black uppercase">
                  <Shield className="w-5 h-5 text-[#FFE600]" />
                  <span>The gamevaulte Zero-Bias Editorial Pledge</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
                  We never accept paid review scores, sponsored benchmark inflation, or manufacturer embargo stipulations that prevent us from exposing hardware defects, coil whine, thermal throttling, or software bugs. When a product underperforms, our readers are the first to know. Our loyalty belongs exclusively to the gamer building their dream battle station.
                </p>
              </section>
            </article>
          )}

          {/* ========================================================= */}
          {/* 2. CONTACT US PAGE */}
          {/* ========================================================= */}
          {activeTab === 'contact' && (
            <article className="space-y-8 animate-in fade-in duration-150">
              {/* Header Banner */}
              <div className="border-b-2 border-emerald-700/80 pb-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-emerald-500/60 text-[#FFE600] font-mono text-xs font-bold uppercase rounded-xs">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Communication Desk & Editorial Inquiry</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                  Contact <span className="text-[#FFE600]">gamevaulte</span>
                </h1>
                <p className="text-xs sm:text-sm text-emerald-300 font-sans">
                  Have a hardware question, benchmark discrepancy to report, tactical feedback, or business proposal? Reach out directly to our editorial lab and desk editors below.
                </p>
              </div>

              {/* Verified Contact Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Phone & WhatsApp Card */}
                <div className="p-5 bg-black/70 border-2 border-emerald-700/80 rounded-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#FFE600] flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#FFE600]" />
                      Direct Phone & WhatsApp
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-xl sm:text-2xl font-mono font-black text-white tracking-wider">
                    03069256639
                  </p>
                  <p className="text-xs text-gray-400 font-sans">
                    International: +92 306 9256639. Direct line for editor dispatch and WhatsApp voice/chat.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href="https://wa.me/923069256639?text=Hello%20gamevaulte%20Team%2C%20I%20have%20an%20inquiry%20regarding%20your%20gaming%20guides"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-green-400 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                    <a
                      href="tel:03069256639"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 text-[#FFE600] font-mono font-bold text-xs uppercase rounded-xs hover:bg-neutral-700 transition-colors"
                    >
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>

                {/* Email Desk Card */}
                <div className="p-5 bg-black/70 border-2 border-emerald-700/80 rounded-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#FFE600] flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#FFE600]" />
                      Official Editorial Email
                    </span>
                    <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-xs">
                      24h Response
                    </span>
                  </div>
                  <p className="text-sm sm:text-base font-mono font-bold text-[#00e5ff] break-all">
                    sagheerofficial21dnb@gmail.com
                  </p>
                  <p className="text-xs text-gray-400 font-sans">
                    Send press releases, technical corrections, review unit loaners, and copyright notices.
                  </p>
                  <div className="pt-1">
                    <a
                      href="mailto:sagheerofficial21dnb@gmail.com?subject=gamevaulte%20Editorial%20Inquiry"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-white transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Compose Email</span>
                    </a>
                  </div>
                </div>

                {/* Desk Hours & Location */}
                <div className="p-5 bg-black/70 border-2 border-emerald-700/80 rounded-xs space-y-3 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#FFE600] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#FFE600]" />
                      Desk Hours & Location
                    </span>
                  </div>
                  <div className="space-y-1 text-xs font-sans">
                    <p className="text-white font-semibold">Monday – Saturday: 09:00 – 19:00 PKT (UTC+5)</p>
                    <p className="text-gray-400">Sunday: Closed for benchmark lab maintenance</p>
                    <div className="pt-2 flex items-start gap-1.5 text-emerald-300/80 text-[11px] font-mono">
                      <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#FFE600]" />
                      <span>gamevaulte Digital Media Labs · Lahore / Islamabad / Global Remote</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form Interface */}
              <section className="p-6 sm:p-8 bg-black/60 border-2 border-[#00e5ff]/50 rounded-xs space-y-6">
                <div className="border-b border-emerald-800/80 pb-3">
                  <h3 className="text-lg font-display font-black text-white uppercase tracking-wide flex items-center gap-2">
                    <Send className="w-4 h-4 text-[#00e5ff]" />
                    <span>Send a Direct Message to the Editorial Team</span>
                  </h3>
                  <p className="text-xs font-mono text-emerald-400/80 mt-1">
                    All technical and editorial submissions receive a tracked ticket number.
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="p-6 bg-emerald-950/80 border-2 border-emerald-500 rounded-xs text-center space-y-3 animate-in zoom-in-95">
                    <CheckCircle2 className="w-12 h-12 text-[#FFE600] mx-auto" />
                    <h4 className="text-lg font-display font-black text-white uppercase">
                      Message Dispatched Successfully
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-200 font-sans max-w-md mx-auto">
                      Thank you for contacting gamevaulte. Your message has been logged under Tracking ID:
                    </p>
                    <div className="inline-block px-4 py-1.5 bg-black border border-[#FFE600] text-[#FFE600] font-mono font-black text-sm rounded-xs tracking-wider">
                      {ticketId}
                    </div>
                    <p className="text-xs font-mono text-emerald-400">
                      Our desk editor will reply to <strong>{contactForm.emailAddress}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitSuccess(false);
                        setContactForm({
                          fullName: '',
                          emailAddress: '',
                          department: 'Editorial Feedback & Correction',
                          messageSubject: '',
                          messageBody: '',
                        });
                      }}
                      className="mt-3 px-4 py-1.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 font-sans text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.fullName}
                          onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                          placeholder="e.g. Tariq Vance"
                          className="w-full bg-[#00170c] border border-emerald-700/80 rounded-xs px-3 py-2.5 text-white placeholder:text-gray-500 focus:outline-hidden focus:border-[#FFE600]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.emailAddress}
                          onChange={(e) => setContactForm({ ...contactForm, emailAddress: e.target.value })}
                          placeholder="e.g. gamer@example.com"
                          className="w-full bg-[#00170c] border border-emerald-700/80 rounded-xs px-3 py-2.5 text-white placeholder:text-gray-500 focus:outline-hidden focus:border-[#FFE600]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                          Target Department
                        </label>
                        <select
                          value={contactForm.department}
                          onChange={(e) => setContactForm({ ...contactForm, department: e.target.value })}
                          className="w-full bg-[#00170c] border border-emerald-700/80 rounded-xs px-3 py-2.5 text-white focus:outline-hidden focus:border-[#FFE600]"
                        >
                          <option>Editorial Feedback & Correction</option>
                          <option>Hardware Lab Benchmark Inquiry</option>
                          <option>Esports Tactics & Scrim Consultation</option>
                          <option>Advertising & Sponsorships</option>
                          <option>DMCA & Legal Compliance</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                          Subject Line *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.messageSubject}
                          onChange={(e) => setContactForm({ ...contactForm, messageSubject: e.target.value })}
                          placeholder="e.g. Query on Dual Monitor G-Sync Stutter"
                          className="w-full bg-[#00170c] border border-emerald-700/80 rounded-xs px-3 py-2.5 text-white placeholder:text-gray-500 focus:outline-hidden focus:border-[#FFE600]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono font-bold text-emerald-300 uppercase tracking-wider block">
                        Message Body *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={contactForm.messageBody}
                        onChange={(e) => setContactForm({ ...contactForm, messageBody: e.target.value })}
                        placeholder="Detail your inquiry, hardware specifications, or feedback in full..."
                        className="w-full bg-[#00170c] border border-emerald-700/80 rounded-xs px-3 py-2.5 text-white placeholder:text-gray-500 focus:outline-hidden focus:border-[#FFE600] leading-relaxed"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400/80">
                        * All fields are processed in accordance with our Privacy Policy.
                      </span>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFE600] text-black font-mono font-black text-xs uppercase rounded-xs hover:bg-white transition-all shadow-md active:scale-95 disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Message'}</span>
                      </button>
                    </div>
                  </form>
                )}
              </section>
            </article>
          )}

          {/* ========================================================= */}
          {/* 3. PRIVACY POLICY PAGE (Google AdSense, GDPR, CCPA) */}
          {/* ========================================================= */}
          {activeTab === 'privacy' && (
            <article className="space-y-8 animate-in fade-in duration-150">
              {/* Header Banner */}
              <div className="border-b-2 border-emerald-700/80 pb-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-emerald-500/60 text-[#FFE600] font-mono text-xs font-bold uppercase rounded-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Google AdSense, GDPR, CCPA & Data Protection Compliance</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                  Privacy Policy for <span className="text-[#FFE600]">gamevaulte</span>
                </h1>
                <p className="text-xs font-mono text-emerald-400">
                  Effective Date: October 25, 2026 · Last Updated: October 2026
                </p>
              </div>

              {/* Section 1: Introduction */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#FFE600] pl-2.5">
                  <span>1. General Introduction</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  At <strong>gamevaulte</strong> (accessible via our primary web domains and application endpoints), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains comprehensive types of information that is collected and recorded by gamevaulte and how we employ, safeguard, and disclose that data.
                </p>
                <p className="text-emerald-200/90 text-sm">
                  If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our Data Protection Officer via email at <strong>sagheerofficial21dnb@gmail.com</strong> or by telephone/WhatsApp at <strong>03069256639</strong>.
                </p>
              </section>

              {/* Section 2: Log Files */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#00e5ff] pl-2.5">
                  <span>2. Log Files</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  gamevaulte follows a standard procedure of utilizing log files. These files log visitors when they visit websites. All hosting and server providers perform this as part of infrastructure hosting services' analytics. The information collected by log files includes:
                </p>
                <ul className="text-xs sm:text-sm text-emerald-200/90 list-disc list-inside space-y-1 pl-2 font-mono">
                  <li>Internet Protocol (IP) addresses</li>
                  <li>Browser type, software architecture, and version</li>
                  <li>Internet Service Provider (ISP) and autonomous system number</li>
                  <li>Date and timestamp of HTTP request dispatches</li>
                  <li>Referring / exit pages and URL navigation flows</li>
                  <li>Number of clicks and navigational telemetry across our guides</li>
                </ul>
                <p className="text-emerald-200/90 text-sm">
                  These data points are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement around the website, diagnosing server crashes, and gathering broad demographic data for aggregate performance analysis.
                </p>
              </section>

              {/* Section 3: Cookies and Web Beacons */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-emerald-400 pl-2.5">
                  <span>3. Cookies and Web Beacons</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  Like any modern web application, gamevaulte uses 'cookies'. These cookies are used to store information including visitors' preferences, reader bookmark states, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
                <p className="text-emerald-200/90 text-sm">
                  Users can choose to disable cookies through their individual browser options. Detailed information about cookie management with specific web browsers can be found at the browsers' respective websites.
                </p>
              </section>

              {/* Section 4: Google DoubleClick DART Cookie & Third-Party Advertising Vendors */}
              <section className="p-5 bg-black/60 border-2 border-[#FFE600] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-[#FFE600] font-mono text-sm font-bold uppercase">
                  <Shield className="w-4 h-4 text-[#FFE600]" />
                  <span>4. Google DoubleClick DART Cookies & Third-Party Advertising Vendors</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
                  Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to gamevaulte and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at the following URL:
                </p>
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00e5ff] hover:text-[#FFE600] underline font-bold"
                >
                  <span>https://policies.google.com/technologies/ads</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
                  Some of our advertising partners may use cookies and web beacons on our site. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on gamevaulte, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
                </p>
                <p className="text-xs text-amber-200 font-mono">
                  Note: gamevaulte has no access to or control over these cookies that are used by third-party advertisers.
                </p>
              </section>

              {/* Section 5: GDPR Data Protection Rights */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#00e5ff] pl-2.5">
                  <span>5. GDPR Data Protection Rights (European Economic Area)</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  We would like to make sure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user residing in the EEA is entitled to the following:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                  <div className="p-3 bg-black/40 border border-emerald-800 rounded-xs space-y-1">
                    <strong className="text-white block font-mono">The Right to Access:</strong>
                    <span className="text-gray-300">You have the right to request copies of your personal data held by gamevaulte.</span>
                  </div>
                  <div className="p-3 bg-black/40 border border-emerald-800 rounded-xs space-y-1">
                    <strong className="text-white block font-mono">The Right to Rectification:</strong>
                    <span className="text-gray-300">You have the right to request that we correct any information you believe is inaccurate or incomplete.</span>
                  </div>
                  <div className="p-3 bg-black/40 border border-emerald-800 rounded-xs space-y-1">
                    <strong className="text-white block font-mono">The Right to Erasure ("Right to Be Forgotten"):</strong>
                    <span className="text-gray-300">You have the right to request that we erase your personal data under certain conditions.</span>
                  </div>
                  <div className="p-3 bg-black/40 border border-emerald-800 rounded-xs space-y-1">
                    <strong className="text-white block font-mono">The Right to Data Portability:</strong>
                    <span className="text-gray-300">You have the right to request that we transfer the data that we have collected to another organization.</span>
                  </div>
                </div>
                <p className="text-xs text-emerald-300 font-mono">
                  If you make a request, we have one month to respond to you. Please direct requests to <strong>sagheerofficial21dnb@gmail.com</strong>.
                </p>
              </section>

              {/* Section 6: CCPA Privacy Rights */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-yellow-400 pl-2.5">
                  <span>6. CCPA / CPRA Privacy Rights (California Consumer Privacy Act)</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California consumers have specific rights regarding their personal information:
                </p>
                <ul className="text-xs sm:text-sm text-emerald-200/90 list-disc list-inside space-y-1 pl-2">
                  <li><strong>Right to Know:</strong> The categories and specific pieces of personal data collected about you.</li>
                  <li><strong>Right to Delete:</strong> Request the deletion of personal data collected about you.</li>
                  <li><strong>Right to Opt-Out of Sale / Sharing:</strong> We do not sell or monetize personal information to data brokers.</li>
                  <li><strong>Non-Discrimination:</strong> You will never receive degraded service or altered pricing for exercising your statutory privacy rights.</li>
                </ul>
              </section>

              {/* Section 7: Children's Online Privacy Protection Act (COPPA) */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-red-400 pl-2.5">
                  <span>7. Children's Information (COPPA Compliance)</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <p className="text-emerald-200/90 text-sm">
                  gamevaulte does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately at <strong>sagheerofficial21dnb@gmail.com</strong> and we will promptly remove such information from our records.
                </p>
              </section>

              {/* Section 8: Consent */}
              <section className="p-4 bg-black/40 border border-emerald-800 rounded-xs text-xs font-mono text-emerald-300">
                <span className="text-[#FFE600] font-bold">USER CONSENT: </span>
                By using our website and digital services, you hereby consent to our Privacy Policy and agree to its terms and conditions.
              </section>
            </article>
          )}

          {/* ========================================================= */}
          {/* 4. TERMS & CONDITIONS PAGE */}
          {/* ========================================================= */}
          {activeTab === 'terms' && (
            <article className="space-y-8 animate-in fade-in duration-150">
              {/* Header Banner */}
              <div className="border-b-2 border-emerald-700/80 pb-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-emerald-500/60 text-[#FFE600] font-mono text-xs font-bold uppercase rounded-xs">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Terms of Service, Copyright & Intellectual Property</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                  Terms & Conditions for <span className="text-[#FFE600]">gamevaulte</span>
                </h1>
                <p className="text-xs font-mono text-emerald-400">
                  Last Updated: October 25, 2026 · Legally Binding Agreement
                </p>
              </div>

              {/* Section 1: Agreement to Terms */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#FFE600] pl-2.5">
                  <span>1. Agreement to Terms</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("User", "You") and <strong>gamevaulte</strong> ("we", "us", or "our"), concerning your access to and use of the gamevaulte website, content, tools (including the eDPI Sensitivity Calculator), and associated digital services.
                </p>
                <p className="text-emerald-200/90 text-sm">
                  By accessing the site, you agree that you have read, understood, and agreed to be bound by all of these Terms and Conditions. If you do not agree with all of these terms, you are expressly prohibited from using the site and must discontinue use immediately.
                </p>
              </section>

              {/* Section 2: Intellectual Property & Copyright */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#00e5ff] pl-2.5">
                  <span>2. Intellectual Property Rights & Copyright Protection</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  Unless otherwise indicated, the website is our proprietary property. All text, articles, blueprints, buying guides, benchmark datasets, infographics, visual compositions, software code, databases, website designs, audio, video, and graphics on the site (collectively, the "Content") and the trademarks, service marks, and logos contained therein are owned or controlled by gamevaulte, and are protected by international copyright, trademark, and unfair competition laws.
                </p>
                <div className="p-4 bg-black/60 border border-emerald-800 rounded-xs space-y-2 text-xs font-sans">
                  <p className="text-white font-bold font-mono">PERMITTED USE & CITATION:</p>
                  <p className="text-emerald-200/90">
                    You are granted a limited license to access and use the site for personal, non-commercial purposes. Gaming communities and content creators may cite short excerpts (up to 150 words) or reference benchmark charts provided that prominent, direct attribution and a do-follow hyperlink to the original gamevaulte URL are included.
                  </p>
                  <p className="text-amber-300 font-mono font-semibold pt-1">
                    PROHIBITED USE: Systematic scraping, automated bot indexing, wholesale republishing, frame embedding, or training commercial AI models on our proprietary test datasets without written consent is strictly prohibited.
                  </p>
                </div>
              </section>

              {/* Section 3: User Responsibilities & Acceptable Use */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-emerald-400 pl-2.5">
                  <span>3. User Conduct and Responsibilities</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  When accessing gamevaulte or interacting with our communication desks and forms, you agree not to:
                </p>
                <ul className="text-xs sm:text-sm text-emerald-200/90 list-disc list-inside space-y-1.5 pl-2 font-mono">
                  <li>Attempt to bypass, disable, or tamper with security-related features of the platform</li>
                  <li>Transmit any viruses, Trojan horses, packet storms, or denial-of-service scripts</li>
                  <li>Use the contact forms to distribute unsolicited promotional spam or marketing solicitations</li>
                  <li>Impersonate any gamevaulte editor, author, or technical staff member</li>
                  <li>Use any automated means (crawlers, scrapers, data-mining tools) to overload server bandwidth</li>
                </ul>
              </section>

              {/* Section 4: Accuracy of Benchmarks & Calculations */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-purple-400 pl-2.5">
                  <span>4. Benchmark Accuracy & Hardware Variations</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  While every hardware benchmark, eDPI calculation, and frame rate optimization metric is tested rigorously in our laboratory, hardware performance in PC gaming is inherently influenced by silicon manufacturing variance (the "silicon lottery"), ambient room temperatures, motherboard VRM layouts, driver updates, and background software processes. Consequently, gamevaulte makes no absolute guarantee that every reader's computer will achieve the exact numerical FPS gains recorded in our laboratory tests.
                </p>
              </section>

              {/* Section 5: Limitation of Liability */}
              <section className="p-5 bg-black/60 border-2 border-red-500/80 rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-red-400 font-mono text-sm font-bold uppercase">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>5. Limitation of Liability</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
                  In no event will gamevaulte, our editors, directors, contributors, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, hardware malfunction, component degradation, or other damages arising from your access to or use of the website, its guides, or its calculation tools, even if we have been advised of the possibility of such damages.
                </p>
              </section>

              {/* Section 6: Modifications to Terms */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#FFE600] pl-2.5">
                  <span>6. Modifications & Governing Law</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting the updated Terms on the website with an updated "Last Updated" timestamp. Your continued use of the site after revisions constitutes acceptance of the modified Terms.
                </p>
                <p className="text-xs font-mono text-emerald-400">
                  These Terms shall be governed by and defined following international commercial arbitration standards and civil laws. For legal correspondence, contact <strong>sagheerofficial21dnb@gmail.com</strong>.
                </p>
              </section>
            </article>
          )}

          {/* ========================================================= */}
          {/* 5. DISCLAIMER PAGE */}
          {/* ========================================================= */}
          {activeTab === 'disclaimer' && (
            <article className="space-y-8 animate-in fade-in duration-150">
              {/* Header Banner */}
              <div className="border-b-2 border-emerald-700/80 pb-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 border border-emerald-500/60 text-[#FFE600] font-mono text-xs font-bold uppercase rounded-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Hardware Liability, Affiliate Disclosure & Trademark Notices</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
                  Disclaimer for <span className="text-[#FFE600]">gamevaulte</span>
                </h1>
                <p className="text-xs font-mono text-emerald-400">
                  Effective Date: October 25, 2026 · Essential Safety & Transparency Notice
                </p>
              </div>

              {/* Section 1: Hardware Tweaks & Overclocking Disclaimer */}
              <section className="p-5 sm:p-6 bg-amber-950/40 border-2 border-[#FFE600] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-[#FFE600] font-mono text-sm font-black uppercase">
                  <Cpu className="w-5 h-5 text-[#FFE600]" />
                  <span>1. Hardware Overclocking, BIOS Flashing & Voltage Modification Warning</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100 font-sans leading-relaxed">
                  The guides, tutorials, and technical instructions provided on <strong>gamevaulte</strong>—including but not limited to BIOS firmware flashing, CPU undervolting, memory sub-timing tuning (XMP/EXPO), GPU power limit adjustments, liquid cooler mounting, thermal paste delidding, and registry optimizations—are published exclusively for experienced enthusiasts and informational purposes.
                </p>
                <div className="p-3 bg-black/60 border-l-2 border-red-500 text-xs font-mono text-red-200 space-y-1">
                  <p className="font-bold text-red-400 uppercase">[CRITICAL WARNING]</p>
                  <p>
                    Modifying voltages, overclocking frequencies beyond factory specifications, or flashing non-standard motherboard BIOS versions can void hardware warranties, cause permanent silicon degradation, induce thermal damage, or corrupt operating system installations.
                  </p>
                </div>
                <p className="text-xs text-amber-200/90 font-sans leading-relaxed">
                  You implement any hardware tweak or software adjustment entirely at your own risk. <strong>gamevaulte</strong>, its owners, editors, and technical writers expressly disclaim any and all liability for damaged computer components, fried motherboards, thermal throttling, voided warranties, data loss, or physical injuries resulting from the application of our guides.
                </p>
              </section>

              {/* Section 2: Mobile Emulation & Sideloading Notice */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-[#00e5ff] pl-2.5">
                  <span>2. Mobile Emulation, Sideloading & Game Modding</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  Our articles covering Android emulation on PC, third-party controller keymapping software, and high-FPS mobile configuration files are provided strictly for educational purposes, software development, and legitimate retro preservation.
                </p>
                <p className="text-emerald-200/90 text-sm">
                  gamevaulte does not host, distribute, or condone pirated ROMs, copyrighted game APKs, or unauthorized software cracks. Readers are personally responsible for verifying that their use of emulation software, third-party keymappers, and custom graphics configuration tools complies with the Terms of Service (ToS) and End User License Agreements (EULA) of respective game publishers (such as Riot Games, Valve, Krafton, Activision, and HoYoverse). gamevaulte is not responsible for any in-game account suspensions or anti-cheat bans.
                </p>
              </section>

              {/* Section 3: Affiliate & Advertising Disclosure */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-emerald-400 pl-2.5">
                  <span>3. Affiliate & Advertising Disclosure (FTC Compliance)</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  In compliance with Federal Trade Commission (FTC) guidelines and international advertising standards, please be advised that <strong>gamevaulte</strong> may participate in various affiliate marketing programs (such as the Amazon Services LLC Associates Program, retail affiliate networks, or direct hardware manufacturer affiliate partnerships).
                </p>
                <div className="p-4 bg-black/60 border border-emerald-800 rounded-xs space-y-2 text-xs font-sans">
                  <p className="text-[#FFE600] font-mono font-bold">WHAT THIS MEANS FOR YOU:</p>
                  <p className="text-emerald-200/90">
                    If you click on an external link to a retailer and purchase a computer component, peripheral, or accessory, gamevaulte may receive a small referral commission at <strong>no extra cost to you</strong>.
                  </p>
                  <p className="text-emerald-200/90">
                    Affiliate commissions do not influence our editorial verdicts, benchmark test charts, or product rankings. If an expensive flagship component runs hot or exhibits defective firmware, we criticize it with full transparency regardless of commercial relationships.
                  </p>
                </div>
              </section>

              {/* Section 4: Non-Affiliation Trademark Notice */}
              <section className="space-y-3">
                <h2 className="text-lg font-display font-bold text-white uppercase tracking-wide flex items-center gap-2 border-l-3 border-purple-400 pl-2.5">
                  <span>4. Non-Affiliation & Trademark Notice</span>
                </h2>
                <p className="text-emerald-200/90 text-sm">
                  <strong>gamevaulte</strong> is an independent digital media publication and is NOT affiliated with, authorized by, sponsored by, or endorsed by Sony Interactive Entertainment Inc., Microsoft Corporation, Nintendo Co., Ltd., Valve Corporation, Riot Games Inc., Epic Games, NVIDIA Corporation, Advanced Micro Devices (AMD), Intel Corporation, or any other trademarked gaming or technology enterprise.
                </p>
                <p className="text-xs font-mono text-emerald-400">
                  All trademarks, registered trademarks, service marks, product names, game titles, and company logos mentioned in our guides are the property of their respective owners and are used strictly under Fair Use for identification, comparative analysis, and editorial review.
                </p>
              </section>

              {/* Section 5: As-Is Warranty Notice */}
              <section className="p-4 bg-black/50 border border-emerald-800 rounded-xs text-xs font-sans text-emerald-300/90 space-y-1">
                <span className="text-[#FFE600] font-mono font-bold uppercase">5. "As-Is" Information Notice:</span>
                <p>
                  All information on gamevaulte is provided "as is", with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information, and without warranty of any kind, express or implied.
                </p>
              </section>
            </article>
          )}
        </div>

        {/* Modal Sticky Bottom Navigation Strip */}
        <div className="sticky bottom-0 z-30 bg-[#00140a] border-t-2 border-emerald-800/80 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400/80">
            <span className="hidden sm:inline">Official Compliance Desk:</span>
            <span className="text-white font-bold">sagheerofficial21dnb@gmail.com</span>
            <span className="text-emerald-700">·</span>
            <span className="text-[#FFE600] font-bold">03069256639</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#FFE600] hover:bg-white text-black font-mono text-xs font-black uppercase rounded-xs transition-colors shadow-xs"
            >
              Return to Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
