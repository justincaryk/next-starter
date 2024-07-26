'use client';

import React, { InputHTMLAttributes, useImperativeHandle, useRef } from 'react';
import { FieldError } from 'react-hook-form';

import Input from './input';
import Label from './label';
import Password from './password';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: FieldError;
  name: string;
}

const FormField = React.forwardRef(
  ({ label, errors, name, ...rest }: FormFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Expose the inputRef through the forwarded ref
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleLabelClick = () => {
      inputRef?.current?.focus();
    };

    return (
      <div className="space-y-2">
        {label ? <Label text={label} htmlFor={name} onClick={handleLabelClick} /> : null}
        {rest.type === 'password' ? (
          <Password errors={errors} name={name} {...rest} ref={ref} />
        ) : (
          <Input errors={errors} name={name} {...rest} ref={ref} />
        )}

        <div className="text-red-error " role="alert">
          {errors?.message}
        </div>
      </div>
    );
  },
);

FormField.displayName = 'FormField';
export default FormField;
