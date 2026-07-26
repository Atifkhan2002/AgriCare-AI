import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, ShieldAlert, Bot, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/cropsData';

interface ServicesSectionProps {
  onOpenAnalyzer: () => void;
  onExploreCrops: () => void;
  onOpenDiseaseGuide: () => void;
  onOpenAdvisor: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenAnalyzer,
  onExploreCrops,
  onOpenDiseaseGuide,
  onOpenAdvisor,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#2E7D32]" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-[#2E7D32]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-[#2E7D32]" />;
      case 'Bot':
        return <Bot className="w-6 h-6 text-[#2E7D32]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#2E7D32]" />;
    }
  };

  const handleCardClick = (id: string) => {
    if (id === 'ai-analysis') onOpenAnalyzer();
    else if (id === 'crop-library') onExploreCrops();
    else if (id === 'disease-guide') onOpenDiseaseGuide();
    else if (id === 'ai-advisor') onOpenAdvisor();
  };

  return (
    <section id="services" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-bold uppercase tracking-wider">
            Precision Agriculture Services
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] dark:text-white tracking-tight font-heading">
            Smart Solutions for Every Farmer
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-sans">
            Comprehensive AI tools designed to protect crop yields, educate growers, and ensure optimal soil and crop wellness.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => handleCardClick(service.id)}
              className="group relative bg-[#F8FAF5] dark:bg-slate-800 rounded-2xl p-7 border border-gray-200/80 dark:border-slate-700 hover:border-[#4CAF50] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-xs border border-gray-200/60 dark:border-slate-600 group-hover:bg-[#2E7D32] transition-colors">
                    <span className="group-hover:text-white transition-colors">
                      {getIcon(service.iconName)}
                    </span>
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#8BC34A]/20 text-[#2E7D32] dark:text-[#8BC34A]">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-[#1F2937] dark:text-white group-hover:text-[#2E7D32] dark:group-hover:text-[#8BC34A] transition-colors mb-3 font-heading">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
              </div>

              {/* Action Button Link */}
              <div className="pt-4 border-t border-gray-200/60 dark:border-slate-700 flex items-center justify-between text-sm font-semibold text-[#2E7D32] dark:text-[#8BC34A]">
                <span>{service.actionText}</span>
                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-xs group-hover:bg-[#2E7D32] group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );

};
