// src/components/BoxSizingChildElement.jsx
import React, { forwardRef, useRef, useEffect } from 'react';
import './BoxSizingChildElement.css'; // Создадим CSS файл

const BoxSizingChildElement = forwardRef(({ elementData, isSelected, onSelect, selectedElementId }, ref) => {
  const elementRef = useRef(null);

  const { id, type, children, styles = {} } = elementData;

  useEffect(() => {
    console.log("BoxSizingChildElement: Styles updated for element ID:", id, "New styles object:", styles);
  }, [styles, id]);

  const Tag = type;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id, elementRef.current);
  };

  // --- ВЫЧИСЛЕНИЕ СТИЛЕЙ ---
  const elementStyle = {
    width: `${styles.width}px`,
    height: `${styles.height}px`,
    padding: `${styles.padding}px`,
    border: `${styles.border}px solid #000`, // Упрощённый чёрный бордер
    backgroundColor: styles.backgroundColor || '#eee',
    boxSizing: styles.boxSizing || 'content-box',
    position: 'relative', // Для позиционирования меток
    display: type === 'div' ? 'block' : 'inline-block', // Установим display
  };

  if (isSelected) {
    elementStyle.boxShadow = 'blue 0px 0px 0px 2px inset';
  }
  // --- /ВЫЧИСЛЕНИЕ СТИЛЕЙ ---

  // --- ЛОГИ ---
  console.log(`BoxSizingChildElement: Computed style for ID ${id}:`, elementStyle);
  // --- /ЛОГИ ---

  // Текст для отображения
  const sizeText = `width: ${styles.width}px; height: ${styles.height}px`;

  // Текст для отображения computed size (визуально, не точно, но демонстрирует разницу)
  // В реальности computed size зависит от boxSizing, padding, border
  const computedWidth = styles.boxSizing === 'border-box' ? styles.width : parseInt(styles.width) + (styles.padding * 2) + (styles.border * 2);
  const computedHeight = styles.boxSizing === 'border-box' ? styles.height : parseInt(styles.height) + (styles.padding * 2) + (styles.border * 2);
  const computedSizeText = `computed: ${computedWidth}x${computedHeight}px`;

  return (
    <Tag
      ref={elementRef}
      className={`child-element ${type}`}
      style={elementStyle}
      onClick={handleClick}
    >
      
      <span className="element-tag-label top-left">{type === 'div' ? '<div>' : type === 'span' ? '<span>' : '<button>'}</span>
      <div className="size-labels">
        <span className="size-label">{sizeText}</span><br />
        <span className="size-label computed">{computedSizeText}</span><br />
        <span className="size-label boxSizing">box-sizing: {styles.boxSizing}</span>
      </div>
      <span className="element-tag-label bottom-right">{type === 'div' ? '</div>' : type === 'span' ? '</span>' : '</button>'}</span>

      {children && children.length > 0 && (
        <div className="nested-container">
          {children.map(nestedEl => (
            <BoxSizingChildElement
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

export default BoxSizingChildElement;