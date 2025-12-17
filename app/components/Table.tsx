import type { ReactNode } from "react";
import { EmptyData } from "./client/EmptyData";
import Link from "next/link";

interface Column {
  header: string;
  key: string;
  isAction?: boolean;
  actionLabel?: string;
  actionIcon?: ReactNode;
  href?: string;
  actionClassName?: string;
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
  tableHeight = "max-h-96",
  renderRow,
  emptyMessage = "No data available",
}: TableProps<T>) => {
  return (
    <div className={`overflow-auto px-6 ${tableHeight}`}>
      {data.length ? (
        <table className="w-full table-auto ">
          <thead className="bg-[#F1F5FF] sticky top-0 z-50">
            <tr className="rounded-2xl">
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left font-medium whitespace-nowrap ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-bright-gray">
            {data.map((item, idx) =>
              renderRow ? (
                renderRow(item)
              ) : (
                <tr
                  key={(item as { id?: string | number })?.id ?? idx}
                  className="hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-[#40444C]"
                    >
                      {col.isAction ? (
                        <Link
                          href={
                            ((item as Record<string, unknown>)[
                              col.key
                            ] as string) ||
                            col.href ||
                            "#"
                          }
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium ${
                            col.actionClassName ||
                            "text-[#5879DC] hover:text-blue-700 hover:bg-gray-50"
                          }`}
                        >
                          {col.actionIcon && <span>{col.actionIcon}</span>}
                          {col.actionLabel || "Action"}
                        </Link>
                      ) : (
                        ((item as Record<string, unknown>)[
                          col.key
                        ] as ReactNode)
                      )}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <EmptyData title={emptyMessage} />
      )}
    </div>
  );
};
