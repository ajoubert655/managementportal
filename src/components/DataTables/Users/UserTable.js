import React, {useMemo, useState, useEffect} from 'react';
import {
  useTable, 
  useSortBy, 
  useGlobalFilter, 
  usePagination,
  useRowSelect
} from 'react-table';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import {COLUMNS} from './columns';

import TableFilter from '../../UI/TableFilter/TableFilter';

import classes from './UserTable.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../UI/Spinner/Spinner';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // get data from api
  useEffect(() => {
    axios.get('/users').then(res => {
      const pathToData = res.data.result.Items
      const loadedData = [];
      
      // push data objects into an array
      for (const Item in pathToData) {
        loadedData.push({
          id: Item,
          itemType: pathToData[Item].itemType,
          firstName: pathToData[Item].firstName,
          lastName: pathToData[Item].lastName,
          userId: pathToData[Item].userId,
          email: pathToData[Item].email,
          phone: pathToData[Item].phone,
          street: pathToData[Item].address.street1,
          city: pathToData[Item].address.city,
          state: pathToData[Item].address.state,
          zip: pathToData[Item].address.zip,
          country: pathToData[Item].address.country, 
        });
      }
      // update state
      setUsers(loadedData);
      setLoaded(true);
    });
  }, []);

  // memoize data to ensure it is not duplicated on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => users, [users]);

  // create table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    selectedFlatRows,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns: columns,
      data: data
    },
    // add sorting, filtering, pagination and row select
    useGlobalFilter,  useSortBy, usePagination, useRowSelect,
  );

  // destructure global filter and page index from state object
  const {globalFilter, pageIndex} =  state;

  // data from selected row is stored here
  let selectedRow = selectedFlatRows
  console.log(selectedRow);

  return (
    <div className={classes.tableWrap}>
      {/* if data is loaded, render table and associated components. if not, render loading spinner */}
      {loaded ? 
        <div>
          {/* render filter field, with globalFilter and setGlobalFilter passed as props */}
          <div className={classes.toolBarWrap}>
            {/* render filter field, with globalFilter and setGlobalFilter passed as props */}
            <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>

          {/* render table */}
          <Table {...getTableProps()} striped bordered hover>
            <thead>
              {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // render headers w/ sort functionality
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>  
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faCaretUp} /> : <FontAwesomeIcon icon={faCaretDown} />) : ''}
                        </span>
                      </th>
                    ))} 
                  </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  // render table rows
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <div>
            {/* render pagination buttons */}
            <button
              className={classes.pageButton} 
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >Previous</button>
            <span className={classes.pageNum}>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <button
              className={classes.pageButton} 
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >Next</button>
          </div>
          <br/>
        </div>
      : 
        <div className={classes.spinnerWrap}>
          <Spinner />
        </div>
      }
    </div>
  );
}
export default UserTable