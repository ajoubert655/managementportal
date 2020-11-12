import React from 'react';

import classes from './Card.module.css';

const card = (props) => {
  return (
    <div className={classes.card}>
      <p className={classes.text}>{props.children}</p>
    </div>
  )
}

export default card;