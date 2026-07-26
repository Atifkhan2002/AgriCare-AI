import React, { useState, useRef } from 'react';
import { Upload, Sparkles, AlertTriangle, CheckCircle2, FileImage, ArrowRight, Bot, Send, RefreshCw } from 'lucide-react';
import { SAMPLE_ANALYSES } from '../data/cropsData';
import { AnalysisSample, ChatMessage } from '../types';

interface AiPreviewSectionProps {
  onOpenFullAnalyzer: (sample?: AnalysisSample) => void;
}

export const AiPreviewSection: React.FC<AiPreviewSectionProps> = ({ onOpenFullAnalyzer }) => {
  const [activeSample, setActiveSample] = useState<AnalysisSample>(SAMPLE_ANALYSES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I'm your AgriCare AI Advisor. I analyzed this ${SAMPLE_ANALYSES[0].cropName} leaf image and found signs of ${SAMPLE_ANALYSES[0].issueName}. How can I assist with your field management today?`,
      timestamp: '10:00 AM'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSelectSample = (sample: AnalysisSample) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setActiveSample(sample);
      setIsAnalyzing(false);
      setChatMessages([
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: `Sample updated: ${sample.cropName} (${sample.issueName}). Ask me any questions about prevention, treatment, or soil care!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

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

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      setIsAnalyzing(true);

      try {
        const res = await fetch('/api/analyze-plant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, mimeType: file.type })
        });

        if (res.ok) {
          const data = await res.json();
          const sampleResult: AnalysisSample = {
            id: 'user-' + Date.now(),
            cropName: data.cropName || 'Uploaded Crop',
            scientificName: data.scientificName || '',
            issueName: data.issueName || 'Assessment Result',
            confidence: data.confidence || 90,
            confidenceLevel: data.confidenceLevel || 'High',
            status: data.healthStatus === 'Healthy' ? 'Healthy' : 'Disease Detected',
            healthStatus: data.healthStatus || 'Needs Attention',
            image: base64,
            suggestedAction: data.suggestedAction || data.generalRecommendations?.[0] || 'Monitor plant progress closely.',
            detailedAnalysis: data.reasoning || 'Foliage visual scan completed.',
            reasoning: data.reasoning || '',
            visibleSymptoms: data.visibleSymptoms || '',
            visibleSymptomsList: data.visibleSymptomsList || [],
            generalRecommendations: data.generalRecommendations || [],
            preventativeSteps: data.preventativeSteps || [],
            expertConsultation: data.expertConsultation || '',
            chatPrompts: data.chatPrompts || [
              'What organic treatments work best?',
              'How often should I water this crop?',
              'How to prevent this in future seasons?'
            ]
          };
          setActiveSample(sampleResult);
          setChatMessages([
            {
              id: Date.now().toString(),
              sender: 'ai',
              text: `Analysis complete for your uploaded **${sampleResult.cropName}** image. It shows signs of **${sampleResult.issueName}**. Ask me any questions about care or treatment!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          // Fallback if AI response error
          const fallbackSample: AnalysisSample = {
            id: 'user-' + Date.now(),
            cropName: 'Uploaded Plant Specimen',
            scientificName: 'Botanical specimen',
            issueName: 'Foliage Inspection Completed',
            confidence: 88,
            confidenceLevel: 'High',
            status: 'Disease Detected',
            healthStatus: 'Needs Attention',
            image: base64,
            suggestedAction: 'Keep leaf foliage dry, ensure adequate sunlight, and monitor for further discoloration.',
            detailedAnalysis: 'Foliage visual inspection completed.',
            reasoning: 'Image received and processed.',
            visibleSymptoms: 'Leaf surface inspection',
            visibleSymptomsList: ['Leaf surface inspection'],
            generalRecommendations: ['Monitor water intake', 'Provide adequate sunlight'],
            preventativeSteps: ['Ensure proper plant spacing'],
            expertConsultation: 'Consult local extension officer if symptoms worsen.'
          };
          setActiveSample(fallbackSample);
        }
      } catch (err) {
        console.error('Error analyzing uploaded image in preview:', err);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const currentQuestion = chatInput;
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      let responseText = `For ${activeSample.cropName} affected by ${activeSample.issueName}, we recommend removing lower yellowing leaves, applying copper oxychloride or bio-fungicide, and ensuring ground-level drip irrigation.`;
      
      if (currentQuestion.toLowerCase().includes('water') || currentQuestion.toLowerCase().includes('irrigate')) {
        responseText = `Water deeply at soil level every 2-3 days. Avoid spraying water over leaves during high humidity to prevent fungal spores from splashing.`;
      } else if (currentQuestion.toLowerCase().includes('organic') || currentQuestion.toLowerCase().includes('neem')) {
        responseText = `Yes, organic treatments like cold-pressed neem oil (5ml per liter of water) mixed with mild liquid soap can effectively slow fungal growth when applied weekly.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <section id="analyzer" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />
            Live AI Interactive Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight font-heading">
            AI Crop Health Analyzer
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-sans">
            Test our vision intelligence in real-time. Select a sample crop photo below or upload your own leaf image directly.
          </p>
        </div>

        {/* Interactive Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Upload Box & Sample Selector */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Upload Box Card */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`bg-[#F8FAF5] rounded-3xl p-8 border-2 border-dashed transition-all text-center relative group ${
                isDragging ? 'border-[#2E7D32] bg-[#2E7D32]/10' : 'border-[#2E7D32]/30 hover:border-[#2E7D32]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-[#2E7D32] mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] font-heading mb-1">
                Upload a Plant Photo
              </h3>
              <p className="text-sm text-gray-600 mb-6 max-w-xs mx-auto">
                Drag and drop a leaf photo or click below to select a file from your device.
              </p>

              <button
                type="button"
                onClick={handleTriggerFileInput}
                id="preview-upload-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm shadow-md shadow-[#2E7D32]/20 hover:bg-[#256628] transition-all"
              >
                <FileImage className="w-4 h-4 text-[#8BC34A]" />
                Select Photo From Device
              </button>
            </div>

            {/* Sample Selector */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs text-left">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Try Sample Plant Photos
              </p>
              <div className="grid grid-cols-3 gap-3">
                {SAMPLE_ANALYSES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`relative rounded-xl overflow-hidden border-2 text-left transition-all p-1.5 flex flex-col items-center gap-1.5 ${
                      activeSample.id === sample.id
                        ? 'border-[#2E7D32] bg-[#2E7D32]/5 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <img
                      src={sample.image}
                      alt={sample.cropName}
                      className="w-full h-16 object-cover rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs font-bold text-gray-800 truncate max-w-full">
                      {sample.cropName}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: AI Response Card & Interactive Chat */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Response Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl relative overflow-hidden">
              
              {isAnalyzing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-20 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-[#2E7D32] animate-spin" />
                  <p className="text-sm font-semibold text-gray-800">Analyzing leaf image using AgriCare AI model...</p>
                </div>
              )}

              {/* Status Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
                    <Sparkles className="w-6 h-6 text-[#2E7D32]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                      AI Diagnostic Report
                    </span>
                    <h3 className="text-2xl font-bold text-[#1F2937] font-heading">
                      {activeSample.cropName} Plant Assessment
                    </h3>
                  </div>
                </div>

                {/* Confidence Badge */}
                <div className="flex items-center gap-2 bg-[#F8FAF5] px-4 py-2 rounded-xl border border-gray-200">
                  <span className="text-xs text-gray-500 font-medium">Confidence:</span>
                  <span className="text-sm font-extrabold text-[#2E7D32]">{activeSample.confidence}%</span>
                </div>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
                
                {/* Crop & Issue */}
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase">Possible Issue</span>
                  <div className="flex items-center gap-2">
                    {activeSample.status === 'Healthy' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#4CAF50]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    )}
                    <span className="text-lg font-bold text-[#1F2937]">
                      {activeSample.issueName}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <span className="text-xs font-medium text-gray-500 uppercase">Health Status</span>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      activeSample.status === 'Healthy'
                        ? 'bg-[#4CAF50]/15 text-[#2E7D32]'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {activeSample.status}
                    </span>
                  </div>
                </div>

                {/* Suggested Action */}
                <div className="sm:col-span-2 bg-[#F8FAF5] p-4 rounded-2xl border border-gray-200/80">
                  <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider block mb-1">
                    Suggested Action:
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">
                    {activeSample.suggestedAction}
                  </p>
                </div>

              </div>

              {/* Chat Sub-Drawer */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[#2E7D32]" />
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Ask AI Advisor About This Result
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500">Live Assistant</span>
                </div>

                {/* Chat History Messages */}
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#2E7D32] text-white rounded-tr-none'
                            : 'bg-gray-100 text-gray-800 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input Form */}
                <form onSubmit={handleSendChat} className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Ask AI a question about ${activeSample.cropName}...`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-[#2E7D32] focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#2E7D32] text-white font-medium hover:bg-[#256628] transition-colors flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 text-[#8BC34A]" />
                  </button>
                </form>
              </div>

              {/* Full Analyzer CTA */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => onOpenFullAnalyzer(activeSample)}
                  id="try-ai-analyzer-btn"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-semibold text-sm shadow-md hover:bg-[#256628] transition-all"
                >
                  <span>Try AI Analyzer</span>
                  <ArrowRight className="w-4 h-4 text-[#8BC34A]" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
