// src/App.js
import React from 'react';
import DisplayLayout from './components/DisplayLayout';
import TypographyLayout from './components/TypographyLayout';
import BorderLayout from './components/BorderLayout';
import MarginPaddingLayout from './components/MarginPaddingLayout';
import WidthHeightLayout from './components/WidthHeightLayout';
import TransformLayout from './components/TransformLayout';
import BoxSizingLayout from './components/BoxSizingLayout';
import BoxShadowLayout from './components/BoxShadowLayout';
import PositionLayout from './components/PositionLayout'; // Импортируем девятый лейаут
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WebGuide - Интерактивный гайд по CSS</h1>
      </header>

      <DisplayLayout />
      <hr />
      <TypographyLayout />
      <hr />
      <BorderLayout />
      <hr />
      <MarginPaddingLayout />
      <hr />
      <WidthHeightLayout />
      <hr />
      <TransformLayout />
      <hr />
      <BoxSizingLayout />
      <hr />
      <BoxShadowLayout />
      <hr />
      <PositionLayout /> {/* Добавляем девятый лейаут */}
    </div>
  );
}

export default App;