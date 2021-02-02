import React from 'react';
import {Link} from 'react-router-dom';

import classes from './LoginLink.module.css';

const loginLink = (props) => {
  return (
    <Link 
      to={{pathname:'/login'}} 
    >
      <button className={classes.loginLink}>
        {props.children}
      </button>
    </Link>
  );
}

export default loginLink;