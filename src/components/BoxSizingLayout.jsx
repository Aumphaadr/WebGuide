// src/components/BoxSizingLayout.jsx
import React, { useState, useEffect } from 'react';
import BoxSizingSettingsPanel from './BoxSizingSettingsPanel';
import BoxSizingVictimParent from './BoxSizingVictimParent';
import BoxSizingIndividualSettingsModal from './BoxSizingIndividualSettingsModal';
import './BoxSizingLayout.css';

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

  const handleKeyDown = (e) => { // Вынесена функция
    if (e.key === 'Delete' && selectedElementId) {
      handleDeleteSelected();
    }
  };

  // Оборачиваем handleKeyDown в useCallback
  const memoizedHandleKeyDown = React.useCallback(handleKeyDown, [selectedElementId]);

  useEffect(() => {
    window.addEventListener('keydown', memoizedHandleKeyDown);
    return () => {
      window.removeEventListener('keydown', memoizedHandleKeyDown);
    };
  }, [memoizedHandleKeyDown]); // Теперь зависимости корректны

  const generateRandomHSL = () => {
    const hue = Math.floor(Math.random() * 360);
    const sat = 60 + Math.floor(Math.random() * 20);
    const light = 70 + Math.floor(Math.random() * 20);
    return `hsl(${hue}, ${sat}%, ${light}%)`;
  };

  const addChildElement = (type = 'div', parentId = null) => {
    const randomColor = generateRandomHSL();

    const newElement = {
      id: Date.now(),
      type: type,
      styles: {
          width: 300,
          height: 150,
          boxSizing: 'content-box',
          padding: 10,
          border: 1,
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