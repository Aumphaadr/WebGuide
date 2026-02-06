// src/components/BorderLayout.jsx
import React, { useState } from 'react';
import BorderSettingsPanel from './BorderSettingsPanel';
import BorderVictimParent from './BorderVictimParent';
import './BorderLayout.css';

const BorderLayout = () => {
  const [allStyles, setAllStyles] = useState({
    style: 'solid',
    width: 1,
    color: '#000000',
    radius: 0,
  });

  const [sideStyles, setSideStyles] = useState({
    top: {
      style: 'solid',
      width: 1,
      color: '#000000',
      enabled: false,
    },
    bottom: {
      style: 'solid',
      width: 1,
      color: '#000000',
      enabled: false,
    },
    left: {
      style: 'solid',
      width: 1,
      color: '#000000',
      enabled: false,
    },
    right: {
      style: 'solid',
      width: 1,
      color: '#000000',
      enabled: false,
    },
  });

  const updateAllStyle = (property, value) => {
    setAllStyles(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const updateSideStyle = (side, property, value) => {
    setSideStyles(prev => ({
      ...prev,
      [side]: {
        ...prev[side],
        [property]: value
      }
    }));
  };

  const resetSideStyle = (side) => {
    setSideStyles(prev => ({
      ...prev,
      [side]: {
        style: allStyles.style,
        width: allStyles.width,
        color: allStyles.color,
        enabled: false,
      }
    }));
  };

  // --- ОБНОВЛЁННАЯ ЛОГИКА COMBINED STYLES ---
  const combinedStyles = {
    // borderRadius - не зависит от сторон, всегда из "all"
    borderRadius: `${allStyles.radius}px`,

    // borderStyle - определяем для каждой стороны
    borderTopStyle: sideStyles.top.enabled ? sideStyles.top.style : allStyles.style,
    borderBottomStyle: sideStyles.bottom.enabled ? sideStyles.bottom.style : allStyles.style,
    borderLeftStyle: sideStyles.left.enabled ? sideStyles.left.style : allStyles.style,
    borderRightStyle: sideStyles.right.enabled ? sideStyles.right.style : allStyles.style,

    // borderWidth - определяем для каждой стороны
    borderTopWidth: `${sideStyles.top.enabled ? sideStyles.top.width : allStyles.width}px`,
    borderBottomWidth: `${sideStyles.bottom.enabled ? sideStyles.bottom.width : allStyles.width}px`,
    borderLeftWidth: `${sideStyles.left.enabled ? sideStyles.left.width : allStyles.width}px`,
    borderRightWidth: `${sideStyles.right.enabled ? sideStyles.right.width : allStyles.width}px`,

    // borderColor - определяем для каждой стороны
    borderTopColor: sideStyles.top.enabled ? sideStyles.top.color : allStyles.color,
    borderBottomColor: sideStyles.bottom.enabled ? sideStyles.bottom.color : allStyles.color,
    borderLeftColor: sideStyles.left.enabled ? sideStyles.left.color : allStyles.color,
    borderRightColor: sideStyles.right.enabled ? sideStyles.right.color : allStyles.color,
  };
  // --- /ОБНОВЛЁННАЯ ЛОГИКА ---

  return (
    <div className="border-layout">
      <BorderSettingsPanel
        allStyles={allStyles}
        sideStyles={sideStyles}
        onUpdateAllStyle={updateAllStyle}
        onUpdateSideStyle={updateSideStyle}
        onResetSideStyle={resetSideStyle}
      />
      <BorderVictimParent
        styles={combinedStyles}
      />
    </div>
  );
};

export default BorderLayout;