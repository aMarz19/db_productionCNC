'use client';

const Modal = ({ isOpen, title, onClose, children, className = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className={`w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl ${className}`}>
        <div className="flex items-center justify-between bg-linear-to-r from-blue-600 to-cyan-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button type="button" onClick={onClose} className="text-white text-xl leading-none">
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
