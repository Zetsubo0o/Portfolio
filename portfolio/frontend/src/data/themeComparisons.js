/**
 * Theme Comparison Data
 * Side-by-side comparisons of all themes for decision-making
 */

export const THEME_COMPARISONS = {
  byIndustry: {
    technology: {
      name: 'Technology & SaaS',
      themes: ['emeraldModern', 'cyanTech', 'tealBalance'],
      description: 'Modern, innovative, tech-forward themes',
      traits: ['Cutting-edge', 'Professional', 'Trustworthy', 'Approachable'],
    },
    finance: {
      name: 'Finance & Banking',
      themes: ['cobaltElegance', 'indigoPremium', 'slateMinimal'],
      description: 'Professional, secure, and trustworthy themes',
      traits: ['Stable', 'Trustworthy', 'Premium', 'Corporate'],
    },
    creative: {
      name: 'Creative & Design',
      themes: ['violetCreative', 'roseElegant', 'orangeVibrant'],
      description: 'Bold, artistic, and innovative themes',
      traits: ['Creative', 'Bold', 'Artistic', 'Energetic'],
    },
    wellness: {
      name: 'Wellness & Coaching',
      themes: ['amberWarm', 'greenSustainable', 'tealBalance'],
      description: 'Warm, welcoming, and holistic themes',
      traits: ['Warm', 'Welcoming', 'Caring', 'Natural'],
    },
    luxury: {
      name: 'Luxury & Premium',
      themes: ['indigoPremium', 'roseElegant', 'cobaltElegance'],
      description: 'Sophisticated, premium, and exclusive themes',
      traits: ['Premium', 'Exclusive', 'Sophisticated', 'Luxurious'],
    },
    ecommerce: {
      name: 'E-commerce & Retail',
      themes: ['crimsonBold', 'orangeVibrant', 'emeraldModern'],
      description: 'Dynamic, energetic, and conversion-focused themes',
      traits: ['Energetic', 'Dynamic', 'Action-oriented', 'Engaging'],
    },
  },

  byPersonality: {
    modern: {
      name: 'Modern & Progressive',
      themes: ['emeraldModern', 'cyanTech', 'violetCreative'],
      description: 'Contemporary and forward-thinking',
      keywords: ['cutting-edge', 'innovative', 'fresh', 'progressive'],
    },
    professional: {
      name: 'Professional & Corporate',
      themes: ['cobaltElegance', 'slateMinimal', 'indigoPremium'],
      description: 'Serious, trustworthy, and established',
      keywords: ['stable', 'trustworthy', 'corporate', 'established'],
    },
    creative: {
      name: 'Creative & Artistic',
      themes: ['violetCreative', 'roseElegant', 'orangeVibrant'],
      description: 'Expressive, bold, and imaginative',
      keywords: ['artistic', 'expressive', 'imaginative', 'bold'],
    },
    warm: {
      name: 'Warm & Friendly',
      themes: ['amberWarm', 'greenSustainable', 'tealBalance'],
      description: 'Approachable, welcoming, and human',
      keywords: ['approachable', 'welcoming', 'friendly', 'caring'],
    },
    minimal: {
      name: 'Minimal & Clean',
      themes: ['slateMinimal', 'cyanTech', 'cobaltElegance'],
      description: 'Simple, focused, and sophisticated',
      keywords: ['clean', 'minimal', 'focused', 'sophisticated'],
    },
  },

  byAudience: {
    corporate: {
      name: 'Corporate & Enterprise',
      bestThemes: ['cobaltElegance', 'indigoPremium', 'slateMinimal'],
      description: 'For large organizations and enterprise clients',
    },
    startup: {
      name: 'Startups & Entrepreneurs',
      bestThemes: ['emeraldModern', 'crimsonBold', 'tealBalance'],
      description: 'For young, innovative, fast-growing companies',
    },
    individual: {
      name: 'Freelancers & Individuals',
      bestThemes: ['emeraldModern', 'amberWarm', 'violetCreative'],
      description: 'For personal brands and solo professionals',
    },
    luxury: {
      name: 'Luxury & High-End',
      bestThemes: ['indigoPremium', 'roseElegant', 'cobaltElegance'],
      description: 'For premium services and exclusive brands',
    },
    nonprofit: {
      name: 'Nonprofits & NGOs',
      bestThemes: ['greenSustainable', 'tealBalance', 'amberWarm'],
      description: 'For mission-driven and social impact organizations',
    },
  },

  colorTemperature: {
    warm: {
      name: 'Warm Colors',
      themes: ['amberWarm', 'orangeVibrant', 'crimsonBold'],
      description: 'Energetic, friendly, and approachable',
      palette: ['Red', 'Orange', 'Amber', 'Warm Yellows'],
    },
    cool: {
      name: 'Cool Colors',
      themes: ['cyanTech', 'cobaltElegance', 'indigoPremium'],
      description: 'Professional, calm, and trustworthy',
      palette: ['Blue', 'Cyan', 'Indigo', 'Cool Purples'],
    },
    balanced: {
      name: 'Balanced Colors',
      themes: ['emeraldModern', 'tealBalance', 'slateMinimal'],
      description: 'Versatile, professional, and appealing',
      palette: ['Green', 'Teal', 'Neutral', 'Multi-tone'],
    },
  },

  colorSaturation: {
    vibrant: {
      name: 'Vibrant & Bold',
      themes: ['violetCreative', 'orangeVibrant', 'crimsonBold'],
      description: 'High energy and strong visual impact',
      intensity: 'High',
    },
    moderate: {
      name: 'Moderate & Balanced',
      themes: ['emeraldModern', 'tealBalance', 'amberWarm'],
      description: 'Balanced energy with professional feel',
      intensity: 'Medium',
    },
    subdued: {
      name: 'Subdued & Minimal',
      themes: ['slateMinimal', 'cobaltElegance', 'indigoPremium'],
      description: 'Sophisticated and understated',
      intensity: 'Low',
    },
  },

  comparisonMatrix: {
    headers: [
      'Theme',
      'Color',
      'Saturation',
      'Energy',
      'Professionalism',
      'Creativity',
      'Trust',
      'Best For',
    ],
    rows: [
      {
        theme: 'Emerald Modern',
        color: 'Green',
        saturation: 'Moderate',
        energy: 'High',
        professionalism: 9,
        creativity: 8,
        trust: 9,
        bestFor: 'Tech, Startups',
      },
      {
        theme: 'Cobalt Elegance',
        color: 'Blue',
        saturation: 'Moderate',
        energy: 'Low',
        professionalism: 10,
        creativity: 6,
        trust: 10,
        bestFor: 'Finance, Law',
      },
      {
        theme: 'Violet Creative',
        color: 'Purple',
        saturation: 'High',
        energy: 'High',
        professionalism: 7,
        creativity: 10,
        trust: 7,
        bestFor: 'Design, Art',
      },
      {
        theme: 'Crimson Bold',
        color: 'Red',
        saturation: 'High',
        energy: 'Very High',
        professionalism: 6,
        creativity: 8,
        trust: 6,
        bestFor: 'Startups, SaaS',
      },
      {
        theme: 'Slate Minimal',
        color: 'Gray',
        saturation: 'Low',
        energy: 'Low',
        professionalism: 10,
        creativity: 5,
        trust: 9,
        bestFor: 'Consulting',
      },
      {
        theme: 'Amber Warm',
        color: 'Orange',
        saturation: 'Moderate',
        energy: 'Medium',
        professionalism: 7,
        creativity: 7,
        trust: 8,
        bestFor: 'Coaching, Wellness',
      },
      {
        theme: 'Teal Balance',
        color: 'Teal',
        saturation: 'Moderate',
        energy: 'Medium',
        professionalism: 9,
        creativity: 7,
        trust: 9,
        bestFor: 'Tech, Consulting',
      },
      {
        theme: 'Indigo Premium',
        color: 'Indigo',
        saturation: 'Moderate',
        energy: 'Low',
        professionalism: 10,
        creativity: 7,
        trust: 10,
        bestFor: 'Luxury, Finance',
      },
      {
        theme: 'Rose Elegant',
        color: 'Pink',
        saturation: 'High',
        energy: 'Medium',
        professionalism: 8,
        creativity: 9,
        trust: 8,
        bestFor: 'Fashion, Beauty',
      },
      {
        theme: 'Cyan Tech',
        color: 'Cyan',
        saturation: 'High',
        energy: 'High',
        professionalism: 8,
        creativity: 8,
        trust: 8,
        bestFor: 'Software, Tech',
      },
      {
        theme: 'Green Sustainable',
        color: 'Green',
        saturation: 'High',
        energy: 'Medium',
        professionalism: 7,
        creativity: 7,
        trust: 9,
        bestFor: 'Eco, Wellness',
      },
      {
        theme: 'Orange Vibrant',
        color: 'Orange',
        saturation: 'High',
        energy: 'Very High',
        professionalism: 6,
        creativity: 9,
        trust: 6,
        bestFor: 'E-commerce',
      },
    ],
  },

  selectionGuide: [
    {
      question: 'Do you work in tech or finance?',
      ifTech: 'Choose from: Emerald Modern, Cyan Tech, Teal Balance',
      ifFinance: 'Choose from: Cobalt Elegance, Indigo Premium, Slate Minimal',
    },
    {
      question: 'How much energy should your brand project?',
      veryHigh: 'Crimson Bold, Orange Vibrant, Violet Creative',
      medium: 'Emerald Modern, Amber Warm, Rose Elegant',
      low: 'Slate Minimal, Cobalt Elegance, Indigo Premium',
    },
    {
      question: 'What color appeals to you most?',
      green: 'Emerald Modern, Green Sustainable',
      blue: 'Cobalt Elegance, Cyan Tech, Indigo Premium',
      purple: 'Violet Creative, Indigo Premium',
      orange: 'Amber Warm, Orange Vibrant',
      red: 'Crimson Bold, Rose Elegant',
      neutral: 'Slate Minimal, Teal Balance',
    },
    {
      question: 'How would you describe your work?',
      creative: 'Violet Creative, Rose Elegant, Orange Vibrant',
      professional: 'Cobalt Elegance, Indigo Premium, Slate Minimal',
      technical: 'Cyan Tech, Emerald Modern, Teal Balance',
      caring: 'Amber Warm, Green Sustainable, Rose Elegant',
    },
  ],

  switchingRecommendations: [
    {
      from: 'Emerald Modern',
      to: ['Teal Balance', 'Cyan Tech'],
      reason: 'Similar tech-forward vibe, slightly different color',
    },
    {
      from: 'Cobalt Elegance',
      to: ['Indigo Premium', 'Slate Minimal'],
      reason: 'Similar corporate feel, different color temperature',
    },
    {
      from: 'Violet Creative',
      to: ['Rose Elegant', 'Orange Vibrant'],
      reason: 'Similar creative energy, different color palette',
    },
    {
      from: 'Crimson Bold',
      to: ['Orange Vibrant', 'Emerald Modern'],
      reason: 'Similar energetic feel, less or more bold',
    },
    {
      from: 'Slate Minimal',
      to: ['Cobalt Elegance', 'Indigo Premium'],
      reason: 'Similar minimal approach, different color',
    },
    {
      from: 'Amber Warm',
      to: ['Green Sustainable', 'Teal Balance'],
      reason: 'Similar warmth, eco-conscious feel',
    },
  ],
};

/**
 * Get theme comparison data
 */
export const getThemeComparison = (type, value) => {
  const comparisons = THEME_COMPARISONS;

  switch (type) {
    case 'industry':
      return comparisons.byIndustry[value];
    case 'personality':
      return comparisons.byPersonality[value];
    case 'audience':
      return comparisons.byAudience[value];
    case 'temperature':
      return comparisons.colorTemperature[value];
    case 'saturation':
      return comparisons.colorSaturation[value];
    default:
      return null;
  }
};

export default THEME_COMPARISONS;
