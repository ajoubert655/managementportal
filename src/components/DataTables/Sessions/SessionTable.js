import React, {useMemo, useState, useEffect} from 'react';
import {
  useTable, 
  useSortBy, 
  useFilters, 
  usePagination,
  useRowSelect
} from 'react-table';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {withRouter, useHistory} from 'react-router-dom';
import {CSVLink} from 'react-csv';

import {COLUMNS} from './columns';

import classes from './SessionTable.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '../../UI/Checkbox/Checkbox';
import SmallButton from '../../UI/SmallButton/SmallButton';
import Spinner from '../../UI/Spinner/Spinner';
import Alert from '../../../components/UI/Alert/Alert';

const SessionTable = () => {
  // declare state variables
  const [sessions, setSessions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // allow use of history
  const history = useHistory();

  // get data from api
  useEffect(() => {
    axios.get('/sessions').then(res => {
      //console.log(res.data.result.Items);
      const pathToData = res.data.result.Items
      const loadedData = [];

      // push data objects into an array
      for (const Item in pathToData) {
        loadedData.push({
          itemId: pathToData[Item].itemId,
          itemType: pathToData[Item].itemType,
          // time data
          created: new Date(pathToData[Item].created).toLocaleDateString(),
          updated: new Date(pathToData[Item].updated).toLocaleDateString(),
          startTime: new Date(pathToData[Item].startTime),
          endTime: new Date(pathToData[Item].endTime),
          // session ids and process state
          sessionOrgId: pathToData[Item].sessionOrgId,
          sessionTestId: pathToData[Item].sessionTestId,
          sessionUserId: pathToData[Item].sessionUserId,
          processState: pathToData[Item].processState,
          // examinee data
          id: pathToData[Item].examinee.id,
          email: pathToData[Item].examinee.email,
          firstName: pathToData[Item].examinee.firstName,
          lastName: pathToData[Item].examinee.lastName,
          code: pathToData[Item].examinee.code,
          state: pathToData[Item].examinee.state,
          // test data
          description: pathToData[Item].test.description,
          testId: pathToData[Item].test.id,
          // analytics
          analytics: pathToData[Item].analytics,
          // geolocation
          geoLocation: pathToData[Item].geoLocation,
          // openTok
          openTok: pathToData[Item].openTok,
          // userAgent
          userAgent: pathToData[Item].userAgent,
          // images
          images: pathToData[Item].images,
          // videos
          videos: pathToData[Item].videos
        });
      }
      //console.log(loadedData);
      setSessions(loadedData);
      setLoaded(true);
    });
  }, []);

  // memoize data to ensure it is not duplicated on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => sessions, [sessions]);

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
  } = useTable(
    {
      columns: columns,
      data: data
    },
    // add sorting, filtering, pagination and row select
    useFilters, useSortBy, usePagination, useRowSelect,
    // add a column for checkbox to tables
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            Header: ({getToggleAllRowsSelectedProps}) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
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
  const {pageIndex} =  state;

  // data from selected row is stored here
  let selectedRows = selectedFlatRows
  //console.log(selectedRows);

  const handleViewDetailsRequest = () => {
    try {
      // get sessionId of selected row and store in variable
      const sessionToDisplay = selectedRows[0].original.itemId;

      // initialize query parameters array
      const queryParams = [];

      // encode sessionId and push into queryParams as strings
      queryParams.push(encodeURIComponent('itemId') + '=' + encodeURIComponent(sessionToDisplay));

      // join queryParams strings and store in variable
      const queryString = queryParams.join('&');
      
      // pass queryString data to ViewSession container via router
      history.push({
        pathname: '/view-selected-session',
        search: '?' + queryString
      });
    } catch(err) {
      Alert('Please select a session to view.')
    }
  }
  //This is the code for the "OK" button on the custom alert box
  const ok = () => {
    document.getElementById('dialogbox').style.display = "none";
    document.getElementById('dialogoverlay').style.display = "none";
  }

  // loop through array of anomalies and count how many have more than one face detected
  const countAnomaliesWithMoreThanOneFace = (anomaliesArray) => {
    let counter = 0;
    anomaliesArray.forEach(el => {
      if (el.faces > 1) {
        counter++;
      }
    });
    return counter;
  }

  // loop through array of anomalies and count how many have zero faces detected
  const countAnomaliesWithZeroFaces = (anomaliesArray) => {
    let counter = 0;
    anomaliesArray.forEach(el => {
      if (el.faces === 0) {
        counter++;
      }
    });
    return counter;
  }

  // push relevant data for selected sessions into a new array for CSV export
  const selectedData = selectedRows;
  const dataToExport = [];
  for (const session in selectedData) {
    dataToExport.push({
      SessionID: selectedData[session].original.itemId,
      OrganizationID: selectedData[session].original.sessionOrgId,
      ExamName: selectedData[session].original.description,
      ExamID: selectedData[session].original.testId,
      SessionStart: selectedData[session].original.startTime.toISOString(), // convert to ISO datetime format
      SessionEnd: selectedData[session].original.endTime.toISOString(),
      // calculate number of minutes between beginning and end of the exam
      SessionDuration: (selectedData[session].original.endTime.getMinutes()) - (selectedData[session].original.startTime.getMinutes()) + ' minutes',
      ExamineeFirst: selectedData[session].original.firstName,
      ExamineeLast: selectedData[session].original.lastName,
      ExamineeEmail: selectedData[session].original.email,
      ExamineeState: selectedData[session].original.state,
      LaunchCode: selectedData[session].original.code,
      Fps: selectedData[session].original.analytics.postProcess.videoAttributes.fps,
      GreaterThanOneFaceAnomalies: countAnomaliesWithMoreThanOneFace(selectedData[session].original.analytics.postProcess.anomalies),
      ZeroFaceAnomalies: countAnomaliesWithZeroFaces(selectedData[session].original.analytics.postProcess.anomalies),
      TotalAnomalies: selectedData[session].original.analytics.postProcess.anomalies.length, // length of anomalies array
      ConfidenceLevel: null
    });
  }

  // set headers for CSV export
  const csvHeaders = [
    {label: 'Session ID', key: 'SessionID'},
    {label: 'Organization ID', key: 'OrganizationID'},
    {label: 'Exam Name', key: 'ExamName'},
    {label: 'Exam ID', key: 'ExamID'},
    {label: 'Session Start', key: 'SessionStart'},
    {label: 'Session End', key: 'SessionEnd'},
    {label: 'Session Duration', key: 'SessionDuration'},
    {label: 'Examinee First Name', key: 'ExamineeFirst'},
    {label: 'Examinee Last Name', key: 'ExamineeLast'},
    {label: 'Examinee Email', key: 'ExamineeEmail'},
    {label: 'Examinee State', key: 'ExamineeState'},
    {label: 'Launch Code', key: 'LaunchCode'},
    {label: 'Fps', key: 'Fps'},
    {label: '>1 Face Anomalies', key: 'GreaterThanOneFaceAnomalies'},
    {label: '0 Face Anomalies', key: 'ZeroFaceAnomalies'},
    {label: 'Total Anomalies', key: 'TotalAnomalies'},
    {label: 'Confidence Level', key: 'ConfidenceLevel'}
  ]

  return (
    <div className={classes.tableWrap}>
      {/* if data is loaded, render table and associated components. if not, render loading spinner */}
      {loaded 
        ? 
        <div>
          {/* render table */}
          <Table {...getTableProps()} striped bordered hover>
            <thead>
              {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // render headers w/ sort functionality
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>  
                        {column.render('Header')}
                        {/* if column is authorized for filtering, render filter */}
                        <div>{column.canFilter ? column.render('Filter') : null}</div>
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
            <div className={classes.dialogoverlay} id ="dialogoverlay"></div>
            <div className= {classes.dialogbox} id="dialogbox">
            <div>
                <div className={classes.dialoghead} id="dialogboxhead"></div>
                <div className={classes.dialogbody} id="dialogboxbody"></div>
                <div className={classes.dialogfoot} id="dialogboxfoot">
                <button className={classes.alertbutton} onClick={ok}>OK</button>
                </div>
            </div>
            </div>      
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
          {/* link to view details for selected session */}
          <SmallButton clicked={handleViewDetailsRequest}>View Details</SmallButton>

          {/* link to export selected sessions to csv file */}
          <CSVLink
            data={dataToExport}
            headers={csvHeaders}
            filename={'session-data.csv'}
          >
            <SmallButton>Export to CSV</SmallButton>
          </CSVLink>
        </div>
        :
        <div className={classes.spinnerWrap}> 
          <Spinner/>
        </div>
      }
    </div>
  );
}
export default withRouter(SessionTable);
