import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

import classes from './NavBar.module.css';
import Logo from '../UI/Logo/Logo';
import LoginLink from './LoginLink/LoginLink';
import LogoutButton from './LogoutButton/LogoutButton';
import ChangePasswordLink from './ChangePasswordLink/ChangePasswordLink'

class NavBar extends Component {
  handleLogOut = async (event) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      // set global state
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (e) {
      alert(e);
    }
    this.props.history.push("/");
  }

  render() {
    return (
      <div className={classes.NavBar}>
        <Logo />
        <div className={classes.LoginWrapper}>
          {/* if a valid user is logged in, display welcome message */}
          {this.props.auth.isAuthenticated && this.props.auth.user && (
            <p className={classes.WelcomeText}>Hello, {this.props.auth.user.username}</p>
          )}

          {/* if noone is logged in, display login button */}
          {!this.props.auth.isAuthenticated && (
            <LoginLink>Log In</LoginLink>
          )}

          {/* if a valid user is logged in, display logout and change password buttons */}
          {this.props.auth.isAuthenticated && (
            <div>
              <ChangePasswordLink>Change Password</ChangePasswordLink>
              <LogoutButton clicked={this.handleLogOut}>Log Out</LogoutButton>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);