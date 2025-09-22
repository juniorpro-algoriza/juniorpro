/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {Button, Input} from '@components';
import {EyeIcon, Loader} from 'lucide-react';
import {useFormStatus, useFormState} from 'react-dom';
import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {signIn} from '../server';
import {EyeCloseIcon} from '@icons';

const SubmitButton = () => {
  const {pending} = useFormStatus();

  return (
    <Button
      icon={pending ? <Loader className="animate-spin" /> : null}
      disabled={pending}
      type="submit"
      intent="primary"
      className="w-full rounded-xl bg-violet-normal"
      size="large">
      Login
    </Button>
  );
};

export const LoginForm = () => {
  const [state, formAction] = (useFormState as any)(signIn, {error: null});

  const [type, setType] = useState<'text' | 'password'>('password');

  useEffect(() => {
    const {error} = state;

    if (error) toast.error(error, {id: 'login-error'});
    else toast.dismiss('login-error');
  }, [state]);

  return (
    <form action={formAction} className="space-y-2">
      <Input
        name="email"
        label="Email"
        type="email"
        placeholder="Enter email address"
      />
      <div>
        <div className="relative">
          <Input
            name="password"
            label="Password"
            type={type}
            placeholder="Enter Password"
          />
          <div
            className="absolute right-5 top-1/2 cursor-pointer"
            onClick={() => setType(type === 'password' ? 'text' : 'password')}>
            {type === 'password' ? <EyeIcon /> : <EyeCloseIcon />}
          </div>
        </div>
        <div className="text-right pt-2">
          <a href="#" className="text-sm text-cadetGray font-medium">
            Forget Password?
          </a>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
};
