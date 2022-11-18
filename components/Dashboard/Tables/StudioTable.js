import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useFilters, useGroupBy, useExpanded, useRowSelect, useSortBy } from 'react-table';

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
        Header: 'Image',
        accessor: 'images',
        maxWidth: 100,
        maxHeight: 100,
        disableSortBy: true,
        Cell: ({ value }) => (
          <div className='h-8 w-8 sm:h-16 sm:w-32'>
            <Image src={value} layout='fill' className='bg-secondary rounded-lg ' objectFit='cover' alt='avatar' />
          </div>
        ),
      },
      {
        Header: 'Id',
        accessor: '_id',
        disableSortBy: true,
      },
      {
        Header: 'Price hour',
        accessor: 'studioPricing.studioPricingHour',
        disableSortBy: false,
      },
      {
        Header: 'Location',
        accessor: 'studioLocation',
        disableSortBy: true,
      },
      {
        Header: 'Services',
        accessor: 'services',
        disableSortBy: true,
      },
      {
        Header: 'Studio Type',
        accessor: 'studiotype',
        disableSortBy: false,
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
        disableSortBy: false,
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
            className='button'
            onClick={() => {
              alert('Editing: ' + JSON.stringify(row.values));
              console.log('values', row.values);
            }}>
            edit
          </button>
        ),
      },
    ]);
  };
  const tableInstance = useTable({ columns: studioColumns, data: studioData }, tableHooks, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <table className='table' {...getTableProps()}>
      <thead className='thead'>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup._id} className='tr' {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, idx) => (
              <th key={idx} className='th' {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {column.canSort ? (column.isSorted ? (column.isSortedDesc ? '↑' : '↓') : ' ↓↑') : null}
                {console.log(column)}
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
