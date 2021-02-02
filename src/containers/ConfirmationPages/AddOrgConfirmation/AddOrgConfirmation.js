import React from 'react';
import {Link} from 'react-router-dom'

import classes from './AddOrgConfirmation.module.css';
import SmallButton from '../../../components/UI/SmallButton/SmallButton';

const addOrgConfirmation = () => {
  return(
    <main className={classes.main}>
      <h3 className={classes.header}>You successfully added an organization.</h3>
      <Link to={{pathname:'/manage-orgs'}}><SmallButton>Back to Organizations</SmallButton></Link>
    </main>
  );
};

export default addOrgConfirmation;