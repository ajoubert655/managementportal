import React from 'react';
import {Link} from 'react-router-dom'

import classes from './ChangePasswordConfirmation.module.css';
import SmallButton from '../../../components/UI/SmallButton/SmallButton';

const addTestConfirmation = () => {
  return(
    <main className={classes.main}>
      <h3 className={classes.header}>You successfully changed your password.</h3>
      <Link to={{pathname:'/'}}><SmallButton>Login</SmallButton></Link>
    </main>
  );
};

export default addTestConfirmation;