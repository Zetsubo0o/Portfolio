import React, { useState } from 'react';
import { THEMES, getThemeRecommendations } from '../data/themes';

/**
 * Interactive Theme Selector Component
 * Displays all 12 professional themes with dynamic recommendations
 */
const ThemeSelector = ({ onThemeSelect, currentTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(currentTheme || 'emeraldModern');
  const [showRecommendations, setShowRecommendations] = useState(true);

  const recommendations = getThemeRecommendations(selectedTheme);
  const themeArray = Object.values(THEMES);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    onThemeSelect?.(themeId);
    setShowRecommendations(true);
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      professional: 'bg-emerald-50 border-emerald-200',
      corporate: 'bg-blue-50 border-blue-200',
      creative: 'bg-purple-50 border-purple-200',
      energetic: 'bg-red-50 border-red-200',
      minimal: 'bg-slate-50 border-slate-200',
      warm: 'bg-amber-50 border-amber-200',
      balanced: 'bg-teal-50 border-teal-200',
      luxury: 'bg-indigo-50 border-indigo-200',
      elegant: 'bg-rose-50 border-rose-200',
      technical: 'bg-cyan-50 border-cyan-200',
      eco: 'bg-green-50 border-green-200',
    };
    return categoryColors[category] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Theme Selector</h2>
        <p className="text-gray-600">
          Choose from 12 professional themes. Colors, fonts, and accents are automatically recommended based on your selection.
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {themeArray.map((theme) => (
          <div
            key={theme.id}
            onClick={() => handleThemeSelect(theme.id)}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedTheme === theme.id
                ? 'border-gray-900 shadow-lg scale-105'
                : 'border-gray-200 hover:border-gray-400 hover:shadow-md'
            } ${getCategoryColor(theme.category)}`}
          >
            {/* Theme Preview */}
            <div className="mb-3 flex gap-2">
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: theme.colors.accent }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: theme.colors['accent-secondary'] }}
              ></div>
              <div
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: theme.colors.heading }}
              ></div>
            </div>

            {/* Theme Info */}
            <h3 className="font-bold text-gray-900 text-sm mb-1">{theme.name}</h3>
            <p className="text-xs text-gray-600 line-clamp-2">{theme.description}</p>

            {/* Category Badge */}
            <div className="mt-2">
              <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded font-medium capitalize">
                {theme.category}
              </span>
            </div>

            {/* Selected Indicator */}
            {selectedTheme === theme.id && (
              <div className="mt-2 flex items-center text-gray-900 font-semibold text-xs">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Selected
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Recommendations Panel */}
      {showRecommendations && recommendations && (
        <div className="bg-white rounded-xl border-2 border-gray-300 p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Theme Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {recommendations.theme.name}
              </h3>
              <p className="text-gray-600 mb-4">{recommendations.theme.description}</p>

              {/* Feeling & Best For */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Overall Feeling
                  </p>
                  <p className="text-gray-900 font-semibold">{recommendations.recommendation.feeling}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Best For
                  </p>
                  <p className="text-gray-900 font-semibold">{recommendations.recommendation.bestFor}</p>
                </div>
              </div>

              {/* Color Palette */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Color Palette
                </h4>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  <div>
                    <div
                      className="w-full h-16 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: recommendations.recommendation.primaryColor }}
                    ></div>
                    <p className="text-xs font-semibold text-center text-gray-700">Primary</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-16 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: recommendations.recommendation.secondaryColor }}
                    ></div>
                    <p className="text-xs font-semibold text-center text-gray-700">Secondary</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-16 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: recommendations.recommendation.tertiaryColor }}
                    ></div>
                    <p className="text-xs font-semibold text-center text-gray-700">Tertiary</p>
                  </div>
                  <div>
                    <div
                      className="w-full h-16 rounded-lg border-2 border-gray-300 mb-2"
                      style={{ backgroundColor: recommendations.theme.colors.body }}
                    ></div>
                    <p className="text-xs font-semibold text-center text-gray-700">Text</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Font & Advanced Recommendations */}
            <div>
              {/* Font Recommendations */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Recommended Fonts
                </h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Display Font (Headings)
                    </p>
                    <p className="text-gray-900 font-semibold text-lg">
                      {recommendations.theme.fonts.display}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">For page titles and section headings</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
                      Body Font (Content)
                    </p>
                    <p className="text-gray-900 font-semibold text-lg">
                      {recommendations.theme.fonts.body}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">For body text and descriptions</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wider">
                      Alternative Fonts
                    </p>
                    <div className="space-y-1">
                      {recommendations.suggestedFonts.display.map((font, idx) => (
                        <p key={idx} className="text-sm text-gray-700">
                          • {font}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Hex Codes */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                  Color Codes
                </h4>
                <div className="bg-gray-900 text-white rounded-lg p-3 font-mono text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>Primary:</span>
                    <span>{recommendations.recommendation.primaryColor}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-1">
                    <span>Secondary:</span>
                    <span>{recommendations.recommendation.secondaryColor}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-1">
                    <span>Tertiary:</span>
                    <span>{recommendations.recommendation.tertiaryColor}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-1">
                    <span>Text:</span>
                    <span>{recommendations.theme.colors.body}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => console.log('Apply theme:', selectedTheme)}
              className="w-full px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Apply {recommendations.theme.name} Theme
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
