import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className='w-full flex items-center justify-center h-full p-6'>
      <Loader2 className='animate-spin w-16 h-16' />
    </div>
  );
};

export default Loading;
