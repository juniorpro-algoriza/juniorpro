import { Button, Input } from '@components';

export const LoginForm = () => (
  <>
    <Input label='Email' type='email' placeholder='Enter email address' />
    <div>
      <Input label='Password' type='password' placeholder='Enter Password' />
      <div className='text-right pt-2'>
        <a href='#' className='text-sm text-cadetGray font-medium'>
          Forget Password?
        </a>
      </div>
    </div>
    <Button variant='primary' className='w-full rounded-xl' size='large'>
      Login
    </Button>
  </>
);
