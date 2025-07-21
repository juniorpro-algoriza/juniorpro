'use client';

import { Tabs } from '@components';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { featuredProjectTabs, projectsData } from './config';
import { ProjectCard } from './ProjectCard';

const FeaturedProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Calculate pagination
  const totalPages = Math.ceil(projectsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projectsData.slice(startIndex, endIndex);

  const handleProjectStart = (projectId: string) => {
    console.log(`Starting project ${projectId}`);
    // Add your project start logic here
  };

  interface HandlePageChange {
    (page: number): void;
  }

  const handlePageChange: HandlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewAll = () => {
    console.log('Viewing all projects');
    // Add your view all logic here
  };

  return (
    <section className='px-4 py-20 bg-white'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='font-medium text-[32px] text-gray-800 mb-3'>
            Featured Projects
          </h2>
          <p className='text-xl text-stone-500 font-medium'>
            Discover our most popular tech projects handpicked by experts
          </p>
        </div>

        {/* Filter Tabs */}
        <div className='flex justify-center mb-12'>
          <Tabs tabItems={featuredProjectTabs} />
        </div>

        {/* Projects Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {currentProjects.map(
            ({
              id,
              category,
              title,
              description,
              difficulty,
              image,
              isFree,
              rating,
            }) => (
              <ProjectCard
                key={id}
                category={category}
                image={image}
                description={description}
                rating={rating}
                difficulty={difficulty}
                isFree={isFree}
                title={title}
                onStart={() => handleProjectStart(String(id))}
              />
            )
          )}
        </div>

        {/* Pagination and View All */}
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className='w-4 h-4 rotate-180' />
            </button>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-300 ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>

          <button
            onClick={handleViewAll}
            className='text-blue-500 font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300'
          >
            View All
            <ChevronRight className='w-4 h-4' />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
