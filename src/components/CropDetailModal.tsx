import React from 'react';
import { X, Thermometer, Droplets, Sun, Layers, ShieldAlert, CheckCircle2, Sprout, Calendar, Sparkles, AlertCircle, ArrowRight, Leaf } from 'lucide-react';
import { Crop } from '../types';
import { CROPS_DATA } from '../data/cropsData';

interface CropDetailModalProps {
  crop: Crop | null;
  onClose: () => void;
  onSelectCrop?: (crop: Crop) => void;
  onOpenAnalyzerWithCrop?: (cropName: string) => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  onClose,
  onSelectCrop,
  onOpenAnalyzerWithCrop,
}) => {
  if (!crop) return null;

  // Find related crops
  const relatedCrops = (crop.relatedCropIds || [])
    .map(id => CROPS_DATA.find(c => c.id === id))
    .filter((c): c is Crop => c !== undefined);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-3xl max-w-3xl w-full relative shadow-2xl overflow-hidden my-8 text-left border border-gray-200 dark:border-slate-800">
        
        {/* Modal Header Banner */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-900">
          <img
            src={crop.image}
            alt={crop.name}
            className="w-full h-full object-cover opacity-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 backdrop-blur-md transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#8BC34A] text-gray-950 font-extrabold text-xs">
                {crop.category}
              </span>
              <span className="text-xs font-serif italic text-gray-300">
                {crop.scientificName}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              {crop.name} Cultivation Guide
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider font-heading flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
              Overview
            </h3>
            <p className="text-sm sm:text-base text-gray-700 dark:text-slate-300 leading-relaxed font-sans">
              {crop.fullDescription}
            </p>
          </div>

          {/* Growing Parameters Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F8FAF5] dark:bg-slate-800 p-5 rounded-2xl border border-gray-200/80 dark:border-slate-700">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 font-medium">
                <Sun className="w-4 h-4 text-[#8BC34A]" />
                Growing Season
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white">{crop.growingSeason}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 font-medium">
                <Thermometer className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
                Climate / Temp
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white">{crop.optimalTemp}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 font-medium">
                <Droplets className="w-4 h-4 text-[#4CAF50]" />
                Water Needs
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white">{crop.waterRequirements}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 font-medium">
                <Calendar className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
                Harvest Time
              </div>
              <p className="text-xs sm:text-sm font-bold text-gray-800 dark:text-white">{crop.harvestTime}</p>
            </div>
          </div>

          {/* Soil Requirements */}
          <div className="space-y-2 bg-emerald-50/50 dark:bg-slate-800 p-4 rounded-xl border border-emerald-100 dark:border-slate-700">
            <h3 className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider font-heading flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
              Soil Requirements
            </h3>
            <p className="text-sm text-gray-700 dark:text-slate-300 font-medium">
              {crop.soilType}
            </p>
          </div>

          {/* Fertilizer Tips */}
          {crop.fertilizerTips && crop.fertilizerTips.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider font-heading flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#8BC34A]" />
                Fertilizer Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
                {crop.fertilizerTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Field Care Tips */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider font-heading flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
              Field Care Tips
            </h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-slate-300">
              {crop.careTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A] shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Diseases Section */}
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <h3 className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider font-heading flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A]" />
              Common Diseases
            </h3>

            <div className="space-y-4">
              {crop.commonDiseases.map((disease) => (
                <div
                  key={disease.id}
                  className="bg-amber-50/50 dark:bg-slate-800 p-5 rounded-2xl border border-amber-200/80 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-amber-950 dark:text-amber-200 font-heading">
                      {disease.name}
                    </h4>
                    <span className="text-[11px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                      {disease.severity} Severity
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 font-sans">
                    <strong>Symptoms:</strong> {disease.symptoms.join(', ')}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 font-sans">
                    <strong>Causes:</strong> {disease.causes}
                  </p>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-slate-300 font-sans">
                    <strong>Organic Remedy:</strong> {disease.organicTreatment}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#F8FAF5] dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-slate-400">
            Harvest Time: <strong className="text-gray-800 dark:text-white">{crop.harvestTime}</strong>
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-200 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            {onOpenAnalyzerWithCrop && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAnalyzerWithCrop(crop.name);
                }}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#2E7D32] text-white text-sm font-semibold hover:bg-[#256628] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Scan {crop.name} Health
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

