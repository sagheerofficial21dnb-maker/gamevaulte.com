import React, { useState } from 'react';
import { X, Crosshair, HelpCircle, Check, ArrowRight } from 'lucide-react';
import { calculateEdpi } from '../utils/blogUtils';

interface Props {
  onClose: () => void;
  onReadAimGuide?: () => void;
}

export const EdpiCalculatorModal: React.FC<Props> = ({ onClose, onReadAimGuide }) => {
  const [dpi, setDpi] = useState<number>(1600);
  const [sens, setSens] = useState<number>(0.2);
  const [game, setGame] = useState<'valorant' | 'cs2' | 'apex' | 'overwatch'>('valorant');

  const result = calculateEdpi(dpi, sens);

  // Approximate cm/360 turn distance based on typical game multiplier
  const getCm360 = () => {
    let multiplier = 0.07; // default
    if (game === 'valorant') multiplier = 0.07;
    else if (game === 'cs2') multiplier = 0.022;
    else if (game === 'apex' || game === 'overwatch') multiplier = 0.0066;

    const cm = Math.round((360 / (dpi * sens * multiplier)) * 10) / 10;
    return isNaN(cm) || !isFinite(cm) ? 0 : cm;
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="calc-title"
    >
      <div className="relative w-full max-w-lg bg-[#001f11] border-2 border-emerald-700 rounded-sm shadow-2xl p-6 text-white space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xs bg-[#FFE600] text-black flex items-center justify-center font-bold">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <h2 id="calc-title" className="text-lg font-display font-black text-white uppercase">
                eDPI & Sens Calculator
              </h2>
              <p className="text-[10px] font-mono text-emerald-400">
                PRO ESPORTS AIM CALIBRATION ENGINE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xs bg-black text-white hover:bg-neutral-800"
            aria-label="Close calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs font-mono">
          <div>
            <label className="block text-emerald-300 mb-1 font-bold">
              Select Competitive Title
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'valorant', label: 'Valorant' },
                { id: 'cs2', label: 'CS2' },
                { id: 'apex', label: 'Apex' },
                { id: 'overwatch', label: 'OW2' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGame(g.id as any)}
                  className={`py-1.5 px-2 rounded-xs border text-center font-bold uppercase ${
                    game === g.id
                      ? 'bg-[#FFE600] text-black border-[#FFE600]'
                      : 'bg-black/50 text-emerald-400 border-emerald-800 hover:border-emerald-600'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-emerald-300 mb-1 font-bold">
                Mouse Sensor DPI
              </label>
              <input
                type="number"
                min="400"
                max="32000"
                step="100"
                value={dpi}
                onChange={(e) => setDpi(Number(e.target.value) || 0)}
                className="w-full bg-black border border-emerald-800 px-3 py-2 rounded-xs text-white focus:outline-hidden focus:border-[#FFE600] font-bold"
              />
              <span className="text-[10px] text-emerald-500 mt-1 block">
                Standard: 800 or 1600
              </span>
            </div>

            <div>
              <label className="block text-emerald-300 mb-1 font-bold">
                In-Game Sensitivity
              </label>
              <input
                type="number"
                min="0.01"
                max="50"
                step="0.01"
                value={sens}
                onChange={(e) => setSens(Number(e.target.value) || 0)}
                className="w-full bg-black border border-emerald-800 px-3 py-2 rounded-xs text-white focus:outline-hidden focus:border-[#FFE600] font-bold"
              />
              <span className="text-[10px] text-emerald-500 mt-1 block">
                e.g. 0.25 (Val) or 1.1 (CS2)
              </span>
            </div>
          </div>
        </div>

        {/* Output Results Box */}
        <div className="bg-black/80 border-2 border-[#FFE600] p-4 rounded-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold">
              Calculated eDPI:
            </span>
            <span className="text-2xl font-display font-black text-[#FFE600] tabular-nums">
              {result.edpi}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-emerald-900/60">
            <span className="text-xs font-mono text-emerald-400">Aim Style Bracket:</span>
            <span className="text-xs font-mono font-bold text-white bg-emerald-950 px-2 py-0.5 rounded-xs border border-emerald-700">
              {result.bracket}
            </span>
          </div>

          <p className="text-xs text-emerald-200/90 leading-relaxed pt-1">
            {result.recommendation}
          </p>
        </div>

        {/* Action Link to guide */}
        {onReadAimGuide && (
          <button
            onClick={() => {
              onClose();
              onReadAimGuide();
            }}
            className="w-full py-2.5 bg-[#FFE600] text-black font-mono font-bold text-xs uppercase rounded-xs hover:bg-white flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Read Complete "Best Mouse Sensitivity" Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
