import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ visible, onCancel, onConfirm }) => {
  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  if (!visible) {
    return null;
  }

  const modalRoot: Element | null = document.getElementById('modal-root');

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-content">
        <h4>What do you want to create?</h4>
        <div className="modal-buttons">
          <div onClick={onConfirm}>CATEGORY</div>
          <div onClick={onCancel}>SERVICE</div>
        </div>
      </div>
    </div>,
    modalRoot as Element
  );
};

export default Modal;
