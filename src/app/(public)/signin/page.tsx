'use client';

import { ROUTES, SigninResponsePayload } from '@/types';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '@/components/parts/button';
import FormField from '@/components/parts/form-field';
import PageTitle from '@/components/parts/page-title';
import { yupResolver } from '@hookform/resolvers/yup';
import { AUTH_FORM_FIELDS, SigninSchema } from '../types';

// TESTING ONLY:
// 1. email@exists.com will return "ok" and move forward
// 2. email@no-exist.com will return "not found"
// 3. all other will return "invalid credentials"

export default function Signin() {
  // const router = useRouter();
  const [signinError, setSigninError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SigninSchema),
  });

  const trySubmit = async (data: Yup.InferType<typeof SigninSchema>) => {
    console.log('data: ', data);
    try {
      const res = await fetch('/api/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const status = res.status;
      const result = (await res.json()) as SigninResponsePayload;

      if (status === 200) {
        if (result.code === 'ok') {
          // router.push(ROUTES.OCCUPATION);
        } else if (result.code === 'invalid credentials') {
          setSigninError('The email or password is incorrect');
        } else if (result.code === 'no user found') {
          setSigninError('No user was found');
        }
      }
    } catch (err) {
      // TODO: set general error
      console.error('error: ', err);
    }
  };

  return (
    <div className="space-y-10">
      <PageTitle text={'Sign in.'} />
      <div>
        <form className="space-y-6" onSubmit={(e: FormEvent) => void handleSubmit(trySubmit)(e)}>
          <FormField
            label="Email"
            placeholder="email"
            type='email'
            errors={errors.email}
            {...register(AUTH_FORM_FIELDS.EMAIL)}
          />

          <FormField
            label="Password"
            placeholder="password"
            type="password"
            errors={errors.password}
            {...register(AUTH_FORM_FIELDS.PASSWORD)}
          />

          <div className="text-red-error" role="alert">
            {signinError ? signinError : ''}
          </div>

          <Button primary type="submit">
            Submit
          </Button>
        </form>
      </div>
      <div className="w-full">
        <div className="pt-4 border-t flex justify-center text-sm">
          New to orca learn? &nbsp;{' '}
          <Link href={ROUTES.SIGNUP} className="underline cursor-pointer" role="link">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
