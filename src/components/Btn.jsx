import React from "react";

const Btn = ({ label = "", onClick, className = "", type = "button", disabled = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-semibold shadow transition duration-200
        bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed
        ${className}`}
    >
      {label}
    </button>
  );
};

export default Btn;
