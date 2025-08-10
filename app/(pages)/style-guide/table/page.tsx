import { Table } from '@components';

const TableStylePage = () => {
  const juniorsData = [
    {
      id: 1,
      name: 'Alex',
      points: 300,
      activeProjects: 2,
      completedProjects: 3,
    },
    {
      id: 2,
      name: 'Sam',
      points: 100,
      activeProjects: 5,
      completedProjects: 2,
    },
    {
      id: 3,
      name: 'John',
      points: 200,
      activeProjects: 4,
      completedProjects: 1,
    },
    {
      id: 4,
      name: 'Harry',
      points: 400,
      activeProjects: 6,
      completedProjects: 4,
    },
    {
      id: 5,
      name: 'John',
      points: 200,
      activeProjects: 4,
      completedProjects: 1,
    },
    {
      id: 6,
      name: 'Harry',
      points: 400,
      activeProjects: 6,
      completedProjects: 4,
    },
  ];
  return (
    <div>
      <Table
        columns={[
          { header: 'Name', key: 'name' },
          { header: 'Points', key: 'points' },
          { header: 'Active Projects', key: 'activeProjects' },
          { header: 'Completed Projects', key: 'completedProjects' },
        ]}
        data={juniorsData}
        tableHeight='h-full'
        emptyMessage='No data added yet'
      />
    </div>
  );
};

export default TableStylePage;
