'use client';

import { LoggedInPageHeader } from '../../../components/client';

export const ProjectsHeader = () => {
  return (
    <LoggedInPageHeader
      title='Projects'
      breadcrumbs={['Dashboard', 'Projects']}
    />
  );
};
