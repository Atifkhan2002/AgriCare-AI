import React, { useState, useEffect } from 'react';
import { Sprout, Menu, X, Sparkles, BookOpen, Sun, Moon, Globe, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAnalyzer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAnalyzer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme, t } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Sprout },
    { id: 'library', label: t('navLibrary'), icon: BookOpen },
    { id: 'analyzer', label: t('navVision'), icon: Sparkles },
    { id: 'favorites', label: t('favoriteCropsTitle'), icon: Heart },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3 border-b border-gray-100 dark:border-slate-800'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            id="nav-logo-button"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md shadow-[#2E7D32]/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-[#8BC34A]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-[#1F2937] dark:text-white block font-heading">
                AgriCare <span className="text-[#2E7D32] dark:text-[#4CAF50]">AI</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#4CAF50] dark:text-[#8BC34A] tracking-wider block -mt-1">
                {t('tagline')}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-200/80 dark:border-slate-700 shadow-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#2E7D32] text-white shadow-xs'
                      : 'text-gray-600 dark:text-slate-300 hover:text-[#2E7D32] dark:hover:text-[#4CAF50] hover:bg-gray-100/70 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#8BC34A]' : 'text-gray-400 dark:text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Top Right Controls & Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-full border border-gray-200 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'ur'
                    ? 'bg-[#2E7D32] text-white shadow-xs'
                    : 'text-gray-600 dark:text-slate-300 hover:text-gray-900'
                }`}
              >
                اردو
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
              title={theme === 'light' ? t('darkTheme') : t('lightTheme')}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <button
              onClick={onOpenAnalyzer}
              id="nav-analyze-plant-btn"
              className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2E7D32] text-white font-medium text-sm shadow-md shadow-[#2E7D32]/25 hover:bg-[#256628] active:scale-98 transition-all overflow-hidden"
            >
              <Sparkles className="w-4 h-4 text-[#8BC34A] animate-pulse" />
              <span>{t('navAnalyze')}</span>
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-xs font-bold text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-700 flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-[#2E7D32]" />
              {language === 'en' ? 'UR' : 'EN'}
            </button>

            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-400 border border-gray-200 dark:border-slate-700"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenAnalyzer}
              className="p-2 rounded-lg bg-[#2E7D32] text-white text-xs font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8BC34A]" />
              {t('navAnalyze')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-sm transition-colors ${
                    isActive
                      ? 'bg-[#2E7D32] text-white'
                      : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#8BC34A]' : 'text-gray-400 dark:text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAnalyzer();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E7D32] text-white font-medium text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4 text-[#8BC34A]" />
                {t('navAnalyze')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

