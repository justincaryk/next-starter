'use client';

import { useState } from 'react';

import RegisterForm from '@/components/register/register-form';
import RegisterSuccess from '@/components/register/register-success';

export default function SignupPage() {
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  const onFormSubmitSuccess = () => {
    setSuccessfullyRegistered(true);
  };

  return (
    <>
      {successfullyRegistered ? (
        <RegisterSuccess />
      ) : (
        <RegisterForm onSuccess={onFormSubmitSuccess} />
      )}
    </>
  );
}
