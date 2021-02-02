import React from 'react';

import classes from './Footer.module.css';

const footer = (props) => {
  return (
    <footer className={classes.footer}>
      <p style={{paddingTop:'1.25rem', paddingBottom:'1.25rem', margin:0, color:'#3cB650'}}>Copyright &#169; 2020 by Invigulus.com</p>
    </footer>
  );
}

export default footer;