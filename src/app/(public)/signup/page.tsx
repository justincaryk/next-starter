'use client';

import { ROUTES } from '@/types';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

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
import { CREDENTIALS_FORM_FIELDS, CredentialsFormSchema, weakPasswordErrorMsg } from '../types';

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
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CredentialsFormSchema),
  });

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pass = e.currentTarget.value;
    const { score, feedback } = zxcvbn(pass);
    setPasswordFeedback(feedback);
    setPasswordScore(score);

    // the yup schema was not provided the password match test as the results are needed here
    // manual validation logic is required here.

    const hasErrors = !!errors.password?.message;

    // use case 1: no errors, just update and exit
    if (!hasErrors) {
      setValue(CREDENTIALS_FORM_FIELDS.PASSWORD, pass, {
        shouldValidate: false,
      });
      return;
    }

    // use case 2: has errors and valid => update, clear errors, exit
    const isStrongEnough = score > 2;
    const shouldClearErrors = hasErrors && isStrongEnough;

    // if hasErrors and strong enough => clear
    if (shouldClearErrors) {
      setValue(CREDENTIALS_FORM_FIELDS.PASSWORD, pass, {
        shouldValidate: true,
      });
      return;
    }

    // use case 3: has errors and still invalid => update state, update errors

    const passwordIsEmpty = !pass;

    // password is empty => use yup to render the default error
    if (passwordIsEmpty) {
      setValue(CREDENTIALS_FORM_FIELDS.PASSWORD, pass, {
        shouldValidate: true,
      });
      return;
    } else {
      setValue(CREDENTIALS_FORM_FIELDS.PASSWORD, pass, {
        shouldValidate: false,
      });
      setError(CREDENTIALS_FORM_FIELDS.PASSWORD, { message: weakPasswordErrorMsg });
    }
  };

  const handlePasswordFieldBlur = () => {
    const { password } = getValues();
    if (password) {
      const isTooWeak = passwordScore < 3;

      if (isTooWeak) {
        setError(CREDENTIALS_FORM_FIELDS.PASSWORD, {
          message: weakPasswordErrorMsg,
        });
      }
    } else {
      // using setValue to allow react-hook-form to render to yup error message
      setValue(CREDENTIALS_FORM_FIELDS.PASSWORD, password, { shouldValidate: true });
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
            errors={errors.email}
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

          <div className="space-y-3">
            <FormField
              label="Password"
              placeholder="password"
              errors={errors.password}
              type="password"
              aria-describedby="password-suggestion"
              {...register(CREDENTIALS_FORM_FIELDS.PASSWORD)}
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
        {/* <div className="mb-4 border-t" /> */}
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
