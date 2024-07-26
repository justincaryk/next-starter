import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
  asLink?: boolean;
  className?: string;
  children: string | React.ReactNode;
}

export default function Button({ onClick, primary, disabled, className = '', children }: Props) {
  const baseStyles = `w-full px-6 py-2.5 border leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out`;
  const bgColor = primary ? 'bg-blue-md' : 'bg-white';
  const txtColor = primary ? 'text-white' : 'text-blue-dark';
  const hoverStyles = `${primary ? 'hover:bg-blue-light' : 'hover:bg-gray-200'}`;
  const disabledStyles = disabled
    ? 'disabled:bg-gray-200 cursor-not-allowed hover:disabled:bg-gray-200'
    : '';

  const classes = twMerge(baseStyles, bgColor, txtColor, disabledStyles, hoverStyles, className);

  return (
    <button onClick={onClick} className={classes} {...(disabled ? { disabled: true } : {})}>
      {children}
    </button>
  );
}
