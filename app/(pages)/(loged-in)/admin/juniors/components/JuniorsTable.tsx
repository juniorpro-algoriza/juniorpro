import { Badge, Button, Input, ModalLink, Table } from '@components';
import type { Junior } from '@server/types';
import { EyeIcon, ListFilter, SearchIcon } from 'lucide-react';

interface JuniorsTableProps {
  juniorsData: Junior[];
}

const tableHeader = [
  { header: 'Name', key: 'name' },
  { header: 'Email', key: 'email' },
  { header: 'Status', key: 'status' },
  { header: 'Projects', key: 'projects' },
  { header: 'Contributor', key: 'contributor' },
  { header: 'Joined On', key: 'joinedOn' },
  {
    header: 'Action',
    key: 'action',
    isAction: true,
    actionLabel: 'View',
    actionIcon: <EyeIcon size={16} />,
    href: '/admin/juniors/id',
  },
];

export const JuniorsTable = ({ juniorsData }: JuniorsTableProps) => {
  const transformedData = juniorsData.map((junior) => ({
    ...junior,
    status: (
      <Badge
        label={junior.status}
        variant={junior.status === 'active' ? 'green' : 'orange'}
      />
    ),
  }));

  return (
    <div>
      <div className='bg-white rounded-[20px] drop-shadow-xl border border-border-primary'>
        <div className='p-6'>
          <div className='flex items-center justify-between'>
            <h3 className='text-xl font-medium text-yankees-blue'>
              Juniors ({juniorsData.length})
            </h3>
            <div className='flex justify-center gap-2.5'>
              <ModalLink name='AddJunior'>
                <Button intent='primary' className='text-sm' size='large'>
                  Add Junior
                </Button>
              </ModalLink>

              <Input
                placeholder='Search for Juniors'
                leftIcon={<SearchIcon size={20} />}
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
          columns={tableHeader}
          data={transformedData}
          emptyMessage='No juniors added yet'
        />
      </div>
    </div>
  );
};
