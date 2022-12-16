import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import AllColumnsFilter from '../TableComponents/AllColumnsFilter';
import ServicesFilter from '../TableComponents/ServicesFilter';
import StudioTypeFilter from '../TableComponents/StudioTypeFilter';
import EditStudio from '../../Forms/EditStudio';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever, MdInfo } from 'react-icons/md';
import { useRouter } from 'next/router';
import { DeleteModal } from '../../Modals/DeleteModal';
import StudioInformation from '../../Modals/StudioInformation';

export default function MyStudiosTable({ fetchedStudios, role }) {
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
  const [selectedStudioInformation, setSelectedStudioInformation] = useState('');
  const [studios, setStudios] = useState([]);
  const router = useRouter();
  const studioData = useMemo(() => [...studios], [studios]);
  const isEven = (idx) => idx % 2 !== 0;

  async function handleEdit(values) {
    if (values) {
      const id = values._id;
      try {
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studio/' : '/api/dashboard/studio/'}${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await res.json();
        const rawStudio = result.data[0];
        const studio = {
          logo: rawStudio.logo,
          studioName: rawStudio.studioName,
          profileText: rawStudio.profileText,
          studiotype: rawStudio.studiotype,
          studioInformation: rawStudio.studioInformation,
          studioLanguages: rawStudio.studioLanguages,
          openingHours: rawStudio.openingHours,
          locationFeatures: rawStudio.locationFeatures,
          sleepOver: rawStudio.sleepOver,
          studioSocials: rawStudio.studioSocials,
          studioLocation: rawStudio.studioLocation,
          studioRules: rawStudio.studioRules,
          additionalStudioRules: rawStudio.additionalStudioRules,
          user: rawStudio.user,
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
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studio/' : '/api/dashboard/studio/'}${ID}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!res.ok) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setDeleteModalStrings({
            ...deleteModalStrings,
            message: `successfully deleted...`,
            studioID: '',
          });
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

  async function openInfoModal(values) {
    if (values) {
      const id = values._id;
      try {
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studio/' : '/api/dashboard/studio/'}${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await res.json();
        const rawStudio = result.data[0];
        const studio = {
          _id: rawStudio._id,
          logo: rawStudio.logo,
          studioName: rawStudio.studioName,
          profileText: rawStudio.profileText,
          studiotype: rawStudio.studiotype,
          studioInformation: rawStudio.studioInformation,
          studioLanguages: rawStudio.studioLanguages,
          openingHours: rawStudio.openingHours,
          locationFeatures: rawStudio.locationFeatures,
          sleepOver: rawStudio.sleepOver,
          studioSocials: rawStudio.studioSocials,
          studioLocation: rawStudio.studioLocation,
          studioRules: rawStudio.studioRules,
          additionalStudioRules: rawStudio.additionalStudioRules,
          user: rawStudio.user,
          createdAtDate: rawStudio.createdAtDate,
          updatedAtDate: rawStudio.updatedAtDate,
        };
        if (!res.ok || !result.success) {
          throw new Error(res.status);
        }
        if (res.ok) {
          setStudioID(values._id);
          setSelectedStudioInformation(studio);
          setInfoModal(true);
        }
      } catch (error) {
        alert('Something went wrong, Contact us if you need help!', error);
        console.error('Failed to find Studio', error);
      }
    }
  }

  useEffect(() => {
    if (fetchedStudios) {
      setStudios(fetchedStudios);
    }
  }, []);
  const studioColumns = useMemo(
    () => [
      {
        Header: 'Logo',
        accessor: 'logo',
        disableSortBy: true,
        Cell: ({ value }) => (
          <div className="relative -mx-2 h-14 w-14 sm:h-16 sm:w-16 md:h-24 md:w-24">
            <Image src={value} layout="fill" className="bg-secondary rounded-full " objectFit="cover" alt="avatar" />
          </div>
        ),
      },
      {
        Header: 'Name',
        accessor: 'studioName',
        disableSortBy: true,
        collapse: false,
      },
      {
        Header: 'Studio Type',
        accessor: 'studiotype',
        disableSortBy: false,
      },
      {
        Header: 'Sleepover',
        accessor: (row) => (row.locationFeatures.includes('Sleepover') ? 'yes' : 'no'),
        disableSortBy: false,
      },
      {
        Header: 'Created',
        accessor: 'createdAtDate',
        collapse: false,
        disableSortBy: false,
      },
      {
        Header: 'Updated',
        accessor: 'updatedAtDate',
        collapse: false,
        disableSortBy: false,
      },
      {
        Header: 'ID',
        accessor: '_id',
        collapse: true,
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
          <div className="flex flex-col gap-2">
            <button
              className=""
              onClick={() => {
                openInfoModal(row.values);
              }}>
              <MdInfo className="table-icon" title="more information" />
            </button>
            <button
              className=""
              onClick={() => {
                handleEdit(row.values);
              }}>
              <TbEdit className="table-icon" title="edit studio" />
            </button>
            <button
              className=""
              onClick={() => {
                openDeleteModal(row.values);
              }}>
              <MdDeleteForever className="table-icon" title="delete studio" />
            </button>
          </div>
        ),
      },
    ]);
  };
  const tableInstance = useTable(
    {
      columns: studioColumns,
      data: studioData,
      disableMultiSort: true,
      initialState: { pageSize: 10 },
    },
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
  console.log(role);
  return (
    <>
      <div className="mb-5 block max-w-full">
        <div className="tableWrap">
          {/* filters */}
          <div className="filter-table">
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
          <table className="table" {...getTableProps()}>
            <thead className="thead">
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup._id} {...headerGroup.getHeaderGroupProps()}>
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
            <tbody className="tbody " {...getTableBodyProps()}>
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
          <div className="pagination">
            <div className="pagination-buttons">
              <button className="tablePagination-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>
              <button className="tablePagination-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>
              <button className="tablePagination-button" onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>
              <button
                className="tablePagination-button"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}>
                {'>>'}
              </button>
            </div>
            <span>
              Page
              <strong className="pl-1">
                {state.pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <span>|</span>
            <span className="flex items-center gap-1">
              Go to page:
              <input
                className="pagination-input"
                type="number"
                defaultValue={state.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </span>
            <select
              className="select-table"
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
          <StudioInformation setOpenModal={setInfoModal} studio={selectedStudioInformation} />
        </>
      ) : null}
    </>
  );
}
