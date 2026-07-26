import { Crop, ServiceCard, FeatureCard, AnalysisSample } from '../types';

export const HERO_IMAGE = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80";
export const FARMER_PORTRAIT = "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80";

export const CROPS_DATA: Crop[] = [
  {
    id: 'wheat',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    category: 'Cereal Grain',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Essential cereal crop providing global dietary staple calories and high nutritional fiber.',
    fullDescription: 'Wheat is one of the oldest and most vital cultivated cereal crops worldwide. It thrives in temperate environments with well-drained loamy soils and requires cool weather during early growth followed by warm, dry conditions for ripening.',
    growingSeason: 'Cool / Winter or Spring',
    optimalTemp: '15°C - 24°C (59°F - 75°F)',
    waterRequirements: '350 - 500 mm per cycle',
    soilType: 'Well-drained clay loam to silt loam (pH 6.0 - 7.5)',
    harvestTime: '110 - 130 days post-sowing',
    fertilizerTips: [
      'Apply basal N-P-K (e.g. 120:60:40 kg/ha) during seedbed preparation.',
      'Split nitrogen application: 50% at sowing and 50% at first crown root initiation (CRI stage).',
      'Foliar spray of zinc sulfate (0.5%) if soil exhibits micronutrient deficiency.'
    ],
    preventionTips: [
      'Use certified rust-resistant seed varieties to prevent widespread fungal infection.',
      'Maintain balanced crop rotation with legumes like chickpeas or lentils to fix atmospheric nitrogen.',
      'Monitor fields weekly during cool humid weather for early yellow rust rust pustules.'
    ],
    relatedCropIds: ['rice', 'maize', 'potato'],
    careTips: [
      'Ensure balanced nitrogen application before tillering stage.',
      'Monitor fields for early yellow rust spots during cool humid mornings.',
      'Maintain crop rotation with legumes to prevent soil-borne pathogens.'
    ],
    commonDiseases: [
      {
        id: 'stripe-rust',
        name: 'Yellow / Stripe Rust',
        symptoms: ['Yellow linear streaks of spores along leaf veins', 'Stunted grain growth', 'Early leaf desiccation'],
        causes: 'Puccinia striiformis fungus thriving in cool, humid conditions.',
        prevention: ['Plant resistant wheat cultivars', 'Apply recommended fungicide sprays at first sign', 'Avoid excess nitrogen fertilization'],
        organicTreatment: 'Neem oil foliar sprays combined with bio-fungicides containing Bacillus subtilis.',
        severity: 'high'
      },
      {
        id: 'powdery-mildew',
        name: 'Powdery Mildew',
        symptoms: ['White or grayish powdery spots on lower leaves and stems', 'Chlorotic leaf yellowing'],
        causes: 'Blumeria graminis fungal infection promoted by dense foliage and high humidity.',
        prevention: ['Optimize seed sowing density for good air circulation', 'Rotate with non-host crops'],
        organicTreatment: 'Potassium bicarbonate solution or sulfur-based dusts.',
        severity: 'medium'
      }
    ]
  },
  {
    id: 'rice',
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: 'Cereal Grain',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'A primary food staple supporting over half the world population with rich carbohydrate energy.',
    fullDescription: 'Rice cultivation requires abundant moisture and warmth. Most global production occurs in paddy fields, requiring specialized water management and soil preparation.',
    growingSeason: 'Monsoon / Warm Season',
    optimalTemp: '20°C - 35°C (68°F - 95°F)',
    waterRequirements: '1000 - 1500 mm per cycle',
    soilType: 'Heavy clay or clay loam with high water retention (pH 5.5 - 6.5)',
    harvestTime: '90 - 150 days post-transplanting',
    fertilizerTips: [
      'Apply organic farmyard manure (FYM) or green manure prior to puddling.',
      'Apply nitrogen in 3 equal splits: basal, active tillering, and panicle initiation.',
      'Incorporate potassium chloride (MOP) to prevent stem lodging and improve grain filing.'
    ],
    preventionTips: [
      'Maintain appropriate plant spacing (20x15 cm) to prevent high humidity microclimates.',
      'Treat seeds with Trichoderma harzianum before sowing to manage seed-borne blast spores.',
      'Drain water periodically (alternate wetting and drying) to suppress root rot bacteria.'
    ],
    relatedCropIds: ['wheat', 'maize', 'tomato'],
    careTips: [
      'Maintain continuous shallow flooding (2-5 cm) during early vegetative stages.',
      'Drain fields 10-14 days prior to harvest to promote uniform grain ripening.',
      'Apply potassium fertilizers to reinforce stem strength against lodging.'
    ],
    commonDiseases: [
      {
        id: 'rice-blast',
        name: 'Rice Blast',
        symptoms: ['Spindle-shaped lesions on leaves with gray centers', 'Neck rot causing empty panicles'],
        causes: 'Magnaporthe oryzae fungus favored by warm days, cool nights, and high humidity.',
        prevention: ['Avoid excess nitrogen fertilizer', 'Keep fields flooded consistently', 'Use certified disease-free seeds'],
        organicTreatment: 'Spraying Trichoderma viride or Pseudomonas fluorescens formulations.',
        severity: 'high'
      },
      {
        id: 'bacterial-blight',
        name: 'Bacterial Leaf Blight',
        symptoms: ['Water-soaked streaks turning yellow and white from leaf tips downwards'],
        causes: 'Xanthomonas oryzae bacteria spread through wind and rain droplets.',
        prevention: ['Ensure field drainage after rainstorms', 'Use resistant hybrid varieties'],
        organicTreatment: 'Copper oxychloride applications combined with systemic bio-bactericides.',
        severity: 'high'
      }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'Fruit / Vegetable',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Versatile Solanaceae crop rich in lycopene, vitamins, and antioxidants.',
    fullDescription: 'Tomatoes are high-value warm-season vegetables grown extensively in open fields and greenhouses. They respond exceptionally well to precision drip irrigation and trellis support.',
    growingSeason: 'Spring / Summer',
    optimalTemp: '18°C - 28°C (64°F - 82°F)',
    waterRequirements: '400 - 600 mm per cycle',
    soilType: 'Deep, rich loamy soil with organic matter (pH 6.0 - 6.8)',
    harvestTime: '70 - 90 days from transplanting',
    fertilizerTips: [
      'Incorporate well-rotted compost and phosphorus-rich bone meal at planting.',
      'Side-dress with high-potassium fertilizer during flowering to boost fruit development.',
      'Apply calcium nitrate solution to eliminate blossom end rot in developing green fruits.'
    ],
    preventionTips: [
      'Mulch with clean straw or plastic sheet to reduce soil splash onto lower leaves.',
      'Stalk or trellis vines upright to maximize sunlight and canopy airflow.',
      'Avoid overhead watering; use ground drip lines to keep foliage completely dry.'
    ],
    relatedCropIds: ['potato', 'cotton', 'maize'],
    careTips: [
      'Water deeply at the root zone; avoid wetting leaves to prevent fungal spores.',
      'Prune lower suckers to improve canopy aeration and direct energy to fruit sets.',
      'Mulch soil to retain moisture and regulate root temperature.'
    ],
    commonDiseases: [
      {
        id: 'early-blight',
        name: 'Early Blight',
        symptoms: ['Concentric dark target-like spots on older leaves', 'Yellowing surrounding tissue', 'Defoliation'],
        causes: 'Alternaria solani fungal spores thriving in humid, warm microclimates.',
        prevention: ['Practice 3-year crop rotation', 'Staking plants off the ground', 'Drip irrigation instead of overhead spray'],
        organicTreatment: 'Copper fungicide or bio-agent sprays applied at first leaf symptom.',
        severity: 'medium'
      },
      {
        id: 'blossom-end-rot',
        name: 'Blossom End Rot',
        symptoms: ['Sunken dark leathery spot at the bottom end of the fruit'],
        causes: 'Calcium deficiency caused by erratic watering or fluctuating soil moisture.',
        prevention: ['Consistent deep irrigation schedules', 'Soil test and calcium nitrate soil amendments'],
        organicTreatment: 'Foliar calcium spray and consistent watering routine.',
        severity: 'low'
      }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    category: 'Tuber Crop',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'High-yield nutrient tuber serving as a major carbohydrate energy source.',
    fullDescription: 'Potatoes are cooler climate tuberous crops requiring loose, friable soils that allow unhindered tuber expansion. Earthing up soil around stems encourages tuberization and prevents greening.',
    growingSeason: 'Cool Season / Autumn or Spring',
    optimalTemp: '15°C - 20°C (59°F - 68°F)',
    waterRequirements: '500 - 700 mm per cycle',
    soilType: 'Loose, well-drained sandy loam rich in humus (pH 5.2 - 6.4)',
    harvestTime: '90 - 120 days post-planting',
    fertilizerTips: [
      'Apply nitrogen, phosphorus, and potassium in balanced ratio (1:1:1 or 1:2:2) at planting.',
      'Avoid high chloride fertilizers as they can reduce tuber dry matter content.',
      'Foliar magnesium and sulfur sprays boost tuber starch quality.'
    ],
    preventionTips: [
      'Hilling up soil around base prevents tubers from turning green and toxic in sunlight.',
      'Destroy infected volunteer plants and wild Solanaceae weeds near potato plots.',
      'Apply preventative copper spray prior to rainy spells in late blight prone areas.'
    ],
    relatedCropIds: ['tomato', 'wheat', 'cotton'],
    careTips: [
      'Perform earthing-up (hilling) 2-3 times during vegetative growth.',
      'Stop watering 2 weeks before harvest to allow skin hardening.',
      'Store harvested tubers in dark, ventilated cool rooms to prevent solanine development.'
    ],
    commonDiseases: [
      {
        id: 'late-blight',
        name: 'Potato Late Blight',
        symptoms: ['Water-soaked dark green spots turning brown on leaves', 'White fuzzy mold underneath leaves', 'Rotting tubers'],
        causes: 'Phytophthora infestans water mold spreading rapidly in cool wet weather.',
        prevention: ['Use certified disease-free seed tubers', 'Apply protective contact fungicides prior to rain events'],
        organicTreatment: 'Copper hydroxide formulations and removing infected vines immediately.',
        severity: 'high'
      }
    ]
  },
  {
    id: 'maize',
    name: 'Maize (Corn)',
    scientificName: 'Zea mays',
    category: 'Cereal Grain',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'High-biomass agricultural crop essential for grain food, livestock feed, and bio-industrial uses.',
    fullDescription: 'Maize is a C4 plant with exceptionally high photosynthesis efficiency. It requires plenty of sunlight, adequate rainfall or irrigation, and balanced soil fertility for maximum yield.',
    growingSeason: 'Warm / Spring and Summer',
    optimalTemp: '21°C - 30°C (70°F - 86°F)',
    waterRequirements: '500 - 800 mm per cycle',
    soilType: 'Deep, well-aerated fertile loams (pH 5.8 - 7.0)',
    harvestTime: '80 - 110 days for sweet corn; 120 - 140 days for dry grain',
    fertilizerTips: [
      'High nitrogen demand; apply 1/3 at planting, 1/3 at V6 knee-high stage, and 1/3 before tasseling.',
      'Apply zinc sulfate in zinc-deficient soils to prevent white bud physiological disorder.',
      'Incorporate organic manure to enhance soil water holding capacity.'
    ],
    preventionTips: [
      'Intercrop with legumes or Desmodium to naturally repel Fall Armyworm moths (Push-Pull method).',
      'Deploy pheromone traps early in the season to track pest populations.',
      'Destroy crop residues after harvest to eliminate overwintering pupae.'
    ],
    relatedCropIds: ['wheat', 'rice', 'cotton'],
    careTips: [
      'Ensure side-dressing of nitrogen at the V6 stage (knee-high stage).',
      'Maintain weed-free conditions during the first 30 days post-emergence.',
      'Monitor for Fall Armyworm caterpillars in the whorl leaves.'
    ],
    commonDiseases: [
      {
        id: 'fall-armyworm',
        name: 'Fall Armyworm / Leaf Damage',
        symptoms: ['Ragged holes in whorls and leaves', 'Frass (sawdust-like droppings) inside whorls'],
        causes: 'Spodoptera frugiperda caterpillar larvae.',
        prevention: ['Early intercropping with push-pull plants (Desmodium)', 'Pheromone traps for male moth detection'],
        organicTreatment: 'Bacillus thuringiensis (Bt) or Spinosad biological treatments.',
        severity: 'high'
      }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton',
    scientificName: 'Gossypium hirsutum',
    category: 'Fiber Crop',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Leading natural fiber crop driving global textile and oilseed agricultural economies.',
    fullDescription: 'Cotton requires long frost-free periods, plenty of sunshine, and moderate rainfall. Sunshine during boll bursting yields crisp, clean lint.',
    growingSeason: 'Warm / Summer',
    optimalTemp: '25°C - 35°C (77°F - 95°F)',
    waterRequirements: '700 - 1200 mm per cycle',
    soilType: 'Deep black cotton soils or alluvial loams (pH 6.0 - 8.0)',
    harvestTime: '150 - 180 days post-sowing',
    fertilizerTips: [
      'Apply nitrogen carefully; excessive N promotes rank vegetative growth and reduces boll retention.',
      'Apply sufficient potash to improve fiber strength and boll weight.',
      'Foliar boron sprays prevent flower dropping and poor boll development.'
    ],
    preventionTips: [
      'Install yellow sticky traps across fields to monitor and capture whiteflies early.',
      'Maintain border crops like sorghum or maize to act as natural pest barrier zones.',
      'Select certified virus-tolerant hybrids suited to your microclimate region.'
    ],
    relatedCropIds: ['tomato', 'potato', 'maize'],
    careTips: [
      'Control sucking pests early to prevent honeydew contamination on leaves.',
      'Ensure warm sunny weather during boll opening.',
      'Perform timely topping to manage plant height and maximize boll retention.'
    ],
    commonDiseases: [
      {
        id: 'cotton-leaf-curl',
        name: 'Cotton Leaf Curl Virus (CLCuV)',
        symptoms: ['Upward cupping of leaves', 'Thickened leaf veins', 'Enation (leaf-like outgrowths) under leaves'],
        causes: 'Begomovirus transmitted by the Bemisia tabaci whitefly vector.',
        prevention: ['Eradicate whitefly populations', 'Use resistant cotton hybrids', 'Remove weed hosts nearby'],
        organicTreatment: 'Yellow sticky cards and yellow insecticidal soaps or neem-oil sprays.',
        severity: 'high'
      }
    ]
  }
];

export const SERVICES_DATA: ServiceCard[] = [
  {
    id: 'ai-analysis',
    title: 'AI Plant Analysis',
    description: 'Upload plant or leaf images for instant AI-powered health assessment, disease detection, and symptom scoring.',
    iconName: 'Sparkles',
    badge: 'Core AI Feature',
    actionText: 'Try AI Analyzer'
  },
  {
    id: 'crop-library',
    title: 'Crop Library',
    description: 'Explore comprehensive agronomic guides, climate requirements, optimal soil parameters, and cultivation timelines.',
    iconName: 'BookOpen',
    actionText: 'Browse Library'
  },
  {
    id: 'disease-guide',
    title: 'Disease Guide',
    description: 'Learn to identify common crop pathogens, fungal leaf spots, viral vectors, and organic treatment strategies.',
    iconName: 'ShieldAlert',
    actionText: 'Explore Diseases'
  },
  {
    id: 'ai-advisor',
    title: 'AI Farming Advisor',
    description: 'Ask customized agronomy questions about soil nutrients, irrigation schedules, and natural pest solutions in real-time.',
    iconName: 'Bot',
    badge: 'Interactive',
    actionText: 'Ask AI Advisor'
  }
];

export const FEATURES_DATA: FeatureCard[] = [
  {
    id: 'f1',
    title: 'AI Powered',
    description: 'Trained on high-resolution agrarian imagery for high diagnostic recall across major cereal, vegetable, and fiber crops.',
    iconName: 'Cpu'
  },
  {
    id: 'f2',
    title: 'Easy To Use',
    description: 'Designed specifically for field conditions — simple drag-and-drop upload, works on mobile smartphones with zero setup.',
    iconName: 'Smile'
  },
  {
    id: 'f3',
    title: 'Educational Guidance',
    description: 'Receive step-by-step organic remedies, preventative irrigation practices, and eco-safe bio-fungicide options.',
    iconName: 'GraduationCap'
  },
  {
    id: 'f4',
    title: 'Modern Technology',
    description: 'Leverages computer vision models and generative AI to deliver instant, actionable agronomic intelligence.',
    iconName: 'Zap'
  }
];

export const SAMPLE_ANALYSES: AnalysisSample[] = [
  {
    id: 'sample-tomato-blight',
    cropName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    issueName: 'Early Blight (Alternaria solani)',
    confidence: 92,
    confidenceLevel: 'High',
    status: 'Disease Detected',
    healthStatus: 'Needs Attention',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    suggestedAction: 'Inspect surrounding leaves, remove severely infected foliage, and adjust watering to avoid wetting foliage.',
    detailedAnalysis: 'Concentric bullseye ring lesions characteristic of Early Blight fungal infection were observed. Chlorotic leaf yellowing surrounds the affected areas.',
    visibleSymptoms: 'Dark brown spots with dark concentric rings (bullseye appearance) on lower leaves with yellow halos.',
    visibleSymptomsList: [
      'Concentric dark rings with yellow halos on mature lower leaves',
      'Mild leaf cupping and lower canopy foliage chlorosis',
      'Brown necrotic spotting along leaf margins'
    ],
    reasoning: 'The target-board concentric dark ring pattern on mature leaves under high humidity is a primary diagnostic marker for Alternaria fungal lesions.',
    possibleCauses: 'Fungal spores (Alternaria solani) overwintering in crop debris, activated by warm humid weather and free moisture on leaf surface.',
    possibleDiagnoses: [
      { name: 'Early Blight (Alternaria solani)', confidence: 92, type: 'Primary Diagnosis' },
      { name: 'Septoria Leaf Spot', confidence: 64, type: 'Secondary Differential' },
      { name: 'Nitrogen Deficiency', confidence: 35, type: 'Nutrient Factor' }
    ],
    generalRecommendations: [
      'Prune infected lower leaves to reduce fungal spore pressure.',
      'Apply bio-fungicides or copper oxychloride in the early morning.',
      'Drip-irrigate at soil level to keep foliage dry.',
      'Mulch soil around stem bases to prevent spore splash from rain.'
    ],
    expertConsultation: 'If lesions spread rapidly across more than 20% of your canopy despite pruning, consult a local extension agent or crop consultant.',
    disclaimer: 'This assessment is AI-generated for educational purposes and may not always be accurate. Please verify important decisions with a qualified agricultural expert.',
    preventativeSteps: [
      'Remove lower infected leaves to break splash-dispersal cycle.',
      'Apply copper oxychloride or neem-oil spray early in the morning.',
      'Switch to ground drip irrigation rather than overhead sprinklers.',
      'Apply straw mulch around stem bases to prevent soil splash.'
    ],
    chatPrompts: [
      'Is Early Blight contagious to nearby potato plants?',
      'What organic fungicide works best for tomato early blight?',
      'How often should I water my tomatoes during blight outbreak?'
    ]
  },
  {
    id: 'sample-wheat-rust',
    cropName: 'Wheat',
    scientificName: 'Triticum aestivum',
    issueName: 'Stripe Rust (Yellow Rust)',
    confidence: 89,
    confidenceLevel: 'High',
    status: 'Disease Detected',
    healthStatus: 'Needs Attention',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    suggestedAction: 'Apply recommended bio-agent or copper spray and ensure morning moisture dissipates rapidly.',
    detailedAnalysis: 'Linear yellow pustule lines aligned along leaf veins were identified. Cold morning dew creates favorable spore germination conditions.',
    visibleSymptoms: 'Bright yellow-orange powdery pustules arranged in distinct parallel stripes along leaf veins.',
    visibleSymptomsList: [
      'Bright yellow powdery pustules arranged in linear stripes',
      'Chlorotic leaf striping along parallel leaf veins',
      'Desiccation of tip foliage on upper canopy leaves'
    ],
    reasoning: 'Yellow pustules arranged in narrow linear stripes along veins are characteristic of Puccinia striiformis fungal infection.',
    possibleCauses: 'Puccinia striiformis fungal spore germination favored by cool, moist morning microclimates and susceptible wheat varieties.',
    possibleDiagnoses: [
      { name: 'Stripe Rust (Puccinia striiformis)', confidence: 89, type: 'Primary Diagnosis' },
      { name: 'Leaf Rust (Puccinia recondita)', confidence: 58, type: 'Secondary Differential' },
      { name: 'Physiological Leaf Spot', confidence: 25, type: 'Environmental Factor' }
    ],
    generalRecommendations: [
      'Foliar spray with Trichoderma or approved bio-fungicide.',
      'Avoid high nitrogen top-dressing during active fungal outbreaks.',
      'Ensure adequate field ventilation by avoiding excessive sowing density.'
    ],
    expertConsultation: 'Seek immediate guidance from your district agronomy office if stripe rust appears before the flowering stage to prevent yield loss.',
    disclaimer: 'This assessment is AI-generated for educational purposes and may not always be accurate. Please verify important decisions with a qualified agricultural expert.',
    preventativeSteps: [
      'Spray Trichoderma or bio-fungicides on surrounding tillers.',
      'Avoid high nitrogen top-dressing during active outbreaks.',
      'Plan resistant wheat seed varieties for the upcoming sowing season.'
    ],
    chatPrompts: [
      'Will stripe rust reduce my grain weight harvest?',
      'Can wind carry rust spores to neighboring wheat fields?'
    ]
  },
  {
    id: 'sample-potato-healthy',
    cropName: 'Potato',
    scientificName: 'Solanum tuberosum',
    issueName: 'Healthy Foliage',
    confidence: 97,
    confidenceLevel: 'High',
    status: 'Healthy',
    healthStatus: 'Healthy',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    suggestedAction: 'Continue current earthing-up and deep irrigation routine. Crop shows strong photosynthetic vigor.',
    detailedAnalysis: 'Foliage exhibits deep green coloration without necrotic lesions, pest bites, or chlorosis.',
    visibleSymptoms: 'Vibrant, uniform green leaf canopy with clean leaf margins and no visible lesions or discoloration.',
    visibleSymptomsList: [
      'Uniform deep green foliage coloration',
      'Smooth leaf margins without necrotic spots or insect damage',
      'Strong erect stem structure with active apical growth'
    ],
    reasoning: 'Absence of spotting, leaf curling, or chlorotic tissue indicates optimal photosynthetic health and absence of active foliar pathogens.',
    possibleCauses: 'Optimal soil moisture, balanced nitrogen-phosphorus-potassium nutrition, and favorable weather conditions.',
    possibleDiagnoses: [
      { name: 'Healthy Foliage', confidence: 97, type: 'Primary Diagnosis' },
      { name: 'Minor Wind Abrasion', confidence: 12, type: 'Physical Observation' }
    ],
    generalRecommendations: [
      'Maintain regular drip or furrow irrigation schedule.',
      'Hilling (earthing-up) soil around stem base to shield tubers.',
      'Monitor weekly for early signs of late blight during humid weather.'
    ],
    expertConsultation: 'Consult a local agronomy expert during tuber initiation if you observe sudden leaf wilting or insect infestation.',
    disclaimer: 'This assessment is AI-generated for educational purposes and may not always be accurate. Please verify important decisions with a qualified agricultural expert.',
    preventativeSteps: [
      'Perform second earthing-up to protect developing tubers.',
      'Maintain consistent soil moisture levels to avoid tuber cracking.'
    ],
    chatPrompts: [
      'When is the optimal time to stop watering potatoes before harvest?',
      'How do I test soil moisture around tuber roots?'
    ]
  }
];
