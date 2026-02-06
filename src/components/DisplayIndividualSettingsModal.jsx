// src/components/DisplayIndividualSettingsModal.jsx
import React from 'react';
import './DisplayIndividualSettingsModal.css'; // Создадим CSS файл

const DisplayIndividualSettingsModal = ({ elementId, elementData, onUpdateType, onDelete, onClose, position }) => { // Добавим onClose
  const handleSave = () => {
    // console.log('Сохраняем изменения для элемента', elementId, 'display:', displayValue);
    // Ничего не сохраняем в этом уроке, просто закрываем
    onClose(); // Закрываем модальное окно
  };

  const handleCancel = () => {
    // console.log('Отменяем изменения для элемента', elementId);
    onClose(); // Закрываем модальное окно
  };

  const handleDeleteClick = () => {
    // console.log('Удаляем элемент', elementId);
    onDelete();
    onClose(); // Закрываем модальное окно после удаления
  };

  // Обработка выбора типа
  const handleTypeChange = (newType) => {
    onUpdateType(newType);
  };

  const currentType = elementData.type;

  return (
    <div className="individual-settings-modal" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="modal-content">
        <div className="modal-controls">
          <div className="control-group">
            <label htmlFor="display-select">Display:</label>
            <select
              id="display-select"
              value={currentType}
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <option value="div">block (блочный)</option>
              <option value="span">inline (строчный)</option>
              <option value="button">inline-block (блочно-строчный)</option>
            </select>
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

export default DisplayIndividualSettingsModal;