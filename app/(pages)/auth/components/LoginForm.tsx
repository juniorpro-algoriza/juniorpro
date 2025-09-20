'use client';

import {Button, Input} from '@components';
import {Loader} from 'lucide-react';
import {useFormState, useFormStatus} from 'react-dom';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {signIn} from '../server';

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
  const [state, formAction] = useFormState(signIn, {error: null});

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
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter Password"
        />
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
