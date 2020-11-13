import React from 'react';

import classes from './FormLabel.module.css';

const formlabel = (props) => {
  return (
    <label className={classes.FormLabel} for="test">Test Label:</label>
  );
}

export default formlabel;