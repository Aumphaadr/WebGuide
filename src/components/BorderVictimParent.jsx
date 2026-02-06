// src/components/BorderVictimParent.jsx
import React from 'react';
import './BorderVictimParent.css'; // Создадим CSS файл

const BorderVictimParent = ({ styles }) => {
  // styles уже содержит объединенные стили
  return (
    <div className="victim-parent border-victim-parent">
      {/* Единственный неудаляемый элемент */}
      <div className="border-element" style={styles}>
        Пример элемента для настройки границ
      </div>
    </div>
  );
};

export default BorderVictimParent;