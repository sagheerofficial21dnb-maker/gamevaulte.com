import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const ContactModal: React.FC<Props> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Hardware Review / Editorial Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <div className="relative w-full max-w-xl bg-[#001f11] border-2 border-[#FFE600] rounded-sm shadow-2xl p-6 text-white space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
          <div>
            <h2 id="contact-title" className="text-xl sm:text-2xl font-display font-black text-[#FFE600] uppercase">
              Contact & Editorial Team
            </h2>
            <p className="text-xs font-mono text-emerald-400 mt-0.5">
              OFFICIAL CONTACT CHANNELS & DESK EDITORS
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xs bg-black text-white hover:bg-neutral-800"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Direct Contact Hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
          {/* Phone / WhatsApp Box */}
          <div className="p-4 bg-black/60 border border-emerald-700/80 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-[#FFE600] font-bold">
              <Phone className="w-4 h-4" />
              <span>PHONE & WHATSAPP</span>
            </div>
            <p className="text-base font-bold text-white tracking-wider">03069256639</p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/923069256639?text=Hello%20gamevaulte%20Editorial%20Team"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#25D366] text-black font-bold text-[11px] rounded-xs hover:opacity-90 transition-opacity"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="tel:03069256639"
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-[#FFE600] border border-[#FFE600] font-bold text-[11px] rounded-xs hover:bg-[#FFE600] hover:text-black transition-colors"
              >
                Call
              </a>
            </div>
          </div>

          {/* Email Box */}
          <div className="p-4 bg-black/60 border border-emerald-700/80 rounded-xs space-y-2">
            <div className="flex items-center gap-2 text-[#FFE600] font-bold">
              <Mail className="w-4 h-4" />
              <span>OFFICIAL EMAIL</span>
            </div>
            <p className="text-xs font-bold text-emerald-200 break-all select-all">
              sagheerofficial21dnb@gmail.com
            </p>
            <div className="pt-1">
              <a
                href="mailto:sagheerofficial21dnb@gmail.com?subject=gamevaulte%20Inquiry"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFE600] text-black font-bold text-[11px] rounded-xs hover:bg-white transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>Send Direct Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive In-App Dispatch Form */}
        {submitted ? (
          <div className="p-6 bg-emerald-950/80 border border-emerald-600 rounded-xs text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#FFE600] mx-auto animate-bounce" />
            <h3 className="text-lg font-display font-black text-white uppercase">
              Message Transmitted to Editors
            </h3>
            <p className="text-xs text-emerald-200 max-w-sm mx-auto">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our lead hardware
              architect and esports analysts will review your dispatch and reply to{' '}
              <strong className="text-[#FFE600]">{formData.email}</strong>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  subject: 'Hardware Review / Editorial Inquiry',
                  message: '',
                });
              }}
              className="px-4 py-1.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
            <p className="text-[11px] font-bold uppercase text-emerald-300">
              Submit Direct Feedback or Partnership Proposal
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-emerald-400 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black border border-emerald-800 px-3 py-2 rounded-xs text-white focus:outline-hidden focus:border-[#FFE600]"
                />
              </div>

              <div>
                <label className="block text-emerald-400 mb-1">Your Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black border border-emerald-800 px-3 py-2 rounded-xs text-white focus:outline-hidden focus:border-[#FFE600]"
                />
              </div>
            </div>

            <div>
              <label className="block text-emerald-400 mb-1">Subject / Inquiry Type</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-black border border-emerald-800 px-3 py-2 rounded-xs text-white focus:outline-hidden focus:border-[#FFE600]"
              >
                <option value="Hardware Review / Sample Submission">
                  Hardware Review / Sample Submission
                </option>
                <option value="Technical Guide Feedback / Corrections">
                  Technical Guide Feedback / Corrections
                </option>
                <option value="Esports Tournament Partnership">
                  Esports Tournament Partnership
                </option>
                <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
              </select>
            </div>

            <div>
              <label className="block text-emerald-400 mb-1">Detailed Message *</label>
              <textarea
                required
                rows={3}
                placeholder="Detail your question, setup specs, or editorial request..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black border border-emerald-800 px-3 py-2 rounded-xs text-white focus:outline-hidden focus:border-[#FFE600]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#FFE600]" />
                Direct Desk Response within 24h
              </span>

              <button
                type="submit"
                className="px-5 py-2 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-white flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Dispatch</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
