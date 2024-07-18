'use client';

import { ROUTES } from '@/types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '@/components/parts/button';
import FormField from '@/components/parts/form-field';
// import Input from '@/components/parts/input';
// import Label from '@/components/parts/label';
import PageTitle from '@/components/parts/page-title';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREDENTIALS_FORM_FIELDS, CredentialsFormSchema } from '../types';

// TODO: build API that always returns a valid jwt - except with a specific email
export default function Signin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CredentialsFormSchema),
  });

  const trySubmit = (data: Yup.InferType<typeof CredentialsFormSchema>) => {
    console.log({ data });
    router.push(ROUTES.OCCUPATION);
  };

  return (
    <div className="space-y-10">
      <PageTitle text={'Sign in.'} />
      <div>
        <form className="space-y-6" onSubmit={(e: FormEvent) => void handleSubmit(trySubmit)(e)}>
          <FormField
            label="Email"
            placeholder="email"
            errors={errors.email}
            {...register(CREDENTIALS_FORM_FIELDS.EMAIL)}
          />

          <FormField
            label="Password"
            placeholder="password"
            type="password"
            errors={errors.password}
            {...register(CREDENTIALS_FORM_FIELDS.PASSWORD)}
          />
          <Button primary type="submit">
            Submit
          </Button>
        </form>
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
