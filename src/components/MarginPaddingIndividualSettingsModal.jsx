// src/components/MarginPaddingIndividualSettingsModal.jsx
import React, { useState, useEffect } from 'react';
import './MarginPaddingIndividualSettingsModal.css';

const MarginPaddingIndividualSettingsModal = ({ elementId, elementData, onUpdateStyles, onDelete, onClose, position }) => { // Добавим onClose
  const [originalStyles, setOriginalStyles] = useState(elementData.styles || {
    margin: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    padding: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10
  });

  const [localStyles, setLocalStyles] = useState(originalStyles);
  const [showSpecificPadding, setShowSpecificPadding] = useState(false);
  const [showSpecificMargin, setShowSpecificMargin] = useState(false);

  useEffect(() => {
    const initialStylesForCurrentElement = elementData.styles || {
      margin: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
      padding: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10
    };
    // console.log("Modal useEffect: Resetting originalStyles and localStyles for elementId:", elementId);
    setOriginalStyles(initialStylesForCurrentElement);
    setLocalStyles(initialStylesForCurrentElement);
    // Сбросим флаги при открытии окна для нового элемента
    setShowSpecificPadding(false);
    setShowSpecificMargin(false);
  }, [elementId, elementData.styles]);

  const handleChange = (property, value) => {
    // console.log("handleChange called for", property, "with value", value);
    setLocalStyles(prev => ({
      ...prev,
      [property]: parseInt(value, 10)
    }));
  };

  const handleCheckboxChange = (property) => {
    // console.log("handleCheckboxChange called for", property);
    if (property === 'padding') {
      setShowSpecificPadding(!showSpecificPadding);
    } else if (property === 'margin') {
      setShowSpecificMargin(!showSpecificMargin);
    }
  };

  const handleSave = () => {
    console.log('Modal: Save clicked. Preparing styles to send. Current localStyles:', localStyles);
    console.log('Modal: showSpecificMargin:', showSpecificMargin, 'showSpecificPadding:', showSpecificPadding);

    let stylesToSend = { ...localStyles };

    // Если "Enable specific" для margin НЕ выбран, копируем значение margin в конкретные
    if (!showSpecificMargin) {
      stylesToSend.marginTop = stylesToSend.margin;
      stylesToSend.marginRight = stylesToSend.margin;
      stylesToSend.marginBottom = stylesToSend.margin;
      stylesToSend.marginLeft = stylesToSend.margin;
    }

    // Если "Enable specific" для padding НЕ выбран, копируем значение padding в конкретные
    if (!showSpecificPadding) {
      stylesToSend.paddingTop = stylesToSend.padding;
      stylesToSend.paddingRight = stylesToSend.padding;
      stylesToSend.paddingBottom = stylesToSend.padding;
      stylesToSend.paddingLeft = stylesToSend.padding;
    }

    console.log('Modal: Final styles to send to onUpdateStyles:', stylesToSend);
    onUpdateStyles(stylesToSend);
    onClose(); // Закрываем модальное окно
  };

  const handleCancel = () => {
    console.log('Modal: Cancel clicked. Resetting localStyles to originalStyles:', originalStyles);
    setLocalStyles(originalStyles);
    onClose(); // Закрываем модальное окно
  };

  const handleDeleteClick = () => {
    console.log('Modal: Delete clicked. Calling onDelete for elementId:', elementId);
    onDelete();
    onClose(); // Закрываем модальное окно после удаления
  };

  return (
    <div className="individual-settings-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="modal-content">
        <div className="modal-grid">
          <div className="column">
            <div className="control-group">
              <label htmlFor="padding">Padding: {localStyles.padding}px</label>
              <input
                id="padding"
                type="range"
                min="0"
                max="20"
                value={localStyles.padding}
                onChange={(e) => handleChange('padding', e.target.value)}
              />
              <div className="checkbox-wrapper">
                <input
                  id="enable-specific-padding"
                  type="checkbox"
                  checked={showSpecificPadding}
                  onChange={() => handleCheckboxChange('padding')}
                />
                <label htmlFor="enable-specific-padding">Enable specific</label>
              </div>
            </div>

            {showSpecificPadding && (
              <>
                <div className="control-group">
                  <label htmlFor="padding-top">Padding Top: {localStyles.paddingTop}px</label>
                  <input
                    id="padding-top"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.paddingTop}
                    onChange={(e) => handleChange('paddingTop', e.target.value)}
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="padding-bottom">Padding Bottom: {localStyles.paddingBottom}px</label>
                  <input
                    id="padding-bottom"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.paddingBottom}
                    onChange={(e) => handleChange('paddingBottom', e.target.value)}
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="padding-left">Padding Left: {localStyles.paddingLeft}px</label>
                  <input
                    id="padding-left"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.paddingLeft}
                    onChange={(e) => handleChange('paddingLeft', e.target.value)}
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="padding-right">Padding Right: {localStyles.paddingRight}px</label>
                  <input
                    id="padding-right"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.paddingRight}
                    onChange={(e) => handleChange('paddingRight', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          <div className="column">
            <div className="control-group">
              <label htmlFor="margin">Margin: {localStyles.margin}px</label>
              <input
                id="margin"
                type="range"
                min="0"
                max="20"
                value={localStyles.margin}
                onChange={(e) => handleChange('margin', e.target.value)}
              />
              <div className="checkbox-wrapper">
                <input
                  id="enable-specific-margin"
                  type="checkbox"
                  checked={showSpecificMargin}
                  onChange={() => handleCheckboxChange('margin')}
                />
                <label htmlFor="enable-specific-margin">Enable specific</label>
              </div>
            </div>

            {showSpecificMargin && (
              <>
                <div className="control-group">
                  <label htmlFor="margin-top">Margin Top: {localStyles.marginTop}px</label>
                  <input
                    id="margin-top"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.marginTop}
                    onChange={(e) => handleChange('marginTop', e.target.value)}
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="margin-bottom">Margin Bottom: {localStyles.marginBottom}px</label>
                  <input
                    id="margin-bottom"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.marginBottom}
                    onChange={(e) => handleChange('marginBottom', e.target.value)}
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="margin-left">Margin Left: {localStyles.marginLeft}px</label>
                  <input
                    id="margin-left"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.marginLeft}
                    onChange={(e) => handleChange('marginLeft', e.target.value)}
                  />
                </div>
                <div className="control-group">
                  <label htmlFor="margin-right">Margin Right: {localStyles.marginRight}px</label>
                  <input
                    id="margin-right"
                    type="range"
                    min="0"
                    max="20"
                    value={localStyles.marginRight}
                    onChange={(e) => handleChange('marginRight', e.target.value)}
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

export default MarginPaddingIndividualSettingsModal;