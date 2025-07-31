'use client';

import { Button, Input, Table } from '@components';
import { Age, Grade, Junior } from '@server/types';
import { ListFilter, Search } from 'lucide-react';
import { useState } from 'react';
import { JuniorDialog } from './JuniorsDialog';

interface JuniorsTableProps {
  juniorsData: Junior[];
  juniorsAge: Age[];
  juniorsGrade: Grade[];
}

export const JuniorsTable = ({
  juniorsData,
  juniorsAge,
  juniorsGrade,
}: JuniorsTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className='mt-6'>
      <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary'>
        <div className='p-6'>
          <div className='flex items-center justify-between'>
            <h3 className='text-2xl font-medium text-yankees-blue'>
              Juniors ({juniorsData.length})
            </h3>
            <div className='flex justify-center gap-2.5'>
              <Button
                intent='primary'
                className='text-sm'
                onClick={() => setIsDialogOpen(true)}
              >
                Add Junior
              </Button>
              <Input
                placeholder='Search for Juniors'
                leftIcon={<Search size={20} />}
                className='shadow-sm'
              />
              <Button
                intent='unset'
                className='shadow-sm px-2.5 border border-border-primary'
              >
                <ListFilter className='text-cadetGray' />
              </Button>
            </div>
          </div>
        </div>

        <Table
          columns={[
            { header: 'Name', key: 'name' },
            { header: 'Points', key: 'points' },
            { header: 'Active Projects', key: 'activeProjects' },
            { header: 'Completed Projects', key: 'completedProjects' },
          ]}
          data={juniorsData}
          emptyMessage='No juniors added yet'
        />
      </div>

      <JuniorDialog
        juniorsAge={juniorsAge}
        juniorsGrade={juniorsGrade}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};
