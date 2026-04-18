import { useState, useEffect } from 'react';
import { THEMES, getThemeRecommendations } from '../data/themes';

/**
 * Custom Hook for Theme Management
 * Handles theme selection, persistence, and dynamic color/font application
 */
export const useTheme = (defaultTheme = 'emeraldModern') => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Try to get theme from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      return saved || defaultTheme;
    }
    return defaultTheme;
  });

  const [themeData, setThemeData] = useState(() => {
    return THEMES[currentTheme];
  });

  const [recommendations, setRecommendations] = useState(() => {
    return getThemeRecommendations(currentTheme);
  });

  // Update theme
  const switchTheme = (themeId) => {
    if (!THEMES[themeId]) {
      console.warn(`Theme "${themeId}" not found`);
      return;
    }

    setCurrentTheme(themeId);
    setThemeData(THEMES[themeId]);
    setRecommendations(getThemeRecommendations(themeId));

    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-theme', themeId);
    }

    // Apply CSS variables for dynamic theming
    applyThemeToDOM(THEMES[themeId]);
  };

  // Apply theme to DOM using CSS variables
  const applyThemeToDOM = (theme) => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Store fonts as data attributes
    root.setAttribute('data-font-display', theme.fonts.display);
    root.setAttribute('data-font-body', theme.fonts.body);
  };

  // Apply theme on mount
  useEffect(() => {
    applyThemeToDOM(themeData);
  }, [themeData]);

  // Persist theme on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-theme', currentTheme);
      }
    };
  }, [currentTheme]);

  return {
    currentTheme,
    themeData,
    recommendations,
    switchTheme,
    allThemes: THEMES,
    getThemeRecommendations: (themeId) => getThemeRecommendations(themeId),
  };
};

/**
 * Hook to apply theme colors to specific elements
 */
export const useThemeColors = () => {
  const [colors, setColors] = useState({});

  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    const colorMap = {
      surface: computedStyle.getPropertyValue('--color-surface'),
      'surface-card': computedStyle.getPropertyValue('--color-surface-card'),
      'surface-muted': computedStyle.getPropertyValue('--color-surface-muted'),
      accent: computedStyle.getPropertyValue('--color-accent'),
      'accent-hover': computedStyle.getPropertyValue('--color-accent-hover'),
      'accent-light': computedStyle.getPropertyValue('--color-accent-light'),
      'accent-secondary': computedStyle.getPropertyValue('--color-accent-secondary'),
      heading: computedStyle.getPropertyValue('--color-heading'),
      body: computedStyle.getPropertyValue('--color-body'),
      muted: computedStyle.getPropertyValue('--color-muted'),
    };

    setColors(colorMap);
  }, []);

  return colors;
};

export default useTheme;
