import { twMerge } from 'tailwind-merge';

const ColorsPage = () => {
  return (
    <div className='flex items-center justify-center gap-4 flex-wrap'>
      {colors.map((c) => {
        const className = twMerge(colorBlockStyle, c);
        return (
          <div className={className} key={c}>
            {c}
          </div>
        );
      })}
    </div>
  );
};

export default ColorsPage;

const colorBlockStyle =
  'border border-gray-400 w-28 h-28 py-2 px-2 flex items-center justify-center text-center rounded-2xl';

const colors = [
  'bg-primary-50',
  'bg-primary-100',
  'bg-primary-200',
  'bg-primary-300',
  'bg-primary-400',
  'bg-primary-500',
  'bg-primary-600',
  'bg-primary-700',
  'bg-primary-800',
  'bg-primary-900',
  'bg-primary-1000',
  'bg-secondary-50',
  'bg-secondary-100',
  'bg-secondary-200',
  'bg-secondary-300',
  'bg-secondary-400',
  'bg-secondary-500',
  'bg-secondary-600',
  'bg-secondary-700',
  'bg-secondary-800',
  'bg-secondary-900',
  'bg-secondary-1000',
  'bg-success-50',
  'bg-success-100',
  'bg-success-200',
  'bg-success-300',
  'bg-success-400',
  'bg-success-500',
  'bg-success-600',
  'bg-success-700',
  'bg-success-800',
  'bg-success-900',
  'bg-success-1000',
  'bg-rejected-50',
  'bg-rejected-100',
  'bg-rejected-200',
  'bg-rejected-300',
  'bg-rejected-400',
  'bg-rejected-500',
  'bg-rejected-600',
  'bg-rejected-700',
  'bg-rejected-800',
  'bg-rejected-900',
  'bg-rejected-1000',
  'bg-danger-300',
  'bg-danger-350',
  'bg-danger-400',
  'bg-danger-500',
];
