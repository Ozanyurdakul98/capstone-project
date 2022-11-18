import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';

export default function StudioTable({ fetchedStudios }) {
  const [studios, setStudios] = useState([]);

  const handleFetchedStudios = () => {
    if (fetchedStudios) {
      console.log('studios', fetchedStudios);
      setStudios(fetchedStudios);
    }
  };
  const isEven = (idx) => idx % 2 === 0;

  useEffect(() => {
    handleFetchedStudios();
  }, []);

  const studioData = useMemo(() => [...studios], [studios]);
  const studioColumns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: '_id',
      },
      {
        Header: 'Price hour',
        accessor: 'studioPricing.studioPricingHour',
      },
      {
        Header: 'Location',
        accessor: 'studioLocation',
      },
      {
        Header: 'Services',
        accessor: 'services',
      },
      {
        Header: 'Studio Type',
        accessor: 'studiotype',
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
      },
    ],
    []
  );
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: 'Edit',
        Header: 'Edit',
        Cell: ({ row }) => (
          <button
            onClick={() => {
              alert('Editing: ', row.values);
              console.log('values', row.values);
            }}>
            edit
          </button>
        ),
      },
    ]);
  };
  const tableInstance = useTable({ columns: studioColumns, data: studioData }, tableHooks);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table className='table' {...getTableProps()}>
      <thead className='thead'>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup._id} className='tr' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th key={column._id} className='th' {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className='tbody' {...getTableBodyProps()}>
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr key={idx} {...row.getRowProps()} className={isEven(idx) ? 'bg-blue-600/20' : null}>
              {row.cells.map((cell, idx) => (
                <td key={idx} className='td' {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
