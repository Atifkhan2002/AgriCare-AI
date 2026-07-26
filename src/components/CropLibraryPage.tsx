import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Thermometer, Calendar, ArrowRight, Sprout, Heart } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop } from '../types';
import { useApp } from '../context/AppContext';

interface CropLibraryPageProps {
  onSelectCrop: (crop: Crop) => void;
  onOpenAnalyzer: () => void;
}

export const CropLibraryPage: React.FC<CropLibraryPageProps> = ({
  onSelectCrop,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isFavorite, toggleFavorite, t } = useApp();

  const categories = ['All', 'Favorites', 'Cereal Grain', 'Fruit / Vegetable', 'Tuber Crop', 'Fiber Crop'];

  const filteredCrops = CROPS_DATA.filter((crop) => {
    const matchesCategory =
      selectedCategory === 'All'
        ? true
        : selectedCategory === 'Favorites'
        ? isFavorite(crop.id)
        : crop.category === selectedCategory;

    const matchesSearch =
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[#F8FAF5] dark:bg-slate-950 text-[#1F2937] dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-5 sm:p-6 sm:px-8 shadow-md border border-emerald-800/20"
        >
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#8BC34A] text-xs font-bold uppercase tracking-wider border border-white/10">
              <BookOpen className="w-3.5 h-3.5 text-[#8BC34A]" />
              Agronomic Knowledge Base
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
              {t('navLibrary')}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-sans leading-relaxed">
              Explore essential agronomic specifications, climate requirements, soil profiles, growing seasons, and disease management guides for major agricultural crops.
            </p>
          </div>
        </motion.div>

        {/* Search & Filter Controls */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-gray-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F8FAF5] dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#2E7D32] focus:bg-white dark:focus:bg-slate-800 transition-all font-sans"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedCategory === category
                      ? 'bg-[#2E7D32] text-white shadow-xs'
                      : 'bg-[#F8FAF5] dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                  }`}
                >
                  {category === 'Favorites' && <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />}
                  <span>{category === 'Favorites' ? t('favoritesOnly') : category === 'All' ? t('allCategories') : category}</span>
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Crops Grid */}
        {filteredCrops.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-8 space-y-3">
            <Sprout className="w-12 h-12 text-gray-300 dark:text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white font-heading">{t('noCropsFound')}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-sans">
              No crops matched your search "{searchQuery}". Try searching for Tomato, Wheat, Potato, or Rice.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-semibold hover:bg-[#256628] transition-colors"
            >
              {t('clearSearch')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCrops.map((crop) => {
              const fav = isFavorite(crop.id);
              return (
                <div
                  key={crop.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-slate-800 hover:border-[#4CAF50] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-slate-800">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] border border-white/50 dark:border-slate-700 shadow-xs">
                        {crop.category}
                      </div>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={() => toggleFavorite(crop.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-gray-600 dark:text-slate-200 hover:scale-110 transition-all shadow-md z-10"
                        title={fav ? t('removeFromFavorites') : t('addToFavorites')}
                      >
                        <Heart className={`w-4 h-4 transition-colors ${fav ? 'text-rose-500 fill-rose-500' : 'text-gray-400 dark:text-slate-400'}`} />
                      </button>
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

                      {/* Metadata Specs: Growing Season & Climate */}
                      <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-gray-700 dark:text-slate-300 bg-[#F8FAF5] dark:bg-slate-800 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A] shrink-0" />
                          <span className="truncate font-medium">{crop.growingSeason}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Thermometer className="w-4 h-4 text-[#4CAF50] shrink-0" />
                          <span className="truncate font-medium">{crop.optimalTemp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <div className="p-6 pt-0 text-left">
                    <button
                      onClick={() => onSelectCrop(crop)}
                      id={`crop-library-btn-${crop.id}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A] font-semibold text-sm hover:bg-[#2E7D32] hover:text-white dark:hover:bg-[#2E7D32] dark:hover:text-white transition-all group/btn"
                    >
                      <span>{t('viewDetails')}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

