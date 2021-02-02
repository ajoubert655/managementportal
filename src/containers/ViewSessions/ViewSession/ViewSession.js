import React, {Component} from 'react';
import axios from 'axios';

import classes from './ViewSession.module.css';
import {Tabs, Tab, Table} from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ViewSession extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        analytics: {},
        created: 0,
        endTime: 0,
        examinee: {},
        geoLocation: {},
        images: {},
        itemId: '',
        itemType: '',
        openTok: {},
        processState: '',
        sessionOrgId: '',
        sessionTestId: '',
        sessionUserId: '',
        startTime: 0,
        test: {},
        updated: 0,
        userAgent: '',
        videos: {},
      },
      dataLoaded: false,
      showSourceModal: false
    }
  }

  componentDidMount() {
    // parse query from URL string to retrieve sessionId
    const query = new URLSearchParams(this.props.location.search);
    const sessionId = {};
    for (let param of query.entries()) {
      sessionId[param[0]] = param[1];
    }
    console.log(sessionId)

    // extract itemId from sessionId object and process it for axios call (remove dynamodb prefix)
    const preProcessedItemId = sessionId.itemId
    console.log(sessionId.itemId)
    const stringToSlice = preProcessedItemId.toString();
    const processedItemId = stringToSlice.slice(4);

    console.log(preProcessedItemId)
    console.log (processedItemId)

    // get session by sessionId
    axios.get(`/sessions/${processedItemId}`).then(res => {
      //console.log(res.data.result.Items);
      const pathToData = res.data.result.Items;
      const loadedData = [];

      // push data objects into an array
      for (const Item in pathToData) {
        loadedData.push({
          analytics: pathToData[Item].analytics,
          created: pathToData[Item].created,
          endTime: pathToData[Item].endTime,
          examinee: pathToData[Item].examinee,
          geoLocation: pathToData[Item].geoLocation,
          images: pathToData[Item].images,
          itemId: pathToData[Item].itemId,
          itemType: pathToData[Item].itemType,
          openTok: pathToData[Item].openTok,
          processState: pathToData[Item].processState,
          sessionOrgId: pathToData[Item].sessionOrgId,
          sessionTestId: pathToData[Item].sessionTestId,
          sessionUserId: pathToData[Item].sessionUserId,
          startTime: pathToData[Item].startTime,
          test: pathToData[Item].test,
          updated: pathToData[Item].updated,
          userAgent: pathToData[Item].userAgent,
          videos: pathToData[Item].videos,
        });
      }
      // update state
      this.setState({data: loadedData[0]});
      this.setState({dataLoaded: true}); 
      //console.log(this.state);
    });
  }

  // render anomalies table rows dynamically based on number of objects in anomalies array
  renderAnomalyTableRows(array) {
    return array.map(item =>
      <tr key={item}>
        <td>{item.id}</td>
        <td>{item.faces}</td>
        <td>{item.relativePosition.start}</td>
        <td>{item.relativePosition.end}</td>
        <td>{item.absolutePosition.start}</td>
        <td>{item.absolutePosition.end}</td>
        <td>{item.time.start}</td>
        <td>{item.time.end}</td>
      </tr>
    );
  }

  // render openTok archive table rows dynamically based on number of objects in archives array
  renderOpenTokTableRows(array) {
    return array.map(item =>
      <tr>
        <td>{item.sessionId}</td>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.event}</td>
        <td>{item.partnerId}</td>
        <td>{item.projectId}</td>
        <td>{item.password}</td>
        <td>{item.outputMode}</td>
        <td>{item.hasAudio.toString()}</td>
        <td>{item.hasVideo.toString()}</td>
        <td>{item.size}</td>
        <td>{item.status}</td>
      </tr>
    );
  }

  handleSourceLinkClick() {
    // store source url in a variable
    const sessionId = this.state.data.itemId;

    // initialize query parameters array
    const queryParams = [];

    // encode sessionId and push into queryParams as strings
    queryParams.push(encodeURIComponent('sessionId') + '=' + encodeURIComponent(sessionId));

    // join queryParams strings and store in variable
    const queryString = queryParams.join('&');
    
    // pass queryString data to ViewSourceURL container via router
    this.history.push({
      pathname: '/view-sourceURL',
      search: '?' + queryString
    });
  }

  render() {
    // reformat dates received from database
    const unformattedStartTime = new Date(this.state.data.startTime);
    const startTime = unformattedStartTime.toISOString();

    const unformattedEndTime = new Date(this.state.data.endTime);
    const endTime = unformattedEndTime.toISOString();

    const unformattedCreated = new Date(this.state.data.created);
    const created = unformattedCreated.toISOString();

    const unformattedUpdated = new Date(this.state.data.updated);
    const updated = unformattedUpdated.toISOString();

    return(
      <>
        {/* if data has been loaded from api, render tables, if not, display loading message */}
        {this.state.dataLoaded ? 
          <main className={classes.main}>
            <h1 className={classes.header}>View Session</h1>

            <div className={classes.wrap}>
              <div className={classes.tabWrap}>
                <Tabs defaultActiveKey="main" id="sessionTabs">
                  <Tab eventKey="main" title="Main">
                    <Table id='mainTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>Session ID</th>
                          <th>Item Type</th>
                          <th>Session Org ID</th>
                          <th>Session Test ID</th>
                          <th>Session User ID</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.itemId}</td>
                          <td>{this.state.data.itemType}</td>
                          <td>{this.state.data.sessionOrgId}</td>
                          <td>{this.state.data.sessionTestId}</td>
                          <td>{this.state.data.sessionUserId}</td>
                          <td>{startTime}</td>
                          <td>{endTime}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
      
                  <Tab eventKey="location" title="Location">
                    <Table id='locationTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>Latitude</th>
                          <th>Longitude</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.geoLocation.latitude}</td>
                          <td>{this.state.data.geoLocation.longitude}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
      
                  <Tab eventKey="userAgent" title="User Agent">
                    <Table id='userAgentTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>User Agent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.userAgent}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
      
                  <Tab eventKey="analytics" title="Analytics">
                    <Table id='analyticsTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th colSpan="8">PARAMETERS</th>
                        </tr>
                        <tr>
                          <th colSpan="2">Source</th>
                          <th colSpan="2">Interval</th>
                          <th colSpan="2">Duration</th>
                          <th colSpan="2">Frame</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="2"><a href={this.state.data.analytics.postProcess.parameters.source} rel="noreferrer" target="_blank">Link to URL</a></td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.parameters.interval}</td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.parameters.duration}</td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.parameters.frame}</td>
                        </tr>
                      </tbody>
      
                      <thead>
                        <tr>
                          <th colSpan="8">VIDEO ATTRIBUTES</th>
                        </tr>
                        <tr>
                          <th colSpan="2">Duration of Video</th>
                          <th colSpan="2">Frames</th>
                          <th colSpan="2">Frames Processed</th>
                          <th colSpan="2">Fps</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="2">{this.state.data.analytics.postProcess.videoAttributes.duration}</td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.videoAttributes.frames}</td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.videoAttributes.processed}</td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.videoAttributes.fps}</td>
                        </tr>
                      </tbody>
      
                      <thead>
                        <tr>
                          <th colSpan="8">STATISTICS</th>
                        </tr>
                        <tr>
                          <th colSpan="3">Video Processing Time</th>
                          <th colSpan="3">Anomaly Processing Time</th>
                          <th colSpan="2">Frames Processed per Second</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="3">{this.state.data.analytics.postProcess.statistics.video}</td>
                          <td colSpan="3">{this.state.data.analytics.postProcess.statistics.anomalies}</td>
                          <td colSpan="2">{this.state.data.analytics.postProcess.statistics.fps}</td>
                        </tr>
                      </tbody>
      
                      <thead>
                        <tr>
                          <th colSpan="8">FACES</th>
                        </tr>
                        <tr>
                          <th colSpan="4">Single Face Ratio</th>
                          <th colSpan="4">Average Face Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="4">{this.state.data.analytics.postProcess.faces.singleFaceRatio}</td>
                          <td colSpan="4">{this.state.data.analytics.postProcess.faces.averageFaceCount}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
      
                  <Tab eventKey="anomalies" title="Anomalies">
                    <Table id='anomaliesTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th colSpan="8">ANOMALIES</th>
                        </tr>
                        <tr>
                          <th>Anomaly ID</th>
                          <th>Number of Faces Detected</th>
                          <th>Relative Start Frame</th>
                          <th>Relative End Frame</th>
                          <th>Absolute Start Frame</th>
                          <th>Absolute Start Frame</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderAnomalyTableRows(this.state.data.analytics.postProcess.anomalies)}
                      </tbody>
                    </Table>
                  </Tab>
      
                  <Tab eventKey="openTok" title="OpenTok Archive">
                    <Table id='openTokTable' striped bordered hover>
                      <thead>
                        <tr>
                          <th>Session ID</th>
                          <th>Archive ID</th>
                          <th>Archive Name</th>
                          <th>Event</th>
                          <th>Partner ID</th>
                          <th>Project ID</th>
                          <th>Password</th>
                          <th>Output Mode</th>
                          <th>Has Audio?</th>
                          <th>Has Video?</th>
                          <th>Size</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.renderOpenTokTableRows(this.state.data.openTok.archives)}
                      </tbody>
                    </Table>
                  </Tab>
      
                  <Tab eventKey="examinee" title="Examinee">
                    <Table id='examineeTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.examinee.id}</td>
                          <td>{this.state.data.examinee.email}</td>
                          <td>{this.state.data.examinee.firstName}</td>
                          <td>{this.state.data.examinee.lastName}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="images" title="Images">
                    <Table id='imageTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>Face</th>
                          <th>Identification</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.images ? this.state.data.images.face : 'no image'}</td>
                          <td>{this.state.data.images ? this.state.data.images.identification : 'no image'}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="test" title="Test">
                    <Table id='testTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>Test ID</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.test.id}</td>
                          <td>{this.state.data.test.description}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="videos" title="Videos">
                    <Table id='videosTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>Environment</th>
                          <th>Face</th>
                          <th>Screen</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.data.videos.environment}</td>
                          <td>{this.state.data.videos.face}</td>
                          <td>{this.state.data.videos.screen}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="dates" title="Dates">
                    <Table id='datesTable' striped bordered hover style={{tableLayout: 'fixed'}}>
                      <thead>
                        <tr>
                          <th>Date Created</th>
                          <th>Date Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{created}</td>
                          <td>{updated}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </main> 
        : <main className={classes.main}>
              <div className={classes.spinnerWrap}>
                <Spinner />
              </div>
          </main>}
      </>
    );
  }
}

export default ViewSession;