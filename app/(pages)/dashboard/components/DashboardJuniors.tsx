import { Button } from '@components';
import { ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';
import { getDashboardJuniors } from '../server';
import { EmptyData } from './EmptyData';

export const DashboardJuniors = async () => {
  const juniorsData = await getDashboardJuniors();

  return (
    <div className='mt-6'>
      <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary'>
        <div className='p-6'>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-medium text-yankees-blue'>
              Juniors ({juniorsData.length})
            </h3>
            {juniorsData.length ? (
              <Link href={'/juniors'}>
                <Button
                  intent='tertiary'
                  iconPosition='right'
                  size='small'
                  className='border-none text-unitedBlue'
                  icon={<ChevronRight className='w-4 h-4' />}
                >
                  View All
                </Button>
              </Link>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className='overflow-x-auto p-6'>
          {juniorsData.length ? (
            <table className='w-full shadow-sm'>
              <thead className='bg-[#F1F5FF] p-6'>
                <tr className='rounded-2xl'>
                  <th className='px-6 py-3 text-left font-medium rounded-tl-lg'>
                    Name
                  </th>
                  <th className='px-6 py-3 text-left font-medium'>Points</th>
                  <th className='px-6 py-3 text-left font-medium'>
                    Active Projects
                  </th>
                  <th className='px-6 py-3 text-left font-medium'>
                    Completed Projects
                  </th>
                  <th className='px-6 py-3 text-left font-medium rounded-tr-lg'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-bright-gray'>
                {juniorsData.map((junior) => (
                  <tr key={junior.id} className='hover:bg-gray-50'>
                    <td className='px-6 py-4 whitespace-nowrap text-left'>
                      <div className='flex items-center'>
                        <div className='text-sm font-medium text-[#40444C]'>
                          {junior.name}
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-[#40444C]'>
                        {junior.points}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-[#40444C]'>
                        {junior.activeProjects}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-[#40444C]'>
                        {junior.completedProjects}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <Button
                        intent='tertiary'
                        iconPosition='left'
                        size='small'
                        className='border-none text-unitedBlue p-0'
                        icon={<Eye className='w-4 h-4' />}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyData description='No juniors added yet' />
          )}
        </div>
      </div>
    </div>
  );
};
