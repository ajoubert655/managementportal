import React, {Component} from 'react';

import classes from './NavBar.module.css';
import Logo from '../UI/Logo/Logo';
import LoginLink from '../NavBar/LoginLink/LoginLink';

class NavBar extends Component {
  render() {
    return (
      <div className={classes.NavBar}>
        <Logo />
        <LoginLink>Log In</LoginLink>
      </div>
    );
  }
}

export default NavBar;