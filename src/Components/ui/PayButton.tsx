import React from "react";

interface PayButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isPayButtonDisabled?: boolean;
  children?: React.ReactNode;
}

const PayButton: React.FC<PayButtonProps> = ({ 
  onClick, 
  className, 
  isPayButtonDisabled = false,
  children = "Pagar"
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPayButtonDisabled}
      className={`
        py-2 px-4 rounded-lg font-semibold shadow-md 
        transition-colors duration-200
        ${
          isPayButtonDisabled
            ? "bg-gray-400 cursor-not-allowed text-gray-700"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }
        ${className || ""}
      `}
    >
      {children}
    </button>
  );
};

export default PayButton;
