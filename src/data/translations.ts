export type Language = 'en' | 'ur';

export const translations = {
  en: {
    // Navigation
    navHome: 'Home',
    navLibrary: 'Crop Library',
    navVision: 'AI Vision',
    navAnalyze: 'Analyze Plant',
    tagline: 'Grow Smarter with AI',
    
    // Hero
    heroBadge: 'Next-Gen Agricultural Intelligence',
    heroTitle: 'Smart Farming Starts with',
    heroTitleHighlight: 'Smart AI Decisions',
    heroSubtitle: 'Detect crop diseases, analyze foliar health, and receive expert agronomic recommendations in seconds using advanced computer vision.',
    startScan: 'Start AI Crop Scan',
    exploreLibrary: 'Explore Crop Library',
    statsAnalyzed: 'Plants Analyzed',
    statsSatisfaction: 'User Satisfaction',
    statsGuides: 'Crop Guides',
    statsAssistant: 'AI Assistant',

    // Services
    servicesTitle: 'Comprehensive AI Agronomy Tools',
    servicesSubtitle: 'Empowering farmers, researchers, and agronomists with precision intelligence.',

    // Crops
    featuredTitle: 'Featured Agricultural Crops',
    featuredSubtitle: 'Select a crop to explore disease guides, optimal growth conditions, and care practices.',
    searchPlaceholder: 'Search crops by name, scientific name, or disease...',
    allCategories: 'All Categories',
    favoritesOnly: 'Favorite Crops',
    quickView: 'Quick View',
    noCropsFound: 'No crops found matching your search criteria.',
    clearSearch: 'Clear Search',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',

    // AI Scanner
    scannerTitle: 'AI Crop Diagnostics',
    scannerSubtitle: 'Upload a leaf photo or pick a sample image below for instantaneous diagnostic analysis.',
    uploadBoxTitle: 'Drop plant image here or click to upload',
    uploadBoxSubtitle: 'Supports JPG, PNG, WEBP (Max 10MB)',
    selectSampleText: 'Or select a sample crop photo:',
    analyzing: 'Analyzing plant image...',
    invalidImageError: 'No plant detected or image is unclear. Please upload a clear photo showing leaf or plant symptoms.',
    recentScans: 'Recent Scan History',
    noHistory: 'No saved scans yet.',
    exportPdf: 'Print / Export PDF',
    exportTxt: 'Export TXT',
    healthScore: 'Health Score',
    confidence: 'Confidence',
    riskLevel: 'Risk Level',
    plantInfo: 'Plant Identification',
    symptoms: 'Visible Symptoms',
    reasoning: 'AI Reasoning',
    recommendations: 'Recommendations',
    prevention: 'Prevention Tips',
    disclaimer: 'Disclaimer: AI-generated assessment for educational purposes. Verify important decisions with a qualified agronomist.',
    possibleDiseases: 'Possible Diseases',

    // Chat
    liveAssistant: 'Live Assistant',
    clearChat: 'Clear Chat',
    askPlaceholder: 'Ask a follow-up question about treatment, fertilizer, or soil...',
    send: 'Send',
    copy: 'Copy',
    copied: 'Copied!',

    // General
    close: 'Close',
    viewDetails: 'View Details',
    darkTheme: 'Dark Mode',
    lightTheme: 'Light Mode',
    language: 'Language',
  },
  ur: {
    // Navigation
    navHome: 'صفحہ اول',
    navLibrary: 'فصلوں کی لائبریری',
    navVision: 'مصنوعی ذہانت وژن',
    navAnalyze: 'پودے کا جائزہ لیں',
    tagline: 'مصنوعی ذہانت کے ساتھ بہتر کاشتکاری',
    
    // Hero
    heroBadge: 'جدید ترین زرعی ذہانت',
    heroTitle: 'سمارٹ فارمنگ کا آغاز',
    heroTitleHighlight: 'سمارٹ فیصلوں سے ہوتا ہے',
    heroSubtitle: 'کمپیوٹر وژن کے ذریعے فصلوں کی بیماریوں کا پتہ لگائیں، پتوں کی صحت کا جائزہ لیں اور چند سیکنڈ میں زرعی سفارشات حاصل کریں۔',
    startScan: 'اے آئی اسکین شروع کریں',
    exploreLibrary: 'فصلوں کی لائبریری دیکھیں',
    statsAnalyzed: 'تجزیہ شدہ پودے',
    statsSatisfaction: 'صارفین کا اطمینان',
    statsGuides: 'فصلوں کی رہنمائی',
    statsAssistant: 'اے آئی اسسٹنٹ',

    // Services
    servicesTitle: 'جامع زرعی ایگری سائنس ٹولز',
    servicesSubtitle: 'کسانوں اور زراعت کے ماہرین کو جدید ترین معلومات سے بااختیار بنانا۔',

    // Crops
    featuredTitle: 'اہم زرعی فصلیں',
    featuredSubtitle: 'بیماریوں کے رہنما، بہتر نشوونما کے حالات اور دیکھ بھال کے طریقوں کے لیے فصل کا انتخاب کریں۔',
    searchPlaceholder: 'فصل کے نام یا بیماری کے ذریعے تلاش کریں...',
    allCategories: 'تمام اقسام',
    favoritesOnly: 'پسندیدہ فصلیں',
    quickView: 'فوری جائزہ',
    noCropsFound: 'آپ کی تلاش کے مطابق کوئی فصل نہیں ملی۔',
    clearSearch: 'تلاش صاف کریں',
    addToFavorites: 'پسندیدہ میں شامل کریں',
    removeFromFavorites: 'پسندیدہ سے ہٹائیں',

    // AI Scanner
    scannerTitle: 'اے آئی فصل تشخیصی مرکز',
    scannerSubtitle: 'فوری تشخیصی تجزیہ کے لیے پودے کے پتے کی تصویر اپ لوڈ کریں یا نمونہ منتخب کریں۔',
    uploadBoxTitle: 'تصویر یہاں ڈراپ کریں یا اپ لوڈ کے لیے کلک کریں',
    uploadBoxSubtitle: 'فرمیٹ: JPG, PNG, WEBP (زیادہ سے زیادہ 10MB)',
    selectSampleText: 'یا نمونہ تصویر کا انتخاب کریں:',
    analyzing: 'پودے کا جائزہ لیا جا رہا ہے...',
    invalidImageError: 'تصویر واضح نہیں ہے یا پودا ظاہر نہیں ہو رہا۔ براہ کرم پودے کی واضح تصویر اپ لوڈ کریں۔',
    recentScans: 'حالیہ اسکین ہسٹری',
    noHistory: 'ابھی تک کوئی اسکین محفوظ نہیں ہوا۔',
    exportPdf: 'پی ڈی ایف پرنٹ / برآمد',
    exportTxt: 'ٹیکسٹ برآمد',
    healthScore: 'صحت کا اسکور',
    confidence: 'اعتماد کا درجہ',
    riskLevel: 'خطرہ کی سطح',
    plantInfo: 'پودے کی شناخت',
    symptoms: 'ظاہری علامات',
    reasoning: 'اے آئی تجزیہ کی وجہ',
    recommendations: 'تجویز کردہ اقدامات',
    prevention: 'احتیاطی تدابیر',
    disclaimer: 'تنبیہ: یہ معلومات صرف تعلیمی مقصد کے لیے ہیں۔ اہم فیصلوں کے لیے زرعی ماہر سے رجوع کریں۔',
    possibleDiseases: 'ممکنہ بیماریاں',

    // Chat
    liveAssistant: 'لائیو اسسٹنٹ',
    clearChat: 'چَیٹ صاف کریں',
    askPlaceholder: 'علاج، کھاد یا مٹی کے بارے میں سوال پوچھیں...',
    send: 'بھیجیں',
    copy: 'کپی کریں',
    copied: 'کپی ہو گیا!',

    // General
    close: 'بند کریں',
    viewDetails: 'تفصیلات دیکھیں',
    darkTheme: 'ڈارک موڈ',
    lightTheme: 'لائٹ موڈ',
    language: 'زبان',
  }
};
