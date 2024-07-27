'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import SignInForm from '@/components/login/login-form';
import PageTitle from '@/components/parts/page-title';
import { COMPANY_NAME, ROUTES } from '@/constants';

export default function SigninPage() {
  const router = useRouter();

  const onFormSubmitSuccess = () => {
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <div className="space-y-10">
      <PageTitle text={'Sign in.'} />

      <SignInForm onSuccess={onFormSubmitSuccess} />

      <div className="w-full">
        <div className="pt-4 border-t flex justify-center text-sm">
          New to {COMPANY_NAME}? &nbsp;{' '}
          <Link href={ROUTES.SIGNUP} className="underline cursor-pointer" role="link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
