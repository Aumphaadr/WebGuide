// src/components/DisplaySettingsPanel.jsx
import React from 'react';
import './SettingsPanel.css'; // Используем общие стили

const DisplaySettingsPanel = ({ onAddDiv, onAddSpan, onAddButton, onClearAll, selectedElementId }) => {
  // console.log("ID выбранного элемента в SettingsPanel:", selectedElementId);

  return (
    <div className="settings-panel">
      <h2>Строчные и блочные элементы</h2>
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
      {/* <div className="individual-settings-placeholder">...</div> */}
    </div>
  );
};

export default DisplaySettingsPanel;