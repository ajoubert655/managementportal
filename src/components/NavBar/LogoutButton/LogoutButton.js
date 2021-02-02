import React from 'react';

import classes from './LogoutButton.module.css';

const logoutButton = (props) => {
  return (
    <button 
      className={classes.logoutButton}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
}

export default logoutButton;