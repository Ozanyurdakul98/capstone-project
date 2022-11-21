import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import AllColumnsFilter from './AllColumnsFilter';
import ServicesFilter from './ServicesFilter';
import StudioTypeFilter from './StudioTypeFilter';
import EditUser from '../../Forms/EditUser';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';
import { DeleteModal } from '../../Modals/DeleteModal';

export default function UserTable({ fetchedUsers }) {
  const [toUpdateUser, setToUpdateUser] = useState();
  const [userID, setUserID] = useState('');
  const [openEditView, setOpenEditView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalStrings, setDeleteModalStrings] = useState({
    header: 'Are you sure you want to delete this Studio?',
    message: 'This Studio will be permanently deleted! If you want to delete this Studio, click on Delete.',
    studioID: '',
    error: '',
  });
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const userData = useMemo(() => [...users], [users]);
  const isEven = (idx) => idx % 2 !== 0;
  async function handleEdit(table, values) {
    if (table === 'adminUserTable') {
      if (values) {
        const id = values._id;
        try {
          const res = await fetch(`/api/dashboard/admin/user/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const result = await res.json();
          const rawUser = result.data[0];
          const user = {
            avatar: rawUser.avatar,
            email: rawUser.email,
            name: rawUser.name,
          };
          if (!res.ok || !result.success) {
            throw new Error(res.status);
          }
          if (res.ok) {
            setToUpdateUser(user);
            setUserID(rawUser._id);
            setOpenEditView(true);
          }
        } catch (error) {
          alert('Something went wrong, Contact us if you need help!', error);
          console.error('Failed to find User', error);
        }
      }
    }
  }
  console.log('toUpdateUser', toUpdateUser);
  async function handleDelete(table, ID) {
    if (table === 'adminStudioTable') {
      if (ID) {
        setLoading((prev) => !prev);
        try {
          const res = await fetch(`/api/dashboard/admin/${ID}`, {
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
  }
  function openDeleteModal(values) {
    setStudioID(values._id);
    setDeleteModalStrings({ ...deleteModalStrings, studioID: values._id });
    setDeleteModal(true);
  }
  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
    console.log(fetchedUsers);
  }, [fetchedUsers]);
  const userColumns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        disableSortBy: true,
        Cell: ({ value }) => (
          <div className='relative -mx-2 h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24'>
            <Image src={value} layout='fill' className='bg-secondary rounded-full ' objectFit='cover' alt='avatar' />
          </div>
        ),
      },
      {
        Header: 'Id',
        accessor: '_id',
        disableSortBy: true,
        collapse: false,
      },
      {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: false,
        collapse: false,
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableSortBy: false,
        collapse: false,
      },
      {
        Header: 'Created / Updated',
        columns: [
          {
            Header: 'Date',
            accessor: 'createdAtDate',
            disableSortBy: false,
          },
          {
            Header: 'Time',
            accessor: 'createdAtTime',
            disableSortBy: false,
          },
          {
            Header: 'Date',
            accessor: 'updatedAtDate',
            disableSortBy: false,
          },
          {
            Header: 'Time',
            accessor: 'updatedAtTime',
            disableSortBy: false,
          },
        ],
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
                handleEdit('adminUserTable', row.values);
                console.log('values', row.values);
              }}>
              <TbEdit className='table-icon' />
            </button>
            <button
              className=''
              onClick={() => {
                openDeleteModal(row.values);
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
    { columns: userColumns, data: userData, disableMultiSort: true, initialState: { pageSize: 10 } },
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
              tableName={'users'}
            />
          </div>
          <table className='table' {...getTableProps()}>
            <thead className='thead'>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup._id} className='tr' {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, idx) => (
                    <th key={idx} className='th' {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                      <td key={idx} className=' td' {...cell.getCellProps()}>
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
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {openEditView ? (
        <EditUser toUpdateUser={toUpdateUser} userID={userID} setOpenEditView={setOpenEditView}></EditUser>
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
    </>
  );
}
