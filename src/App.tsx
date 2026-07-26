import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedCrops } from './components/FeaturedCrops';
import { AiPreviewSection } from './components/AiPreviewSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { CropDetailModal } from './components/CropDetailModal';
import { AiAnalyzerModal } from './components/AiAnalyzerModal';
import { DiseaseGuideModal } from './components/DiseaseGuideModal';
import { AiCropAnalyzerPage } from './components/AiCropAnalyzerPage';
import { CropLibraryPage } from './components/CropLibraryPage';
import { FavoriteCropsPage } from './components/FavoriteCropsPage';

import { Crop, AnalysisSample } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [analyzerModalOpen, setAnalyzerModalOpen] = useState(false);
  const [selectedSampleForAnalyzer, setSelectedSampleForAnalyzer] = useState<AnalysisSample | undefined>(undefined);
  const [diseaseGuideModalOpen, setDiseaseGuideModalOpen] = useState(false);

  // Handlers
  const handleOpenAnalyzer = (sample?: AnalysisSample) => {
    setSelectedSampleForAnalyzer(sample);
    setActiveTab('analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCrops = () => {
    setActiveTab('library');
    const libraryEl = document.getElementById('library');
    if (libraryEl) {
      libraryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDiseaseGuide = () => {
    setDiseaseGuideModalOpen(true);
  };

  const handleOpenAdvisor = () => {
    handleOpenAnalyzer();
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'diseases') {
      setDiseaseGuideModalOpen(true);
      return;
    }
    if (tabId === 'analyzer') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetEl = document.getElementById(tabId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF5] dark:bg-slate-950 text-[#1F2937] dark:text-slate-100 font-sans antialiased selection:bg-[#8BC34A]/30 selection:text-[#2E7D32] transition-colors duration-200">
      
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAnalyzer={() => handleOpenAnalyzer()}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {activeTab === 'analyzer' ? (
          <AiCropAnalyzerPage
            initialSample={selectedSampleForAnalyzer}
            onNavigateHome={() => setActiveTab('home')}
          />
        ) : activeTab === 'library' ? (
          <CropLibraryPage
            onSelectCrop={(crop) => setSelectedCrop(crop)}
            onOpenAnalyzer={() => handleOpenAnalyzer()}
          />
        ) : activeTab === 'favorites' ? (
          <FavoriteCropsPage
            onSelectCrop={(crop) => setSelectedCrop(crop)}
            onExploreCrops={handleExploreCrops}
            onOpenAnalyzer={() => handleOpenAnalyzer()}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <HeroSection
              onOpenAnalyzer={() => handleOpenAnalyzer()}
              onExploreCrops={handleExploreCrops}
            />

            {/* 2. Services Section (4 Premium Cards) */}
            <ServicesSection
              onOpenAnalyzer={() => handleOpenAnalyzer()}
              onExploreCrops={handleExploreCrops}
              onOpenDiseaseGuide={handleOpenDiseaseGuide}
              onOpenAdvisor={handleOpenAdvisor}
            />

            {/* 3. Featured Crops Section */}
            <FeaturedCrops
              onSelectCrop={(crop) => setSelectedCrop(crop)}
            />

            {/* 4. AI Preview & Interactive Upload Section */}
            <AiPreviewSection
              onOpenFullAnalyzer={(sample) => handleOpenAnalyzer(sample)}
            />

            {/* 5. Why Choose AgriCare AI */}
            <WhyChooseSection />

            {/* 6. About Mission Section */}
            <AboutSection />

            {/* 7. Contact Section */}
            <ContactSection />
          </>
        )}
      </main>

      {/* 8. Footer */}
      <Footer onNavClick={handleNavClick} />

      {/* Interactive Modals */}
      <CropDetailModal
        crop={selectedCrop}
        onClose={() => setSelectedCrop(null)}
        onSelectCrop={(crop) => setSelectedCrop(crop)}
        onOpenAnalyzerWithCrop={() => handleOpenAnalyzer()}
      />

      <AiAnalyzerModal
        isOpen={analyzerModalOpen}
        onClose={() => setAnalyzerModalOpen(false)}
        initialSample={selectedSampleForAnalyzer}
      />

      <DiseaseGuideModal
        isOpen={diseaseGuideModalOpen}
        onClose={() => setDiseaseGuideModalOpen(false)}
      />

    </div>
  );
}

