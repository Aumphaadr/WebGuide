# WebGuide - Интерактивный гайд по CSS

## Описание

WebGuide — это интерактивное веб-приложение, разработанное на React, которое служит визуальным и практическим руководством по основным и продвинутым свойствам CSS. Проект позволяет пользователям в реальном времени изменять CSS-свойства HTML-элементов и наблюдать за результатами, что делает процесс изучения CSS более интуитивным и понятным.

## Особенности

- **Интерактивность**: Изменяйте свойства CSS и мгновенно видите результат.
- **Модульная структура**: Каждый аспект CSS представлен в виде отдельного урока.
- **Визуализация**: Сложные концепции, такие как `position`, `box-sizing`, `transform`, визуализируются для лучшего понимания.
- **Реактивность**: Реализовано с использованием React, обеспечивающего отзывчивый и динамичный интерфейс.
- **Локальная разработка**: Проект может быть запущен локально, не требует серверной части.

## Установка и запуск

1.  **Клонируйте репозиторий**:
    ```bash
    git clone https://github.com/Aumphaadr/WebGuide.git
    cd WebGuide
    ```

2.  **Установите зависимости**:
    Убедитесь, что у вас установлен Node.js. Затем выполните:
    ```bash
    npm install
    ```
    *(Эта команда установит все зависимости, указанные в файле `package.json`)*

3.  **Запустите приложение в режиме разработки**:
    ```bash
    npm start
    ```
    Приложение будет доступно по адресу `http://localhost:3000` в вашем браузере.

## Структура проекта

```
your-project-name/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── DisplayLayout.jsx
│   │   ├── TypographyLayout.jsx
│   │   ├── BorderLayout.jsx
│   │   ├── MarginPaddingLayout.jsx
│   │   ├── WidthHeightLayout.jsx
│   │   ├── TransformLayout.jsx
│   │   ├── BoxSizingLayout.jsx
│   │   ├── BoxShadowLayout.jsx
│   │   └── PositionLayout.jsx
│   │   └── ... (и соответствующие CSS файлы)
│   ├── fonts/
│   │   └── ... (шрифты в формате woff2)
│   ├── fonts.css
│   ├── index.js
│   ├── App.js
│   └── App.css
├── package.json
├── README.md
└── ...
```

- `src/components/`: Здесь находятся компоненты React для каждого урока и вспомогательные компоненты.
- `src/fonts/` и `src/fonts.css`: Содержат шрифты и правила `@font-face` для урока по типографике.
- `src/App.js`: Главный компонент приложения, где подключаются все уроки.
- `public/index.html`: Основной HTML-шаблон.

## Уроки

1.  **Display (Позиционирование элементов)**: Изучение `display: block`, `inline`, `inline-block`.
2.  **Typography (Типографика)**: Настройка `font-family`, `font-size`, `font-weight`, `font-style`, `text-decoration`, `color`.
3.  **Border (Границы)**: Управление `border-style`, `border-width`, `border-color`, `border-radius`.
4.  **Margin & Padding (Внешние и внутренние отступы)**: Изменение `margin` и `padding` для разных сторон.
5.  **Width & Height (Ширина и высота)**: Установка `width` и `height`, понимание `auto`.
6.  **Transform (Трансформации)**: Применение `transform: translate`, `scale`, `skew`, `rotate`.
7.  **Box-Sizing (Размеры блока)**: Сравнение `content-box` и `border-box`.
8.  **Box-Shadow (Тени блоков)**: Настройка параметров `box-shadow`.
9.  **Position (Позиционирование)**: Изучение `position: static`, `relative`, `absolute`, `fixed`, `sticky`.

Каждый урок состоит из:
- Панели настроек (`settings-panel`).
- Области для элементов (`victim-parent`).
- (В большинстве случаев) Интерактивного модального окна для настройки выбранных элементов.

## Технологии

- **React**: Библиотека JavaScript для создания пользовательских интерфейсов.
- **React DOM**: Для рендеринга React-компонентов в DOM.
- **CSS Modules / Inline Styles**: Для стилизации компонентов.
- **Create React App**: Инструментарий для быстрого старта с React.

## Автор

Aumphaadr

## Лицензия

MIT License