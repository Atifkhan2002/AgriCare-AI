import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Leaf, Zap, Award } from 'lucide-react';
import { HERO_IMAGE, FARMER_PORTRAIT } from '../data/cropsData';
import { useApp } from '../context/AppContext';

interface HeroSectionProps {
  onOpenAnalyzer: () => void;
  onExploreCrops: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAnalyzer,
  onExploreCrops,
}) => {
  const { t } = useApp();

  return (
    <section className="relative pt-20 pb-10 md:pt-24 md:pb-14 overflow-hidden bg-gradient-to-b from-[#F0F7EB] via-[#F8FAF5] to-[#F8FAF5] dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 rounded-full bg-[#8BC34A]/15 dark:bg-[#8BC34A]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-24 w-64 h-64 rounded-full bg-[#4CAF50]/10 dark:bg-[#4CAF50]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headline & Action CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4 text-left"
          >
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-[#2E7D32]/20 dark:border-slate-700 shadow-xs text-xs font-semibold text-[#2E7D32] dark:text-[#8BC34A]">
              <span className="flex h-2 w-2 rounded-full bg-[#4CAF50] animate-ping" />
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#8BC34A]" />
              <span>{t('heroBadge')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1F2937] dark:text-white leading-[1.15] font-heading">
              {t('heroTitle')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#2E7D32] dark:from-[#4CAF50] dark:via-[#8BC34A] dark:to-[#4CAF50]">
                {t('heroTitleHighlight')}
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-300 max-w-2xl leading-relaxed font-sans">
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onOpenAnalyzer}
                id="hero-analyze-plant-btn"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm shadow-md shadow-[#2E7D32]/30 hover:bg-[#256628] hover:shadow-lg active:scale-98 transition-all group"
              >
                <Sparkles className="w-4 h-4 text-[#8BC34A] group-hover:rotate-12 transition-transform" />
                <span>{t('startScan')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCrops}
                id="hero-explore-crops-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-[#1F2937] dark:text-white border border-gray-200 dark:border-slate-700 font-semibold text-sm shadow-xs hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              >
                <Leaf className="w-4 h-4 text-[#4CAF50]" />
                <span>{t('exploreLibrary')}</span>
              </button>
            </div>

            {/* Key Value Micro-Badges */}
            <div className="pt-4 border-t border-gray-200/80 dark:border-slate-800 grid grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-slate-300">98.4% Accuracy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#8BC34A] shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-slate-300">Instant Results</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A] shrink-0" />
                <span className="text-xs font-medium text-gray-700 dark:text-slate-300">AgriTech Standard</span>
              </div>
            </div>

            {/* Statistics Cards Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-gray-200/80 dark:border-slate-700 shadow-xs hover:shadow-md transition-all"
              >
                <div className="text-xl font-extrabold text-[#2E7D32] dark:text-[#4CAF50] font-heading">50,000+</div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-slate-400 font-sans mt-0.5">{t('statsAnalyzed')}</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-gray-200/80 dark:border-slate-700 shadow-xs hover:shadow-md transition-all"
              >
                <div className="text-xl font-extrabold text-[#2E7D32] dark:text-[#4CAF50] font-heading">95%</div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-slate-400 font-sans mt-0.5">{t('statsSatisfaction')}</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-gray-200/80 dark:border-slate-700 shadow-xs hover:shadow-md transition-all"
              >
                <div className="text-xl font-extrabold text-[#2E7D32] dark:text-[#4CAF50] font-heading">100+</div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-slate-400 font-sans mt-0.5">{t('statsGuides')}</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-xl border border-gray-200/80 dark:border-slate-700 shadow-xs hover:shadow-md transition-all"
              >
                <div className="text-xl font-extrabold text-[#2E7D32] dark:text-[#4CAF50] font-heading">24/7</div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-slate-400 font-sans mt-0.5">{t('statsAssistant')}</div>
              </motion.div>
            </div>

          </motion.div>

          {/* Right Column: Visual Imagery Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Crop/Farm Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-800 group">
                <img
                  src={HERO_IMAGE}
                  alt="Farmer inspecting agricultural field"
                  className="w-full h-[280px] sm:h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl glass-panel text-gray-900 dark:text-white border border-white/60 dark:border-slate-700 shadow-md">
                  <div className="flex items-center gap-3">
                    <img
                      src={FARMER_PORTRAIT}
                      alt="Smiling farmer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#2E7D32] shadow-xs"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3 text-[#4CAF50]" />
                        Farmer Verified
                      </div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white leading-tight">
                        "AgriCare AI helped me detect early leaf spot before it damaged my crop harvest."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating AI Scan Overlay Graphic */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-lg bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 flex items-center justify-center text-[#2E7D32] dark:text-[#8BC34A]">
                  <Sparkles className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">AI Crop Scan</p>
                  <p className="text-[10px] text-[#4CAF50] font-medium">Non-destructive</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

