import React, { useState } from 'react';
import { Leaf, ArrowRight, Thermometer, Droplets, BookOpen, Eye, X, ShieldAlert, Heart } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop } from '../types';
import { useApp } from '../context/AppContext';

interface FeaturedCropsProps {
  onSelectCrop: (crop: Crop) => void;
}

export const FeaturedCrops: React.FC<FeaturedCropsProps> = ({ onSelectCrop }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickViewCrop, setQuickViewCrop] = useState<Crop | null>(null);
  const { isFavorite, toggleFavorite, t } = useApp();

  const categories = ['All', 'Favorites', 'Cereal Grain', 'Fruit / Vegetable', 'Tuber Crop', 'Fiber Crop'];

  const filteredCrops = CROPS_DATA.filter(c => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Favorites') return isFavorite(c.id);
    return c.category === selectedCategory;
  });

  return (
    <section id="library" className="py-20 bg-[#F8FAF5] dark:bg-slate-900 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-bold uppercase tracking-wider">
              <Leaf className="w-3.5 h-3.5 text-[#4CAF50]" />
              Crop Knowledge Base
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] dark:text-white tracking-tight font-heading">
              {t('featuredTitle')}
            </h2>
            <p className="text-base text-gray-600 dark:text-slate-300 font-sans">
              {t('featuredSubtitle')}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  selectedCategory === category
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {category === 'Favorites' && <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />}
                <span>{category === 'Favorites' ? t('favoritesOnly') : category === 'All' ? t('allCategories') : category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCrops.map((crop) => {
            const fav = isFavorite(crop.id);
            return (
              <div
                key={crop.id}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-slate-700 hover:border-[#4CAF50] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Crop Image Header */}
                  <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] border border-white/50 dark:border-slate-700 shadow-xs">
                      {crop.category}
                    </div>

                    {/* Favorite Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(crop.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-gray-600 dark:text-slate-200 hover:scale-110 transition-all shadow-md z-10"
                      title={fav ? t('removeFromFavorites') : t('addToFavorites')}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${fav ? 'text-rose-500 fill-rose-500' : 'text-gray-400 dark:text-slate-400'}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#8BC34A]" />
                      {crop.commonDiseases.length} Disease Guides
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 text-left space-y-3">
                    <div>
                      <span className="text-xs font-serif italic text-gray-500 dark:text-slate-400 block">
                        {crop.scientificName}
                      </span>
                      <h3 className="text-2xl font-bold text-[#1F2937] dark:text-white group-hover:text-[#2E7D32] dark:group-hover:text-[#8BC34A] transition-colors font-heading">
                        {crop.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
                      {crop.shortDescription}
                    </p>

                    {/* Micro Climate Indicators */}
                    <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-slate-300 bg-[#F8FAF5] dark:bg-slate-700/60 p-3 rounded-xl border border-transparent dark:border-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Thermometer className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
                        <span className="truncate">{crop.optimalTemp}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-4 h-4 text-[#4CAF50]" />
                        <span className="truncate">{crop.waterRequirements}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 text-left grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuickViewCrop(crop)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 font-semibold text-xs hover:bg-gray-200 dark:hover:bg-slate-600 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-600 dark:text-slate-300" />
                    <span>{t('quickView')}</span>
                  </button>
                  <button
                    onClick={() => onSelectCrop(crop)}
                    id={`crop-learn-more-${crop.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2E7D32] text-white font-semibold text-xs hover:bg-[#256628] transition-all group/btn shadow-xs"
                  >
                    <span>Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {filteredCrops.length === 0 && (
          <div className="py-12 text-center bg-white dark:bg-slate-800 rounded-3xl border border-gray-200 dark:border-slate-700 max-w-md mx-auto my-6 p-8">
            <Heart className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-800 dark:text-white font-heading">No Favorite Crops Saved</h4>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Click the heart icon on any crop card to save it to your favorites.</p>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      {quickViewCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 text-left border border-gray-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setQuickViewCrop(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={quickViewCrop.image}
                alt={quickViewCrop.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2E7D32]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-serif italic text-gray-500 dark:text-slate-400 block">
                  {quickViewCrop.scientificName}
                </span>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white font-heading">
                  {quickViewCrop.name}
                </h3>
                <span className="inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] dark:text-[#8BC34A]">
                  {quickViewCrop.category}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-sans leading-relaxed">
              {quickViewCrop.shortDescription}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase block">Optimal Temp</span>
                <span className="font-semibold text-gray-800 dark:text-white">{quickViewCrop.optimalTemp}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase block">Water Requirement</span>
                <span className="font-semibold text-gray-800 dark:text-white">{quickViewCrop.waterRequirements}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase block">Soil Type</span>
                <span className="font-semibold text-gray-800 dark:text-white">{quickViewCrop.soilType}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <span className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase block">Growth Cycle</span>
                <span className="font-semibold text-gray-800 dark:text-white">{quickViewCrop.growingSeason}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-gray-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-heading">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Key Disease Risks
              </h4>
              <div className="space-y-1.5">
                {quickViewCrop.commonDiseases.map((d) => (
                  <div key={d.id} className="p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-xs flex items-center justify-between">
                    <span className="font-semibold text-amber-900 dark:text-amber-200">{d.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-800 text-amber-950 dark:text-amber-100">{d.severity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setQuickViewCrop(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 text-xs font-bold transition-all"
              >
                {t('close')}
              </button>
              <button
                type="button"
                onClick={() => {
                  const crop = quickViewCrop;
                  setQuickViewCrop(null);
                  onSelectCrop(crop);
                }}
                className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <span>View Full Disease & Growth Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

