import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, title, children, size = "w-[90%] md:w-[50%]" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Outer Wrapper */}
      <div
        className={`relative ${size} max-h-[85vh] bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
