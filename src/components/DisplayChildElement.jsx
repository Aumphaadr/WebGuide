// src/components/DisplayChildElement.jsx
import React, { forwardRef, useRef, useEffect } from 'react';
import './DisplayChildElement.css'; // Создадим CSS файл

const DisplayChildElement = forwardRef(({ elementData, isSelected, onSelect, selectedElementId }, ref) => {
  const elementRef = useRef(null);

  const { id, type, children, margin, padding } = elementData;

  useEffect(() => {
    // console.log("DisplayChildElement: Props updated for element ID:", id, "Props:", elementData);
  }, [elementData, id]);

  const Tag = type;

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(id, elementRef.current);
  };

  let highlightStyle = {};
  if (isSelected) {
    highlightStyle = { outline: '2px solid blue' };
  }

  return (
    <Tag
      ref={elementRef}
      className={`child-element ${type}`}
      style={{
        margin: `${margin}px`,
        padding: `${padding}px`,
        position: 'relative',
        ...highlightStyle
      }}
      onClick={handleClick}
    >
      <span className="element-tag-label top-left">{type === 'div' ? '<div>' : type === 'span' ? '<span>' : '<button>'}</span>
      <span className="element-content">Содержимое {type}</span>
      <span className="element-tag-label bottom-right">{type === 'div' ? '</div>' : type === 'span' ? '</span>' : '</button>'}</span>

      {children && children.length > 0 && (
        <div className="nested-container">
          {children.map(nestedEl => (
            <DisplayChildElement
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

export default DisplayChildElement;