import React, { ReactNode } from "react";
import "./modal.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  if (show) {
    return (
      <div className="modal">
        <div className="content">
          <div className="closeButton">
            <button onClick={onClose}>x</button>
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  }
  return null;
}
