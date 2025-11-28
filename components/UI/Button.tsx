import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#0a585b] text-white border-2 border-[#0a585b] hover:bg-[#063a3a] hover:border-[#063a3a] hover:shadow-lg shadow-[#0a585b]/20",
    outline: "bg-white text-[#0a585b] border-2 border-[#0a585b] hover:bg-[#0a585b] hover:text-white hover:shadow-lg shadow-[#0a585b]/20",
    ghost: "bg-transparent text-[#0a585b] hover:bg-gray-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};