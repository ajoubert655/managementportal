import React, {Component} from 'react';


import classes from './OrgsAndTests.module.css';
import OrgsAndTestsCards from '../../components/UI/Cards/OrgsAndTestsCards/OrgsAndTestsCards';

class OrgsAndTests extends Component {
  render () {
    return (
      <main className={classes.main}>
        <h1 className={classes.header}>Organizations and Tests</h1>
        <OrgsAndTestsCards>Manage Organizations</OrgsAndTestsCards>
      </main>
    );
  }
}

export default OrgsAndTests;