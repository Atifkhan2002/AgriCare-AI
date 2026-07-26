import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload,
  Sparkles,
  FileImage,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Send,
  Bot,
  Info,
  X,
  ArrowRight,
  ShieldAlert,
  Sprout,
  HelpCircle,
  Leaf,
  Droplets,
  Layers,
  Copy,
  Download,
  Trash2,
  Check,
  Share2,
  Printer,
  FileText
} from 'lucide-react';
import { SAMPLE_ANALYSES } from '../data/cropsData';
import { AnalysisSample, ChatMessage } from '../types';
import { useApp } from '../context/AppContext';
import { exportReportToPdf } from '../utils/pdfExport';
import { SmartCarePlan } from './SmartCarePlan';

interface AiCropAnalyzerPageProps {
  initialSample?: AnalysisSample;
  onNavigateHome?: () => void;
}

export const AiCropAnalyzerPage: React.FC<AiCropAnalyzerPageProps> = ({
  initialSample,
  onNavigateHome
}) => {
  const { t } = useApp();

  // State variables
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialSample?.image || null
  );
  const [fileMimeType, setFileMimeType] = useState<string>('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState<number>(0);
  const [report, setReport] = useState<AnalysisSample | null>(
    initialSample || null
  );
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Saved Analyses History (localStorage)
  const [savedHistory, setSavedHistory] = useState<AnalysisSample[]>(() => {
    try {
      const stored = localStorage.getItem('agricare_saved_analyses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveToHistory = (item: AnalysisSample) => {
    try {
      const filtered = savedHistory.filter((h) => h.id !== item.id && h.cropName !== item.cropName);
      const updated = [item, ...filtered].slice(0, 5); // Keep up to 5 items
      setSavedHistory(updated);
      localStorage.setItem('agricare_saved_analyses', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save analysis to history:', err);
    }
  };

  const handleDeleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedHistory.filter((item) => item.id !== id);
    setSavedHistory(updated);
    try {
      localStorage.setItem('agricare_saved_analyses', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to update history localStorage:', err);
    }
    showToast('Removed scan from saved history.');
  };

  const handleExportPdf = async () => {
    if (!report) return;
    try {
      setIsExportingPdf(true);
      showToast('Generating PDF report...');
      await exportReportToPdf(report);
      showToast('PDF Report exported successfully!');
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('Exporting via browser print dialog...');
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Toast System State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    initialSample
      ? [
          {
            id: '1',
            sender: 'ai',
            text: `Diagnostic report loaded for **${initialSample.cropName}** (${initialSample.issueName}). Ask any follow-up questions about irrigation, soil fertility, or organic treatment!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      : []
  );
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat inner container
  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTo({
        top: chatMessagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, isChatLoading]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setAnalysisError('Please upload a valid image file (JPG, PNG, or WEBP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setAnalysisError('Image file size exceeds 15MB limit.');
      return;
    }

    setFileMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setUploadedImage(base64);
      setReport(null);
      setAnalysisError(null);
    };
    reader.readAsDataURL(file);
  };

  // Select Sample Image
  const handleSelectSample = (sample: AnalysisSample) => {
    setUploadedImage(sample.image);
    setFileMimeType('image/jpeg');
    setReport(sample);
    setAnalysisError(null);
    setChatMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Loaded diagnostic sample for **${sample.cropName}** (${sample.issueName}). Feel free to ask me follow-up questions about care, prevention, or fertilizer!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast(`Loaded sample for ${sample.cropName}`);
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // Run AI Analysis execution with 6 distinct progress steps
  const runAnalysis = async () => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setScanStep(1); // Uploading Image
    setScanProgress(15);

    const stepTimer1 = setTimeout(() => {
      setScanStep(2); // Identifying Plant
      setScanProgress(35);
    }, 400);

    const stepTimer2 = setTimeout(() => {
      setScanStep(3); // Analyzing Symptoms
      setScanProgress(55);
    }, 800);

    const stepTimer3 = setTimeout(() => {
      setScanStep(4); // Generating Report
      setScanProgress(75);
    }, 1200);

    const stepTimer4 = setTimeout(() => {
      setScanStep(5); // Preparing Recommendations
      setScanProgress(90);
    }, 1600);

    try {
      const response = await fetch('/api/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: uploadedImage,
          mimeType: fileMimeType
        })
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);

      setScanStep(6); // Complete
      setScanProgress(100);

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const newReport: AnalysisSample = {
        id: Date.now().toString(),
        cropName: data.cropName || 'Uploaded Crop',
        scientificName: data.scientificName,
        issueName: data.issueName || 'Leaf Condition Evaluated',
        confidence: data.confidence || 90,
        confidenceLevel: data.confidenceLevel || (data.confidence >= 85 ? 'High' : data.confidence >= 70 ? 'Medium' : 'Low'),
        status: data.status || 'Disease Detected',
        healthStatus: data.healthStatus || (data.status === 'Healthy' ? 'Healthy' : 'Needs Attention'),
        image: uploadedImage,
        suggestedAction:
          data.suggestedAction ||
          'Apply organic bio-fungicide, prune infected foliage, and ensure soil drainage.',
        detailedAnalysis:
          data.detailedAnalysis ||
          'Visual inspection reveals leaf spot symptoms with surrounding chlorotic borders.',
        visibleSymptoms: data.visibleSymptoms || 'Concentric leaf spots with chlorotic yellow borders along upper foliage.',
        visibleSymptomsList: data.visibleSymptomsList || [
          'Foliar chlorotic spotting along leaf margins',
          'Mild cupping of mature leaves',
          'Necrotic borders on affected leaf tissue'
        ],
        reasoning: data.reasoning || 'Diagnostic visual features match characteristic foliar fungal pathogen activity.',
        possibleCauses: data.possibleCauses || 'Humid microclimates favoring fungal spore germination and foliage moisture.',
        possibleDiagnoses: data.possibleDiagnoses || [
          { name: data.issueName || 'Foliar Spot', confidence: data.confidence || 90, type: 'Primary Diagnosis' }
        ],
        generalRecommendations: data.generalRecommendations || [
          'Prune affected foliage to reduce pathogen spore count.',
          'Drip irrigate at stem base to avoid wetting leaf surfaces.',
          'Apply preventative organic neem oil or bio-fungicide.'
        ],
        preventativeSteps: data.preventativeSteps || [
          'Maintain row spacing to optimize sunlight and airflow.',
          'Rotate crops every season with non-host plant families.',
          'Sanitize pruning tools with 70% alcohol between plants.'
        ],
        expertConsultation: data.expertConsultation || 'Consult your district agricultural extension officer if infection spreads rapidly to new canopy shoots.',
        disclaimer: 'This assessment is AI-generated for educational purposes and may not always be accurate. Please verify important decisions with a qualified agricultural expert.',
        chatPrompts: [
          'Can this disease spread?',
          'How can I prevent it?',
          'Is fertilizer needed?',
          'Can this plant recover?',
          'Why did this happen?'
        ]
      };

      setReport(newReport);
      saveToHistory(newReport);

      setChatMessages([
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: `Diagnostic complete for **${newReport.cropName}**!\n\nPrimary Condition: **${newReport.issueName}** (Confidence: ${newReport.confidence}%).\nHealth Status: **${newReport.healthStatus}**.\n\nAsk me any follow-up question regarding field treatment, soil care, or organic prevention!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      showToast("Plant analysis completed successfully!");

      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err) {
      console.error('Error during AI plant analysis:', err);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);
      setScanProgress(0);
      setAnalysisError("We couldn't confidently analyze this image. Please upload a clearer photo of the affected leaves, stem, fruit, or plant.");
    } finally {
      setIsAnalyzing(false);
      setScanStep(0);
    }
  };

  // Chat send handler
  const handleSendChatText = async (promptText: string) => {
    if (!promptText.trim() || isChatLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          image: uploadedImage,
          mimeType: fileMimeType,
          context: {
            cropName: report?.cropName || 'Uploaded Crop',
            issueName: report?.issueName || 'Symptom',
            status: report?.status || 'Evaluated',
            suggestedAction: report?.suggestedAction,
            organicTreatment: report?.suggestedAction
          },
          history: chatMessages.slice(-6)
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const aiReply =
        data.reply ||
        `For ${report?.cropName || 'your crop'}, maintain adequate spacing and drip irrigation at the root base.`;

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      let reply = `For ${report?.cropName || 'your crop'} exhibiting ${report?.issueName || 'symptoms'}, keep soil pH balanced and water at ground level.`;
      if (promptText.toLowerCase().includes('spread')) {
        reply = `Yes, fungal spores and bacterial blights can spread via wind, splashing water droplets, or contaminated farm tools. Isolate infected plant debris promptly.`;
      } else if (promptText.toLowerCase().includes('prevent')) {
        reply = `Practice crop rotation, maintain wide row spacing for ventilation, water at soil level, and apply preventative neem oil or bio-fungicide sprays.`;
      } else if (promptText.toLowerCase().includes('fertilizer')) {
        reply = `Avoid excessive nitrogen fertilizer during disease outbreaks as succulent new foliage is prone to infection. Use balanced potassium and organic compost instead.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: reply + '\n\nThis assessment is AI-generated for educational purposes and may not always be accurate. Please verify important decisions with a qualified agricultural expert.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSendChatForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatInput('');
    handleSendChatText(text);
  };

  // Copy message text to clipboard
  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    showToast("Message copied to clipboard!");
    setTimeout(() => {
      setCopiedMsgId(null);
    }, 2000);
  };

  // Clear chat conversation
  const handleClearChat = () => {
    setChatMessages([]);
    showToast("Chat history cleared.");
  };

  // Download Report Summary TXT File
  const handleExportReport = () => {
    if (!report) return;

    const summaryText = `
==================================================
AGRICARE AI - CROP HEALTH DIAGNOSTIC REPORT
==================================================
Date: ${new Date().toLocaleDateString()}
Crop Name: ${report.cropName} (${report.scientificName || 'Botanical name unspecified'})
Health Status: ${report.healthStatus || report.status}
Primary Condition: ${report.issueName}
Confidence Score: ${report.confidence}% (${report.confidenceLevel || 'High'})

--------------------------------------------------
VISIBLE SYMPTOMS
--------------------------------------------------
${report.visibleSymptomsList ? report.visibleSymptomsList.map(s => `- ${s}`).join('\n') : report.visibleSymptoms}

--------------------------------------------------
DIAGNOSTIC REASONING
--------------------------------------------------
${report.reasoning}

--------------------------------------------------
GENERAL RECOMMENDATIONS
--------------------------------------------------
${report.generalRecommendations ? report.generalRecommendations.map(r => `- ${r}`).join('\n') : report.suggestedAction}

--------------------------------------------------
LONG-TERM PREVENTION TIPS
--------------------------------------------------
${report.preventativeSteps ? report.preventativeSteps.map(p => `- ${p}`).join('\n') : 'Maintain row spacing and crop rotation.'}

--------------------------------------------------
EXPERT CONSULTATION RECOMMENDATION
--------------------------------------------------
${report.expertConsultation}

--------------------------------------------------
EDUCATIONAL DISCLAIMER
--------------------------------------------------
This assessment is AI-generated for educational purposes and may not always be accurate. Please verify important decisions with a qualified local agricultural expert.
==================================================
`.trim();

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AgriCare_AI_Report_${report.cropName.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("Report summary exported as TXT!");
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F8FAF5] text-gray-900 relative">
      {/* Toast Notification Floating Banner */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-5 z-50 bg-[#1F2937] text-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-3 text-xs sm:text-sm font-semibold"
          >
            <CheckCircle2 className="w-4 h-4 text-[#8BC34A]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. Compact Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white p-5 sm:p-6 sm:px-8 shadow-md border border-emerald-800/20"
        >
          {/* Decorative background vectors */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#8BC34A] text-xs font-bold tracking-wider uppercase border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#8BC34A]" />
              Precision Botanical Vision
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
              AI Vision Crop Scanner
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100 font-sans max-w-2xl">
              Upload a plant photo or select a sample specimen below to generate instant agronomic diagnostic reports.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-emerald-200 font-medium">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8BC34A]" /> Instant Diagnostic
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8BC34A]" /> Organic Remedies
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8BC34A]" /> Interactive Assistant
              </span>
            </div>
          </div>
        </motion.div>

        {/* 2. Drag & Drop Upload + Sample Selector Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
        >
          {/* Left Column: Drag and Drop Card */}
          <div className="lg:col-span-7 space-y-3">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative rounded-2xl p-5 border-2 border-dashed transition-all duration-300 text-center bg-white dark:bg-slate-900 shadow-xs overflow-hidden ${
                isDragging
                  ? 'border-[#2E7D32] bg-[#2E7D32]/5 scale-[1.01]'
                  : uploadedImage
                  ? 'border-[#2E7D32]/50 bg-emerald-50/20 dark:bg-emerald-950/20'
                  : 'border-gray-300 dark:border-slate-700 hover:border-[#2E7D32] bg-white dark:bg-slate-900'
              }`}
            >
              {/* Hidden input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadedImage ? (
                /* Image Preview Mode */
                <div className="space-y-6">
                  <div className="relative max-w-md mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-lg group">
                    <img
                      src={uploadedImage}
                      alt="Plant upload preview"
                      className="w-full h-64 sm:h-72 object-cover"
                    />

                    {/* Scanning overlay effect if analyzing */}
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-[#2E7D32]/30 backdrop-blur-xs flex flex-col items-center justify-center p-4">
                        <motion.div
                          animate={{ y: [-100, 100, -100] }}
                          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                          className="w-full h-1 bg-[#8BC34A] shadow-[0_0_15px_#8BC34A] absolute"
                        />
                        <div className="bg-white/95 px-5 py-3 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 z-10">
                          <RefreshCw className="w-5 h-5 text-[#2E7D32] animate-spin" />
                          <span className="text-sm font-bold text-gray-800">
                            {scanStep === 1 && 'Uploading Image...'}
                            {scanStep === 2 && 'Identifying Plant...'}
                            {scanStep === 3 && 'Analyzing Symptoms...'}
                            {scanStep === 4 && 'Generating Report...'}
                            {scanStep === 5 && 'Preparing Recommendations...'}
                            {scanStep === 6 && 'Analysis Complete!'}
                          </span>
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImage(null);
                        setReport(null);
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                      title="Remove Image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold transition-all flex items-center gap-2"
                    >
                      <FileImage className="w-4 h-4 text-gray-500" />
                      Change Photo
                    </button>

                    {/* 4. Analyze Plant Button */}
                    <button
                      type="button"
                      onClick={runAnalysis}
                      disabled={isAnalyzing}
                      className="px-8 py-3 rounded-xl bg-[#2E7D32] text-white text-sm font-bold shadow-lg shadow-[#2E7D32]/25 hover:bg-[#256628] active:scale-98 transition-all flex items-center gap-2 disabled:opacity-60"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#8BC34A]" />
                          Analyzing Plant...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#8BC34A]" />
                          Analyze Plant
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Upload Prompt */
                <div className="py-8 space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] mx-auto shadow-sm">
                    <Upload className="w-10 h-10 text-[#2E7D32]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-900 font-heading">
                      Drag & Drop Plant Image Here
                    </h3>
                    <p className="text-sm text-gray-600 max-w-sm mx-auto font-sans">
                      Upload a clean, well-lit photo of the affected plant leaf or crop for visual AI diagnostic.
                    </p>
                  </div>

                  {/* Browse Button */}
                  <div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm shadow-md shadow-[#2E7D32]/20 hover:bg-[#256628] transition-all inline-flex items-center gap-2"
                    >
                      <FileImage className="w-4 h-4 text-[#8BC34A]" />
                      Browse Files
                    </button>
                  </div>

                  {/* Supported File Formats */}
                  <p className="text-xs text-gray-500 pt-2 font-medium">
                    Supported Formats: <strong className="text-gray-700">JPG, PNG, WEBP</strong> (Up to 15MB)
                  </p>
                </div>
              )}
            </div>

            {/* 7. Loading States Indicator Bar */}
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span className="flex items-center gap-2 text-[#2E7D32]">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {scanStep === 1 && 'Step 1/5: Uploading Image...'}
                    {scanStep === 2 && 'Step 2/5: Identifying Plant...'}
                    {scanStep === 3 && 'Step 3/5: Analyzing Symptoms...'}
                    {scanStep === 4 && 'Step 4/5: Generating Report...'}
                    {scanStep === 5 && 'Step 5/5: Preparing Recommendations...'}
                    {scanStep === 6 && 'Complete!'}
                  </span>
                  <span>{scanProgress}%</span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-[#2E7D32] h-full rounded-full"
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}

            {/* Error Handling Alert Box */}
            {analysisError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold font-heading">Analysis Notice</h4>
                    <p className="text-xs text-amber-800 font-sans leading-relaxed">
                      {analysisError}
                    </p>
                  </div>
                </div>
                <div className="pt-1 flex justify-end">
                  <button
                    type="button"
                    onClick={runAnalysis}
                    className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Retry Analysis
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Saved History & Sample Images Picker */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. Saved History Section */}
            {savedHistory.length > 0 && (
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md text-left space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sprout className="w-5 h-5 text-[#2E7D32]" />
                    <h3 className="text-sm font-bold text-gray-900 font-heading uppercase tracking-wider">
                      Recent Scan History ({savedHistory.length})
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-sans font-semibold">
                    Saved Locally
                  </span>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {savedHistory.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setUploadedImage(item.image);
                        setReport(item);
                        setAnalysisError(null);
                        showToast(`Opened report for ${item.cropName}`);
                      }}
                      className={`group flex items-center justify-between gap-3 p-2.5 rounded-2xl border transition-all text-left cursor-pointer ${
                        report?.id === item.id
                          ? 'border-[#2E7D32] bg-[#2E7D32]/5 shadow-xs'
                          : 'border-gray-200 hover:border-[#2E7D32]/50 hover:bg-emerald-50/40 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.cropName}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 shadow-2xs border border-gray-200"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate font-heading">
                            {item.cropName}
                          </h4>
                          <p className="text-[11px] font-semibold text-gray-600 truncate">
                            {item.issueName}
                          </p>
                          <span className="text-[10px] text-[#2E7D32] font-semibold block mt-0.5">
                            {item.confidence}% Match
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete from history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#2E7D32] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Sample Images Picker */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md text-left space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <Leaf className="w-5 h-5 text-[#2E7D32]" />
                <h3 className="text-sm font-bold text-gray-900 font-heading uppercase tracking-wider">
                  Or Select Sample Leaf Photos
                </h3>
              </div>
              <p className="text-xs text-gray-600 font-sans">
                Don't have a leaf image right now? Click any pre-loaded agricultural sample below to test the diagnostic pipeline instantly:
              </p>

              <div className="space-y-3">
                {SAMPLE_ANALYSES.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-2xl border transition-all text-left ${
                      uploadedImage === sample.image
                        ? 'border-[#2E7D32] bg-[#2E7D32]/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/80 bg-white'
                    }`}
                  >
                    <img
                      src={sample.image}
                      alt={sample.cropName}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-gray-900 font-heading truncate">
                          {sample.cropName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#2E7D32]">
                          {sample.confidence}% Score
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-gray-700 truncate mt-0.5">
                        {sample.issueName}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5 font-sans">
                        Status: {sample.status}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Empty State Before Upload */}
        {!report && !uploadedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-md text-center space-y-4"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner">
              <Sprout className="w-10 h-10 text-[#2E7D32]" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-extrabold text-gray-900 font-heading">
                No image uploaded yet
              </h3>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Upload a leaf, crop, fruit, or plant photo using the upload area above or choose a sample photo to generate a comprehensive AI health report.
              </p>
            </div>
          </motion.div>
        )}

        {/* 5. Premium AI Report Card */}
        <AnimatePresence>
          {report && (
            <motion.div
              ref={reportRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xl text-left space-y-8"
            >
              {/* Report Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32] shrink-0">
                    <Sparkles className="w-7 h-7 text-[#2E7D32]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider block">
                      AI Plant Health Assessment
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-heading">
                      {report.cropName} Crop Report
                    </h2>
                  </div>
                </div>

                {/* Overall Health Status Badges & Export Button */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Health Score Badge */}
                  <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
                    <span className="text-xs text-emerald-800 font-bold uppercase tracking-wide">Health Score:</span>
                    <span className="text-sm font-extrabold text-[#2E7D32]">
                      {report.status === 'Healthy' ? '98/100' : `${Math.max(45, 100 - (100 - report.confidence))}/100`}
                    </span>
                  </div>

                  {/* Confidence Badge */}
                  <div className="flex items-center gap-2 bg-[#F8FAF5] px-4 py-2 rounded-2xl border border-gray-200">
                    <span className="text-xs text-gray-600 font-medium">Confidence:</span>
                    <span className="text-sm font-extrabold text-[#2E7D32]">{report.confidence}%</span>
                  </div>

                  {/* Risk Badge */}
                  <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-bold ${
                    report.status === 'Healthy'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : report.confidence > 80
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-red-100 border-red-300 text-red-900'
                  }`}>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>
                      {report.status === 'Healthy' ? 'Low Risk' : report.confidence > 80 ? 'Moderate Risk' : 'High Risk'}
                    </span>
                  </div>

                  {/* Export PDF Button */}
                  <button
                    type="button"
                    onClick={handleExportPdf}
                    disabled={isExportingPdf}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#1F2937] hover:bg-black text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
                    title="Export PDF Report"
                  >
                    {isExportingPdf ? (
                      <RefreshCw className="w-3.5 h-3.5 text-[#8BC34A] animate-spin" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-[#8BC34A]" />
                    )}
                    <span>{isExportingPdf ? 'Generating PDF...' : 'Export PDF'}</span>
                  </button>

                  {/* Export Report TXT Button */}
                  <button
                    type="button"
                    onClick={handleExportReport}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#2E7D32] hover:bg-[#256628] text-white text-xs font-bold transition-all shadow-sm"
                    title="Export Report Summary TXT"
                  >
                    <Download className="w-3.5 h-3.5 text-[#8BC34A]" />
                    <span>Export TXT</span>
                  </button>

                  {/* Ask AI Assistant Button */}
                  <button
                    type="button"
                    onClick={() => {
                      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                    title="Ask AI Assistant Follow-Up Questions"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#8BC34A]" />
                    <span>Ask AI Assistant</span>
                  </button>
                </div>
              </div>

              {/* Sections 1 & 2: Plant Identification & Overall Health */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Section 1: Plant Identification */}
                <div className="bg-[#F8FAF5] p-5 rounded-2xl border border-gray-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wider block font-heading">
                    Section 1: Plant Identification
                  </span>
                  <p className="text-base font-extrabold text-gray-900 font-heading flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-[#2E7D32] shrink-0" />
                    {report.cropName}
                  </p>
                  {report.scientificName && (
                    <p className="text-xs text-gray-500 italic font-sans pl-6">
                      ({report.scientificName})
                    </p>
                  )}
                </div>

                {/* Section 2: Overall Health */}
                <div className="bg-[#F8FAF5] p-5 rounded-2xl border border-gray-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wider block font-heading">
                    Section 2: Overall Health
                  </span>
                  <div className="pt-0.5">
                    {(() => {
                      const health = report.healthStatus || (report.status === 'Healthy' ? 'Healthy' : 'Needs Attention');
                      return (
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            health === 'Healthy'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : health === 'Critical'
                              ? 'bg-red-100 text-red-800 border border-red-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              health === 'Healthy'
                                ? 'bg-emerald-600'
                                : health === 'Critical'
                                ? 'bg-red-600'
                                : 'bg-amber-600'
                            }`}
                          />
                          {health}
                        </span>
                      );
                    })()}
                  </div>
                  <p className="text-xs text-gray-500 font-sans pt-1">
                    Condition: <strong className="text-gray-800 font-semibold">{report.issueName}</strong>
                  </p>
                </div>

                {/* Confidence Level Badge */}
                <div className="bg-[#F8FAF5] p-5 rounded-2xl border border-gray-200/80 space-y-1">
                  <span className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wider block font-heading">
                    Diagnostic Certainty
                  </span>
                  <p className="text-base font-extrabold text-[#2E7D32] font-heading">
                    {report.confidenceLevel || (report.confidence >= 85 ? 'High' : 'Medium')} ({report.confidence}%)
                  </p>
                  <p className="text-xs text-gray-500 font-sans">
                    Evaluated via AI visual pattern analysis
                  </p>
                </div>
              </div>

              {/* Section 3: Possible Diagnosis */}
              <div className="space-y-3 bg-[#F8FAF5] p-5 rounded-2xl border border-gray-200/80">
                <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider flex items-center gap-2 font-heading">
                  <ShieldAlert className="w-4.5 h-4.5 text-[#2E7D32]" />
                  Section 3: Possible Diagnosis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {(report.possibleDiagnoses && report.possibleDiagnoses.length > 0
                    ? report.possibleDiagnoses
                    : [
                        { name: report.issueName, confidence: report.confidence, type: 'Primary Diagnosis' },
                        { name: 'Secondary Leaf Spot', confidence: Math.max(30, report.confidence - 23), type: 'Secondary Differential' },
                        { name: 'Nutrient/Environmental Stress', confidence: Math.max(20, report.confidence - 45), type: 'Environmental Factor' }
                      ]
                  ).map((diag, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-800">
                        <span className="truncate pr-2 font-heading">{diag.name}</span>
                        <span className="font-extrabold text-[#2E7D32] shrink-0">{diag.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#2E7D32] h-full rounded-full transition-all duration-500"
                          style={{ width: `${diag.confidence}%` }}
                        />
                      </div>
                      {diag.type && (
                        <span className="text-[10px] text-gray-400 block font-sans">
                          {diag.type}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections 4 & 5: Visible Symptoms & Diagnostic Reasoning */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Section 4: Visible Symptoms */}
                <div className="space-y-3 bg-amber-50/60 p-5 rounded-2xl border border-amber-200/80">
                  <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider flex items-center gap-2 font-heading">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    Section 4: Visible Symptoms
                  </h3>
                  {report.visibleSymptomsList && report.visibleSymptomsList.length > 0 ? (
                    <ul className="space-y-1.5">
                      {report.visibleSymptomsList.map((symp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-800 font-sans">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                          <span>{symp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
                      {report.visibleSymptoms || report.detailedAnalysis}
                    </p>
                  )}
                </div>

                {/* Section 5: Diagnostic Reasoning */}
                <div className="space-y-3 bg-blue-50/50 p-5 rounded-2xl border border-blue-200/80">
                  <h3 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-2 font-heading">
                    <Info className="w-4 h-4 text-blue-700" />
                    Section 5: Diagnostic Reasoning
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
                    {report.reasoning || 'Diagnostic symptoms correlate closely with plant tissue observation, foliage color patterns, and spatial distribution.'}
                  </p>
                  {report.possibleCauses && (
                    <p className="text-xs text-blue-900/80 pt-1 font-sans border-t border-blue-200/60">
                      <strong>Underlying Causes:</strong> {report.possibleCauses}
                    </p>
                  )}
                </div>
              </div>

              {/* Section 6: General Recommendations */}
              <div className="space-y-3 bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200/80">
                <h3 className="text-xs font-extrabold text-[#2E7D32] uppercase tracking-wider flex items-center gap-2 font-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  Section 6: General Recommendations
                </h3>
                {report.generalRecommendations && report.generalRecommendations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {report.generalRecommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 border border-emerald-200/60 text-xs sm:text-sm text-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span className="font-sans">{rec}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-800 leading-relaxed font-sans font-medium">
                    {report.suggestedAction}
                  </p>
                )}
              </div>

              {/* Section 7: Prevention Tips */}
              {report.preventativeSteps && report.preventativeSteps.length > 0 && (
                <div className="space-y-3 pt-1">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider font-heading flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#2E7D32]" />
                    Section 7: Prevention Tips
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {report.preventativeSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#F8FAF5] border border-gray-200/80 text-xs sm:text-sm text-gray-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" />
                        <span className="font-sans">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 8: When to Seek Expert Help */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="font-bold font-heading block text-amber-900">
                    Section 8: When to Seek Expert Help
                  </strong>
                  <p className="leading-relaxed font-sans text-amber-900/90">
                    {report.expertConsultation || 'If symptoms rapidly spread across more than 15-20% of your crop canopy or threaten young shoot growth, consult your local district agricultural extension officer or certified agronomist for laboratory testing.'}
                  </p>
                </div>
              </div>

              {/* Section 9: Educational Disclaimer */}
              <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-100 border border-emerald-900 text-xs sm:text-sm flex items-start gap-3 shadow-md">
                <Info className="w-5 h-5 text-[#8BC34A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="font-bold font-heading block text-[#8BC34A]">
                    Section 9: Educational Disclaimer
                  </strong>
                  <p className="leading-relaxed font-medium">
                    This AI assessment is for educational purposes and may not always be accurate. Please verify important decisions with a qualified local agricultural expert.
                  </p>
                </div>
              </div>

              {/* AI Smart Care Plan Feature */}
              <SmartCarePlan report={report} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 6. Modern AI Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-slate-800 shadow-xl text-left space-y-6"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shadow-md shadow-[#2E7D32]/20">
                <Bot className="w-6 h-6 text-[#8BC34A]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white font-heading">
                  Interactive Agronomic AI Assistant
                </h3>
                <p className="text-xs text-gray-500 dark:text-slate-400 font-sans">
                  Ask follow-up questions about irrigation, soil fertility, or organic pest control.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-[#2E7D32] dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                Live Assistant
              </span>
              {chatMessages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Clear Chat Conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Chat Messages History */}
          <div ref={chatMessagesContainerRef} className="space-y-3 min-h-48 max-h-80 overflow-y-auto pr-2">
            {chatMessages.length === 0 ? (
              <div className="text-center py-10 space-y-2 text-gray-400 dark:text-slate-500">
                <HelpCircle className="w-8 h-8 mx-auto text-gray-300 dark:text-slate-600" />
                <p className="text-sm font-medium">No messages yet. Ask a question below!</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`relative max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line group/msg ${
                      msg.sender === 'user'
                        ? 'bg-[#2E7D32] text-white rounded-tr-none shadow-xs font-sans'
                        : 'bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-slate-200 rounded-tl-none font-sans'
                    }`}
                  >
                    {msg.text}

                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-black/5 dark:border-white/10 opacity-80">
                      <span className={`text-[10px] ${msg.sender === 'user' ? 'text-emerald-100' : 'text-gray-400 dark:text-slate-400'}`}>
                        {msg.timestamp}
                      </span>

                      {/* Copy message button */}
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className={`text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                          msg.sender === 'user'
                            ? 'text-emerald-100 hover:text-white'
                            : 'text-gray-500 dark:text-slate-400 hover:text-[#2E7D32] dark:hover:text-emerald-400'
                        }`}
                        title="Copy message text"
                      >
                        {copiedMsgId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#8BC34A]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {isChatLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F8FAF5] dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#2E7D32] animate-spin" />
                  AgriCare AI is generating agronomic advice...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested Questions Chips */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider block">
              Suggested Questions
            </span>
            <div className="flex flex-wrap gap-2">
              {(report?.chatPrompts || [
                'Can this disease spread?',
                'How can I prevent it?',
                'Is fertilizer needed?',
                'Can this plant recover?'
              ]).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendChatText(prompt)}
                  disabled={isChatLoading}
                  className="px-3.5 py-1.5 rounded-full bg-[#F8FAF5] dark:bg-slate-800 hover:bg-[#2E7D32]/10 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 text-xs text-gray-700 dark:text-slate-300 hover:text-[#2E7D32] dark:hover:text-emerald-400 transition-all disabled:opacity-50 text-left"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendChatForm} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={
                report
                  ? `Ask a follow-up question about ${report.cropName}...`
                  : 'Ask AI a question about crop care or disease treatment...'
              }
              disabled={isChatLoading}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-[#F8FAF5] dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#2E7D32] focus:bg-white dark:focus:bg-slate-900 transition-all disabled:opacity-60 placeholder:text-gray-400 dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isChatLoading || !chatInput.trim()}
              className="px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm hover:bg-[#256628] transition-colors flex items-center gap-2 disabled:opacity-50 shadow-md shadow-[#2E7D32]/20"
            >
              <span>Send</span>
              <Send className="w-4 h-4 text-[#8BC34A]" />
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};
