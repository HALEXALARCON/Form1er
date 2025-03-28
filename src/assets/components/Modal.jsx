import React, { useEffect } from "react";
import "./Modal.css";

function Modal({ openModal, closeModal, title = null, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && openModal) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openModal, closeModal]);

  if (!openModal) return null;

  return (
    <div className={`modal ${openModal ? "show-modal" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button
              className="modal-close-button"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
