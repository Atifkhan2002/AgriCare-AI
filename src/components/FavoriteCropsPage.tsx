import React, { useState } from 'react';
import { Heart, Search, Sprout, Sparkles, ArrowRight, Sun, Thermometer, Droplets, Calendar, Trash2 } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop } from '../types';
import { useApp } from '../context/AppContext';

interface FavoriteCropsPageProps {
  onSelectCrop: (crop: Crop) => void;
  onExploreCrops: () => void;
  onOpenAnalyzer: () => void;
}

export const FavoriteCropsPage: React.FC<FavoriteCropsPageProps> = ({
  onSelectCrop,
  onExploreCrops,
  onOpenAnalyzer,
}) => {
  const { favorites, toggleFavorite, t } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter favorited crops
  const favoriteCropsList = CROPS_DATA.filter((crop) => favorites.includes(crop.id));

  const filteredCrops = favoriteCropsList.filter(
    (crop) =>
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[#F8FAF5] dark:bg-slate-950 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#388E3C] rounded-2xl p-5 sm:p-6 sm:px-8 text-white shadow-md relative overflow-hidden text-left">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[#8BC34A] text-xs font-bold uppercase tracking-wider border border-white/20">
              <Heart className="w-3.5 h-3.5 fill-[#8BC34A] text-[#8BC34A]" />
              Personal Saved Collection
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight text-white">
              {t('favoriteCropsTitle')}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-sans">
              Quick access to your saved crop profiles, optimal growing guidelines, and diagnostic records.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-xs">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-gray-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved favorite crops..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F8FAF5] dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#2E7D32]"
            />
          </div>

          <div className="text-xs font-semibold text-gray-500 dark:text-slate-400">
            Showing <strong>{filteredCrops.length}</strong> of <strong>{favoriteCropsList.length}</strong> favorited crops
          </div>
        </div>

        {/* Empty State */}
        {favoriteCropsList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-gray-200 dark:border-slate-800 shadow-sm space-y-4 max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-slate-800 flex items-center justify-center text-[#2E7D32] dark:text-[#8BC34A] mx-auto shadow-inner">
              <Heart className="w-10 h-10 text-gray-300 dark:text-slate-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                {t('noFavoritesYet')}
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md mx-auto font-sans">
                Browse our Agronomic Crop Library and click the heart icon on any crop card to save it here for instant access.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreCrops}
                className="px-6 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white font-bold text-sm transition-all shadow-md inline-flex items-center gap-2"
              >
                <Sprout className="w-4 h-4 text-[#8BC34A]" />
                Explore Crop Library
              </button>
            </div>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Crop Banner Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Favorite Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(crop.id)}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 shadow-md text-red-500 hover:scale-110 transition-transform"
                    title="Remove from favorites"
                  >
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                  </button>

                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#8BC34A] text-gray-950 font-bold text-xs">
                    {crop.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white">
                      {crop.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 italic font-serif">
                      {crop.scientificName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-slate-300 line-clamp-2 pt-1 font-sans">
                      {crop.shortDescription}
                    </p>
                  </div>

                  {/* Growth stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8FAF5] dark:bg-slate-800 p-3 rounded-xl border border-gray-200/60 dark:border-slate-700">
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-slate-400 block font-semibold uppercase">Season</span>
                      <strong className="text-gray-800 dark:text-slate-200 truncate block">{crop.growingSeason}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 dark:text-slate-400 block font-semibold uppercase">Harvest</span>
                      <strong className="text-gray-800 dark:text-slate-200 truncate block">{crop.harvestTime}</strong>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCrop(crop)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={onOpenAnalyzer}
                      className="p-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white transition-colors"
                      title="Scan Crop Health"
                    >
                      <Sparkles className="w-4 h-4 text-[#8BC34A]" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
