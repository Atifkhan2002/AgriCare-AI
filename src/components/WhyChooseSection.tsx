import React from 'react';
import { Cpu, Smile, GraduationCap, Zap } from 'lucide-react';
import { FEATURES_DATA } from '../data/cropsData';

export const WhyChooseSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-[#2E7D32]" />;
      case 'Smile':
        return <Smile className="w-7 h-7 text-[#2E7D32]" />;
      case 'GraduationCap':
        return <GraduationCap className="w-7 h-7 text-[#2E7D32]" />;
      case 'Zap':
        return <Zap className="w-7 h-7 text-[#2E7D32]" />;
      default:
        return <Cpu className="w-7 h-7 text-[#2E7D32]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8FAF5] dark:bg-slate-950 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-bold uppercase tracking-wider">
            Why Choose AgriCare AI
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] dark:text-white tracking-tight font-heading">
            Empowering Modern Agriculture
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-sans">
            Built to give farmers, agronomists, and growers accessible, science-backed field intelligence at zero complexity.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES_DATA.map((feature) => (
            <div
              key={feature.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-gray-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#4CAF50] transition-all duration-300 text-left group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F8FAF5] border border-gray-200/60 flex items-center justify-center mb-6 group-hover:bg-[#2E7D32] group-hover:text-white transition-colors">
                <span className="group-hover:text-white transition-colors">
                  {getIcon(feature.iconName)}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#1F2937] group-hover:text-[#2E7D32] transition-colors mb-3 font-heading">
                {feature.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
