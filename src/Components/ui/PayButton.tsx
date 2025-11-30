import React from "react";

interface PayButtonProps {
  OnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ClassName?: string;
  IsPayButtonDisabled?: boolean
}

const PayButton: React.FC<PayButtonProps> = ({ OnClick, ClassName, IsPayButtonDisabled }) => {
  const isPayButtonDisabled = IsPayButtonDisabled; // ejemplo, define tu lógica real

  return (
    <button
    type="button"
      onClick={OnClick}
      disabled={isPayButtonDisabled}
      className={`
        py-2 px-4 rounded-lg font-semibold shadow-md 
        transition-colors duration-200
        ${
            isPayButtonDisabled
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }
        ${ClassName}
      `}
    >
      PayButton
    </button>
  );
};

export default PayButton;
