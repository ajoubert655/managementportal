import React from 'react';

import classes from './Footer.module.css';

const footer = (props) => {
  return (
    <footer className={classes.footer}>
      <p style={{paddingTop:'1.75rem', margin:0}}>Copyright &#169; 2020 by Invigulus.com</p>
    </footer>
  );
}

export default footer;