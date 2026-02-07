// src/components/TypographySettingsPanel.jsx
import React from 'react';
import './TypographySettingsPanel.css'; // Создадим CSS файл

// Определим доступные шрифты
const FONT_OPTIONS = [
  { value: 'serif', label: 'serif' },
  { value: 'sans-serif', label: 'sans-serif' },
  { value: 'monospace', label: 'monospace' },
  { value: 'Lato', label: 'Lato' },
  { value: 'Antiqua', label: 'Antiqua' },
  { value: 'Liberation Sans', label: 'Liberation Sans' },
  { value: 'Liberation Serif', label: 'Liberation Serif' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Source Code Pro', label: 'Source Code Pro' },
  { value: 'Whitney', label: 'Whitney' },
];

const WEIGHT_OPTIONS = [
  { value: 'normal', label: 'normal' },
  { value: 'bold', label: 'bold' },
];

const STYLE_OPTIONS = [
  { value: 'normal', label: 'normal' },
  { value: 'italic', label: 'italic' },
];

const DECORATION_OPTIONS = [
  { value: 'none', label: 'none' },
  { value: 'underline', label: 'underline' },
  { value: 'overline', label: 'overline' },
];

const TypographySettingsPanel = ({ styles, onUpdateStyle }) => {

  const handleFontFamilyChange = (e) => {
    onUpdateStyle('fontFamily', e.target.value);
  };

  const handleFontSizeChange = (e) => {
    onUpdateStyle('fontSize', parseInt(e.target.value, 10)); // Преобразуем строку в число
  };

  const handleFontWeightChange = (e) => {
    onUpdateStyle('fontWeight', e.target.value);
  };

  const handleFontStyleChange = (e) => {
    onUpdateStyle('fontStyle', e.target.value);
  };

  const handleTextDecorationChange = (e) => {
    onUpdateStyle('textDecoration', e.target.value);
  };

  const handleColorChange = (e) => {
    onUpdateStyle('color', e.target.value);
  };

  return (
    <div className="settings-panel typography-settings-panel">
      <h2>Настройки Типографики</h2>

      <div className="setting-group">
        <label htmlFor="font-family-select">Font Family:</label>
        <select id="font-family-select" value={styles.fontFamily} onChange={handleFontFamilyChange}>
          {FONT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="font-size-slider">Font Size: {styles.fontSize}px</label>
        <input
          id="font-size-slider"
          type="range"
          min="10"
          max="26"
          value={styles.fontSize}
          onChange={handleFontSizeChange}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="font-weight-select">Font Weight:</label>
        <select id="font-weight-select" value={styles.fontWeight} onChange={handleFontWeightChange}>
          {WEIGHT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="font-style-select">Font Style:</label>
        <select id="font-style-select" value={styles.fontStyle} onChange={handleFontStyleChange}>
          {STYLE_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="text-decoration-select">Text Decoration:</label>
        <select id="text-decoration-select" value={styles.textDecoration} onChange={handleTextDecorationChange}>
          {DECORATION_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="setting-group">
        <label htmlFor="color-picker">Color:</label>
        <input
          id="color-picker"
          type="color"
          value={styles.color}
          onChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default TypographySettingsPanel;