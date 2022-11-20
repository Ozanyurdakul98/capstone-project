import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import AllColumnsFilter from './AllColumnsFilter';
import ServicesFilter from './ServicesFilter';
import StudioTypeFilter from './StudioTypeFilter';
import EditStudio from '../../Forms/EditStudio';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';

export default function StudioTable({ fetchedStudios }) {
  const [toUpdateStudio, setToUpdateStudio] = useState();
  const [studioID, setStudioID] = useState();
  const [openEditView, setOpenEditView] = useState(false);
  const [studios, setStudios] = useState([]);
  const studioData = useMemo(() => [...studios], [studios]);
  const isEven = (idx) => idx % 2 !== 0;

  async function handleEdit(table, values) {
    if (table === 'adminStudioTable') {
      if (values) {
        const id = values._id;
        try {
          const res = await fetch(`/api/dashboard/admin/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await res.json();
          const rawStudio = result.data[0];
          console.log('result', result);
          console.log('rawstudio result', rawStudio);
          const studio = {
            maxGuests: rawStudio.maxGuests,
            listingTitle: rawStudio.listingTitle,
            images: rawStudio.images,
            openingHours: rawStudio.openingHours,
            studiotype: rawStudio.studiotype,
            services: rawStudio.services,
            locationFeatures: rawStudio.locationFeatures,
            soundengineer: rawStudio.soundengineer,
            studioPricing: rawStudio.studioPricing,
            studioLocation: rawStudio.studioLocation,
          };
          const studioID = rawStudio._id;

          if (!res.ok || !result.success) {
            throw new Error(res.status);
          }
          if (res.ok) {
            setToUpdateStudio(studio);
            setStudioID(studioID);
            setOpenEditView(true);

            // setSubmitted(true);
            // router.push({
            //   pathname: '/success',
            //   query: {
            //     operation: 'createlisting',
            //   },
            // });
          }
        } catch (error) {
          // setFormErrors(error);
          // setPreview(false);
          // setSubmissionFailed(true);
          console.error('Failed to find Studio', error);
        }
      }
    }
  }

  const handleFetchedStudios = () => {
    if (fetchedStudios) {
      setStudios(fetchedStudios);
    }
  };
  useEffect(() => {
    handleFetchedStudios();
  }, []);

  const studioColumns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'images',
        maxWidth: 100,
        maxHeight: 100,
        disableSortBy: true,
        Cell: ({ value }) => (
          <div className='relative -mx-2 h-12 w-14 sm:h-16 sm:w-24 md:h-24 md:w-32'>
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
          <div className='flex sm:flex-col'>
            <button
              className=''
              onClick={() => {
                // alert('Editing: ' + JSON.stringify(row.values));
                handleEdit('adminStudioTable', row.values);
                console.log('values', row.values);
              }}>
              <TbEdit className='table-icon' />
            </button>
            <button
              className=''
              onClick={() => {
                // alert('Editing: ' + JSON.stringify(row.values));
                handleEdit('adminStudioTable', row.values);
                console.log('values', row.values);
              }}>
              <MdDeleteForever className='table-icon' />
            </button>
          </div>
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

  return (
    <>
      <div className='mt-20 block max-w-full'>
        <div className='tableWrap'>
          <div className='filter-table'>
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
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      {...column.getHeaderProps({ className: column.collapse ? 'collapse th' : 'th' })}>
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
                  <tr key={idx} {...row.getRowProps()} className={isEven(idx) ? 'evenRow' : null}>
                    {row.cells.map((cell, idx) => (
                      <td
                        key={idx}
                        {...cell.getCellProps({
                          className: cell.column.collapse ? 'collapse td' : 'td',
                        })}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='pagination'>
            <div className='pagination-buttons'>
              <button className='pagination-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>
              <button className='pagination-button' onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>
              <button className='pagination-button' onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>
              <button className='pagination-button' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>
            </div>
            <span>
              Page
              <strong className='pl-1'>
                {state.pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span>|</span>
            <span className='flex items-center gap-1'>
              Go to page:
              <input
                className='pagination-input'
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
              className='select-table'
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
        </div>
      </div>
      {openEditView ? (
        <EditStudio toUpdateStudio={toUpdateStudio} studioID={studioID} setOpenEditView={setOpenEditView}></EditStudio>
      ) : null}
    </>
  );
}
