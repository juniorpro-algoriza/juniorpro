import { DiamondIcon } from '@icons';
import { CalendarIcon } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  return (
    <div
      key={transaction.id}
      className='bg-white rounded-xl p-6 border border-antiflash-white shadow transition-shadow duration-200'
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div
            className={`p-2 rounded-lg ${
              transaction.transactionType === 'purchase'
                ? 'bg-green-100'
                : 'bg-blue-100'
            }`}
          >
            {transaction.icon}
          </div>

          <div>
            <h3 className='font-medium text-dark-electric-blue'>
              {transaction.title}
            </h3>
            <div className='flex items-center space-x-4 mt-1 font-light'>
              <div className='flex items-center text-sm text-dark-electric-blue'>
                <CalendarIcon className='w-4 h-4 mr-1' />
                Due: {transaction.date}
              </div>
              <div className='flex items-center text-sm text-dark-electric-blue'>
                <CalendarIcon className='w-4 h-4 mr-1' />
                Due: {transaction.dueDate}
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 items-end'>
          {transaction.status === 'Completed' && (
            <span className='px-3 py-1 bg-success-100 text-success-400 text-sm font-medium rounded-full'>
              Completed
            </span>
          )}

          <div className='text-right'>
            {transaction.transactionType === 'purchase' ? (
              <div>
                <div className='flex items-center text-success-400 font-medium space-x-1'>
                  <span>
                    <DiamondIcon fill='#41C980' />
                  </span>
                  +{transaction.points} Points
                  <span className='ml-2 text-storm-500'>
                    -{transaction.pointsUsed}
                  </span>
                </div>
              </div>
            ) : (
              <div className='text-violet-normal font-medium flex gap-1'>
                <DiamondIcon fill='#5879dc' /> Allocated {transaction.points}{' '}
                Points
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
