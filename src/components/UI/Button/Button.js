import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
  return (
    <button
    className={classes.Button}
    onClick={props.clicked}
    >
    Test Button
    </button>
  );
}

export default button;