import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css'
import Header from '../header/Header';
import DraggableElement from '../draggableElement/DraggableElement';


const App: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });


  const handleZoomIn = (): void => setZoomLevel(zoomLevel + 10);
  const handleZoomOut = (): void => setZoomLevel(zoomLevel - 10);
  const handleZoomChange = (value: number): void => setZoomLevel(value);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    setScrollPosition({
      x: e.currentTarget.scrollLeft,
      y: e.currentTarget.scrollTop
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    const offsetX = e.clientX - dragStartPos.x;
    const offsetY = e.clientY - dragStartPos.y;
    setElementPosition({
      x: elementPosition.x + offsetX,
      y: elementPosition.y + offsetY
    });
    setDragStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const scrollContent = (direction: 'left' | 'right' | 'up' | 'down'): void => {
    const scrollContainer = document.getElementById('scrollable-container');
    if (scrollContainer) {
      const scrollAmount = 100;
      if (direction === 'left') {
        scrollContainer.scrollLeft -= scrollAmount;
      } else if (direction === 'right') {
        scrollContainer.scrollLeft += scrollAmount;
      } else if (direction === 'up') {
        scrollContainer.scrollTop -= scrollAmount;
      } else if (direction === 'down') {
        scrollContainer.scrollTop += scrollAmount;
      }
    }
  };

  return (
    <div>
       <Header
        zoomLevel={zoomLevel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
        handleZoomChange={handleZoomChange}
      />
      <main
        id="scrollable-container"
        className="scrollable-area"
        onScroll={handleScroll}
      >
        <div
          className="content"
          style={{
            transform: `scale(${zoomLevel / 100})`,
          }}
        >
          <div
            className="draggable"
            style={{
              transform: `translate(${elementPosition.x}px, ${elementPosition.y}px)`
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
           <DraggableElement/>
          </div>
        </div>
        <div className="arrow-container left" onClick={() => scrollContent('left')}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="arrow-container right" onClick={() => scrollContent('right')}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>
        <div className="arrow-container top" onClick={() => scrollContent('up')}>
          <i className="fa-solid fa-chevron-up"></i>
        </div>
        <div className="arrow-container bottom" onClick={() => scrollContent('down')}>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </main>
    </div>
  );
};

export default App;