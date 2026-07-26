import React, { useState } from 'react';
import { Sprout, ShieldAlert, Heart, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const { t } = useApp();

  return (
    <footer className="bg-[#1F2937] dark:bg-slate-950 text-white pt-16 pb-12 border-t border-gray-800 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800 dark:border-slate-800 text-left">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md">
                <Sprout className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-heading">
                AgriCare <span className="text-[#8BC34A]">AI</span>
              </span>
            </div>
            <p className="text-xs italic text-[#8BC34A] font-semibold">
              "{t('heroSubtitle')}"
            </p>
            <p className="text-sm text-gray-400 dark:text-slate-400 max-w-sm leading-relaxed font-sans">
              An AI-powered crop health and farming education platform enabling growers worldwide to detect crop issues early and practice sustainable agriculture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-200 dark:text-slate-200 font-heading">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-slate-400">
              <li>
                <button onClick={() => onNavClick('home')} className="hover:text-[#8BC34A] transition-colors">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('library')} className="hover:text-[#8BC34A] transition-colors">
                  {t('navLibrary')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('analyzer')} className="hover:text-[#8BC34A] transition-colors">
                  {t('navScanner')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('diseases')} className="hover:text-[#8BC34A] transition-colors">
                  {t('navGuide')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavClick('about')} className="hover:text-[#8BC34A] transition-colors">
                  {t('navAbout')}
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Disclaimer */}
          <div className="md:col-span-4 space-y-3 bg-gray-800/60 dark:bg-slate-900/80 p-5 rounded-2xl border border-gray-700/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-[#8BC34A] text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-[#8BC34A]" />
              {t('disclaimerTitle')}
            </div>
            <p className="text-xs text-gray-300 dark:text-slate-300 leading-relaxed font-sans">
              {t('disclaimerText')}
            </p>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 dark:text-slate-400">
          <p>© {new Date().getFullYear()} AgriCare AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-white transition-colors"
            >
              Privacy Policy & Terms
            </button>
            <span className="flex items-center gap-1 text-gray-500 dark:text-slate-500">
              Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for farmers
            </span>
          </div>
        </div>

      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto text-left border border-gray-200 dark:border-slate-800">
            <button
              onClick={() => setPrivacyModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold font-heading text-[#1F2937] dark:text-white mb-4">
              Privacy Policy & Educational Guidelines
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
              <p>
                <strong>Data Privacy:</strong> AgriCare AI values your privacy. Photos uploaded for plant analysis are processed strictly in memory for generating agricultural diagnostic insights and are never sold or distributed to third parties.
              </p>
              <p>
                <strong>Educational Purpose:</strong> The plant diagnostic report, disease identification scores, and recommended actions provided by AgriCare AI are for educational and advisory purposes only.
              </p>
              <p>
                <strong>AgriTech Standard:</strong> We adhere to sustainable farming guidelines, prioritizing natural soil care, bio-control solutions, and non-toxic crop remedies wherever feasible.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#2E7D32] text-white font-medium text-sm"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

