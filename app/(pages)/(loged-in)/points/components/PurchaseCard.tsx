import { Button } from '@components';
import { Check } from 'lucide-react';
import { Plan } from '../types';

interface PurchaseCardProps {
  plan: Plan;
}

export const PurchaseCard = ({ plan }: PurchaseCardProps) => {
  const isStandard = plan.name === 'Standard';

  return (
    <div
      key={plan.name}
      className={`rounded-2xl p-6 shadow ${
        isStandard
          ? 'bg-violet-normal text-white border-0'
          : 'bg-white border border-antiflash-white'
      }`}
    >
      <div className='space-y-6'>
        <div>
          <h3
            className={`text-xl font-medium mb-2 ${
              isStandard ? 'text-white' : 'text-violet-normal'
            }`}
          >
            {plan.name}
          </h3>
          <p
            className={`${
              isStandard
                ? 'text-storm-200 opacity-90'
                : 'text-dark-electric-blue'
            }`}
          >
            {plan.description}
          </p>
        </div>

        <hr
          className='
            text-border-secondary'
        />

        <div
          className={`text-center ${
            isStandard ? 'text-white' : 'text-yankees-blue'
          }`}
        >
          <span className='text-3xl font-semibold'>{plan.points}</span>
          <span className='text-lg ml-1.5 font-medium'>Points</span>
        </div>

        <div className='space-y-3'>
          {plan.features.map((feature, featureIndex) => (
            <div key={featureIndex} className='flex items-center space-x-3'>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isStandard
                    ? 'border-white bg-white'
                    : 'border-violet-normal bg-violet-normal'
                }`}
              >
                <Check
                  className={`w-4 h-4 ${
                    isStandard ? 'text-violet-normal' : 'text-white'
                  }`}
                />
              </div>
              <span
                className={`font-normal ${
                  isStandard ? 'text-storm-200' : 'text-dark-electric-blue'
                }`}
              >
                {feature}
              </span>
            </div>
          ))}
        </div>

        <Button
          intent={'tertiary'}
          className={`w-full ${
            isStandard
              ? 'bg-white text-violet-normal border-0 font-medium'
              : 'text-violet-normal border-violet-normal'
          }`}
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};
