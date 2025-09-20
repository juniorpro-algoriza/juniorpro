'use server';

import type {Project, ProjectStatus, ProjectType} from '../types';
import {cookies} from 'next/headers';

// API response types
interface ApiProject {
  id: number | string;
  nameEn: string;
  nameAr: string;
  categoryNameAr: string;
  categoryNameEn: string;
  levelNameAr: string;
  levelNameEn: string;
  image?: string;
  description: string;
  rating: number;
  status: number;
  projectType: string;
  isFree: boolean;
  ageRange: string;
  dueDate?: string;
}

interface ApiProjectsResponse {
  data: ApiProject[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

type GetAllProjectsParams = {
  shouldIncludeProject?: (project: Project) => boolean;
  pageNum: number;
  limit: number;
  projectType: ProjectType;
  juniors?: string[];
  categoryId?: number;
  searchText?: string;
};
type ReturnType = {
  data: Project[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export const getProjects = async ({
  shouldIncludeProject,
  pageNum,
  limit,
  projectType,
  juniors,
  categoryId,
  searchText,
}: GetAllProjectsParams): Promise<ReturnType> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      throw new Error('No auth token found. User may not be logged in.');
    }

    // Build query parameters
    const queryParams = new URLSearchParams({
      PageNumber: pageNum.toString(),
      PageSize: limit.toString(),
    });

    if (categoryId) {
      queryParams.append('CategoryId', categoryId.toString());
    }

    if (searchText) {
      queryParams.append('SearchText', searchText);
    }

    const res = await fetch(
      `https://juniorpro-001-site1.ntempurl.com/api/project?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    const apiData: ApiProjectsResponse = await res.json();

    console.log('res', apiData);
    const transformedProjects: Project[] =
      apiData.data?.map((project: ApiProject) => ({
        id: project.id?.toString() || '',
        title: project.nameEn || '',
        category: project.categoryNameEn || '',
        imageUrl: project.image || '/images/featued-Project-image.svg',
        description: project.levelNameEn || '',
        rating: project.rating || 0,
        projectType: mapApiProjectTypeToLocal(project.projectType) || 'solo',
        isFree: project.isFree || false,
        status: 'not-started',
        dueDate: project.dueDate ? new Date(project.dueDate) : undefined,
        juniors: juniors || [],
      })) || [];

    // Apply local filtering if needed
    const filteredData = transformedProjects;

    // if (projectType !== 'all') {
    //   filteredData = transformedProjects.filter(
    //     (project) => project.projectType === projectType
    //   );
    // }

    // Apply additional filtering
    const finalData = filteredData.filter((p) =>
      shouldIncludeProject ? shouldIncludeProject(p) : true
    );

    return {
      data: finalData,
      currentPage: apiData.currentPage || pageNum,
      totalPages: apiData.totalPages || Math.ceil(finalData.length / limit),
      hasNextPage: apiData.hasNextPage || false,
      hasPrevPage: apiData.hasPrevPage || false,
    };
  } catch (err) {
    console.error('Error fetching projects:', err);

    // Fallback to dummy data
    let filteredData = dummyData;

    if (projectType !== 'all') {
      filteredData = dummyData.filter(
        (project) => project.projectType === projectType
      );
    }

    const startIndex = (pageNum - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData: Project[] = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData
        //TODO: @Abdelrhman pls check this why not return juniors
        .map((p) => ({...p, juniors: juniors ?? []}))
        .filter((p) => (shouldIncludeProject ? shouldIncludeProject(p) : true)),
      currentPage: pageNum,
      totalPages: Math.ceil(filteredData.length / limit),
      hasNextPage: endIndex < filteredData.length,
      hasPrevPage: startIndex > 0,
    };
  }
};

// Helper functions to map API data to local types
const mapApiProjectTypeToLocal = (apiType: string): ProjectType => {
  const typeMap: Record<string, ProjectType> = {
    web: 'web',
    solo: 'solo',
    team: 'team',
    coding: 'coding',
  };
  return typeMap[apiType?.toLowerCase()] || 'solo';
};

// Fixed date to prevent hydration mismatch
const FIXED_DUE_DATE = new Date('2024-12-31T23:59:59.000Z');

const dummyData: Project[] = [
  // 10 solo
  ...Array.from({length: 10}, (_, i) => ({
    id: `${i + 1}`,
    category: 'Web Development',
    title: `Solo Project ${i + 1}`,
    imageUrl: '/images/featued-Project-image.svg',
    description: 'A solo project to build skills.',
    rating: 4 + (i % 2),
    projectType: 'solo' as ProjectType,
    isFree: i % 2 === 0,
    status: 'in-progress' as ProjectStatus,
    dueDate: FIXED_DUE_DATE,
    juniors: ['anas'],
  })),

  // 10 web
  ...Array.from({length: 10}, (_, i) => ({
    id: `${i + 11}`,
    category: 'Web Development',
    title: `Web Project ${i + 1}`,
    imageUrl: '/images/featued-Project-image.svg',
    description: 'A web development project.',
    rating: 3 + (i % 3),
    projectType: 'web' as ProjectType,
    isFree: i % 2 !== 0,
    status: 'not-started' as ProjectStatus,
    dueDate: FIXED_DUE_DATE,
    juniors: ['anas'],
  })),

  // 10 team
  ...Array.from({length: 10}, (_, i) => ({
    id: `${i + 21}`,
    category: 'Team Collaboration',
    title: `Team Project ${i + 1}`,
    imageUrl: '/images/featued-Project-image.svg',
    description: 'A project for teams to collaborate.',
    rating: 4 + (i % 2),
    projectType: 'team' as ProjectType,
    isFree: i % 3 === 0,
    status: 'in-progress' as ProjectStatus,
    dueDate: FIXED_DUE_DATE,
    juniors: ['anas', 'lina'],
  })),

  // 10 coding
  ...Array.from({length: 10}, (_, i) => ({
    id: `${i + 31}`,
    category: 'Coding Challenges',
    title: `Coding Project ${i + 1}`,
    imageUrl: '/images/featued-Project-image.svg',
    description: 'Solve coding challenges and learn.',
    rating: 5 - (i % 3),
    projectType: 'coding' as ProjectType,
    isFree: i % 2 === 0,
    status: 'in-progress' as ProjectStatus,
    dueDate: FIXED_DUE_DATE,
    juniors: ['anas'],
  })),
];
