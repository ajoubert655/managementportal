import React from 'react';

import classes from './Card.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboard} from '@fortawesome/free-regular-svg-icons';

const card = (props) => {
  return (
    <div className={classes.card}>
      <p className={classes.text}>
        <FontAwesomeIcon icon={faClipboard} className={classes.icon}/>
        <br />
        {props.children}
      </p>
    </div>
  )
}

export default card;