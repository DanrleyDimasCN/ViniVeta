import React from 'react';
import './ModalFiltro.css'; 

export default function ModalFiltro ({ isOpen, onClose, options, onSelect, title }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button onClick={onClose}>Fechar</button>
                </div>
                <ul className="modal-options">
                    {options && options.length > 0 ? (
                        options.map((option) => (
                            <li key={option} onClick={() => onSelect(option)}>
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className="modal-empty">Nenhuma opção disponível.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}