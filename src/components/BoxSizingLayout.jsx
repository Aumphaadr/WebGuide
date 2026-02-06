// src/components/BoxSizingLayout.jsx
import React, { useState, useEffect } from 'react';
import BoxSizingSettingsPanel from './BoxSizingSettingsPanel';
import BoxSizingVictimParent from './BoxSizingVictimParent';
import BoxSizingIndividualSettingsModal from './BoxSizingIndividualSettingsModal';
import './BoxSizingLayout.css'; // Создадим CSS файл

const BoxSizingLayout = () => {
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
    // console.log('Layout: handleUpdateElementStyles called for selectedElementId:', selectedElementId, 'with styles:', styles);
    setElements(prev => updateElementStylesById(selectedElementId, styles, prev));
  };

  const handleDeleteSelected = () => {
    if (!selectedElementId) return;
    setElements(prev => removeElementById(selectedElementId, prev));
    setSelectedElementId(null);
  };

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

  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedElementId) {
      handleDeleteSelected();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedElementId]);

  // --- ФУНКЦИЯ ГЕНЕРАЦИИ ЦВЕТА ---
  const generateRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 20); // 60-80%
    const light = 70 + Math.floor(Math.random() * 20); // 70-90%
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  };
  // --- /ФУНКЦИЯ ГЕНЕРАЦИИ ЦВЕТА ---

  const addChildElement = (type = 'div', parentId = null) => {
    const randomColor = generateRandomHSL();

    const newElement = {
      id: Date.now(),
      type: type,
      styles: {
          width: 300, // Начальное значение для ширины (число)
          height: 150, // Начальное значение для высоты (число)
          boxSizing: 'content-box', // Начальное значение для box-sizing
          padding: 10, // Начальное значение для padding (число)
          border: 1, // Начальное значение для border (число)
          backgroundColor: randomColor,
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
    <div className="box-sizing-layout-container">
      <div className="main-layout">
        <BoxSizingSettingsPanel
          onAddDiv={handleAddDiv}
          onAddSpan={handleAddSpan}
          onAddButton={handleAddButton}
          onClearAll={handleClearAll}
          selectedElementId={selectedElementId}
        />
        <BoxSizingVictimParent
          elements={elements}
          onSelectElement={handleSelectElement}
          selectedElementId={selectedElementId}
        />
      </div>

      {selectedElementId && (
        <BoxSizingIndividualSettingsModal
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

export default BoxSizingLayout;