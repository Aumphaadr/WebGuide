// src/components/BoxSizingIndividualSettingsModal.jsx
import React, { useState, useEffect } from 'react';
import './BoxSizingIndividualSettingsModal.css'; // Создадим CSS файл

const BoxSizingIndividualSettingsModal = ({ elementId, elementData, onUpdateStyles, onDelete, onClose, position }) => {
  // Инициализируем состояние с текущими стилями элемента или значениями по умолчанию
  const initialStyles = elementData.styles || {
    width: 300,
    height: 150,
    boxSizing: 'content-box',
    padding: 10,
    border: 1,
  };

  const [localStyles, setLocalStyles] = useState(initialStyles);

  // Обновляем состояние при смене элемента
  useEffect(() => {
    setLocalStyles(elementData.styles || initialStyles);
  }, [elementData.styles, initialStyles]);

  const handleChange = (property, value) => {
    // console.log("handleChange called for", property, "with value", value);
    setLocalStyles(prev => ({
      ...prev,
      [property]: typeof value === 'string' ? value : parseFloat(value) // Убедимся, что числа остаются числами
    }));
  };

  const handleSave = () => {
    console.log('BoxSizingModal: Save clicked. Calling onUpdateStyles with:', localStyles);
    onUpdateStyles(localStyles);
    onClose(); // Закрываем модальное окно
  };

  const handleCancel = () => {
    console.log('BoxSizingModal: Cancel clicked. Resetting to initial styles:', initialStyles);
    setLocalStyles(initialStyles);
    onClose(); // Закрываем модальное окно
  };

  const handleDeleteClick = () => {
    console.log('BoxSizingModal: Delete clicked. Calling onDelete for elementId:', elementId);
    onDelete();
    onClose(); // Закрываем модальное окно после удаления
  };

  return (
    <div className="individual-settings-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="modal-content">
        <div className="modal-grid">
          <div className="control-group">
            <label htmlFor="width-value">Width: {localStyles.width}px</label>
            <input
              id="width-value"
              type="range"
              min="100"
              max="500"
              value={localStyles.width}
              onChange={(e) => handleChange('width', e.target.value)}
            />
          </div>
          <div className="control-group">
            <label htmlFor="height-value">Height: {localStyles.height}px</label>
            <input
              id="height-value"
              type="range"
              min="100"
              max="500"
              value={localStyles.height}
              onChange={(e) => handleChange('height', e.target.value)}
            />
          </div>
          <div className="control-group">
            <label htmlFor="box-sizing-select">Box-sizing:</label>
            <select
              id="box-sizing-select"
              value={localStyles.boxSizing}
              onChange={(e) => handleChange('boxSizing', e.target.value)}
            >
              <option value="content-box">content-box</option>
              <option value="border-box">border-box</option>
            </select>
          </div>
          <div className="control-group">
            <label htmlFor="padding-value">Padding: {localStyles.padding}px</label>
            <input
              id="padding-value"
              type="range"
              min="0"
              max="30"
              value={localStyles.padding}
              onChange={(e) => handleChange('padding', e.target.value)}
            />
          </div>
          <div className="control-group">
            <label htmlFor="border-value">Border: {localStyles.border}px</label>
            <input
              id="border-value"
              type="range"
              min="0"
              max="10"
              value={localStyles.border}
              onChange={(e) => handleChange('border', e.target.value)}
            />
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={handleCancel}>Отмена</button>
          <button onClick={handleSave}>Применить</button>
          <button onClick={handleDeleteClick} className="delete-btn">Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default BoxSizingIndividualSettingsModal;