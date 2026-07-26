import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '../data/translations';

type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  favorites: string[];
  toggleFavorite: (cropId: string) => void;
  isFavorite: (cropId: string) => boolean;
  t: (key: keyof typeof translations['en']) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('agricare_language');
      return (saved === 'ur' || saved === 'en') ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('agricare_language', lang);
    } catch (e) {
      console.error('Failed to save language setting:', e);
    }
  };

  // 2. Theme state
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('agricare_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('agricare_theme', theme);
    } catch (e) {
      console.error('Failed to save theme setting:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('agricare_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (cropId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(cropId)
        ? prev.filter((id) => id !== cropId)
        : [...prev, cropId];
      try {
        localStorage.setItem('agricare_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save favorites:', e);
      }
      return updated;
    });
  };

  const isFavorite = (cropId: string) => favorites.includes(cropId);

  // Translation helper
  const t = (key: keyof typeof translations['en']): string => {
    const dict = translations[language] || translations['en'];
    return dict[key] || translations['en'][key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        toggleTheme,
        favorites,
        toggleFavorite,
        isFavorite,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
