// src/components/WidthHeightSettingsPanel.jsx
import React from 'react';
import './SettingsPanel.css'; // Используем общие стили

const WidthHeightSettingsPanel = ({ onAddDiv, onAddSpan, onAddButton, onClearAll, selectedElementId }) => {
  // console.log("ID выбранного элемента в SettingsPanel:", selectedElementId);

  return (
    <div className="settings-panel">
      <h2>Ширина и высота</h2>
      <button onClick={onAddDiv}>
        Добавить блочный элемент (div)
      </button>
      <button onClick={onAddSpan}>
        Добавить строчный элемент (span)
      </button>
      <button onClick={onAddButton}>
        Добавить блочно-строчный элемент (button)
      </button>
      <button onClick={onClearAll} className="clear-all-btn">
        Удалить все элементы
      </button>

      {/* Удаляем секцию индивидуальных настроек */}
    </div>
  );
};

export default WidthHeightSettingsPanel;