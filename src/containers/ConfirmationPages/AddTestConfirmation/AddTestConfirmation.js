import React from 'react';
import {Link} from 'react-router-dom'

import classes from './AddTestConfirmation.module.css';
import SmallButton from '../../../components/UI/SmallButton/SmallButton';

const addTestConfirmation = () => {
  return(
    <main className={classes.main}>
      <h3 className={classes.header}>You successfully added a test.</h3>
      <Link to={{pathname:'/manage-tests'}}><SmallButton>Back to Tests</SmallButton></Link>
    </main>
  );
};

export default addTestConfirmation;