'use client';

import { ROUTES } from '@/types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import Button from '@/components/parts/button';
import Input from '@/components/parts/input';
import PageTitle from '@/components/parts/page-title';

// TODO: build API that always returns a valid jwt - except with a specific email
export default function Signin() {
  const router = useRouter();

  const trySubmit = () => {
    router.push(ROUTES.OCCUPATION);
  };

  return (
    <div className="space-y-10">
      <PageTitle text={'Sign in.'} />
      <div className="space-y-4">
        <Input placeholder="email" />
        <Input placeholder="password" type="password" />
        <Button primary onClick={trySubmit}>
          Submit
        </Button>
      </div>
      <div className="w-full">
        <div className="mb-4 border-t" />
        <div className="flex justify-center text-sm">
          New to orca learn? &nbsp;{' '}
          <Link href={ROUTES.SIGNUP} className="underline cursor-pointer">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
