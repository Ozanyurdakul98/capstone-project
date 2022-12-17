import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table';
import AllColumnsFilter from '../TableComponents/AllColumnsFilter';
import ServicesFilter from '../TableComponents/ServicesFilter';
import { TbEdit } from 'react-icons/tb';
import { MdDeleteForever, MdInfo } from 'react-icons/md';
import { useRouter } from 'next/router';
import { DeleteModal } from '../../Modals/DeleteModal';
import StudioServiceInformation from '../../Modals/StudioServiceInformation';
import { formatValue } from 'react-currency-input-field';
import { StudioServiceForm } from '../../Forms/StudioServiceForm';
import { BackgroundOverlayFullscreen as ClickToCloseMax } from '../../BackgroundOverlay';

export default function StudioServicesTable({ fetchedStudioServices, role, sanitizedAdminStudioServices }) {
  const [toUpdateStudioService, setToUpdateStudioService] = useState();
  const [openView, setOpenView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModalStrings, setDeleteModalStrings] = useState({
    header: 'Are you sure you want to delete this Studio?',
    message: 'This Studio will be permanently deleted! If you want to delete this Studio, click on Delete.',
    studioServiceID: '',
    error: '',
  });
  const [selectedStudioServiceInformation, setSelectedStudioServiceInformation] = useState('');
  const [studioServices, setStudioServices] = useState([]);
  const router = useRouter();
  const studioServiceData = useMemo(() => [...studioServices], [studioServices]);
  const isEven = (idx) => idx % 2 !== 0;

  async function handleEdit(values) {
    if (values) {
      const id = values._id;
      try {
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studioservice/' : '/api/dashboard/studioservice/'}${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await res.json();
        const studioServiceRaw = result.data[0];
        const studioService = {
          id: studioServiceRaw._id,
          images: studioServiceRaw.images,
          listingTitle: studioServiceRaw.listingTitle,
          service: studioServiceRaw.service,
          description: studioServiceRaw.description,
          maxGuests: studioServiceRaw.maxGuests,
          equipment: studioServiceRaw.equipment,
          additionalServices: studioServiceRaw.additionalServices,
          soundengineer: studioServiceRaw.soundengineer,
          pricing: studioServiceRaw.pricing,
          subInformations: studioServiceRaw.subInformations,
          studio: studioServiceRaw.studio,
          user: studioServiceRaw.user,
          createdAtDate: studioServiceRaw.createdAtDate,
          updatedAtDate: studioServiceRaw.updatedAtDate,
        };
        if (!res.ok || !result.success) {
          throw new Error(res.status);
        }
        setToUpdateStudioService(studioService);
        setOpenView('edit');
      } catch (error) {
        alert('Something went wrong, Contact us if you need help!', error);
        console.error('Failed to find Studioservice', error);
      }
    }
  }
  async function handleDelete(ID) {
    if (ID) {
      setLoading((prev) => !prev);
      try {
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studioservice/' : '/api/dashboard/studioservice/'}${ID}`,
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
        setDeleteModalStrings({
          ...deleteModalStrings,
          message: `successfully deleted...`,
          studioServiceID: '',
        });
        setTimeout(() => {
          setLoading(false);
          router.reload();
        }, 1500);
      } catch (error) {
        setDeleteModalStrings({ ...deleteModalStrings, message: "It didn't work", error: error });
        setLoading(false);
        console.error('Failed to find Studioservice', error);
      }
    }
  }
  function openDeleteModal(values) {
    setToUpdateStudioService(values._id);
    setDeleteModalStrings({ ...deleteModalStrings, studioServiceID: values._id });
    setOpenView('delete');
  }
  async function openInfoModal(values) {
    if (values) {
      const id = values._id;
      try {
        const res = await fetch(
          `${role === 'admin' ? '/api/dashboard/admin/studioservice/' : '/api/dashboard/studioservice/'}${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await res.json();
        const studioServiceRaw = result.data[0];
        const studioService = {
          id: studioServiceRaw._id,
          images: studioServiceRaw.images,
          listingTitle: studioServiceRaw.listingTitle,
          service: studioServiceRaw.service,
          description: studioServiceRaw.description,
          maxGuests: studioServiceRaw.maxGuests,
          equipment: studioServiceRaw.equipment,
          additionalServices: studioServiceRaw.additionalServices,
          soundengineer: studioServiceRaw.soundengineer,
          pricing: studioServiceRaw.pricing,
          subInformations: studioServiceRaw.subInformations,
          studio: studioServiceRaw.studio,
          user: studioServiceRaw.user,
          createdAtDate: studioServiceRaw.createdAtDate,
          updatedAtDate: studioServiceRaw.updatedAtDate,
        };
        if (!res.ok || !result.success) {
          throw new Error(res.status);
        }
        setSelectedStudioServiceInformation(studioService);
        setOpenView('info');
      } catch (error) {
        alert('Something went wrong, Contact us if you need help!', error);
        console.error('Failed to find Studio', error);
      }
    }
  }
  const handleClickToCloseModal = () => {
    setOpenView('');
  };
  useEffect(() => {
    if (fetchedStudioServices) {
      setStudioServices(fetchedStudioServices);
    }
  }, []);

  const studioServiceColumns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'images.primary',
        disableSortBy: true,
        Cell: ({ value }) => (
          <div className="relative -mx-2 h-14 w-14 sm:h-16 sm:w-16 md:h-24 md:w-24">
            <Image src={value} layout="fill" className="bg-secondary rounded-xl " objectFit="cover" alt="avatar" />
          </div>
        ),
      },
      {
        Header: 'Service',
        id: 'Service',
        accessor: 'service.name',
        disableSortBy: true,
        collapse: false,
      },
      {
        Header: 'Max Guests',
        accessor: 'maxGuests',
        disableSortBy: false,
      },
      {
        Header: 'Soundengineer',
        accessor: (row) =>
          row.soundengineer.price
            ? formatValue({
                value: row.soundengineer.price,
                intlConfig: {
                  locale: row.subInformations.locale,
                  currency: row.subInformations.currency,
                },
              })
            : row.soundengineer,
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
      columns: studioServiceColumns,
      data: studioServiceData,
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
  return (
    <>
      <div className="mb-20 block max-w-full">
        <div className="tableWrap">
          {/* filters */}
          <div className="filter-table">
            <AllColumnsFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
              state={state.globalFilter}
              tableName={'Studioservices'}
            />
            <ServicesFilter setFilter={setFilter} />
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
      {openView === 'edit' ? (
        <>
          <div className="searchFadein fixed inset-0 z-50 m-auto flex h-4/6 w-full flex-col gap-5 rounded-2xl bg-white   pb-5  shadow-xxl md:min-h-72 md:w-11/12 lg:w-8/12 xl:w-6/12">
            <div className=" overflow-y-scroll sm:px-0">
              <div className="mt-4 flex flex-col gap-4">
                <h2 className="h2 ml-5 text-2xl">Edit Studio</h2>
              </div>
              <div className=" px-2 sm:ml-5 md:mr-5">
                <div className="sm:px-0">
                  <StudioServiceForm
                    selectedStudioServiceInformation={toUpdateStudioService}
                    studioService={sanitizedAdminStudioServices}
                    role={role}
                  />
                </div>
              </div>
            </div>
          </div>
          <ClickToCloseMax style={'bg-black/50 editModal z-40 h-full'} onClick={() => handleClickToCloseModal()} />
        </>
      ) : null}
      {openView === 'delete' ? (
        <DeleteModal
          id={toUpdateStudioService}
          loading={loading}
          deleteModalStrings={deleteModalStrings}
          deleteFunction={handleDelete}
        />
      ) : null}
      {openView === 'info' ? (
        <StudioServiceInformation setOpenView={setOpenView} studioService={selectedStudioServiceInformation} />
      ) : null}
    </>
  );
}
