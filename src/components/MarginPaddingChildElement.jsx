// src/components/MarginPaddingChildElement.jsx
import React, { forwardRef, useRef, useEffect } from 'react';
import './MarginPaddingChildElement.css';

const MarginPaddingChildElement = forwardRef(({ elementData, isSelected, onSelect, selectedElementId }, ref) => {
  const elementRef = useRef(null);

  const { id, type, children, styles = {} } = elementData;

  useEffect(() => {
    console.log("ChildElement: Styles updated for element ID:", id, "New styles object:", styles);
  }, [styles, id]);

  const Tag = type;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id, elementRef.current);
  };

  // --- ВОССТАНОВЛЕННАЯ ЛОГИКА ВЫЧИСЛЕНИЯ STYLES ---
  // Теперь ?? работает корректно, так как все margin* и padding* всегда определены
  let elementStyle = {
    margin: `${styles.marginTop ?? 0}px ${styles.marginRight ?? 0}px ${styles.marginBottom ?? 0}px ${styles.marginLeft ?? 0}px`,
    padding: `${styles.paddingTop ?? 10}px ${styles.paddingRight ?? 10}px ${styles.paddingBottom ?? 10}px ${styles.paddingLeft ?? 10}px`,
    border: '1px solid #ccc',
    position: 'relative',
  };
  // --- /ВОССТАНОВЛЕННАЯ ЛОГИКА ---

  // --- ЛОГ ДЛЯ elementStyle ---
  console.log(`ChildElement: Computed elementStyle for ID ${id}:`, elementStyle);
  // --- /ЛОГ ---

  if (isSelected) {
    elementStyle.boxShadow = 'blue 0px 0px 0px 2px inset';
  }

  return (
    <Tag
      ref={elementRef}
      className={`child-element ${type}`}
      style={elementStyle}
      onClick={handleClick}
    >
      <span className="element-tag-label top-left">{type === 'div' ? '<div>' : '<span>'}</span>
      <span className="element-content">Содержимое {type}</span>
      <span className="element-tag-label bottom-right">{type === 'div' ? '</div>' : '</span>'}</span>

      {children && children.length > 0 && (
        <div className="nested-container">
          {children.map(nestedEl => (
            <MarginPaddingChildElement
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

export default MarginPaddingChildElement;