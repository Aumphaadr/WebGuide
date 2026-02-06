// src/components/BorderSettingsPanel.jsx
import React, { useState } from 'react';
import './BorderSettingsPanel.css'; // Создадим CSS файл

// Опции для border-style
const BORDER_STYLE_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'double', label: 'Double' },
  { value: 'groove', label: 'Groove' },
  { value: 'ridge', label: 'Ridge' },
  { value: 'inset', label: 'Inset' },
  { value: 'outset', label: 'Outset' },
];

const BorderSettingsPanel = ({ allStyles, sideStyles, onUpdateAllStyle, onUpdateSideStyle, onResetSideStyle }) => {
  const [activeTab, setActiveTab] = useState('all'); // Управление активной вкладкой

  const handleAllStyleChange = (property, value) => {
    onUpdateAllStyle(property, value);
  };

  const handleSideStyleChange = (side, property, value) => {
    onUpdateSideStyle(side, property, value);
  };

  const handleCheckboxChange = (side, property, checked) => {
    onUpdateSideStyle(side, property, checked);
  };

  const handleResetClick = (side) => {
    onResetSideStyle(side);
  };

  return (
    <div className="settings-panel border-settings-panel">
      <h2>Настройки Границ</h2>

      {/* Вкладки */}
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
        <button className={`tab-button ${activeTab === 'top' ? 'active' : ''}`} onClick={() => setActiveTab('top')}>Top</button>
        <button className={`tab-button ${activeTab === 'bottom' ? 'active' : ''}`} onClick={() => setActiveTab('bottom')}>Bottom</button>
        <button className={`tab-button ${activeTab === 'left' ? 'active' : ''}`} onClick={() => setActiveTab('left')}>Left</button>
        <button className={`tab-button ${activeTab === 'right' ? 'active' : ''}`} onClick={() => setActiveTab('right')}>Right</button>
      </div>

      <div className="tab-content">
        {/* Вкладка "All" */}
        {activeTab === 'all' && (
          <div className="tab-pane">
            <div className="setting-group">
              <label htmlFor="border-style-all">Border Style:</label>
              <select id="border-style-all" value={allStyles.style} onChange={(e) => handleAllStyleChange('style', e.target.value)}>
                {BORDER_STYLE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="setting-group">
              <label htmlFor="border-width-all">Border Width: {allStyles.width}px</label>
              <input
                id="border-width-all"
                type="range"
                min="0"
                max="10"
                value={allStyles.width}
                onChange={(e) => handleAllStyleChange('width', parseInt(e.target.value, 10))}
              />
            </div>

            <div className="setting-group">
              <label htmlFor="border-color-all">Border Color:</label>
              <input
                id="border-color-all"
                type="color"
                value={allStyles.color}
                onChange={(e) => handleAllStyleChange('color', e.target.value)}
              />
            </div>

            <div className="setting-group">
              <label htmlFor="border-radius-all">Border Radius: {allStyles.radius}px</label>
              <input
                id="border-radius-all"
                type="range"
                min="0"
                max="50"
                value={allStyles.radius}
                onChange={(e) => handleAllStyleChange('radius', parseInt(e.target.value, 10))}
              />
            </div>
          </div>
        )}

        {/* Вкладки "Top", "Bottom", "Left", "Right" */}
        {(activeTab === 'top' || activeTab === 'bottom' || activeTab === 'left' || activeTab === 'right') && (
          <div className="tab-pane">
            {/* Checkbox для включения/отключения приоритета */}
            <div className="setting-group checkbox-group">
              <input
                id={`enable-${activeTab}`}
                type="checkbox"
                checked={sideStyles[activeTab].enabled}
                onChange={(e) => handleCheckboxChange(activeTab, 'enabled', e.target.checked)}
              />
              <label htmlFor={`enable-${activeTab}`}>Enable {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Specific Styles</label>
            </div>

            {/* Настройки для стороны */}
            <div className="setting-group">
              <label htmlFor={`border-style-${activeTab}`}>Border Style:</label>
              <select
                id={`border-style-${activeTab}`}
                value={sideStyles[activeTab].style}
                onChange={(e) => handleSideStyleChange(activeTab, 'style', e.target.value)}
                disabled={!sideStyles[activeTab].enabled} // Отключаем, если не включена
              >
                {BORDER_STYLE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="setting-group">
              <label htmlFor={`border-width-${activeTab}`}>Border Width: {sideStyles[activeTab].width}px</label>
              <input
                id={`border-width-${activeTab}`}
                type="range"
                min="0"
                max="10"
                value={sideStyles[activeTab].width}
                onChange={(e) => handleSideStyleChange(activeTab, 'width', parseInt(e.target.value, 10))}
                disabled={!sideStyles[activeTab].enabled}
              />
            </div>

            <div className="setting-group">
              <label htmlFor={`border-color-${activeTab}`}>Border Color:</label>
              <input
                id={`border-color-${activeTab}`}
                type="color"
                value={sideStyles[activeTab].color}
                onChange={(e) => handleSideStyleChange(activeTab, 'color', e.target.value)}
                disabled={!sideStyles[activeTab].enabled}
              />
            </div>

            {/* Кнопка "Очистить" */}
            <div className="setting-group">
              <button onClick={() => handleResetClick(activeTab)}>Очистить</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BorderSettingsPanel;