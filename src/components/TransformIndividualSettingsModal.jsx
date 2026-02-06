// src/components/TransformIndividualSettingsModal.jsx
import React, { useState, useEffect } from 'react';
import './TransformIndividualSettingsModal.css';

const TransformIndividualSettingsModal = ({ elementId, elementData, onUpdateStyles, onDelete, onClose, position }) => {
  const initialStyles = React.useMemo(() => elementData.styles || {
    width: { value: 200, unit: 'px' },
    height: { value: 100, unit: 'px' },
    transform: {
      translateX: 0,
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
      skewX: 0,
      skewY: 0,
      rotate: 0,
    },
  }, [elementData.styles]);

  const [localStyles, setLocalStyles] = useState(initialStyles);

  useEffect(() => {
    setLocalStyles(initialStyles);
  }, [initialStyles]);

  const handleChange = (category, property, value) => {
    if (category === 'size') {
      setLocalStyles(prev => ({
        ...prev,
        [property]: {
          ...prev[property],
          value: parseFloat(value)
        }
      }));
    } else if (category === 'transform') {
      setLocalStyles(prev => ({
        ...prev,
        transform: {
          ...prev.transform,
          [property]: parseFloat(value)
        }
      }));
    }
  };

  const handleSave = () => {
    console.log('TransformModal: Save clicked. Calling onUpdateStyles with:', localStyles);
    onUpdateStyles(localStyles);
    onClose();
  };

  const handleCancel = () => {
    console.log('TransformModal: Cancel clicked. Resetting to initial styles:', initialStyles);
    setLocalStyles(initialStyles);
    onClose();
  };

  const handleDeleteClick = () => {
    console.log('TransformModal: Delete clicked. Calling onDelete for elementId:', elementId);
    onDelete();
    onClose();
  };

  // --- УДАЛЯЕМ НЕИСПОЛЬЗУЕМУЮ ПЕРЕМЕННУЮ ---
  // const sliderMax = {
  //   width: localStyles.width.unit === '%' ? 100 : 1000,
  //   height: localStyles.height.unit === '%' ? 100 : 1000,
  // };
  // --- /УДАЛЯЕМ НЕИСПОЛЬЗУЕМУЮ ПЕРЕМЕННУЮ ---

  return (
    <div className="individual-settings-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="modal-content">
        <div className="modal-grid">
          <div className="column">
            <div className="control-group">
              <label htmlFor="width-value">Width: {localStyles.width.value}{localStyles.width.unit}</label>
              <input
                id="width-value"
                type="range"
                min="150"
                max="300"
                value={localStyles.width.value}
                onChange={(e) => handleChange('size', 'width', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label htmlFor="height-value">Height: {localStyles.height.value}{localStyles.height.unit}</label>
              <input
                id="height-value"
                type="range"
                min="150"
                max="300"
                value={localStyles.height.value}
                onChange={(e) => handleChange('size', 'height', e.target.value)}
              />
            </div>

            <hr className="divider" />

            <h4>Axis X</h4>
            <div className="control-group">
              <label htmlFor="translate-x">TranslateX: {localStyles.transform.translateX}px</label>
              <input
                id="translate-x"
                type="range"
                min="-200"
                max="200"
                value={localStyles.transform.translateX}
                onChange={(e) => handleChange('transform', 'translateX', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label htmlFor="scale-x">ScaleX: {localStyles.transform.scaleX}</label>
              <input
                id="scale-x"
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={localStyles.transform.scaleX}
                onChange={(e) => handleChange('transform', 'scaleX', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label htmlFor="skew-x">SkewX: {localStyles.transform.skewX}deg</label>
              <input
                id="skew-x"
                type="range"
                min="-90"
                max="90"
                value={localStyles.transform.skewX}
                onChange={(e) => handleChange('transform', 'skewX', e.target.value)}
              />
            </div>
          </div>

          <div className="column">
            <h4>Axis Y</h4>
            <div className="control-group">
              <label htmlFor="translate-y">TranslateY: {localStyles.transform.translateY}px</label>
              <input
                id="translate-y"
                type="range"
                min="-200"
                max="200"
                value={localStyles.transform.translateY}
                onChange={(e) => handleChange('transform', 'translateY', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label htmlFor="scale-y">ScaleY: {localStyles.transform.scaleY}</label>
              <input
                id="scale-y"
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={localStyles.transform.scaleY}
                onChange={(e) => handleChange('transform', 'scaleY', e.target.value)}
              />
            </div>
            <div className="control-group">
              <label htmlFor="skew-y">SkewY: {localStyles.transform.skewY}deg</label>
              <input
                id="skew-y"
                type="range"
                min="-90"
                max="90"
                value={localStyles.transform.skewY}
                onChange={(e) => handleChange('transform', 'skewY', e.target.value)}
              />
            </div>

            <hr className="divider" />

            <div className="control-group">
              <label htmlFor="rotate">Rotate: {localStyles.transform.rotate}deg</label>
              <input
                id="rotate"
                type="range"
                min="0"
                max="360"
                value={localStyles.transform.rotate}
                onChange={(e) => handleChange('transform', 'rotate', e.target.value)}
              />
            </div>
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

export default TransformIndividualSettingsModal;