import React from 'react';

import classes from './OrgsAndTestsCards.module.css';
import Card from '../Card';

const orgsAndTestsCards = (props) => {
  return (
    <div className={classes.orgsAndTestsCards}>
      <a href='/manage-orgs'><Card>Manage Organizations</Card></a>
      <a href='/manage-tests'><Card>Manage Tests</Card></a>
    </div>
  );
}

export default orgsAndTestsCards;
