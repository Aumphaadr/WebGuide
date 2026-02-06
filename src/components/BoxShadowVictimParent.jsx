// src/components/BoxShadowVictimParent.jsx
import React from 'react';
import './BoxShadowVictimParent.css'; // Создадим CSS файл

const BoxShadowVictimParent = ({ settings }) => {
  // Формируем строку box-shadow из настроек
  const boxShadowString = `${settings.inset ? 'inset ' : ''}${settings.offsetX}px ${settings.offsetY}px ${settings.blurRadius}px ${settings.spreadRadius}px ${settings.color}`;

  // Стиль для центрального элемента
  const elementStyle = {
    width: '300px',
    height: '200px',
    backgroundColor: '#ffffff', // Белый фон для видимости тени
    border: '1px solid #ccc', // Тонкая граница
    boxShadow: boxShadowString,
    display: 'flex', // Для центрирования контента внутри
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div className="victim-parent box-shadow-victim-parent">
      <div className="shadow-target" style={elementStyle}>
        Элемент с тенью
      </div>
    </div>
  );
};

export default BoxShadowVictimParent;