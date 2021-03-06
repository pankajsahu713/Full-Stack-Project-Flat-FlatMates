import React, { Component, useMemo } from 'react'
import { useTable, usePagination ,useGlobalFilter,useFilters } from 'react-table'
import { useEffect } from 'react'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'

import { useState } from 'react'


//import todo
import ToDoService from '../../service/ToDoService'

export const PaginationTable = () => {


//for extra search bar

  //const [filterInput, setFilterInput] = useState("");
 
//   const handleFilterChange = e => {
//     const value = e.target.value || undefined;
//     setFilter("show.type", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
//     setFilterInput(value);
//   };
//for extra search bar

  const columns = useMemo(() => COLUMNS, [])

  
  //const data = useMemo(() => MOCK_DATA, [])
 


//for axios connectivity
  const [data,setData] = useState([])
  
  useEffect(() => {
    retrieveFlatList();
  }, []);

  
  
  const retrieveFlatList = () => {
    const number = 452001;
    console.log("skdjfhsduivbsjkd");

    ToDoService.fetchAllFlats()
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    setGlobalFilter,
    setFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 2 }
    },
  
    useGlobalFilter,
    useFilters,
    usePagination
  )

  const { pageIndex, pageSize ,globalFilter } = state
  

  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

    <br/>
    <br/>

    {/* extra button for search bar */}
    {/* <input
    value={filterInput}
    onChange={handleFilterChange}
    placeholder={"Search by flat type"}/> */}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}
                  {/* each table columne */}
                {/* <div>{column.canFilter ? column.render('Filter') : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}