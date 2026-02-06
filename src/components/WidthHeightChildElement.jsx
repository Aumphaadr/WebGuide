// src/components/WidthHeightChildElement.jsx
import React, { forwardRef, useRef, useEffect } from 'react';
import './WidthHeightChildElement.css'; // Создадим CSS файл

const WidthHeightChildElement = forwardRef(({ elementData, isSelected, onSelect, selectedElementId }, ref) => {
  const elementRef = useRef(null);

  const { id, type, children, styles = {} } = elementData;

  useEffect(() => {
    console.log("WHChildElement: Styles updated for element ID:", id, "New styles object:", styles);
  }, [styles, id]);

  const Tag = type;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id, elementRef.current);
  };

  // --- ВЫЧИСЛЕНИЕ СТИЛЕЙ WIDTH/HEIGHT ---
  const getWidthStyle = (widthObj) => {
    if (widthObj.value === 'auto') {
      return 'auto';
    } else {
      return `${widthObj.value}${widthObj.unit}`;
    }
  };

  const getHeightStyle = (heightObj) => {
    if (heightObj.value === 'auto') {
      return 'auto';
    } else {
      return `${heightObj.value}${heightObj.unit}`;
    }
  };

  let elementStyle = {
    width: getWidthStyle(styles.width),
    height: getHeightStyle(styles.height),
    position: 'relative', // Для абсолютного позиционирования меток
  };

  // Для inline-элементов убираем width/height из style, чтобы они не работали
  if (type === 'span') {
    delete elementStyle.width;
    delete elementStyle.height;
  }

  if (isSelected) {
    elementStyle.boxShadow = 'blue 0px 0px 0px 2px inset';
  }
  // --- /ВЫЧИСЛЕНИЕ СТИЛЕЙ ---

  // --- ЛОГ ДЛЯ elementStyle ---
  console.log(`WHChildElement: Computed elementStyle for ID ${id}:`, elementStyle);
  // --- /ЛОГ ---

  // --- ВЫЧИСЛЕНИЕ ТЕКСТА МЕТОК ---
  const widthLabel = styles.width?.value === 'auto' ? 'width: auto' : `width: ${styles.width?.value}${styles.width?.unit}`;
  const heightLabel = styles.height?.value === 'auto' ? 'height: auto' : `height: ${styles.height?.value}${styles.height?.unit}`;
  // --- /ВЫЧИСЛЕНИЕ ТЕКСТА МЕТОК ---

  return (
    <Tag
      ref={elementRef}
      className={`child-element ${type}`}
      style={elementStyle}
      onClick={handleClick}
    >

      <span className="element-tag-label top-left">{type === 'div' ? '<div>' : type === 'span' ? '<span>' : '<button>'}</span>
      <span className="element-content"><span className="dimension-label width-label">{widthLabel}</span>; <span className="dimension-label height-label">{heightLabel}</span></span>
      <span className="element-tag-label bottom-right">{type === 'div' ? '</div>' : type === 'span' ? '</span>' : '</button>'}</span>

      {children && children.length > 0 && (
        <div className="nested-container">
          {children.map(nestedEl => (
            <WidthHeightChildElement
              key={nestedEl.id}
              elementData={nestedEl}
              isSelected={nestedEl.id === selectedElementId}
              onSelect={onSelect}
              selectedElementId={selectedElementId}
            />
          ))}
        </div>
      )}
    </Tag>
  );
});

export default WidthHeightChildElement;