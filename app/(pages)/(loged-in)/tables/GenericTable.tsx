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
    <table className="min-w-full border rounded-md">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-2 text-left font-medium">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              No data found
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2">
                  {col.isAction ? (
                    <a
                      href={row[col.key]}
                      className="flex items-center text-indigo-600 hover:underline"
                    >
                      {col.actionIcon}
                      <span className="ml-1">{col.actionLabel}</span>
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
  );
};
