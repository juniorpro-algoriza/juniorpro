import { Button } from '@components';
import { EmptyData } from '@components/client';
import { getProjectsData } from '@server';
import { Calendar, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const DashboardProjects = async () => {
  const projectsData = await getProjectsData();

  return (
    <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary p-6 space-y-4'>
      <div>
        <div className='flex items-center justify-between'>
          <h3 className='text-2xl font-medium text-yankees-blue'>
            Projects ({projectsData.length})
          </h3>
          {projectsData.length ? (
            <Link href={'./projects'}>
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

      <div>
        <div className='grid grid-cols-1 gap-4'>
          {projectsData.length ? (
            projectsData.map((project) => (
              <div key={project.id} className='rounded-lg overflow-hidden'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-antiflash-white'>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={166}
                    height={500}
                    className='w-fit h-full object-cover rounded-lg'
                  />
                  <div className='flex flex-col space-y-2 text-sm justify-center'>
                    <h2 className='text-unitedBlue font-medium '>
                      {project.title}
                    </h2>

                    <div className='flex items-center justify-between space-x-1 text-dark-electric-blue font-medium'>
                      <div className='flex items-center space-x-1'>
                        <Calendar className='w-4 h-4' />
                        <span>Due: {project.date}</span>
                      </div>
                      <span
                        className={`bg-orange-50 text-carrot-orange px-2 py-1 rounded-[40px] `}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div className='flex items-center space-x-2'>
                      <p className='text-dark-electric-blue'>
                        Junior:{' '}
                        <span className='text-yankees-blue'>
                          {project.junior}
                        </span>
                      </p>
                    </div>
                    <Button
                      intent='unset'
                      size='small'
                      className='border border-unitedBlue text-unitedBlue'
                    >
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <EmptyData description='No projects added yet' />
          )}
        </div>
      </div>
    </div>
  );
};
