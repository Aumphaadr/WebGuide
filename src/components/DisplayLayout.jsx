// src/components/DisplayLayout.jsx
import React, { useState, useEffect } from 'react';
import DisplaySettingsPanel from './DisplaySettingsPanel';
import DisplayVictimParent from './DisplayVictimParent';
import DisplayIndividualSettingsModal from './DisplayIndividualSettingsModal';
import './DisplayLayout.css';

const DisplayLayout = () => {
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

  // Оборачиваем removeElementById в useCallback
  const removeElementById = React.useCallback((id, items) => {
    return items.filter(item => item.id !== id).map(item => {
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: removeElementById(id, item.children) // Рекурсивный вызов
        };
      }
      return item;
    });
  }, []);

  const updateElementTypeById = (id, newType, items) => {
    return items.map(item => {
      if (item.id === id) {
        return { ...item, type: newType };
      } else if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: updateElementTypeById(id, newType, item.children)
        };
      }
      return item;
    });
  };

  const handleUpdateElementType = (newType) => {
    if (!selectedElementId) return;
    setElements(prev => updateElementTypeById(selectedElementId, newType, prev));
  };

  // Оборачиваем handleDeleteSelected в useCallback
  const handleDeleteSelected = React.useCallback(() => {
    if (!selectedElementId) return;
    setElements(prev => removeElementById(selectedElementId, prev));
    setSelectedElementId(null);
  }, [selectedElementId, removeElementById]); // Зависимости: selectedElementId, removeElementById

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

  const handleKeyDown = React.useCallback((e) => {
    if (e.key === 'Delete' && selectedElementId) {
      handleDeleteSelected();
    }
  }, [selectedElementId, handleDeleteSelected]); // Зависимости: selectedElementId, handleDeleteSelected

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const addChildElement = (type = 'div', parentId = null) => {
    const newElement = {
      id: Date.now(),
      type: type,
      margin: 0,
      padding: 10,
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
    <div className="display-layout-container">
      <div className="main-layout">
        <DisplaySettingsPanel
          onAddDiv={handleAddDiv}
          onAddSpan={handleAddSpan}
          onAddButton={handleAddButton}
          onClearAll={handleClearAll}
          selectedElementId={selectedElementId}
        />
        <DisplayVictimParent
          elements={elements}
          onSelectElement={handleSelectElement}
          selectedElementId={selectedElementId}
        />
      </div>

      {selectedElementId && (
        <DisplayIndividualSettingsModal
          elementId={selectedElementId}
          elementData={getElementById(selectedElementId, elements)}
          onUpdateType={handleUpdateElementType}
          onDelete={handleDeleteSelected}
          onClose={handleCloseModal}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default DisplayLayout;