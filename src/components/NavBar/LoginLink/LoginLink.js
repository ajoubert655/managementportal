import React from 'react';


import classes from './LoginLink.module.css';

const loginLink = (props) => {
  return (
    <a className={classes.loginLink} href="/">{props.children}</a>
  );
}

export default loginLink;