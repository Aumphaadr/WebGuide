// src/components/PositionChildElement.jsx
import React, { forwardRef, useRef, useEffect } from 'react';
import './PositionChildElement.css';

const PositionChildElement = forwardRef(({ elementData, isSelected, onSelect, selectedElementId }, ref) => {
  const elementRef = useRef(null);

  const { id, type, children, styles = {} } = elementData;

  useEffect(() => {
    console.log("PositionChildElement: Styles updated for element ID:", id, "New styles object:", styles);
  }, [styles, id]);

  const Tag = type;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id, elementRef.current);
  };

  // --- ВЫЧИСЛЕНИЕ СТИЛЕЙ ---
  const elementStyle = {
    position: styles.position || 'static',
    display: styles.display || 'block',
    // Учитываем isAuto для top, right, bottom, left
    top: styles.position !== 'static' && !styles.top.isAuto ? `${styles.top.value}px` : undefined,
    right: styles.position !== 'static' && !styles.right.isAuto ? `${styles.right.value}px` : undefined,
    bottom: styles.position !== 'static' && !styles.bottom.isAuto ? `${styles.bottom.value}px` : undefined,
    left: styles.position !== 'static' && !styles.left.isAuto ? `${styles.left.value}px` : undefined,
    // Учитываем isAuto для zIndex
    zIndex: styles.position !== 'static' && !styles.zIndex.isAuto ? styles.zIndex.value : undefined,
    backgroundColor: styles.backgroundColor || '#eee',
    width: styles.width.isAuto ? 'auto' : `${styles.width.value}px`,
    height: styles.height.isAuto ? 'auto' : `${styles.height.value}px`,
    boxSizing: 'border-box',
  };

  if (isSelected) {
    elementStyle.boxShadow = 'blue 0px 0px 0px 2px inset';
  }
  // --- /ВЫЧИСЛЕНИЕ СТИЛЕЙ ---

  // --- ЛОГИ ---
  console.log(`PositionChildElement: Computed style for ID ${id}:`, elementStyle);
  // --- /ЛОГИ ---

  // Текст для отображения
  const positionText = `position: ${styles.position}`;
  const sizeText = `w: ${styles.width.isAuto ? 'auto' : `${styles.width.value}px`}, h: ${styles.height.isAuto ? 'auto' : `${styles.height.value}px`}`;
  const offsetText = `t: ${styles.top.isAuto ? 'auto' : `${styles.top.value}px`}, l: ${styles.left.isAuto ? 'auto' : `${styles.left.value}px`}`;
  const zIndexText = `z: ${styles.zIndex.isAuto ? 'auto' : styles.zIndex.value}`;

  return (
    <Tag
      ref={elementRef}
      className={`child-element ${type}`}
      style={elementStyle}
      onClick={handleClick}
    >
      <div className="position-info">
        <span className="position-label">{positionText}</span>
        <span className="size-label">{sizeText}</span>
        <span className="offset-label">{offsetText}</span>
        <span className="z-index-label">{zIndexText}</span>
      </div>

      <span className="element-tag-label top-left">{type === 'div' ? '<div>' : type === 'span' ? '<span>' : '<button>'}</span>
      <span className="element-content">Содержимое {type}</span>
      <span className="element-tag-label bottom-right">{type === 'div' ? '</div>' : type === 'span' ? '</span>' : '</button>'}</span>

      {children && children.length > 0 && (
        <div className="nested-container">
          {children.map(nestedEl => (
            <PositionChildElement
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

export default PositionChildElement;