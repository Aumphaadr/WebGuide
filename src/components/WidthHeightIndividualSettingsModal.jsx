// src/components/WidthHeightIndividualSettingsModal.jsx
import React, { useState, useEffect } from 'react';
import './WidthHeightIndividualSettingsModal.css'; // Создадим CSS файл

const WidthHeightIndividualSettingsModal = ({ elementId, elementData, onUpdateStyles, onDelete, onClose, position }) => {
  // Инициализируем состояние с текущими стилями элемента или значениями по умолчанию
  const initialStyles = elementData.styles || {
    width: { value: 'auto', unit: 'px' },
    height: { value: 'auto', unit: 'px' },
  };

  const [localStyles, setLocalStyles] = useState(initialStyles);
  const [showWarning, setShowWarning] = useState(elementData.type === 'span');

  // Обновляем состояние и предупреждение при смене элемента
  useEffect(() => {
    setLocalStyles(elementData.styles || initialStyles);
    setShowWarning(elementData.type === 'span');
  }, [elementData.styles, elementData.type, initialStyles]);

  const handleChange = (dimension, property, value) => {
    setLocalStyles(prev => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        [property]: value
      }
    }));
  };

  const handleAutoToggle = (dimension, checked) => {
    if (checked) {
      handleChange(dimension, 'value', 'auto');
    } else {
      // Если снимаем галочку, устанавливаем значение 0 и px по умолчанию
      if (dimension === 'width') {
        handleChange(dimension, 'value', 0);
        handleChange(dimension, 'unit', 'px');
      } else if (dimension === 'height') {
        handleChange(dimension, 'value', 0);
        handleChange(dimension, 'unit', 'px');
      }
    }
  };

  const handleSave = () => {
    console.log('WHModal: Save clicked. Calling onUpdateStyles with:', localStyles);
    onUpdateStyles(localStyles);
    onClose(); // Закрываем модальное окно
  };

  const handleCancel = () => {
    console.log('WHModal: Cancel clicked. Resetting to initial styles:', initialStyles);
    setLocalStyles(initialStyles);
    onClose(); // Закрываем модальное окно
  };

  const handleDeleteClick = () => {
    console.log('WHModal: Delete clicked. Calling onDelete for elementId:', elementId);
    onDelete();
    onClose(); // Закрываем модальное окно после удаления
  };

  // --- ВЫЧИСЛЕНИЕ МАКСИМАЛЬНОГО ЗНАЧЕНИЯ СЛАЙДЕРА ---
  const sliderMax = {
    width: localStyles.width.unit === '%' ? 100 : 1000,
    height: localStyles.height.unit === '%' ? 100 : 1000,
  };
  // --- /ВЫЧИСЛЕНИЕ ---

  return (
    <div className="individual-settings-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="modal-content">
        {showWarning && (
          <div className="warning-message">
            ⚠️ Свойства width и height не работают для inline-элементов (span).
          </div>
        )}
        <div className="modal-grid">
          {/* Левый столбец - Width */}
          <div className="column">
            <div className="control-group">
              <label htmlFor="width-auto">Width: Auto</label>
              <input
                id="width-auto"
                type="checkbox"
                checked={localStyles.width.value === 'auto'}
                onChange={(e) => handleAutoToggle('width', e.target.checked)}
              />
            </div>

            {localStyles.width.value !== 'auto' && (
              <>
                <div className="control-group">
                  <label htmlFor="width-unit">Unit:</label>
                  <select
                    id="width-unit"
                    value={localStyles.width.unit}
                    onChange={(e) => handleChange('width', 'unit', e.target.value)}
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                  </select>
                </div>
                <div className="control-group">
                  <label htmlFor="width-value">Value: {localStyles.width.value}{localStyles.width.unit}</label>
                  <input
                    id="width-value"
                    type="range"
                    min="0"
                    max={sliderMax.width}
                    value={localStyles.width.value}
                    onChange={(e) => handleChange('width', 'value', parseInt(e.target.value, 10))}
                  />
                </div>
              </>
            )}
          </div>

          {/* Правый столбец - Height */}
          <div className="column">
            <div className="control-group">
              <label htmlFor="height-auto">Height: Auto</label>
              <input
                id="height-auto"
                type="checkbox"
                checked={localStyles.height.value === 'auto'}
                onChange={(e) => handleAutoToggle('height', e.target.checked)}
              />
            </div>

            {localStyles.height.value !== 'auto' && (
              <>
                <div className="control-group">
                  <label htmlFor="height-unit">Unit:</label>
                  <select
                    id="height-unit"
                    value={localStyles.height.unit}
                    onChange={(e) => handleChange('height', 'unit', e.target.value)}
                  >
                    <option value="px">px</option>
                    <option value="%">%</option>
                  </select>
                </div>
                <div className="control-group">
                  <label htmlFor="height-value">Value: {localStyles.height.value}{localStyles.height.unit}</label>
                  <input
                    id="height-value"
                    type="range"
                    min="0"
                    max={sliderMax.height}
                    value={localStyles.height.value}
                    onChange={(e) => handleChange('height', 'value', parseInt(e.target.value, 10))}
                  />
                </div>
              </>
            )}
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

export default WidthHeightIndividualSettingsModal;