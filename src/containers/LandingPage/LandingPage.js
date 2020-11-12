import React, {Component} from 'react';

import classes from './LandingPage.module.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import LandingPageCards from '../../components/UI/Cards/LandingPageCards/LandingPageCards';

class LandingPage extends Component {
  buttonClickedHandler = () => {
    alert('You clicked a button');
  }

  render () {
    return (
      <div>
        <NavBar />
        <main className={classes.main}>
          <h1 className={classes.header}>Invigulus Management Portal</h1>
          <LandingPageCards>Manage Organizations</LandingPageCards>
        </main>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;