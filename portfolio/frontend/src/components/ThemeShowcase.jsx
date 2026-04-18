import React, { useState } from 'react';
import { THEMES, getThemeRecommendations } from '../data/themes';

/**
 * Theme Showcase Component
 * Visual preview of how each theme looks with sample content
 */
const ThemeShowcase = () => {
  const [selectedTheme, setSelectedTheme] = useState('emeraldModern');
  const theme = THEMES[selectedTheme];
  const recommendations = getThemeRecommendations(selectedTheme);

  const themeArray = Object.values(THEMES);

  const SampleContent = ({ theme }) => (
    <div
      className="rounded-xl overflow-hidden shadow-xl"
      style={{ backgroundColor: theme.colors.surface }}
    >
      {/* Header */}
      <div
        className="p-8"
        style={{ backgroundColor: theme.colors.accent }}
      >
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: '#ffffff', fontFamily: theme.fonts.display }}
        >
          {theme.name}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontFamily: theme.fonts.body }}>
          Professional theme for your portfolio
        </p>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              color: theme.colors.heading,
              fontFamily: theme.fonts.display,
            }}
          >
            Welcome to Your Portfolio
          </h2>
          <p
            className="text-lg mb-4"
            style={{
              color: theme.colors.body,
              fontFamily: theme.fonts.body,
            }}
          >
            This is how your content will look with the {theme.name} theme. Notice how the colors work
            together to create a professional and cohesive design.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-6 rounded-lg"
              style={{ backgroundColor: theme.colors['surface-muted'] }}
            >
              <div
                className="w-12 h-12 rounded-full mb-4"
                style={{ backgroundColor: theme.colors.accent }}
              ></div>
              <h3
                className="font-bold mb-2"
                style={{
                  color: theme.colors.heading,
                  fontFamily: theme.fonts.display,
                }}
              >
                Feature {item}
              </h3>
              <p
                style={{
                  color: theme.colors.body,
                  fontFamily: theme.fonts.body,
                  fontSize: '0.95rem',
                }}
              >
                Each feature card uses the complementary colors from your theme.
              </p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            style={{
              backgroundColor: theme.colors.accent,
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '4px',
              fontFamily: theme.fonts.body,
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = theme.colors['accent-hover'])}
            onMouseLeave={(e) => (e.target.style.backgroundColor = theme.colors.accent)}
          >
            Primary Button
          </button>
          <button
            style={{
              backgroundColor: 'transparent',
              color: theme.colors.accent,
              padding: '12px 24px',
              borderRadius: '4px',
              fontFamily: theme.fonts.body,
              fontWeight: '600',
              border: `2px solid ${theme.colors.accent}`,
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Secondary Button
          </button>
        </div>

        {/* Color Swatches */}
        <div>
          <h3
            className="font-bold text-lg mb-4"
            style={{
              color: theme.colors.heading,
              fontFamily: theme.fonts.display,
            }}
          >
            Color Palette
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(theme.colors).map(([key, value]) => (
              <div key={key}>
                <div
                  className="w-full h-20 rounded-lg border-2 border-gray-300 mb-2"
                  style={{ backgroundColor: value }}
                ></div>
                <p
                  className="text-xs font-semibold text-center"
                  style={{
                    color: theme.colors.body,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  {key}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-white p-8 rounded-xl">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Theme Showcase</h2>
        <p className="text-gray-600">
          Preview all 12 professional themes with sample content and color palettes
        </p>
      </div>

      {/* Grid of Theme Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {themeArray.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTheme(t.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedTheme === t.id
                ? 'border-gray-900 shadow-lg scale-105'
                : 'border-gray-200 hover:border-gray-400'
            }`}
            style={{
              backgroundColor: t.colors['surface-muted'],
            }}
          >
            <div className="flex gap-2 mb-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-400"
                style={{ backgroundColor: t.colors.accent }}
              ></div>
              <div
                className="w-4 h-4 rounded-full border border-gray-400"
                style={{ backgroundColor: t.colors['accent-secondary'] }}
              ></div>
            </div>
            <p className="font-bold text-sm text-gray-900">{t.name}</p>
            <p className="text-xs text-gray-600 line-clamp-1">{t.category}</p>
          </button>
        ))}
      </div>

      {/* Main Preview */}
      <div className="mb-8">
        <SampleContent theme={theme} />
      </div>

      {/* Theme Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-xl">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Theme Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Name</p>
              <p className="text-gray-900 font-semibold">{theme.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Category</p>
              <p className="text-gray-900 font-semibold capitalize">{theme.category}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Feeling</p>
              <p className="text-gray-900 font-semibold">
                {recommendations.recommendation.feeling}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Best For</p>
              <p className="text-gray-900 font-semibold">
                {recommendations.recommendation.bestFor}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Typography</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                Display Font
              </p>
              <p
                className="text-2xl font-bold text-gray-900"
                style={{ fontFamily: theme.fonts.display }}
              >
                {theme.fonts.display}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Body Font</p>
              <p
                className="text-lg text-gray-900"
                style={{ fontFamily: theme.fonts.body }}
              >
                {theme.fonts.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeShowcase;
