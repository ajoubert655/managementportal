import React from 'react';

import classes from './SmallButton.module.css';

const smallButton = (props) => {
  return (
    <button
    className={classes.smallButton}
    onClick={props.clicked}
    >
    {props.children}
    </button>
  );
}

export default smallButton;