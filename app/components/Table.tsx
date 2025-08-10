import type { ReactNode } from 'react';
import { EmptyData } from './client/EmptyData';

interface Column {
  header: string;
  key: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  tableHeight?: string;
  renderRow?: (item: T) => ReactNode;
  emptyMessage?: string;
}

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  tableHeight = 'max-h-96',
  renderRow,
  emptyMessage = 'No data available',
}: TableProps<T>) => {
  return (
    <div className={`overflow-auto px-6 ${tableHeight}`}>
      {data.length ? (
        <table className='w-full table-auto'>
          <thead className='bg-[#F1F5FF] sticky top-0 z-50'>
            <tr className='rounded-2xl'>
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left font-medium ${
                    index === 0 ? 'rounded-tl-lg' : ''
                  } ${index === columns.length - 1 ? 'rounded-tr-lg' : ''}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-bright-gray'>
            {data.map((item, idx) =>
              renderRow ? (
                renderRow(item)
              ) : (
                <tr
                  key={(item as { id?: string | number })?.id ?? idx}
                  className='hover:bg-gray-50'
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className='px-6 py-4 whitespace-nowrap text-sm text-[#40444C]'
                    >
                      {(item as Record<string, unknown>)[col.key] as ReactNode}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <EmptyData projectsNum={0} description={emptyMessage} />
      )}
    </div>
  );
};
