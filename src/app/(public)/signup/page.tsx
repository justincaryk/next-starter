'use client';

import { ROUTES } from '@/types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import Button from '@/components/parts/button';
import { Input } from '@/components/parts/input';
import Label from '@/components/parts/label';
import PageTitle from '@/components/parts/page-title';
import ProgressBar from '@/components/parts/progress-bar';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FeedbackType,
  OptionsDictionary,
  OptionsType,
  Score,
  TranslationKeys,
  zxcvbn,
  zxcvbnOptions,
} from '@zxcvbn-ts/core';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { CREDENTIALS_FORM_FIELDS, CredentialsFormSchema } from '../types';

const options: OptionsType = {
  dictionary: {
    ...(zxcvbnCommonPackage.dictionary as OptionsDictionary),
    ...(zxcvbnEnPackage.dictionary as OptionsDictionary),
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  translations: zxcvbnEnPackage.translations as TranslationKeys,
};
zxcvbnOptions.setOptions(options);

// TODO: create an API that pretends to sign up and returns a valid JWT
export default function Signup() {
  const router = useRouter();
  const [passwordFeedback, setPasswordFeedback] = useState<FeedbackType | null>(null);
  const [passwordScore, setPasswordScore] = useState<Score>(0);

  const trySubmit = (data: Yup.InferType<typeof CredentialsFormSchema>) => {
    console.log('data: ', data);
    router.push(ROUTES.OCCUPATION);
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CredentialsFormSchema),
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.currentTarget.value;
    const { score, feedback } = zxcvbn(pass);
    setPasswordFeedback(feedback);
    setPasswordScore(score);

    setValue(CREDENTIALS_FORM_FIELDS.PASSWORD, pass);
  };

  const getPasswordAssistText = (): string => {
    if (passwordScore === 3) {
      return "Nice! That's a solid password!";
    }
    if (passwordScore === 4) {
      return "Very nice! That's a fantastic password!";
    }

    if (passwordFeedback) {
      return passwordFeedback?.suggestions.join(' ') || '';
    }

    return 'Use multiple words, but avoid common phrases. You can create strong passwords without using symbols, numbers, or uppercase letters.';
  };

  return (
    <div className="space-y-10">
      <PageTitle text={'Create an account.'} />
      <div>
        <form className="space-y-6" onSubmit={(e: FormEvent) => void handleSubmit(trySubmit)(e)}>
          <div className="space-y-3">
            <Label text="Email" />
            <Input
              placeholder="email"
              {...register(CREDENTIALS_FORM_FIELDS.EMAIL)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const hasErrors = !!errors.email?.message;
                const newValue = e.currentTarget.value;
                setValue(CREDENTIALS_FORM_FIELDS.EMAIL, newValue, { shouldValidate: hasErrors });
              }}
              onBlur={() => {
                const { email } = getValues();
                setValue(CREDENTIALS_FORM_FIELDS.EMAIL, email, { shouldValidate: true });
              }}
            />
            <div className="text-red-error">{errors.email?.message}</div>
          </div>
          <div className="space-y-3">
            <Label text="Password" />
            <Input
              placeholder="password"
              type="password"
              {...register(CREDENTIALS_FORM_FIELDS.PASSWORD)}
              onChange={handlePasswordChange}
            />
            <ProgressBar score={passwordScore} />
            <div className="text-xs text-muted">{getPasswordAssistText()}</div>
          </div>
          <Button primary type="submit">
            Register
          </Button>
        </form>
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
