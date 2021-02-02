import React from 'react';
import {Link} from 'react-router-dom';

import classes from './ChangePasswordLink.module.css';

const changePasswordLink = (props) => {
  return (
    <Link 
      to={{pathname:'/change-password'}} 
    >
      <button className={classes.changePasswordLink}>
        {props.children}
      </button>
    </Link>
  );
}

export default changePasswordLink;