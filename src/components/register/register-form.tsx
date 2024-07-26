'use client';

import { RegisterAccountResponsePayload, ROUTES } from '@/types';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { AUTH_FORM_FIELDS, SignupSchema, weakPasswordErrorMsg } from '@/app/(public)/types';
import Button from '@/components/parts/button';
import FormField from '@/components/parts/form-field';
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

const options: OptionsType = {
  dictionary: {
    ...(zxcvbnCommonPackage.dictionary as OptionsDictionary),
    ...(zxcvbnEnPackage.dictionary as OptionsDictionary),
  },
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  translations: zxcvbnEnPackage.translations as TranslationKeys,
};
zxcvbnOptions.setOptions(options);

// TESTING ONLY: email@exists.com will return "email exists error"

interface RegisterFormProps {
  onSuccess: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  // const router = useRouter();
  const [passwordFeedback, setPasswordFeedback] = useState<FeedbackType | null>(null);
  const [passwordScore, setPasswordScore] = useState<Score>(0);

  const trySubmit = async (data: Yup.InferType<typeof SignupSchema>) => {
    if (passwordScore < 3) {
      return null;
    }

    try {
      const res = await fetch('/api/register-user', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const status = res.status;
      const result = (await res.json()) as RegisterAccountResponsePayload;

      if (status === 200) {
        if (result.code === 'ok') {
          onSuccess()
        } else if (result.code === 'email in use') {
          setError(AUTH_FORM_FIELDS.EMAIL, { message: 'Email is in use. Try another or log in' });
        }
      }
    } catch (error) {
      // TODO: create general form error state
      console.error('error', error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.currentTarget.value;
    const { score, feedback } = zxcvbn(pass);
    setPasswordFeedback(feedback);
    setPasswordScore(score);

    setValue(AUTH_FORM_FIELDS.PASSWORD, pass, {
      shouldValidate: true,
    });
  };

  const handlePasswordFieldBlur = () => {
    const { password } = getValues();
    if (password) {
      const isTooWeak = passwordScore < 3;

      if (isTooWeak) {
        setError(AUTH_FORM_FIELDS.PASSWORD, {
          message: weakPasswordErrorMsg,
        });
      }
    } else {
      // using setValue to allow react-hook-form to render to yup error message
      setValue(AUTH_FORM_FIELDS.PASSWORD, password, { shouldValidate: true });
    }
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
          <FormField
            label="Email"
            placeholder="email"
            type="email"
            errors={errors.email}
            {...register(AUTH_FORM_FIELDS.EMAIL)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const hasErrors = !!errors.email?.message;
              const newValue = e.currentTarget.value;
              setValue(AUTH_FORM_FIELDS.EMAIL, newValue, { shouldValidate: hasErrors });
            }}
            onBlur={() => {
              const { email } = getValues();
              setValue(AUTH_FORM_FIELDS.EMAIL, email, { shouldValidate: true });
            }}
          />

          <div className="space-y-3">
            <FormField
              label="Password"
              placeholder="password"
              errors={errors.password}
              type="password"
              aria-describedby="password-suggestion"
              {...register(AUTH_FORM_FIELDS.PASSWORD)}
              onChange={handlePasswordChange}
              onBlur={handlePasswordFieldBlur}
            />
            <ProgressBar score={passwordScore} />
            <div className="text-xs text-muted" aria-live="polite" id="password-suggestion">
              {getPasswordAssistText()}
            </div>
          </div>

          <Button primary type="submit">
            Register
          </Button>
        </form>
      </div>
      <div className="w-full">
        <div className="pt-4 border-t flex justify-center text-sm">
          Already a user? &nbsp;{' '}
          <Link href={ROUTES.SIGNIN} className="underline cursor-pointer" role="link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
