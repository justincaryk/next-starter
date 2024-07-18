'use client';

import classnames from 'classnames';
import React, { InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';

const baseInputStyles =
  'h-10 px-3 py-1.5 w-full text-gray-700 bg-white border border-solid rounded transition ease-in-out m-0 focus:outline-none bg-clip-padding';
const cleanStyles = 'border-gray-300  focus:border-blue-md ';
const errorStyles = 'border-red-error  focus:border-red-error ';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError;
}

const Input = React.forwardRef(
  ({ type, errors, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
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
            id={rest.name}
            aria-invalid={errors?.message ? 'true' : 'false'}
            className={classnames({
              [baseInputStyles]: true,
              [cleanStyles]: !errors?.message,
              [errorStyles]: errors?.message,
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
        id={rest.name}
        type="text"
        aria-invalid={errors?.message ? 'true' : 'false'}
        className={classnames({
          [baseInputStyles]: true,
          [cleanStyles]: !errors?.message,
          [errorStyles]: errors?.message,
        })}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
