// src/components/TransformChildElement.jsx
import React, { forwardRef, useRef, useEffect } from 'react';
import './TransformChildElement.css'; // Создадим CSS файл

const TransformChildElement = forwardRef(({ elementData, isSelected, onSelect, selectedElementId }, ref) => {
  const elementRef = useRef(null);

  const { id, type, children, styles = {} } = elementData;

  useEffect(() => {
    console.log("TransformChildElement: Styles updated for element ID:", id, "New styles object:", styles);
  }, [styles, id]);

  const Tag = type;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id, elementRef.current);
  };

  // --- ВЫЧИСЛЕНИЕ СТИЛЕЙ ---
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

  const getTransformStyle = (transformObj) => {
    const { translateX, translateY, scaleX, scaleY, skewX, skewY, rotate } = transformObj;
    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY}) skew(${skewX}deg, ${skewY}deg) rotate(${rotate}deg)`;
  };

  const getDisplayStyle = (display) => {
    if (type === 'span') {
      return 'inline'; // Для span используем inline
    }
    else if (type === 'button') {
      return 'inline-block'; // Для button используем inline-block
    }
    else if (type === 'div') {
      return 'block'; // Для div используем block
    }
  }

  // Стиль для реальной геометрии (без transform)
  const realStyle = {
    position: 'absolute', // Для overlay
    width: getWidthStyle(styles.width),
    height: getHeightStyle(styles.height),
    backgroundColor: styles.realBackgroundColor || '#ccc', // Цвет реальной геометрии
    zIndex: 1, // Под видимым элементом
  };

  // Стиль для видимого элемента (с transform)
  const visibleStyle = {
    width: getWidthStyle(styles.width),
    height: getHeightStyle(styles.height),
    backgroundColor: styles.backgroundColor || '#eee', // Цвет видимого элемента
    transform: getTransformStyle(styles.transform),
    position: 'relative',
    zIndex: 2, // Над реальной геометрией
  };

  if (isSelected) {
    // Добавим обводку к видимому элементу для подсветки
    visibleStyle.boxShadow = 'blue 0px 0px 0px 2px inset';
  }
  // --- /ВЫЧИСЛЕНИЕ СТИЛЕЙ ---

  // --- ЛОГИ ---
  console.log(`TransformChildElement: Real style for ID ${id}:`, realStyle);
  console.log(`TransformChildElement: Visible style for ID ${id}:`, visibleStyle);
  // --- /ЛОГИ ---

  return (
    // Убираем display: inline-block из стиля контейнера
    <div className="transform-container" style={{ position: 'relative', display: getDisplayStyle(styles.display) }} onClick={handleClick}>
      {/* Реальная геометрия */}
      <Tag
        ref={elementRef}
        className={`child-element ${type} real-geometry`}
        style={realStyle}
      />
      {/* Видимый элемент */}
      <Tag
        className={`child-element ${type} visible-element`}
        style={visibleStyle}
      >
        <span className="element-tag-label top-left">{type === 'div' ? '<div>' : type === 'span' ? '<span>' : '<button>'}</span>
        <span className="element-content">Содержимое {type}</span>
        <span className="element-tag-label bottom-right">{type === 'div' ? '</div>' : type === 'span' ? '</span>' : '</button>'}</span>
      </Tag>

      {children && children.length > 0 && (
        <div className="nested-container">
          {children.map(nestedEl => (
            <TransformChildElement
              key={nestedEl.id}
              elementData={nestedEl}
              isSelected={nestedEl.id === selectedElementId}
              onSelect={onSelect}
              selectedElementId={selectedElementId}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TransformChildElement;