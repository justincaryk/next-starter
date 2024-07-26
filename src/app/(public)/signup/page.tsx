'use client';

import { useState } from 'react';

import RegisterForm from '@/components/register/register-form';

export default function SignupPage() {
  const [successfullyRegistered, setSuccessfullyRegistered] = useState(false);

  const onFormSubmitSuccess = () => {
    setSuccessfullyRegistered(true);
  };
  return (
    <>
      {successfullyRegistered ? (
        <div className="space-y-10">Successfully registered!</div>
      ) : (
        <RegisterForm onSuccess={onFormSubmitSuccess} />
      )}
    </>
  );
}
