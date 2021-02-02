import React, {Component} from 'react';

import classes from './LandingPage.module.css';
import LandingPageCards from '../../components/UI/Cards/LandingPageCards/LandingPageCards';

class LandingPage extends Component {
  render () {
    return (
      <main className={classes.main}>
        <h1 className={classes.header}>Invigulus Management Portal</h1>
        <LandingPageCards>Manage Organizations</LandingPageCards>
      </main>
    );
  }
}

export default LandingPage;