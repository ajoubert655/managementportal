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
import {Link, withRouter, useHistory} from 'react-router-dom';

import {COLUMNS} from './columns';
import TableFilter from '../../UI/TableFilter/TableFilter';

import classes from './TestTable.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../../UI/Checkbox/Checkbox';
import SmallButton from '../../UI/SmallButton/SmallButton';
import Spinner from '../../UI/Spinner/Spinner';
import Alert from '../../../components/UI/Alert/Alert';
import Confirm from '../../../components/UI/Alert/Confirm';

const TestTable = () => {
  const [tests, setTests] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  // get data from api
  useEffect(() => {
    axios.get('/tests').then(res => {
      //console.log(res.data.result.Items);
      const pathToData = res.data.result.Items
      const loadedData = [];

      // push data objects into an array
      for (const Item in pathToData) {
        loadedData.push({
          id: pathToData[Item].id,
          itemId: pathToData[Item].itemId,
          itemType: pathToData[Item].itemType,
          testOrgId: pathToData[Item].testOrgId,
          description: pathToData[Item].description,
          tds: pathToData[Item].tds,
          created: pathToData[Item].created,
          updated: pathToData[Item].updated
        });
      }
      // update state
      setTests(loadedData);
      setLoaded(true);
      console.log(loadedData);
    });
  }, []);

  // memoize data to ensure it is not duplicated on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => tests, [tests]);

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
    // add a column for checkbox to tables
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: 'select',
            Cell: ({row}) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            )
          },
          ...columns
        ]
      });
    }
  );

  // destructure global filter and page index from state object
  const {globalFilter, pageIndex} =  state;

  // data from selected row is stored here
  let selectedRow; 
  selectedRow = selectedFlatRows
  //console.log(selectedRow);

  // handle edit button click
  const handleEditRequest = () => {
    try{
      // get properties to be passed to form and store in variable
      const itemToEdit = selectedRow[0].original;
      // initialize query parameters array
      const queryParams = [];

      // loop through itemToEdit, encode data, and push into queryParams as strings
      for (let i in itemToEdit) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(itemToEdit[i]));
      }
      // join queryParams strings and store in variable
      const queryString = queryParams.join('&');

      // pass queryString data to EditTestForm via router
      history.push({
        pathname: '/edit-test',
        search: '?' + queryString
      });
    } catch(err) {
      Alert('Please select a test to edit.')
    }
  }

  const yes = () => {
    // make axios call, then reload page
    let itemToDelete = selectedRow[0].original.id
      
      // make axios call, then reload page
      axios.delete(`/tests/${itemToDelete}`)
          .then(res => {
            console.log(res)
            if (res.status === 200) {
              window.location.reload();
            }
          })
          .catch(error => Alert(error));

        document.getElementById('dialogbox2').style.display = "none";
        document.getElementById('dialogoverlay2').style.display = "none";
  }

  const ok = () => {
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  const no = () => {
    document.getElementById('dialogbox2').style.display = "none";
    document.getElementById('dialogoverlay2').style.display = "none";
  }

  // handle delete button click
  const handleDeleteRequest = () => {
    if (selectedRow[0] === undefined)
    {
      Alert("Please select a test to delete.")
    }
    else {
      Confirm("Are you sure you want to delete this test?")
    }
  }

  return (
    <div className={classes.tableWrap}>
      {/* if data is loaded, render table and associated components. if not, render loading spinner */}
      {loaded ? 
        <div>
          <div className={classes.toolBarWrap}>
            {/* render filter field, with globalFilter and setGlobalFilter passed as props */}
            <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Link to={{pathname: '/add-test'}}><SmallButton>Add New</SmallButton></Link>
          </div>

          <div className={classes.dialogoverlay} id ="dialogoverlay2"></div>
          <div className= {classes.dialogbox} id="dialogbox2">
          <div>
              <div className={classes.dialoghead} id="dialogboxhead2"></div>
              <div className={classes.dialogbody} id="dialogboxbody2"></div>
              <div className={classes.dialogfoot} id="dialogboxfoot2">
              <button id="yes1"className={classes.alertbutton} onClick={yes}>OK</button>
              <button id="no1" className={classes.alertbutton} onClick={no}>Cancel</button> 
              </div>
          </div>
          </div>

          <div className={classes.dialogoverlay} id ="dialogoverlay"></div>
          <div className= {classes.dialogbox} id="dialogbox">
          <div>
              <div className={classes.dialoghead} id="dialogboxhead"></div>
              <div className={classes.dialogbody} id="dialogboxbody"></div>
              <div className={classes.dialogfoot} id="dialogboxfoot">
              <button id="yes1"className={classes.alertbutton} onClick={ok}>OK</button>
              </div>
          </div>
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
          <SmallButton clicked={handleEditRequest}>&nbsp;&nbsp;Edit&nbsp;&nbsp;</SmallButton>
          <SmallButton clicked={handleDeleteRequest}>Delete</SmallButton>
        </div>
      : 
        <div className={classes.spinnerWrap}>
          <Spinner />
        </div>
      }

    </div>
  );
}
export default withRouter(TestTable);