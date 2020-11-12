import React from 'react';

import classes from './LandingPageCards.module.css';
import Card from '../Card';


const landingPageCards = () => {
  return (
    <div className={classes.landingPageCards}>
      <Card>Manage Organizations</Card>
      <Card>Manage Users</Card>
      <Card>View Sessions</Card>
    </div>
  );
}

export default landingPageCards;