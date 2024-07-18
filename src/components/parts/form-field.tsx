import React, { InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import Input from './input';
import Label from './label';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errors?: FieldError;
}

const FormField = React.forwardRef(
  ({ label, errors, ...rest }: FormFieldProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="space-y-3">
        {label ? <Label text={label} /> : null}
        <Input errors={errors} {...rest} ref={ref} />
        <div className="text-red-error">{errors?.message}</div>
      </div>
    );
  },
);

FormField.displayName = 'FormField';
export default FormField;
