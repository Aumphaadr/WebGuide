// src/components/BoxShadowSettingsPanel.jsx
import React from 'react';
import './BoxShadowSettingsPanel.css'; // Создадим CSS файл

const BoxShadowSettingsPanel = ({ settings, onUpdateSetting }) => {

  const handleChange = (property, value) => {
    // console.log(`Изменяем ${property} на ${value}`);
    onUpdateSetting(property, value);
  };

  const handleOffsetXChange = (e) => handleChange('offsetX', parseInt(e.target.value, 10));
  const handleOffsetYChange = (e) => handleChange('offsetY', parseInt(e.target.value, 10));
  const handleBlurRadiusChange = (e) => handleChange('blurRadius', parseInt(e.target.value, 10));
  const handleSpreadRadiusChange = (e) => handleChange('spreadRadius', parseInt(e.target.value, 10));
  const handleColorChange = (e) => handleChange('color', e.target.value);
  const handleInsetChange = (e) => handleChange('inset', e.target.checked);

  // Вывод текущего значения box-shadow для информации
  const currentShadowValue = `${settings.inset ? 'inset ' : ''}${settings.offsetX}px ${settings.offsetY}px ${settings.blurRadius}px ${settings.spreadRadius}px ${settings.color}`;

  return (
    <div className="settings-panel box-shadow-settings-panel">
      <h2>Настройки Box-Shadow</h2>

      <div className="setting-group">
        <label htmlFor="offset-x">Offset X: {settings.offsetX}px</label>
        <input
          id="offset-x"
          type="range"
          min="-20"
          max="20"
          step="1"
          value={settings.offsetX}
          onChange={handleOffsetXChange}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="offset-y">Offset Y: {settings.offsetY}px</label>
        <input
          id="offset-y"
          type="range"
          min="-20"
          max="20"
          step="1"
          value={settings.offsetY}
          onChange={handleOffsetYChange}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="blur-radius">Blur Radius: {settings.blurRadius}px</label>
        <input
          id="blur-radius"
          type="range"
          min="0"
          max="20"
          step="1"
          value={settings.blurRadius}
          onChange={handleBlurRadiusChange}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="spread-radius">Spread Radius: {settings.spreadRadius}px</label>
        <input
          id="spread-radius"
          type="range"
          min="-10"
          max="20"
          step="1"
          value={settings.spreadRadius}
          onChange={handleSpreadRadiusChange}
        />
      </div>

      <div className="setting-group">
        <label htmlFor="shadow-color">Color:</label>
        <input
          id="shadow-color"
          type="color"
          value={settings.color}
          onChange={handleColorChange}
        />
      </div>

      <div className="setting-group checkbox-group">
        <input
          id="shadow-inset"
          type="checkbox"
          checked={settings.inset}
          onChange={handleInsetChange}
        />
        <label htmlFor="shadow-inset">Inset</label>
      </div>

      <div className="current-shadow-value">
        <strong>Current Value:</strong> {currentShadowValue}
      </div>
    </div>
  );
};

export default BoxShadowSettingsPanel;