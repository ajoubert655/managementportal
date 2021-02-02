import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.css';

import ManagementPortal from './containers/ManagementPortal';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ManagementPortal/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
