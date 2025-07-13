import { Input } from '@components';

const InputStylePage = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
      <Input label='Name' placeholder='Enter your name' />
      <Input label='Email' type='email' placeholder='Enter your email' />
      <Input
        label='Password'
        type='password'
        placeholder='Enter your password'
      />
      <Input label='Amount' placeholder='0.00' />
      <Input
        label='Email'
        placeholder='Enter email'
        error='Invalid email format'
      />
      <Input label='Username' placeholder='Enter username' disabled />
    </div>
  );
};

export default InputStylePage;
