import React, { useState } from 'react';
import { X, Search, ShieldAlert, CheckCircle2, AlertTriangle, Bug } from 'lucide-react';
import { CROPS_DATA } from '../data/cropsData';
import { DiseaseInfo } from '../types';

interface DiseaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiseaseGuideModal: React.FC<DiseaseGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');

  // Flatten all crop diseases with parent crop name attached
  const allDiseases: (DiseaseInfo & { cropName: string })[] = CROPS_DATA.flatMap((crop) =>
    crop.commonDiseases.map((disease) => ({
      ...disease,
      cropName: crop.name,
    }))
  );

  const filteredDiseases = allDiseases.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-3xl max-w-4xl w-full relative shadow-2xl overflow-hidden my-6 border border-gray-200 dark:border-slate-800 text-left">
        
        {/* Header */}
        <div className="p-6 bg-[#1F2937] dark:bg-slate-950 text-white flex items-center justify-between border-b border-gray-800 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white">
              <ShieldAlert className="w-5 h-5 text-[#8BC34A]" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-heading text-white">
                Agronomic Crop Disease Guide
              </h2>
              <p className="text-xs text-[#8BC34A]">Symptoms, Pathogens & Treatment Plans</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-gray-800 dark:bg-slate-800 hover:bg-gray-700 dark:hover:bg-slate-700 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 bg-[#F8FAF5] dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <div className="relative max-w-md mx-auto">
            <Search className="w-5 h-5 text-gray-400 dark:text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases (e.g., Blight, Rust, Tomato, Worm)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#2E7D32] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto space-y-6">
          {filteredDiseases.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Bug className="w-10 h-10 text-gray-300 dark:text-slate-600 mx-auto" />
              <p className="text-gray-600 dark:text-slate-400 font-medium">No crop diseases found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDiseases.map((disease) => (
                <div
                  key={`${disease.cropName}-${disease.id}`}
                  className="bg-[#F8FAF5] dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:border-[#2E7D32] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A]">
                        {disease.cropName} Crop
                      </span>
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        disease.severity === 'high'
                          ? 'bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200'
                          : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200'
                      }`}>
                        {disease.severity} Severity
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-heading text-[#1F2937] dark:text-white">
                      {disease.name}
                    </h3>

                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed font-sans">
                      <strong>Primary Cause:</strong> {disease.causes}
                    </p>

                    <div className="space-y-1">
                      <span className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider block">
                        Visible Symptoms:
                      </span>
                      <ul className="space-y-1 text-xs text-gray-700 dark:text-slate-300">
                        {disease.symptoms.map((s, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Organic Treatment */}
                  <div className="pt-3 border-t border-gray-200/80 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 rounded-xl">
                    <span className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider block mb-1">
                      Organic Treatment:
                    </span>
                    <p className="text-xs text-gray-700 dark:text-slate-300 font-sans">
                      {disease.organicTreatment}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 bg-[#F8FAF5] dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#2E7D32] text-white text-sm font-semibold hover:bg-[#256628] transition-colors"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
