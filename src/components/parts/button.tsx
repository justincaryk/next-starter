import classnames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  primary?: boolean;
  disabled?: boolean;
  asLink?: boolean;
  children: string | React.ReactNode;
}

export default function Button({ onClick, primary, disabled, children }: Props) {
  const baseStyles = `w-full px-6 py-2.5 border leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out`;
  const bgColor = primary ? 'bg-blue-md' : 'bg-white';
  const txtColor = primary ? 'text-white' : 'text-blue-dark';
  const hoverStyles = `${primary ? 'hover:bg-blue-light' : 'hover:bg-gray-200'}`;
  const disabledStyles = 'disabled:bg-gray-200 cursor-not-allowed hover:disabled:bg-gray-200';

  return (
    <button
      onClick={onClick}
      className={classnames({
        [baseStyles]: true,
        [bgColor]: true,
        [txtColor]: true,
        [hoverStyles]: true,
        [disabledStyles]: disabled,
      })}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
