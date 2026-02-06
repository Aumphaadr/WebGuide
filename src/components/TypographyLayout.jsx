// src/components/TypographyLayout.jsx
import React, { useState } from 'react';
import TypographySettingsPanel from './TypographySettingsPanel';
import TypographyVictimParent from './TypographyVictimParent';
import './TypographyLayout.css'; // Создадим CSS файл

const TypographyLayout = () => {
  // Состояние для хранения настроек единственного элемента
  const [elementStyles, setElementStyles] = useState({
    fontFamily: 'sans-serif',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    color: '#000000',
  });

  // Функция для обновления стилей
  const updateStyle = (property, value) => {
    setElementStyles(prev => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <div className="typography-layout">
      <TypographySettingsPanel
        styles={elementStyles}
        onUpdateStyle={updateStyle}
      />
      <TypographyVictimParent
        styles={elementStyles}
      />
    </div>
  );
};

export default TypographyLayout;