// src/components/TypographyVictimParent.jsx
import React from 'react';
import './TypographyVictimParent.css'; // Создадим CSS файл

const TypographyVictimParent = ({ styles }) => {
  // Объединяем стили из состояния
  const combinedStyles = {
    fontFamily: styles.fontFamily,
    fontSize: `${styles.fontSize}px`,
    fontWeight: styles.fontWeight,
    fontStyle: styles.fontStyle,
    textDecoration: styles.textDecoration,
    color: styles.color,
  };

  return (
    <div className="victim-parent typography-victim-parent">
      {/* Единственный неудаляемый элемент */}
      <div className="typography-element" style={combinedStyles}>
        Пример текста для настройки типографики
      </div>
    </div>
  );
};

export default TypographyVictimParent;