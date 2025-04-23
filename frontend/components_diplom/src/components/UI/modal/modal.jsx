// components/UI/Modal.jsx
import React from 'react';
// import './Modal.css';

const Modal = ({ visible, onClose, children }) => {
    if (!visible) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;