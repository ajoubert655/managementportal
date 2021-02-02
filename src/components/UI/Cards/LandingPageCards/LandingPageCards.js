import React from 'react';
import {Link} from 'react-router-dom';

import classes from './LandingPageCards.module.css';
import Card from '../Card';

const landingPageCards = (props) => {
  return (
    <div className={classes.landingPageCards}>
      <Link to={{pathname:'/manage-orgs-and-tests'}}><Card>Manage Organizations and Tests</Card></Link>
      <a href='/view-users'><Card>View Users</Card></a>
      <a href='/view-sessions'><Card>View Sessions</Card></a>
    </div>
  );
}

export default landingPageCards;