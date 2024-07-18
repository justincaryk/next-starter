'use client';

import { ROUTES } from '@/types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Button from '@/components/parts/button';
import Input from '@/components/parts/input';
import PageTitle from '@/components/parts/page-title';

// TODO: create an API that pretends to sign up and returns a valid JWT
export default function Signup() {
  const router = useRouter();

  const trySubmit = () => {
    router.push(ROUTES.OCCUPATION);
  };

  return (
    <div className="space-y-10">
      <PageTitle text={'Create an account.'} />
      <div className="space-y-4">
        <Input placeholder="email" />
        <Input placeholder="password" type="password" />
        <Button primary onClick={trySubmit}>
          Register
        </Button>
      </div>
      <div className="w-full">
        <div className="mb-4 border-t" />
        <div className="flex justify-center text-sm">
          Already a user? &nbsp;{' '}
          <Link href={ROUTES.SIGNIN} className="underline cursor-pointer">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
