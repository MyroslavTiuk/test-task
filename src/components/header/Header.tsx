import React, { useState, useEffect, useRef } from 'react';
import './Header.css'

interface HeaderComponentProps {
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  handleZoomChange: (value: number) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  zoomLevel,
  handleZoomIn,
  handleZoomOut,
  handleZoomChange
}) => {
  const [isOptionsOpen, setOptionsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    setOptionsOpen(!isOptionsOpen);
  };

  const handleOptionClick = (value: number) => {
    handleZoomChange(value);
    setOptionsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="header-left">
        <h1>Services</h1>
        <div>0</div>
      </div>
      <div className="header-right">
        <div className="list-button">LIST VIEW</div>
        <div className="controls-button plane-icon">
          <i className="fa-solid fa-location-arrow"></i>
        </div>
        <div className="zoom-controls">
          <div className="controls-button" onClick={handleZoomOut}>
            -
          </div>
          <div className={`custom-select-container ${isOptionsOpen ? 'open' : ''}`} ref={optionsRef}>
            <div className="custom-select" onClick={handleSelectClick}>
              {zoomLevel}%
            </div>
            {isOptionsOpen && (
              <div className="options">
                <div className="option" onClick={() => handleOptionClick(40)}>
                  30%
                </div>
                <div className="option" onClick={() => handleOptionClick(30)}>
                  40%
                </div>
                <div className="option" onClick={() => handleOptionClick(50)}>
                  50%
                </div>
                <div className="option" onClick={() => handleOptionClick(100)}>
                  100%
                </div>
                <div className="option" onClick={() => handleOptionClick(150)}>
                  150%
                </div>
                <div className="option" onClick={() => handleOptionClick(200)}>
                  200%
                </div>
              </div>
            )}
          </div>
          <div className="controls-button" onClick={handleZoomIn}>
            +
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
