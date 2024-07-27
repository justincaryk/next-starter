'use client';

import Link from 'next/link';
import { useState } from 'react';

import PageTitle from '@/components/parts/page-title';
import RegisterForm from '@/components/register/register-form';
import RegisterSuccess from '@/components/register/register-success';
import { ROUTES } from '@/constants';

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
        <div className="space-y-10">
          <PageTitle text={'Create an account.'} />
          <RegisterForm onSuccess={onFormSubmitSuccess} />
          <div className="w-full">
            <div className="pt-4 border-t flex justify-center text-sm">
              Already a user? &nbsp;{' '}
              <Link href={ROUTES.SIGNIN} className="underline cursor-pointer" role="link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
