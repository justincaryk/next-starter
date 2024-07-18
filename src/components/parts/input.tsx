'use client';

import classnames from 'classnames';
import { InputHTMLAttributes, useState } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  autoFocus?: boolean;
}

export const baseInputClasses =
  'h-10 px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-blue-md focus:outline-none';
export const baseInputClassesFullWidth = `${baseInputClasses} block w-full`;

export default function Input({ className, autoFocus = false, ...rest }: InputProps) {
  const [revealed, setRevealed] = useState(false);

  const togglePasswordReveal = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    setRevealed(!revealed);
  };

  if (rest.type === 'password') {
    return (
      <div
        className={classnames({
          'w-full flex justify-end items-center relative': true,
          [className ?? '']: className ? true : false,
        })}
      >
        <input
          autoFocus={autoFocus}
          className={classnames({
            [baseInputClassesFullWidth]: true,
          })}
          {...rest}
          type={revealed ? 'text' : 'password'}
        />
        <img
          className="w-8 absolute right-2 cursor-pointer opacity-50"
          src={revealed ? 'icons/eye-slash.svg' : 'icons/eye.svg'}
          onClick={togglePasswordReveal}
          alt={revealed ? 'hide password' : 'show password'}
        />
      </div>
    );
  }

  return (
    <input
      autoFocus={autoFocus}
      type="text"
      className={classnames({
        [baseInputClassesFullWidth]: true,
        [className ?? '']: className ? true : false,
      })}
      {...rest}
    />
  );
}
