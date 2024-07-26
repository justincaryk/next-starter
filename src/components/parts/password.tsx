'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';

import Input from './input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError;
}

const Password = React.forwardRef(
  ({ type, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [revealed, setRevealed] = useState(false);

    const togglePasswordReveal = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      e.stopPropagation();
      setRevealed(!revealed);
    };

    return (
      <div className="w-full flex justify-end items-center relative">
        <Input type={revealed ? 'text' : type} ref={ref} {...rest} />
        <img
          className="w-8 absolute right-2 cursor-pointer opacity-50"
          src={revealed ? 'icons/eye-slash.svg' : 'icons/eye.svg'}
          onClick={togglePasswordReveal}
          alt={revealed ? 'hide password' : 'show password'}
        />
      </div>
    );
  },
);

Password.displayName = 'Password';

export default Password;
