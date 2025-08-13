'use server';

export const getCareerTypes = async () => {
  return dummyData;
};

const dummyData = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'ui-ux-designer', label: 'UI/UX Designer' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'marketing-specialist', label: 'Marketing Specialist' },
  { value: 'other', label: 'Other' },
];
