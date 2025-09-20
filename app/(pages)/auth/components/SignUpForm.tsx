'use client';

import {useFormState, useFormStatus} from 'react-dom';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {signUp} from '../server';
import {SignUpInputs} from './SignUpInputs';
import {SignUpRadio} from './SignUpRadio';
import {SocialLoginButtons} from './SocialLoginButtons';

const SignUpSubmitWrapper = ({children}: {children: React.ReactNode}) => {
  console.log('SignUpSubmitWrapper', children);
  const {pending} = useFormStatus();
  return <SignUpInputs isPending={pending} />;
};
export const SignUpForm = () => {
  const [state, formAction] = useFormState(signUp, {
    error: null,
    success: false,
  });

  useEffect(() => {
    const {error, success} = state;

    if (error) toast.error(error, {id: 'register-error'});
    else toast.dismiss('register-error');

    if (success) toast.success('Signed up');
  }, [state]);

  return (
    <form action={formAction} className="space-y-3">
      <SignUpRadio />
      <SocialLoginButtons />
      <SignUpSubmitWrapper children={<></>} />
    </form>
  );
};
