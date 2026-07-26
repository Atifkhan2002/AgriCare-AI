import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  Calendar,
  Clock,
  CheckSquare,
  Square,
  AlertTriangle,
  Lightbulb,
  Droplet,
  Sun,
  Wind,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Info,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { AnalysisSample } from '../types';

interface SmartCarePlanProps {
  report: AnalysisSample;
}

export const SmartCarePlan: React.FC<SmartCarePlanProps> = ({ report }) => {
  // Key for local storage persistence
  const storageKey = `agricare_careplan_checklist_${report.id}`;

  // Default checklist items
  const defaultChecklist = [
    { id: '1', text: 'Check leaves for new lesions or discoloration', completed: false },
    { id: '2', text: 'Inspect stem base and petioles for wilting or rot', completed: false },
    { id: '3', text: 'Monitor soil moisture level before watering', completed: false },
    { id: '4', text: 'Observe new shoot and foliage growth condition', completed: false },
    { id: '5', text: 'Look for active pests or insect egg clusters', completed: false },
    { id: '6', text: 'Compare current plant appearance with baseline photo', completed: false },
  ];

  // State for checklist with LocalStorage sync
  const [checklist, setChecklist] = useState<{ id: string; text: string; completed: boolean }[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse care plan checklist from localStorage', e);
    }
    return defaultChecklist;
  });

  // Save checklist updates to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checklist));
    } catch (e) {
      console.error('Failed to save care plan checklist to localStorage', e);
    }
  }, [checklist, storageKey]);

  // Toggle checklist item
  const toggleCheckItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  // Reset checklist
  const resetChecklist = () => {
    setChecklist(defaultChecklist);
  };

  // Calculate completion statistics
  const completedCount = checklist.filter((item) => item.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  // Accordion open/close state for timeline stages
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    today: true,
    nextDays: true,
    endOfWeek: true,
  });

  const toggleSection = (sectionKey: string) => {
    setOpenSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  // Determine if condition is severe/serious to trigger warning card
  const isSevere =
    report.status !== 'Healthy' &&
    (report.healthStatus === 'Critical' ||
      report.healthStatus === 'Needs Attention' ||
      report.confidence > 75 ||
      report.issueName.toLowerCase().includes('blight') ||
      report.issueName.toLowerCase().includes('rot') ||
      report.issueName.toLowerCase().includes('virus'));

  // Custom tips dynamically tailored to crop and issue
  const aiTips = [
    `Sanitize all shears and garden tools with alcohol before trimming ${report.cropName} plants.`,
    `Avoid overhead irrigation in high humidity; water directly at the root zone to prevent spore germination.`,
    `Remove severely diseased leaves and dispose of them far away from healthy crops or compost.`,
    `Ensure adequate distance between ${report.cropName} stalks to improve airflow and solar exposure.`,
    `Inspect neighboring foliage every morning for early signs of cross-infection.`,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 dark:border-slate-800 shadow-md space-y-5 text-left transition-colors"
      id="ai-smart-care-plan"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-gray-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#8BC34A]" />
            Personalized Action Plan
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2937] dark:text-white font-heading flex items-center gap-2 pt-0.5">
            <span>🌱 AI Smart Care Plan</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-300 font-sans max-w-2xl leading-relaxed">
            Personalized educational care plan generated for your uploaded specimen.
          </p>
        </div>

        {/* Crop Badge & Health Indicator */}
        <div className="bg-[#F8FAF5] dark:bg-slate-800 p-3 rounded-xl border border-gray-200/80 dark:border-slate-700 shrink-0 space-y-0.5">
          <div className="text-[11px] font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Target Specimen</div>
          <div className="text-base font-extrabold text-gray-900 dark:text-white font-heading">
            {report.cropName} ({report.issueName})
          </div>
        </div>
      </div>

      {/* Warning Card (If Issue is Severe) */}
      {isSevere && (
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 flex items-start gap-3.5 shadow-xs"
        >
          <div className="p-2 rounded-xl bg-amber-200/80 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-300" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm sm:text-base font-heading">
              ⚠ High Attention Required
            </h4>
            <p className="text-xs sm:text-sm font-sans leading-relaxed text-amber-800 dark:text-amber-300">
              This plant may require professional inspection if symptoms continue to worsen over the next 48 hours.
            </p>
          </div>
        </motion.div>
      )}

      {/* TIMELINE SECTION */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#2E7D32] dark:text-[#8BC34A]" />
          7-Day Care Schedule Timeline
        </h3>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#2E7D32]/30 dark:border-slate-700 space-y-8 my-4">
          
          {/* STAGE 1: TODAY */}
          <div className="relative">
            {/* Timeline Circle Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-md">
              <span className="text-xs font-bold">1</span>
            </div>

            <div className="bg-[#F8FAF5] dark:bg-slate-800/90 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('today')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A]">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider block">
                      Stage 1
                    </span>
                    <h4 className="text-lg font-extrabold text-gray-900 dark:text-white font-heading">
                      🌿 Today: Immediate Action Steps
                    </h4>
                  </div>
                </div>
                {openSections.today ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openSections.today && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-slate-700/60 pt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                      {/* Immediate Observations */}
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-[#2E7D32] dark:text-[#8BC34A] uppercase text-[11px] block font-heading flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" /> Immediate Observations
                        </span>
                        <p className="text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                          {report.visibleSymptoms || `Observe ${report.cropName} foliage for lesion spots, leaf discoloration, or wilting.`}
                        </p>
                      </div>

                      {/* Immediate Actions */}
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 uppercase text-[11px] block font-heading flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Immediate Actions
                        </span>
                        <p className="text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                          {report.suggestedAction || 'Isolate affected foliage, disinfect pruning tools, and check soil hydration level.'}
                        </p>
                      </div>

                      {/* What to Avoid */}
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-rose-600 dark:text-rose-400 uppercase text-[11px] block font-heading flex items-center gap-1.5">
                          <XCircle className="w-3.5 h-3.5" /> What to Avoid
                        </span>
                        <ul className="space-y-1 text-gray-700 dark:text-slate-300 list-disc list-inside font-sans">
                          <li>Avoid spraying foliage directly during mid-day heat.</li>
                          <li>Do not apply excessive nitrogen fertilizer today.</li>
                          <li>Avoid composting infected leaf litter.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* STAGE 2: NEXT 2-3 DAYS */}
          <div className="relative">
            {/* Timeline Circle Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-md">
              <span className="text-xs font-bold">2</span>
            </div>

            <div className="bg-[#F8FAF5] dark:bg-slate-800/90 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('nextDays')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider block">
                      Stage 2
                    </span>
                    <h4 className="text-lg font-extrabold text-gray-900 dark:text-white font-heading">
                      📅 Next 2–3 Days: Monitoring Phase
                    </h4>
                  </div>
                </div>
                {openSections.nextDays ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openSections.nextDays && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-slate-700/60 pt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                      {/* What to Monitor */}
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-[#2E7D32] dark:text-[#8BC34A] uppercase text-[11px] block font-heading">
                          🔍 What to Monitor
                        </span>
                        <p className="text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                          Monitor canopy spread rate, leaf margins, and soil moisture levels in early morning and late evening.
                        </p>
                      </div>

                      {/* Signs of Improvement */}
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-emerald-700 dark:text-emerald-400 uppercase text-[11px] block font-heading">
                          ✅ Signs of Improvement
                        </span>
                        <ul className="space-y-1 text-gray-700 dark:text-slate-300 list-disc list-inside font-sans">
                          <li>Lesion borders remain dry and localized.</li>
                          <li>Fresh new green shoots sprouting from lower stem nodes.</li>
                          <li>No spreading discoloration on nearby leaves.</li>
                        </ul>
                      </div>

                      {/* Signs of Worsening */}
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-2">
                        <span className="font-extrabold text-amber-700 dark:text-amber-400 uppercase text-[11px] block font-heading">
                          🚨 Signs of Worsening
                        </span>
                        <ul className="space-y-1 text-gray-700 dark:text-slate-300 list-disc list-inside font-sans">
                          <li>Rapid leaf wilting or drooping across entire branches.</li>
                          <li>Dark fungal dust/sporulation appearing on undersides.</li>
                          <li>Pest infestations spreading to neighbor stalks.</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* STAGE 3: END OF WEEK */}
          <div className="relative">
            {/* Timeline Circle Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-0.5 w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-md">
              <span className="text-xs font-bold">3</span>
            </div>

            <div className="bg-[#F8FAF5] dark:bg-slate-800/90 rounded-2xl border border-gray-200/80 dark:border-slate-700/80 overflow-hidden shadow-xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('endOfWeek')}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-emerald-50/50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#2E7D32]/10 dark:bg-[#2E7D32]/30 text-[#2E7D32] dark:text-[#8BC34A]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E7D32] dark:text-[#8BC34A] uppercase tracking-wider block">
                      Stage 3
                    </span>
                    <h4 className="text-lg font-extrabold text-gray-900 dark:text-white font-heading">
                      📆 End of Week: Final Evaluation
                    </h4>
                  </div>
                </div>
                {openSections.endOfWeek ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {openSections.endOfWeek && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-slate-700/60 pt-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-1.5">
                        <span className="font-extrabold text-[#2E7D32] dark:text-[#8BC34A] uppercase text-[11px] block font-heading">
                          1. Recheck Plant Condition
                        </span>
                        <p className="text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                          Conduct a full 7-day canopy check under morning light. Inspect lower, middle, and upper foliage layers.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-1.5">
                        <span className="font-extrabold text-[#2E7D32] dark:text-[#8BC34A] uppercase text-[11px] block font-heading">
                          2. Photo Comparison
                        </span>
                        <p className="text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                          Take a new photo and compare it against your baseline uploaded photo to evaluate lesion enlargement.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200/70 dark:border-slate-700 space-y-1.5">
                        <span className="font-extrabold text-[#2E7D32] dark:text-[#8BC34A] uppercase text-[11px] block font-heading">
                          3. Evaluate Improvement
                        </span>
                        <p className="text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                          If symptoms persist or worsen, consider consulting a local agricultural extension officer.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* MONITORING CHECKLIST & CARE REMINDERS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHECKLIST (7 COLUMNS) */}
        <div className="lg:col-span-7 bg-[#F8FAF5] dark:bg-slate-800/90 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200/80 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#2E7D32] dark:text-[#8BC34A]" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-heading">
                Interactive Monitoring Checklist
              </h3>
            </div>
            <button
              type="button"
              onClick={resetChecklist}
              className="text-xs font-semibold text-gray-500 hover:text-[#2E7D32] dark:hover:text-[#8BC34A] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-slate-300">
              <span>Progress Tracker</span>
              <span className="text-[#2E7D32] dark:text-[#8BC34A] font-extrabold">
                {completedCount} of {checklist.length} completed ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5 pt-1">
            {checklist.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleCheckItem(item.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  item.completed
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 hover:border-[#2E7D32]'
                }`}
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-[#2E7D32] dark:text-[#8BC34A] shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-5 h-5 text-gray-400 dark:text-slate-500 shrink-0 mt-0.5" />
                )}
                <span className={`text-xs sm:text-sm font-sans ${item.completed ? 'line-through opacity-80' : ''}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CARE REMINDERS (5 COLUMNS) */}
        <div className="lg:col-span-5 bg-[#F8FAF5] dark:bg-slate-800/90 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-700 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-200/80 dark:border-slate-700">
            <Droplet className="w-5 h-5 text-[#2E7D32] dark:text-[#8BC34A]" />
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-heading">
              Essential Care Reminders
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {/* Reminder 1: Soil Moisture */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-gray-200/70 dark:border-slate-700 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 shrink-0 mt-0.5">
                <Droplet className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-gray-900 dark:text-white font-heading block">
                  💧 Check Soil Moisture
                </strong>
                <p className="text-xs text-gray-600 dark:text-slate-300 font-sans mt-0.5">
                  Keep topsoil consistently damp but never waterlogged to avoid root suffocation.
                </p>
              </div>
            </div>

            {/* Reminder 2: Sunlight */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-gray-200/70 dark:border-slate-700 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 shrink-0 mt-0.5">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-gray-900 dark:text-white font-heading block">
                  🌞 Ensure Proper Sunlight
                </strong>
                <p className="text-xs text-gray-600 dark:text-slate-300 font-sans mt-0.5">
                  Provide 6–8 hours of sunlight daily for photosynthetically active radiation recovery.
                </p>
              </div>
            </div>

            {/* Reminder 3: Air Circulation */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-gray-200/70 dark:border-slate-700 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-300 shrink-0 mt-0.5">
                <Wind className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-gray-900 dark:text-white font-heading block">
                  🌬 Improve Air Circulation
                </strong>
                <p className="text-xs text-gray-600 dark:text-slate-300 font-sans mt-0.5">
                  Space plants properly to minimize stagnant humidity around foliage.
                </p>
              </div>
            </div>

            {/* Reminder 4: Nearby Plants */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-gray-200/70 dark:border-slate-700 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 shrink-0 mt-0.5">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-gray-900 dark:text-white font-heading block">
                  🪴 Inspect Nearby Plants
                </strong>
                <p className="text-xs text-gray-600 dark:text-slate-300 font-sans mt-0.5">
                  Regularly scan neighboring vegetation to stop potential pest or pathogen migration.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* AI EDUCATIONAL TIPS SECTION */}
      <div className="bg-[#F8FAF5] dark:bg-slate-800/90 p-6 rounded-2xl border border-gray-200/80 dark:border-slate-700 space-y-3">
        <div className="flex items-center gap-2 pb-1">
          <Lightbulb className="w-5 h-5 text-[#8BC34A]" />
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-heading">
            AI Educational Agronomy Tips
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiTips.map((tip, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-gray-200/70 dark:border-slate-700 text-xs sm:text-sm text-gray-800 dark:text-slate-200"
            >
              <Sparkles className="w-4 h-4 text-[#2E7D32] dark:text-[#8BC34A] shrink-0 mt-0.5" />
              <span className="font-sans leading-relaxed">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DISCLAIMER SECTION */}
      <div className="p-4 rounded-2xl bg-[#1F2937] text-white border border-gray-800 text-xs sm:text-sm flex items-start gap-3 shadow-md">
        <Info className="w-5 h-5 text-[#8BC34A] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-[#8BC34A] uppercase text-[11px] tracking-wider block font-heading">
            Educational Disclaimer
          </strong>
          <p className="leading-relaxed font-sans text-gray-300">
            This care plan is generated by AI for educational purposes. Recommendations may not be suitable for every crop, climate, or farming practice. Consult local agricultural experts when making important decisions.
          </p>
        </div>
      </div>

    </motion.div>
  );
};
