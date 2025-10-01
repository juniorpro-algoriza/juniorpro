'use client';

import { ProjectCard } from '@components';
import { EmptyData } from '@components/client';
import { getProjects } from '@server';
import type { Project } from '@types';
import { pickRandom } from '@utils';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SearchInput } from '../../../../components/client';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const { data: projectsData } = await getProjects({
          limit: 30,
          pageNum: 1,
                      });

        const completedProjects: Project[] = projectsData.map((p) => ({
          ...p,
          status: 'completed',
        }));

        const allProjects: Project[] = completedProjects.map((p) => ({
          ...p,
          juniors: ['Marwa', 'Anas ', pickRandom(['Adam', 'Samy'])],
        }));

        setProjects(allProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className='py-6'>
      <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary'>
        <div className='flex justify-between items-center px-1 py-2 xl:py-8 md:py-4 xl:px-6 md:px-2'>
          <h2 className='relative text-2xl font-medium left-2 top-1 text-yankees-blue'>
            Projects ({projects.length})
          </h2>
          <div className='flex items-center gap-2'>
            <SearchInput />
          </div>
        </div>

        {loading ? (
          <div className='w-full flex items-center justify-center h-full p-6'>
            <Loader2 className='animate-spin w-16 h-16 text-violet-normal' />
          </div>
        ) : (
          <div className='flex flex-wrap gap-2 px-1 xl:gap-6 md:px-2 xl:px-6 pb-6 overflow-auto max-h-[400px]'>
            {projects.length === 0 ? (
              <div className='w-full text-center py-12 text-gray-500'>
                <EmptyData description='No projects found' projectsNum={0} />
              </div>
            ) : (
              projects.map((p) => (
                <div
                  key={p.id}
                  className='basis-full md:basis-[calc(50%_-_10px)] flex-1 xl:basis-[calc(30%_-_30px)] xl:max-w-[calc(33%_-_10px)]'
                >
                  <ProjectCard
                    project={p}
                    showDescription={false}
                    showDueDate={true}
                    showJuniors={true}
                    showBadgeNextToDueDate={false}
                    showBadge={true}
                    showRating={false}
                    buttonText='View'
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
