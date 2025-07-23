import NotFoundIcon from '@public/images/404 Error.svg';
import avatarImage from '@public/images/avatar.svg';
import CSharp from '@public/images/C Sharp.svg';
import CSSIcon from '@public/images/Css3.svg';
import GitIcon from '@public/images/gitlab-2.svg';
import HTMLIcon from '@public/images/Html.svg';
import MetalCodeIcon from '@public/images/Metal_Code.svg';
import VSCodeIcon from '@public/images/Visual Studio Code.svg';

export const projectsData = [
  {
    id: 1,
    category: 'Web Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Create a personal website using HTML & CSS',
    rating: 5,
    difficulty: 'Solo',
    isFree: false,
  },
  {
    id: 2,
    category: 'Web Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Create a personal website using HTML & CSS',
    rating: 5,
    difficulty: 'Solo',
    isFree: false,
  },
  {
    id: 3,
    category: 'Web Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Create a personal website using HTML & CSS',
    rating: 5,
    difficulty: 'Solo',
    isFree: true,
  },
  {
    id: 4,
    category: 'Web Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Create a personal website using HTML & CSS',
    rating: 5,
    difficulty: 'Solo',
    isFree: false,
  },
  {
    id: 5,
    category: 'Mobile Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Build your first mobile app with React Native',
    rating: 4,
    difficulty: 'Solo',
    isFree: true,
  },
  {
    id: 6,
    category: 'Data Science',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Learn data analysis with pandas and matplotlib',
    rating: 5,
    difficulty: 'Intermediate',
    isFree: false,
  },
  {
    id: 7,
    category: 'Web Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Master modern JavaScript concepts and patterns',
    rating: 4,
    difficulty: 'Advanced',
    isFree: false,
  },
  {
    id: 8,
    category: 'Mobile Development',
    title: 'Build Your First Website',
    image: '/images/featued-Project-image.svg',
    description: 'Create iOS apps with Swift and UIKit',
    rating: 5,
    difficulty: 'Advanced',
    isFree: true,
  },
];

export const featuredProjectTabs = [
  {
    title: 'All',
    link: '/home',
  },
  {
    title: 'Solo Projects',
    link: '/home#solo-projects',
  },
  {
    title: 'Team Projects',
    link: '/home#team-projects',
  },
  {
    title: 'Web Development',
    link: '/home#web-development',
  },
  {
    title: 'Coding',
    link: '/home#coding',
  },
];

export const testimonials = [
  {
    id: 1,
    title: 'From Curious Beginner to Tech Competition Winner',
    content:
      "Jason started with simple HTML projects at age 11. Three years later, he's won his regional coding competition with an app that helps elderly people in his community connect with volunteer helpers. Jason credits JuniorPro's step-by-step projects and mentor feedback for giving him the confidence to pursue his ideas.",
    name: 'Jason Patel',
    age: '14 Years',
    avatar: avatarImage,
  },
  {
    id: 2,
    title: 'From Complete Novice to Full-Stack Developer',
    content:
      'Emma had never written a line of code before joining JuniorPro. Within 18 months, she built her first web application and landed her dream internship at a tech startup. The structured learning path and amazing community support made all the difference in her journey.',
    name: 'Emma Rodriguez',
    age: '16 Years',
    avatar: avatarImage,
  },
  {
    id: 3,
    title: 'Building Apps That Change Communities',
    content:
      "Marcus created an app that helps students in his school find study groups and share resources. What started as a simple project idea became a tool used by over 500 students. JuniorPro's mentorship program helped him turn his vision into reality.",
    name: 'Marcus Chen',
    age: '15 Years',
    avatar: avatarImage,
  },
];

export const heroText = [
  { number: '1K+', text: 'Projects Available' },
  { number: '5K+', text: 'Active Students' },
  { number: '200+', text: 'Expert Mentors' },
  { number: '4.9/5', text: 'Student Rating' },
];

export const floatingIcons = [
  { src: CSSIcon, alt: 'CSS Icon', position: 'top-40 left-36' },
  { src: GitIcon, alt: 'Git Icon', position: 'top-80 left-24' },
  { src: NotFoundIcon, alt: '404 Error', position: 'top-96 left-72' },
  { src: CSharp, alt: 'C# Icon', position: 'top-[512px] left-36' },
  { src: VSCodeIcon, alt: 'VSCode', position: 'top-28 right-56' },
  { src: HTMLIcon, alt: 'HTML Icon', position: 'top-64 right-40' },
  { src: MetalCodeIcon, alt: 'Metal Code Icon', position: 'top-92 right-60' },
];

export const heroSteps = [
  'Complete your first task',
  'Complete your second task',
  'Complete your third task',
  'Complete your fourth task',
  'Complete your fifth task',
];
