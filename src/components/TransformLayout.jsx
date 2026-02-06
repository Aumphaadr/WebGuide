// src/components/TransformLayout.jsx
import React, { useState, useEffect } from 'react';
import TransformSettingsPanel from './TransformSettingsPanel';
import TransformVictimParent from './TransformVictimParent';
import TransformIndividualSettingsModal from './TransformIndividualSettingsModal';
import './TransformLayout.css';

const TransformLayout = () => {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const getElementById = (id, items) => {
    for (let item of items) {
      if (item.id === id) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = getElementById(id, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const removeElementById = (id, items) => {
    return items.filter(item => item.id !== id).map(item => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: removeElementById(id, item.children)
        };
      }
      return item;
    });
  };

  const updateElementStylesById = (id, newStyles, items) => {
    return items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          styles: {
            ...item.styles,
            ...newStyles
          }
        };
      } else if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: updateElementStylesById(id, newStyles, item.children)
        };
      }
      return item;
    });
  };

  const handleUpdateElementStyles = (styles) => {
    if (!selectedElementId) return;
    setElements(prev => updateElementStylesById(selectedElementId, styles, prev));
  };

  // Оборачиваем handleDeleteSelected в useCallback
  const handleDeleteSelected = React.useCallback(() => {
    if (!selectedElementId) return;
    setElements(prev => removeElementById(selectedElementId, prev));
    setSelectedElementId(null);
  }, [selectedElementId]); // Зависимость: selectedElementId

  const handleCloseModal = () => {
    setSelectedElementId(null);
  };

  const handleShowModal = (elementRef) => {
    if (elementRef) {
      const rect = elementRef.getBoundingClientRect();
      setModalPosition({
        top: rect.top + window.scrollY - 40,
        left: rect.left + window.scrollX + rect.width / 2
      });
    }
  };

  const handleKeyDown = React.useCallback((e) => { // Оборачиваем handleKeyDown в useCallback
    if (e.key === 'Delete' && selectedElementId) {
      handleDeleteSelected(); // handleDeleteSelected теперь стабильна
    }
  }, [selectedElementId, handleDeleteSelected]); // Зависимости: selectedElementId, handleDeleteSelected

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Зависимость: handleKeyDown

  const generateRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 20);
    const light = 70 + Math.floor(Math.random() * 20);
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  };

  const addChildElement = (type = 'div', parentId = null) => {
    const randomColor = generateRandomHSL();
    const darkerColor = `hsl(${randomColor.match(/\d+/g)[0]}, ${randomColor.match(/\d+/g)[1]}%, ${Math.max(0, parseInt(randomColor.match(/\d+/g)[2]) - 20)}%)`;

    const newElement = {
      id: Date.now(),
      type: type,
      styles: {
          width: { value: 200, unit: 'px' },
          height: { value: 100, unit: 'px' },
          transform: {
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            rotate: 0,
          },
          backgroundColor: randomColor,
          realBackgroundColor: darkerColor,
      },
      children: [],
    };

    if (parentId === null) {
      setElements(prev => [...prev, newElement]);
    } else {
      setElements(prev => {
        const updateChildren = (items) => {
          return items.map(item => {
            if (item.id === parentId) {
              return {
                ...item,
                children: [...item.children, newElement]
              };
            } else if (item.children && item.children.length > 0) {
              return {
                ...item,
                children: updateChildren(item.children)
              };
            }
            return item;
          });
        };
        return updateChildren(prev);
      });
    }
  };

  const handleAddDiv = () => {
    if (selectedElementId) {
      addChildElement('div', selectedElementId);
    } else {
      addChildElement('div');
    }
  };
  const handleAddSpan = () => {
    if (selectedElementId) {
      addChildElement('span', selectedElementId);
    } else {
      addChildElement('span');
    }
  };
  const handleAddButton = () => {
    if (selectedElementId) {
      addChildElement('button', selectedElementId);
    } else {
      addChildElement('button');
    }
  };

  const handleClearAll = () => {
      setElements([]);
      setSelectedElementId(null);
  };

  const handleSelectElement = (id, elementRef) => {
    setSelectedElementId(id);
    if (id && elementRef) {
      handleShowModal(elementRef);
    }
  };

  return (
    <div className="transform-layout-container">
      <div className="main-layout">
        <TransformSettingsPanel
          onAddDiv={handleAddDiv}
          onAddSpan={handleAddSpan}
          onAddButton={handleAddButton}
          onClearAll={handleClearAll}
          selectedElementId={selectedElementId}
        />
        <TransformVictimParent
          elements={elements}
          onSelectElement={handleSelectElement}
          selectedElementId={selectedElementId}
        />
      </div>

      {selectedElementId && (
        <TransformIndividualSettingsModal
          elementId={selectedElementId}
          elementData={getElementById(selectedElementId, elements)}
          onUpdateStyles={handleUpdateElementStyles}
          onDelete={handleDeleteSelected}
          onClose={handleCloseModal}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default TransformLayout;