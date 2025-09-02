import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-950 rounded-xl shadow-2xl border border-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gray-950/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700">
            <h3 className="text-lg font-semibold text-gray-300">Full Calendar View</h3>
            <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-white text-2xl font-bold"
                aria-label="Close modal"
            >
                &times;
            </button>
        </div>
        <div className="p-4">
            {children}
        </div>
      </div>
    </div>
  );
};