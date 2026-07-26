import React from 'react';
import { Sprout, ShieldCheck, HeartHandshake } from 'lucide-react';
import { FARMER_PORTRAIT } from '../data/cropsData';
import { useApp } from '../context/AppContext';

export const AboutSection: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="about" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Mission Graphic */}
          <div className="lg:col-span-5 relative text-left">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-[#F8FAF5] dark:border-slate-800 bg-white dark:bg-slate-800">
                <img
                  src={FARMER_PORTRAIT}
                  alt="AgriCare AI Mission in agriculture"
                  className="w-full h-[280px] sm:h-[320px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlaid Stat Card */}
              <div className="absolute -bottom-4 -right-4 bg-[#2E7D32] text-white p-4 rounded-xl shadow-lg max-w-xs space-y-0.5">
                <p className="text-2xl font-extrabold font-heading text-[#8BC34A]">50,000+</p>
                <p className="text-[11px] font-medium text-gray-100">Farmers & Agricultural Growers Assisted Worldwide</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Text & Values */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-bold uppercase tracking-wider">
              <Sprout className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#8BC34A]" />
              {t('aboutTitle')}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] dark:text-white tracking-tight font-heading leading-tight">
              Democratizing Agronomic Expertise for Every Farmer
            </h2>

            <p className="text-base sm:text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
              {t('aboutText')}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200/60 dark:border-slate-700">
                <ShieldCheck className="w-6 h-6 text-[#2E7D32] dark:text-[#8BC34A] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-[#1F2937] dark:text-white font-heading">Science-Backed</h4>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">Verified with agronomists and plant pathology benchmarks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200/60 dark:border-slate-700">
                <HeartHandshake className="w-6 h-6 text-[#4CAF50] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-bold text-[#1F2937] dark:text-white font-heading">Eco-Friendly Guidance</h4>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">Prioritizing bio-fungicides and natural soil amendments.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

