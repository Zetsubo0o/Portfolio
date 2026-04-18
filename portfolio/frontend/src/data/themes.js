/**
 * Professional Theme System for Freelance Portfolio
 * 10+ Dynamic Theme Options with Auto-Generated Color & Font Recommendations
 */

export const THEMES = {
  // 1. EMERALD MODERN - Fresh & Trustworthy
  emeraldModern: {
    id: 'emeraldModern',
    name: 'Emerald Modern',
    description: 'Fresh, clean, and trustworthy - perfect for tech consultants and designers',
    category: 'professional',
    colors: {
      surface: '#faf9f6',
      'surface-card': '#ffffff',
      'surface-muted': '#f3f2ef',
      accent: '#10b981',
      'accent-hover': '#059669',
      'accent-light': '#ecfdf5',
      'accent-secondary': '#06b6d4',
      heading: '#111111',
      body: '#4b5563',
      muted: '#9ca3af',
    },
    fonts: {
      display: 'Space Grotesk',
      body: 'Inter',
    },
    recommendation: {
      feeling: 'Modern, approachable, tech-savvy',
      bestFor: 'Tech, Design, Consulting, Startups',
    },
  },

  // 2. COBALT ELEGANCE - Premium & Corporate
  cobaltElegance: {
    id: 'cobaltElegance',
    name: 'Cobalt Elegance',
    description: 'Deep, sophisticated, and professional - ideal for enterprise and luxury services',
    category: 'corporate',
    colors: {
      surface: '#f8f7f5',
      'surface-card': '#ffffff',
      'surface-muted': '#ede9e3',
      accent: '#1e40af',
      'accent-hover': '#1e3a8a',
      'accent-light': '#eff6ff',
      'accent-secondary': '#0369a1',
      heading: '#0f172a',
      body: '#475569',
      muted: '#94a3b8',
    },
    fonts: {
      display: 'Poppins',
      body: 'Raleway',
    },
    recommendation: {
      feeling: 'Premium, trustworthy, corporate',
      bestFor: 'Finance, Law, Enterprise, Executive',
    },
  },

  // 3. VIOLET CREATIVE - Bold & Innovative
  violetCreative: {
    id: 'violetCreative',
    name: 'Violet Creative',
    description: 'Bold, creative, and forward-thinking - for designers and creatives',
    category: 'creative',
    colors: {
      surface: '#faf8ff',
      'surface-card': '#ffffff',
      'surface-muted': '#f3e8ff',
      accent: '#7c3aed',
      'accent-hover': '#6d28d9',
      'accent-light': '#f3e8ff',
      'accent-secondary': '#a78bfa',
      heading: '#1e1b4b',
      body: '#4c1d95',
      muted: '#a78bfa',
    },
    fonts: {
      display: 'Playfair Display',
      body: 'Lato',
    },
    recommendation: {
      feeling: 'Creative, bold, innovative',
      bestFor: 'Design, Creative Agencies, Artists, Photographers',
    },
  },

  // 4. CRIMSON BOLD - Energetic & Dynamic
  crimsonBold: {
    id: 'crimsonBold',
    name: 'Crimson Bold',
    description: 'Energetic and dynamic - perfect for startups and innovators',
    category: 'energetic',
    colors: {
      surface: '#fef2f2',
      'surface-card': '#ffffff',
      'surface-muted': '#fee2e2',
      accent: '#dc2626',
      'accent-hover': '#b91c1c',
      'accent-light': '#fef2f2',
      'accent-secondary': '#f97316',
      heading: '#7f1d1d',
      body: '#7c2d12',
      muted: '#fca5a5',
    },
    fonts: {
      display: 'Montserrat',
      body: 'Open Sans',
    },
    recommendation: {
      feeling: 'Energetic, bold, dynamic',
      bestFor: 'Startups, E-commerce, Marketing, SaaS',
    },
  },

  // 5. SLATE MINIMAL - Clean & Sophisticated
  slateMinimal: {
    id: 'slateMinimal',
    name: 'Slate Minimal',
    description: 'Minimalist, clean, and sophisticated - for minimalist professionals',
    category: 'minimal',
    colors: {
      surface: '#f8fafc',
      'surface-card': '#ffffff',
      'surface-muted': '#f1f5f9',
      accent: '#475569',
      'accent-hover': '#334155',
      'accent-light': '#f1f5f9',
      'accent-secondary': '#64748b',
      heading: '#0f172a',
      body: '#475569',
      muted: '#cbd5e1',
    },
    fonts: {
      display: 'IBM Plex Sans',
      body: 'Source Sans Pro',
    },
    recommendation: {
      feeling: 'Minimal, clean, sophisticated',
      bestFor: 'Consultants, Writers, Architects, Minimalists',
    },
  },

  // 6. AMBER WARM - Welcoming & Friendly
  amberWarm: {
    id: 'amberWarm',
    name: 'Amber Warm',
    description: 'Warm, welcoming, and friendly - perfect for personal brands',
    category: 'warm',
    colors: {
      surface: '#fef9f3',
      'surface-card': '#ffffff',
      'surface-muted': '#fef3c7',
      accent: '#d97706',
      'accent-hover': '#b45309',
      'accent-light': '#fffbeb',
      'accent-secondary': '#f59e0b',
      heading: '#78350f',
      body: '#92400e',
      muted: '#fbbf24',
    },
    fonts: {
      display: 'Merriweather',
      body: 'Poppins',
    },
    recommendation: {
      feeling: 'Warm, welcoming, approachable',
      bestFor: 'Coaching, Wellness, Education, Personal Brands',
    },
  },

  // 7. TEAL BALANCE - Balanced & Professional
  tealBalance: {
    id: 'tealBalance',
    name: 'Teal Balance',
    description: 'Balanced and professional - versatile for any industry',
    category: 'balanced',
    colors: {
      surface: '#f0fdfa',
      'surface-card': '#ffffff',
      'surface-muted': '#ccfbf1',
      accent: '#14b8a6',
      'accent-hover': '#0d9488',
      'accent-light': '#f0fdfa',
      'accent-secondary': '#06b6d4',
      heading: '#0f766e',
      body: '#2d6a6b',
      muted: '#99f6e4',
    },
    fonts: {
      display: 'Quicksand',
      body: 'Nunito',
    },
    recommendation: {
      feeling: 'Balanced, professional, modern',
      bestFor: 'Tech, Startups, SaaS, Consultants',
    },
  },

  // 8. INDIGO PREMIUM - Luxury & Professional
  indigoPremium: {
    id: 'indigoPremium',
    name: 'Indigo Premium',
    description: 'Luxurious and premium - for high-end services and brands',
    category: 'luxury',
    colors: {
      surface: '#f0f4ff',
      'surface-card': '#ffffff',
      'surface-muted': '#e0e7ff',
      accent: '#4f46e5',
      'accent-hover': '#4338ca',
      'accent-light': '#e0e7ff',
      'accent-secondary': '#6366f1',
      heading: '#1e1b4b',
      body: '#3730a3',
      muted: '#a5b4fc',
    },
    fonts: {
      display: 'Cormorant Garamond',
      body: 'Lora',
    },
    recommendation: {
      feeling: 'Premium, luxurious, professional',
      bestFor: 'Luxury, Finance, Executive, Premium Services',
    },
  },

  // 9. ROSE ELEGANT - Refined & Sophisticated
  roseElegant: {
    id: 'roseElegant',
    name: 'Rose Elegant',
    description: 'Refined and sophisticated - for elegant, high-touch services',
    category: 'elegant',
    colors: {
      surface: '#fff7ed',
      'surface-card': '#ffffff',
      'surface-muted': '#fbebdc',
      accent: '#be185d',
      'accent-hover': '#9d174d',
      'accent-light': '#ffe4e6',
      'accent-secondary': '#fb7185',
      heading: '#500724',
      body: '#831843',
      muted: '#fbcfe8',
    },
    fonts: {
      display: 'Playfair Display',
      body: 'Crimson Text',
    },
    recommendation: {
      feeling: 'Elegant, refined, sophisticated',
      bestFor: 'Fashion, Beauty, Luxury, Creative Services',
    },
  },

  // 10. CYAN TECH - Modern & Technical
  cyanTech: {
    id: 'cyanTech',
    name: 'Cyan Tech',
    description: 'Modern and technical - perfect for software engineers and tech leaders',
    category: 'technical',
    colors: {
      surface: '#ecf9ff',
      'surface-card': '#ffffff',
      'surface-muted': '#cffafe',
      accent: '#0891b2',
      'accent-hover': '#0e7490',
      'accent-light': '#ecf9ff',
      'accent-secondary': '#06b6d4',
      heading: '#082f49',
      body: '#164e63',
      muted: '#67e8f9',
    },
    fonts: {
      display: 'JetBrains Mono',
      body: 'Roboto',
    },
    recommendation: {
      feeling: 'Modern, technical, cutting-edge',
      bestFor: 'Software, Engineering, Tech, Development',
    },
  },

  // 11. GREEN SUSTAINABLE - Natural & Eco-Conscious
  greenSustainable: {
    id: 'greenSustainable',
    name: 'Green Sustainable',
    description: 'Natural and eco-conscious - for sustainable and green businesses',
    category: 'eco',
    colors: {
      surface: '#f0fdf4',
      'surface-card': '#ffffff',
      'surface-muted': '#dcfce7',
      accent: '#22c55e',
      'accent-hover': '#16a34a',
      'accent-light': '#f0fdf4',
      'accent-secondary': '#84cc16',
      heading: '#15803d',
      body: '#3f6319',
      muted: '#bbf7d0',
    },
    fonts: {
      display: 'Comfortaa',
      body: 'Ubuntu',
    },
    recommendation: {
      feeling: 'Natural, eco-conscious, sustainable',
      bestFor: 'Sustainability, Environment, Wellness, NGOs',
    },
  },

  // 12. ORANGE VIBRANT - Dynamic & Energetic
  orangeVibrant: {
    id: 'orangeVibrant',
    name: 'Orange Vibrant',
    description: 'Vibrant and energetic - for bold and adventurous brands',
    category: 'energetic',
    colors: {
      surface: '#fff7ed',
      'surface-card': '#ffffff',
      'surface-muted': '#fed7aa',
      accent: '#ea580c',
      'accent-hover': '#c2410c',
      'accent-light': '#fff7ed',
      'accent-secondary': '#f97316',
      heading: '#7c2d12',
      body: '#9a3412',
      muted: '#fdba74',
    },
    fonts: {
      display: 'Bebas Neue',
      body: 'Oxygen',
    },
    recommendation: {
      feeling: 'Vibrant, energetic, bold',
      bestFor: 'E-commerce, Marketing, Events, Creative Agencies',
    },
  },
};

/**
 * Dynamic Font Pairing Recommendations
 * Based on theme selection, automatically suggest complementary fonts
 */
export const FONT_PAIRINGS = {
  modern: {
    display: ['Space Grotesk', 'Inter', 'Poppins'],
    body: ['Inter', 'Roboto', 'Raleway'],
  },
  corporate: {
    display: ['Poppins', 'IBM Plex Sans', 'Montserrat'],
    body: ['Raleway', 'Source Sans Pro', 'Open Sans'],
  },
  creative: {
    display: ['Playfair Display', 'Merriweather', 'Cormorant Garamond'],
    body: ['Lato', 'Crimson Text', 'Lora'],
  },
  minimal: {
    display: ['IBM Plex Sans', 'Inter', 'Space Grotesk'],
    body: ['Source Sans Pro', 'Roboto', 'Raleway'],
  },
  luxury: {
    display: ['Cormorant Garamond', 'Playfair Display', 'Merriweather'],
    body: ['Lora', 'Crimson Text', 'Georgia'],
  },
  technical: {
    display: ['JetBrains Mono', 'IBM Plex Sans', 'Roboto Mono'],
    body: ['Roboto', 'Source Sans Pro', 'Inter'],
  },
};

/**
 * Color Harmony Suggestions
 * When user selects a theme, suggest complementary accent colors
 */
export const COLOR_HARMONIES = {
  emeraldModern: {
    primary: '#10b981',
    complementary: '#f59e0b',
    accent2: '#06b6d4',
    accent3: '#8b5cf6',
  },
  cobaltElegance: {
    primary: '#1e40af',
    complementary: '#dc2626',
    accent2: '#0369a1',
    accent3: '#7c3aed',
  },
  violetCreative: {
    primary: '#7c3aed',
    complementary: '#f97316',
    accent2: '#a78bfa',
    accent3: '#06b6d4',
  },
  crimsonBold: {
    primary: '#dc2626',
    complementary: '#10b981',
    accent2: '#f97316',
    accent3: '#06b6d4',
  },
  slateMinimal: {
    primary: '#475569',
    complementary: '#64748b',
    accent2: '#334155',
    accent3: '#0f172a',
  },
  amberWarm: {
    primary: '#d97706',
    complementary: '#8b5cf6',
    accent2: '#f59e0b',
    accent3: '#06b6d4',
  },
  tealBalance: {
    primary: '#14b8a6',
    complementary: '#f59e0b',
    accent2: '#06b6d4',
    accent3: '#8b5cf6',
  },
  indigoPremium: {
    primary: '#4f46e5',
    complementary: '#dc2626',
    accent2: '#6366f1',
    accent3: '#a5b4fc',
  },
  roseElegant: {
    primary: '#be185d',
    complementary: '#10b981',
    accent2: '#fb7185',
    accent3: '#8b5cf6',
  },
  cyanTech: {
    primary: '#0891b2',
    complementary: '#f97316',
    accent2: '#06b6d4',
    accent3: '#0e7490',
  },
  greenSustainable: {
    primary: '#22c55e',
    complementary: '#f97316',
    accent2: '#84cc16',
    accent3: '#06b6d4',
  },
  orangeVibrant: {
    primary: '#ea580c',
    complementary: '#0891b2',
    accent2: '#f97316',
    accent3: '#22c55e',
  },
};

/**
 * Get automatic recommendations based on theme selection
 */
export const getThemeRecommendations = (themeId) => {
  const theme = THEMES[themeId];
  if (!theme) return null;

  const categoryType = theme.category;
  const harmony = COLOR_HARMONIES[themeId];

  // Determine font pairing category
  let fontCategory = 'modern';
  if (categoryType === 'corporate' || categoryType === 'luxury') fontCategory = 'corporate';
  if (categoryType === 'creative' || categoryType === 'elegant') fontCategory = 'creative';
  if (categoryType === 'minimal') fontCategory = 'minimal';
  if (categoryType === 'technical') fontCategory = 'technical';

  const fontPairings = FONT_PAIRINGS[fontCategory];

  return {
    theme,
    harmony,
    suggestedFonts: fontPairings,
    recommendation: {
      ...theme.recommendation,
      colors: harmony,
      primaryColor: theme.colors.accent,
      secondaryColor: harmony.accent2,
      tertiaryColor: harmony.accent3,
    },
  };
};

export default THEMES;
