import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import AllColumnsFilter from '../TableComponents/AllColumnsFilter';
import ServicesFilter from '../TableComponents/ServicesFilter';
import StudioTypeFilter from '../TableComponents/StudioTypeFilter';
import EditStudio from '../../Forms/EditStudio';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever, MdInfo } from 'react-icons/md';
import { useRouter } from 'next/router';
import { DeleteModal } from '../../Modals/DeleteModal';
import { MoreInfoModal } from '../../Modals/MoreInfoModal';

export default function MyStudiosTable({ fetchedStudios }) {
  const [toUpdateStudio, setToUpdateStudio] = useState();
  const [studioID, setStudioID] = useState('');
  const [openEditView, setOpenEditView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [deleteModalStrings, setDeleteModalStrings] = useState({
    header: 'Are you sure you want to delete this Studio?',
    message: 'This Studio will be permanently deleted! If you want to delete this Studio, click on Delete.',
    studioID: '',
    error: '',
  });
  const [moreInfoModalStrings, setMoreInfoModalStrings] = useState({
    header: 'More information about this Studio',
    message: 'You can use the ID for customer support!',
    studioID: '',
    publisherEmail: '',
    others: [],
    error: '',
  });
  const [studios, setStudios] = useState([]);
  const router = useRouter();
  const studioData = useMemo(() => [...studios], [studios]);
  const isEven = (idx) => idx % 2 !== 0;

  async function handleEdit(values) {
    if (values) {
      const id = values._id;
      try {
        const res = await fetch(`/api/dashboard/studio/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await res.json();
        const rawStudio = result.data[0];
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
        if (!res.ok || !result.success) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setToUpdateStudio(studio);
          setStudioID(rawStudio._id);
          setOpenEditView(true);
        }
      } catch (error) {
        alert('Something went wrong, Contact us if you need help!', error);
        console.error('Failed to find Studio', error);
      }
    }
  }
  async function handleDelete(ID) {
    if (ID) {
      setLoading((prev) => !prev);
      try {
        const res = await fetch(`/api/dashboard/admin/studio/${ID}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setDeleteModalStrings({ ...deleteModalStrings, message: `successfully deleted...`, studioID: '' });
          setTimeout(() => {
            setLoading(false);
            router.reload();
          }, 1500);
        }
      } catch (error) {
        setDeleteModalStrings({ ...deleteModalStrings, message: "It didn't work", error: error });
        setLoading(false);
        console.error('Failed to find Studio', error);
      }
    }
  }
  function openDeleteModal(values) {
    setStudioID(values._id);
    setDeleteModalStrings({ ...deleteModalStrings, studioID: values._id });
    setDeleteModal(true);
  }
  function openInfoModal(values) {
    setStudioID(values._id);
    setMoreInfoModalStrings({
      ...moreInfoModalStrings,
      studioID: values._id,
      publisherEmail: values.userEmail,
      others: values,
    });
    setInfoModal(true);
  }
  useEffect(() => {
    if (fetchedStudios) {
      setStudios(fetchedStudios);
    }
  }, []);
  const studioColumns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'images',
        disableSortBy: true,
        Cell: ({ value }) => (
          <div className='relative -mx-2 h-12 w-14 sm:h-16 sm:w-24 md:h-24 md:w-32'>
            <Image src={value} layout='fill' className='bg-secondary rounded-lg ' objectFit='cover' alt='avatar' />
          </div>
        ),
      },
      {
        Header: 'Title',
        accessor: 'listingTitle',
        disableSortBy: true,
        collapse: false,
      },
      {
        Header: 'Studio Type',
        accessor: 'studiotype',
        disableSortBy: false,
      },
      {
        Header: 'Hourly',
        accessor: (row) => (row.studioPricing.studioPricingHour ? row.studioPricing.studioPricingHour + ' €' : ''),
        disableSortBy: false,
      },
      {
        Header: 'Daily',
        accessor: (row) => (row.studioPricing.studioPricingDay ? row.studioPricing.studioPricingDay + ' €' : ''),
        disableSortBy: false,
      },
      {
        Header: 'Weekly',
        accessor: (row) => (row.studioPricing.studioPricingWeek ? row.studioPricing.studioPricingWeek + ' €' : ''),
        disableSortBy: false,
      },
      {
        Header: 'Monthly',
        accessor: (row) => (row.studioPricing.studioPricingMonth ? row.studioPricing.studioPricingMonth + ' €' : ''),
        disableSortBy: false,
      },
      {
        Header: 'Soundengineer',
        accessor: (row) =>
          row.soundengineer.soundengineerPrice ? row.soundengineer.soundengineerPrice + ' €' : row.soundengineer,
        disableSortBy: false,
      },
      {
        Header: 'Opening Hours',
        accessor: 'openingHours',
        disableSortBy: false,
      },
      {
        Header: 'Date',
        accessor: 'createdAtDate',
        collapse: true,
        disableSortBy: false,
      },
      {
        Header: 'Time',
        accessor: 'createdAtTime',
        collapse: true,
        disableSortBy: false,
      },
      {
        Header: 'Date',
        accessor: 'updatedAtDate',
        collapse: true,
        disableSortBy: false,
      },
      {
        Header: 'Time',
        accessor: 'updatedAtTime',
        collapse: true,
        disableSortBy: false,
      },
      {
        Header: 'Location',
        accessor: 'studioLocation',
        disableSortBy: true,
        collapse: true,
      },
      { Header: 'Services', accessor: 'services', collapse: true, disableSortBy: true },
      {
        Header: 'ID',
        accessor: '_id',
        disableSortBy: true,
        collapse: true,
      },
      {
        Header: 'max guests',
        accessor: 'maxGuests',
        disableSortBy: true,
        collapse: true,
      },
      {
        Header: 'Publisher Email',
        accessor: 'userEmail',
        disableSortBy: true,
        collapse: true,
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
          <div className='flex flex-col gap-2'>
            <button
              className=''
              onClick={() => {
                openInfoModal(row.values);
              }}>
              <MdInfo className='table-icon' />
            </button>
            <button
              className=''
              onClick={() => {
                handleEdit('adminStudioTable', row.values);
              }}>
              <TbEdit className='table-icon' />
            </button>
            <button
              className=''
              onClick={() => {
                openDeleteModal(row.values);
              }}>
              <MdDeleteForever className='table-icon' />
            </button>
          </div>
        ),
      },
    ]);
  };
  const tableInstance = useTable(
    { columns: studioColumns, data: studioData, disableMultiSort: true, initialState: { pageSize: 10 } },
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
              tableName={'studios'}
            />
            <ServicesFilter setFilter={setFilter} />
            <StudioTypeFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              setFilter={setFilter}
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
                      {...column.getHeaderProps({
                        className: column.collapse ? 'collapse  bg-black th' : 'th',
                      })}>
                      {column.render('Header')}
                      {column.canSort ? (column.isSorted ? (column.isSortedDesc ? '↑' : '↓') : ' ↓↑') : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className='tbody ' {...getTableBodyProps()}>
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
              <button className='tablePagination-button' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>
              <button className='tablePagination-button' onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>
              <button className='tablePagination-button' onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>
              <button
                className='tablePagination-button'
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}>
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
      {deleteModal ? (
        <>
          <DeleteModal
            studioID={studioID}
            loading={loading}
            setDeleteModal={setDeleteModal}
            deleteModalStrings={deleteModalStrings}
            deleteFunction={handleDelete}></DeleteModal>
        </>
      ) : null}
      {infoModal ? (
        <>
          <MoreInfoModal
            studioID={studioID}
            loading={loading}
            setInfoModal={setInfoModal}
            moreInfoModalStrings={moreInfoModalStrings}></MoreInfoModal>
        </>
      ) : null}
    </>
  );
}
