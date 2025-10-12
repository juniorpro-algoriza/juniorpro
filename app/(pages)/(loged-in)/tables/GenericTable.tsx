// components/GenericTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

type TableColumn = {
  header: string;
  key: string;
  isAction?: boolean;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
};

interface GenericTableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

export const GenericTable: React.FC<GenericTableProps> = ({
  columns,
  data,
}) => {
  return (
    <div className="bg-white rounded-t-[20px]  border border-border-primary overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-[#F1F5FF] sticky top-0 z-50">
            <tr>
              {columns?.map((col, index) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left font-medium whitespace-nowrap text-[#40444C] ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-bright-gray">
            {data?.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No data found
                </td>
              </tr>
            ) : (
              data?.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-[#40444C]"
                    >
                      {col.isAction ? (
                        <a
                          href={row[col.key]}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium text-[#5879DC] hover:text-blue-700 hover:bg-gray-50"
                        >
                          {col.actionIcon && <span>{col.actionIcon}</span>}
                          {col.actionLabel || "Action"}
                        </a>
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
