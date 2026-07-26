export interface DiseaseInfo {
  id: string;
  name: string;
  symptoms: string[];
  causes: string;
  prevention: string[];
  organicTreatment: string;
  chemicalTreatment?: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Crop {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  growingSeason: string;
  optimalTemp: string;
  waterRequirements: string;
  soilType: string;
  fertilizerTips: string[];
  preventionTips: string[];
  commonDiseases: DiseaseInfo[];
  careTips: string[];
  harvestTime: string;
  relatedCropIds: string[];
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  iconName: 'Sparkles' | 'BookOpen' | 'ShieldAlert' | 'Bot';
  badge?: string;
  actionText: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  iconName: 'Cpu' | 'Smile' | 'GraduationCap' | 'Zap';
}

export interface AnalysisSample {
  id: string;
  cropName: string;
  scientificName?: string;
  issueName: string;
  confidence: number;
  confidenceLevel?: 'High' | 'Medium' | 'Low';
  image: string;
  status: 'Healthy' | 'Disease Detected' | 'Pest Infestation' | 'Nutrient Deficiency';
  healthStatus?: 'Healthy' | 'Needs Attention' | 'Critical';
  possibleDiagnoses?: Array<{ name: string; confidence: number; type?: string }>;
  suggestedAction: string;
  detailedAnalysis: string;
  visibleSymptoms?: string;
  visibleSymptomsList?: string[];
  reasoning?: string;
  possibleCauses?: string;
  generalRecommendations?: string[];
  preventativeSteps: string[];
  expertConsultation?: string;
  isUnclearImage?: boolean;
  disclaimer?: string;
  chatPrompts?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
