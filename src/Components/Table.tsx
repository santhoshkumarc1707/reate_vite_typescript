import React from 'react';

type TableProps = {
  columns: string[];
  data: string[][];
};

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-200">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="border border-gray-300 px-4 py-2 bg-gray-100 text-left"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="border border-gray-300 px-4 py-2"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
