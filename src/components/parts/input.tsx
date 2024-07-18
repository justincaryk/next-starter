'use client';

import classnames from 'classnames';
import React, { InputHTMLAttributes, useState } from 'react';

export const baseInputClasses =
  'h-10 px-3 py-1.5 w-full text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:border-blue-md focus:outline-none';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef(
  ({ type, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [revealed, setRevealed] = useState(false);

    const togglePasswordReveal = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      e.stopPropagation();
      setRevealed(!revealed);
    };

    if (type === 'password') {
      return (
        <div
          className={classnames({
            'w-full flex justify-end items-center relative': true,
          })}
        >
          <input
            ref={ref}
            className={classnames({
              [baseInputClasses]: true,
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
        ref={ref}
        type="text"
        className={classnames({
          [baseInputClasses]: true,
        })}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';
