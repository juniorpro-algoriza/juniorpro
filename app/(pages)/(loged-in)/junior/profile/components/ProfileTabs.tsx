'use client';

import { ProjectCard } from '@components';
import { EmptyData, Tabs } from '@components/client';
import { GlobeIcon, LinkedInIcon, LocationIcon, MailIcon } from '@icons';
import { getProjects } from '@server';
import type { Project } from '@types';
import { pickRandom } from '@utils';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TabData } from '../../../../../components/types';
import { SearchInput } from '../../../contributor/projects/components';

export const ProfileTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery] = useState('');
  const [selectedJunior] = useState('all juniors');

  // Load projects when component mounts or filters change
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const { data: projectsData } = await getProjects({
          limit: 30,
          pageNum: 1,
          projectType: 'all',
        });

        const completedProjects: Project[] = projectsData.map((p) => ({
          ...p,
          status: 'completed',
        }));

        let allProjects: Project[] = completedProjects;
        if (selectedJunior === 'all juniors') {
          allProjects = completedProjects
            .map((p) => ({
              ...p,
              juniors: ['Marwa', 'Anas ', pickRandom(['Adam', 'Samy'])],
            }))
            .filter((_, index) => {
              return index % 5 === 0;
            });
        }

        setProjects(allProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only load projects when Projects tab is selected
    if (selectedTab === 1) {
      loadProjects();
    }
  }, [selectedTab, searchQuery, selectedJunior]);

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className='space-y-4'>
      <div className='flex justify-between items-center mb-2'>
        <span className='text-sm font-medium text-violet-normal'>{name}</span>
        <span className='text-sm text-gray-500'>{level}%</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-3'>
        <div
          className='bg-violet-normal h-3 rounded-full transition-all duration-300'
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );

  const tabsData: TabData[] = [
    {
      name: 'Profile',
      content: (
        <div className='flex gap-6 py-6'>
          {/* About Section */}
          <div className='bg-white rounded-2xl shadow-xl space-y-3 p-6 h-fit w-1/3'>
            <h2 className='text-2xl text-yankees-blue font-medium'>About</h2>
            <p className='text-content-secondary font-medium leading-8'>
              I'm a passionate junior developer who loves building web
              applications. I enjoy learning new technologies and am always
              looking for challenges to improve my skills through code.
            </p>

            {/* Contact Info */}
            <div className='space-y-3'>
              <div className='flex items-center gap-2 text-gray-600 text-sm'>
                <GlobeIcon />
                <Link
                  href={'#'}
                  className='text-violet-normal hover:underline text-xl'
                >
                  https://jasonfahd-platform...
                </Link>
              </div>
              <div className='flex items-center gap-2 text-gray-600 text-sm'>
                <LinkedInIcon />
                <Link
                  href={'#'}
                  className='text-violet-normal hover:underline text-xl'
                >
                  https://jasonfahd-platform...
                </Link>
              </div>
              <div className='flex items-center gap-2 text-gray-600 text-sm'>
                <MailIcon />
                <span className='text-[#40444C] text-xl'>
                  JasonFahd@juniorapp.com
                </span>
              </div>
              <div className='flex items-center gap-2 text-gray-600 text-sm'>
                <LocationIcon />
                <span className='text-[#40444C] text-xl'>Egypt, Cairo</span>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className='w-2/3 bg-white rounded-2xl shadow-xl p-6 h-fit space-y-4'>
            <h2 className='text-2xl font-medium text-yankees-blue'>
              Skills & Expertise
            </h2>

            <div className='space-y-6'>
              {/* Frontend Development */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-[#1E2430]'>
                  Frontend Development
                </h3>
                <SkillBar name='HTML' level={85} />
                <SkillBar name='CSS' level={80} />
                <SkillBar name='JavaScript' level={85} />
                <SkillBar name='React' level={75} />
              </div>

              {/* Design & UX */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-[#1E2430]'>
                  Design & UX
                </h3>
                <SkillBar name='UI Design' level={90} />
              </div>

              {/* Backend Development */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-[#1E2430]'>
                  Backend Development
                </h3>
                <SkillBar name='Python' level={80} />
                <SkillBar name='Node.js' level={85} />
              </div>

              {/* Database */}
              <div className='space-y-4'>
                <h3 className='text-lg font-medium text-[#1E2430]'>Database</h3>
                <SkillBar name='MongoDB' level={65} />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Projects',
      content: (
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
              <div className='flex flex-wrap gap-2 px-1 xl:gap-6 md:px-2 xl:px-6 pb-6'>
                {projects.length === 0 ? (
                  <div className='w-full text-center py-12 text-gray-500'>
                    <EmptyData
                      description='No projects found'
                      projectsNum={0}
                    />
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
                        badgeText='status'
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
      ),
    },
    {
      name: 'Badges & Achievements',
      content: (
        <div className='p-6'>Badges & Achievements content goes here...</div>
      ),
    },
  ];

  return (
    <Tabs
      tabs={tabsData}
      selectedIndex={selectedTab}
      onTabChange={setSelectedTab}
      tabListClassName='flex space-x-0 bg-[#E8EDFF] p-0 mb-0 w-full rounded-t-none rounded-b-2xl'
      tabClassName={(selected) =>
        `px-6 py-3 transition-all duration-200 focus:outline-none focus:ring-0  ${
          selected
            ? 'text-violet-normal'
            : 'text-gray-600 border-transparent hover:text-violet-normal'
        }`
      }
      tabPanelClassName=' p-0'
    />
  );
};
