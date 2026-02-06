// src/components/BoxShadowLayout.jsx
import React, { useState } from 'react';
import BoxShadowSettingsPanel from './BoxShadowSettingsPanel';
import BoxShadowVictimParent from './BoxShadowVictimParent';
import './BoxShadowLayout.css'; // Создадим CSS файл

const BoxShadowLayout = () => {
  // Состояние для хранения всех параметров box-shadow
  const [shadowSettings, setShadowSettings] = useState({
    offsetX: 0,
    offsetY: 0,
    blurRadius: 5,
    spreadRadius: 0,
    color: '#000000',
    inset: false,
  });

  // Функция для обновления настроек тени
  const updateShadowSetting = (property, value) => {
    setShadowSettings(prev => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <div className="box-shadow-layout">
      <BoxShadowSettingsPanel
        settings={shadowSettings}
        onUpdateSetting={updateShadowSetting}
      />
      <BoxShadowVictimParent
        settings={shadowSettings}
      />
    </div>
  );
};

export default BoxShadowLayout;