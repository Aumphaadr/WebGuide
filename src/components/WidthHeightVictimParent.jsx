// src/components/WidthHeightVictimParent.jsx
import React from 'react';
import WidthHeightChildElement from './WidthHeightChildElement'; // Новый компонент
import './VictimParent.css'; // Используем общие стили

const renderElements = (elems, onSelect, selectedElementId) => {
  return elems.map(element => (
    <WidthHeightChildElement
      key={element.id}
      elementData={element}
      isSelected={element.id === selectedElementId}
      onSelect={onSelect}
      selectedElementId={selectedElementId}
    />
  ));
};

const WidthHeightVictimParent = ({ elements, onSelectElement, selectedElementId }) => {

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      onSelectElement(null, null);
    }
  };

  return (
    <div className="victim-parent" onClick={handleContainerClick}>
      {elements.length > 0 ? renderElements(elements, onSelectElement, selectedElementId) : <p>Пока нет элементов. Добавьте их через панель настроек.</p>}
    </div>
  );
};

export default WidthHeightVictimParent;