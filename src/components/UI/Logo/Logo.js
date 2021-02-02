import React from 'react';
import {Link} from 'react-router-dom';

import invigulusLogo from '../../../assets/images/Logo.PNG';
import classes from './Logo.module.css';

const logo = () => {
  return(
    <div className={classes.logo}>
      <Link to={{pathname:'/'}}><img src={invigulusLogo} alt="Invigulus Logo" /></Link>
    </div>
  );
};

export default logo;
