import React, { ButtonHTMLAttributes } from 'react';

interface AtmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: any;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success" | "danger";
}

const sizeClasses = {
  sm: "py-1 px-3 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

const variantClasses = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white",
  success: "bg-green-500 hover:bg-green-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

const ATMButtonField: React.FC<AtmButtonProps> = ({
  label,
  size = "md",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`rounded ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? "bg-gray-300 cursor-not-allowed" : ""
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default ATMButtonField;
