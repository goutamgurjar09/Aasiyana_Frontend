import { RxCross2 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, title, children, size = "w-[90%] md:w-[50%]" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Outer Wrapper */}
      <div
        className={`relative ${size} max-h-[85vh] bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 text-center">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <RxCross2 size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

// import { RxCross2 } from "react-icons/rx";

// const Modal = ({ isOpen, onClose, title, children, size}) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-xs">
//       {/* Modal Box */}
//       <div
//         className={`relative ${size}  max-w-4xl bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-y-auto p-6 transition-all duration-300`}
//       >
//         {/* Close Button */}
//         <span
//           onClick={onClose}
//           className="absolute top-4 right-4 text-3xl font-bold cursor-pointer"
//         >
//          <RxCross2 size={24} />
//         </span>

//         {/* Title */}
//         {title && (
//           <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 border-b pb-2">
//             {title}
//           </h2>
//         )}

//         {/* Content */}
//         <div className="text-gray-700">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Modal;
