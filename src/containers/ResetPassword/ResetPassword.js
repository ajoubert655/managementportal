import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

import classes from './ResetPassword.module.css';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  // update state when value of email field changes
  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  // perform validation and submit request
  handleSubmit = async (event) => {
    event.preventDefault();
    let emailField = document.getElementById('email');
    
    let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid= regEx.test(emailField.value);
    
    if (emailField.value === ""){
      document.getElementById('errorMessage').innerHTML='Please enter your email'
    }
    else if (!isValid) {
      document.getElementById("errorMessage").innerHTML='Please enter a valid email address'
    }
    else {
      document.getElementById("errorMessage").innerHTML=''

      // cognito integration
      try {
        await Auth.forgotPassword(this.state.email);
        this.props.history.push('/reset-password-verification')
      } catch(error) {
        alert(error);
      }
    }
  }

  render() {
    return (
      <main className={classes.main}>
        <div className={classes.wrapper}>
          <h3 className={classes.header}>Change your password</h3>
          <p>Please enter the email address associated with your account, and we'll email you a password reset link.</p>

          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              id='email'
              className={classes.inputField}
              name='email'
              placeholder='Email'
              onChange={this.handleEmailChange}
            />
            <br />

            <span
              id='errorMessage'
              className={classes.errorMessage}
            />
            <br />

            <input
              type='submit'
              value='Submit'
              className={classes.button}
            >
            </input>
          </form>
        </div>
      </main>
    );
  }
}

export default withRouter(ResetPassword);