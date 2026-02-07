// src/components/PositionIndividualSettingsModal.jsx
import React, { useState, useEffect } from 'react';
import './PositionIndividualSettingsModal.css';

const PositionIndividualSettingsModal = ({ elementId, elementData, onUpdateStyles, onDelete, onClose, position }) => {
  // Используем useMemo для вычисления начальных стилей
  const initialStyles = React.useMemo(() => elementData.styles || {
    position: 'static',
    display: 'block',
    top: { value: 0, isAuto: true },
    right: { value: 0, isAuto: true },
    bottom: { value: 0, isAuto: true },
    left: { value: 0, isAuto: true },
    zIndex: { value: 0, isAuto: true },
    backgroundColor: '#eee',
    width: { value: 300, isAuto: false },
    height: { value: 150, isAuto: false },
  }, [elementData.styles]); // Зависимость от elementData.styles

  const [localStyles, setLocalStyles] = useState(initialStyles);

  // Обновляем состояние при смене элемента
  useEffect(() => {
    setLocalStyles(initialStyles);
  }, [initialStyles]); // Теперь зависимости корректны

  const handleChange = (property, subProperty, value) => {
    setLocalStyles(prev => {
      if (['width', 'height', 'top', 'right', 'bottom', 'left', 'zIndex'].includes(property)) {
        return {
          ...prev,
          [property]: {
            ...prev[property],
            [subProperty]: value
          }
        };
      } else {
        return {
          ...prev,
          [property]: typeof value === 'string' ? value : parseFloat(value)
        };
      }
    });
  };

  const handlePositionChange = (e) => {
    handleChange('position', '', e.target.value);
  };

  const handleSave = () => {
    console.log('PositionModal: Save clicked. Calling onUpdateStyles with:', localStyles);
    onUpdateStyles(localStyles);
    onClose();
  };

  const handleCancel = () => {
    console.log('PositionModal: Cancel clicked. Resetting to initial styles:', initialStyles);
    setLocalStyles(initialStyles);
    onClose();
  };

  const handleDeleteClick = () => {
    console.log('PositionModal: Delete clicked. Calling onDelete for elementId:', elementId);
    onDelete();
    onClose();
  };

  const currentPos = localStyles.position;

  return (
    <div className="individual-settings-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="modal-content">
        <div className="modal-grid">
          <div className="control-group">
            <label htmlFor="position-select">Position:</label>
            <select
              id="position-select"
              value={localStyles.position}
              onChange={handlePositionChange}
            >
              <option value="static">static</option>
              <option value="relative">relative</option>
              <option value="absolute">absolute</option>
              <option value="fixed">fixed</option>
              <option value="sticky">sticky</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="width-value">Width: {localStyles.width.isAuto ? 'auto' : `${localStyles.width.value}px`}</label>
            <div className="checkbox-and-slider">
              <div className="checkbox-wrapper">
                <input
                  id="width-auto"
                  type="checkbox"
                  checked={localStyles.width.isAuto}
                  onChange={(e) => handleChange('width', 'isAuto', e.target.checked)}
                />
                <label htmlFor="width-auto">Auto</label>
              </div>
              {!localStyles.width.isAuto && (
                <input
                  id="width-value"
                  type="range"
                  min="10"
                  max="500"
                  value={localStyles.width.value}
                  onChange={(e) => handleChange('width', 'value', e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="control-group">
            <label htmlFor="height-value">Height: {localStyles.height.isAuto ? 'auto' : `${localStyles.height.value}px`}</label>
            <div className="checkbox-and-slider">
              <div className="checkbox-wrapper">
                <input
                  id="height-auto"
                  type="checkbox"
                  checked={localStyles.height.isAuto}
                  onChange={(e) => handleChange('height', 'isAuto', e.target.checked)}
                />
                <label htmlFor="height-auto">Auto</label>
              </div>
              {!localStyles.height.isAuto && (
                <input
                  id="height-value"
                  type="range"
                  min="10"
                  max="500"
                  value={localStyles.height.value}
                  onChange={(e) => handleChange('height', 'value', e.target.value)}
                />
              )}
            </div>
          </div>

          {(currentPos === 'relative' || currentPos === 'absolute' || currentPos === 'fixed' || currentPos === 'sticky') && (
            <>
              <div className="control-group">
                <label htmlFor="top-value">Top: {localStyles.top.isAuto ? 'auto' : `${localStyles.top.value}px`}</label>
                <div className="checkbox-and-slider">
                  <div className="checkbox-wrapper">
                    <input
                      id="top-auto"
                      type="checkbox"
                      checked={localStyles.top.isAuto}
                      onChange={(e) => handleChange('top', 'isAuto', e.target.checked)}
                    />
                    <label htmlFor="top-auto">Auto</label>
                  </div>
                  {!localStyles.top.isAuto && (
                    <input
                      id="top-value"
                      type="range"
                      min="-100"
                      max="100"
                      value={localStyles.top.value}
                      onChange={(e) => handleChange('top', 'value', e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="control-group">
                <label htmlFor="left-value">Left: {localStyles.left.isAuto ? 'auto' : `${localStyles.left.value}px`}</label>
                <div className="checkbox-and-slider">
                  <div className="checkbox-wrapper">
                    <input
                      id="left-auto"
                      type="checkbox"
                      checked={localStyles.left.isAuto}
                      onChange={(e) => handleChange('left', 'isAuto', e.target.checked)}
                    />
                    <label htmlFor="left-auto">Auto</label>
                  </div>
                  {!localStyles.left.isAuto && (
                    <input
                      id="left-value"
                      type="range"
                      min="-100"
                      max="100"
                      value={localStyles.left.value}
                      onChange={(e) => handleChange('left', 'value', e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="control-group">
                <label htmlFor="bottom-value">Bottom: {localStyles.bottom.isAuto ? 'auto' : `${localStyles.bottom.value}px`}</label>
                <div className="checkbox-and-slider">
                  <div className="checkbox-wrapper">
                    <input
                      id="bottom-auto"
                      type="checkbox"
                      checked={localStyles.bottom.isAuto}
                      onChange={(e) => handleChange('bottom', 'isAuto', e.target.checked)}
                    />
                    <label htmlFor="bottom-auto">Auto</label>
                  </div>
                  {!localStyles.bottom.isAuto && (
                    <input
                      id="bottom-value"
                      type="range"
                      min="-100"
                      max="100"
                      value={localStyles.bottom.value}
                      onChange={(e) => handleChange('bottom', 'value', e.target.value)}
                    />
                  )}
                </div>
              </div>
              <div className="control-group">
                <label htmlFor="right-value">Right: {localStyles.right.isAuto ? 'auto' : `${localStyles.right.value}px`}</label>
                <div className="checkbox-and-slider">
                  <div className="checkbox-wrapper">
                    <input
                      id="right-auto"
                      type="checkbox"
                      checked={localStyles.right.isAuto}
                      onChange={(e) => handleChange('right', 'isAuto', e.target.checked)}
                    />
                    <label htmlFor="right-auto">Auto</label>
                  </div>
                  {!localStyles.right.isAuto && (
                    <input
                      id="right-value"
                      type="range"
                      min="-100"
                      max="100"
                      value={localStyles.right.value}
                      onChange={(e) => handleChange('right', 'value', e.target.value)}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {(currentPos === 'relative' || currentPos === 'absolute' || currentPos === 'fixed' || currentPos === 'sticky') && (
            <div className="control-group">
              <label htmlFor="z-index-value">Z-Index: {localStyles.zIndex.isAuto ? 'auto' : localStyles.zIndex.value}</label>
              <div className="checkbox-and-slider">
                <div className="checkbox-wrapper">
                  <input
                    id="z-index-auto"
                    type="checkbox"
                    checked={localStyles.zIndex.isAuto}
                    onChange={(e) => handleChange('zIndex', 'isAuto', e.target.checked)}
                  />
                  <label htmlFor="z-index-auto">Auto</label>
                </div>
                {!localStyles.zIndex.isAuto && (
                  <input
                    id="z-index-value"
                    type="range"
                    min="-10"
                    max="10"
                    value={localStyles.zIndex.value}
                    onChange={(e) => handleChange('zIndex', 'value', e.target.value)}
                  />
                )}
              </div>
            </div>
          )}

          {currentPos === 'fixed' && (
            <div className="info-note">
              <small>Fixed: Относительно Viewport (окна браузера).</small>
            </div>
          )}
          {currentPos === 'sticky' && (
            <div className="info-note">
              <small>Sticky: Относительно родителя с прокруткой.</small>
            </div>
          )}
          {currentPos === 'absolute' && (
            <div className="info-note">
              <small>Absolute: Относительно ближайшего позиционированного предка.</small>
            </div>
          )}

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

export default PositionIndividualSettingsModal;