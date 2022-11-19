import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import AllColumnsFilter from './AllColumnsFilter';
import ServicesFilter from './ServicesFilter';
import StudioTypeFilter from './StudioTypeFilter';
import styled from 'styled-components';

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }
  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }
      :last-child {
        border-right: 0;
      }
    }
  }
  .pagination {
    padding: 0.5rem;
  }
`;

export default function StudioTable({ fetchedStudios }) {
  const [studios, setStudios] = useState([]);

  const handleFetchedStudios = () => {
    if (fetchedStudios) {
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
          <div className='relative -mx-2 h-8 w-8 sm:h-24 sm:w-32'>
            <Image src={value} layout='fill' className='bg-secondary rounded-lg ' objectFit='cover' alt='avatar' />
          </div>
        ),
      },
      {
        Header: 'Id',
        accessor: '_id',
        disableSortBy: true,
        collapse: true,
      },
      {
        Header: 'Pricing',
        columns: [
          {
            Header: 'Hourly',
            accessor: 'studioPricing.studioPricingHour',
            disableSortBy: false,
          },
          {
            Header: 'Daily',
            accessor: 'studioPricing.studioPricingDay',
            disableSortBy: false,
          },
          {
            Header: 'Weekly',
            accessor: 'studioPricing.studioPricingWeek',
            disableSortBy: false,
          },
          {
            Header: 'Monthly',
            accessor: 'studioPricing.studioPricingMonth',
            disableSortBy: false,
          },
        ],
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
  const tableInstance = useTable(
    { columns: studioColumns, data: studioData, disableMultiSort: true, initialState: { pageSize: 3 } },
    useGlobalFilter,
    useFilters,
    tableHooks,
    useSortBy,
    usePagination
  );
  const {
    page,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    setFilter,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = tableInstance;
  console.log('');
  console.log('setGlobalFilter', setGlobalFilter);
  console.log('preGlobalFilterRows', preGlobalFilteredRows);
  console.log('state', state);

  return (
    <Styles>
      <div className='tableWrap'>
        <div className='flex gap-4'>
          <AllColumnsFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            state={state.globalFilter}
          />
          <ServicesFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            setFilter={setFilter}
            state={state}
          />
          <StudioTypeFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            setGlobalFilter={setGlobalFilter}
            setFilter={setFilter}
            state={state}
          />
        </div>
        <table className='table' {...getTableProps()}>
          <thead className='thead'>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup._id} className='tr' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                  <th
                    key={idx}
                    className='th'
                    {...column.getHeaderProps(column.getSortByToggleProps(), {
                      className: column.collapse ? 'collapse' : '',
                    })}>
                    {column.render('Header')}
                    {column.canSort ? (column.isSorted ? (column.isSortedDesc ? '↑' : '↓') : ' ↓↑') : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='tbody' {...getTableBodyProps()}>
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <tr key={idx} {...row.getRowProps()} className={isEven(idx) ? 'bg-blue-600/20' : null}>
                  {row.cells.map((cell, idx) => (
                    <td
                      key={idx}
                      className='td'
                      {...cell.getCellProps({
                        className: cell.column.collapse ? 'collapse' : '',
                      })}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='pagination'>
        <button className='button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button className='button' onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button className='button' onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button className='button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page
          <strong>
            {state.pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type='number'
            defaultValue={state.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          value={state.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[5, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
}
