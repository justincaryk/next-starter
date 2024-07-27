'use client';

import React, { InputHTMLAttributes, KeyboardEvent, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Input from './input';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldError;
}

const Password = React.forwardRef(
  ({ type, ...rest }: InputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [revealed, setRevealed] = useState(false);

    const togglePasswordReveal = (
      e: React.MouseEvent<SVGSVGElement, MouseEvent> | KeyboardEvent<SVGSVGElement>,
    ) => {
      e.stopPropagation();
      setRevealed(!revealed);
    };

    return (
      <div className="w-full flex justify-end items-center relative">
        <Input
          type={revealed ? 'text' : type}
          ref={ref}
          {...rest}
          // ensure spellcheck services don't send password over plain text
          spellCheck={false}
        />
        {/* wrapped in a button element for accessibility */}
        <button
          className="w-8 absolute right-2 cursor-pointer opacity-50 border-none"
          title={revealed ? 'hide password' : 'show password'}
          role="switch"
          aria-checked={revealed}
          aria-live="polite"
        >
          {revealed ? (
            <EyeIcon
              // these props need to be in the icon else, enter to submit in input propagates here.
              onClick={togglePasswordReveal}
              onKeyDown={(e) => {
                if (e.key === '13' || e.keyCode === 13) {
                  e.stopPropagation();
                  togglePasswordReveal(e);
                }
              }}
            />
          ) : (
            <EyeSlashIcon
              // these props need to be in the icon else, enter to submit in input propagates here.
              onClick={togglePasswordReveal}
              onKeyDown={(e) => {
                if (e.key === '13' || e.keyCode === 13) {
                  e.stopPropagation();
                  togglePasswordReveal(e);
                }
              }}
            />
          )}
        </button>
      </div>
    );
  },
);

Password.displayName = 'Password';

export default Password;
