// src/components/BoxSizingSettingsPanel.jsx
import React from 'react';
import './SettingsPanel.css'; // Используем общие стили

const BoxSizingSettingsPanel = ({ onAddDiv, onAddSpan, onAddButton, onClearAll, selectedElementId }) => {
  // console.log("ID выбранного элемента в SettingsPanel:", selectedElementId);

  return (
    <div className="settings-panel">
      <h2>Box-Sizing</h2>
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
    </div>
  );
};

export default BoxSizingSettingsPanel;