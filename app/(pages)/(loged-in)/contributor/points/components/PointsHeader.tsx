'use client';

import { LoggedInPageHeader } from '../../../components/client';

export const PointsHeader = () => {
  return (
    <LoggedInPageHeader title='Points' breadcrumbs={['Dashboard', 'Points']} />
  );
};
