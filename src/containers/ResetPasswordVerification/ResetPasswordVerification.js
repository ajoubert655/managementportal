import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

import classes from './ResetPasswordVerification.module.css';
import Alert from '../../components/UI/Alert/Alert';

class ResetPasswordVerification extends Component {
  constructor() {
    super();
    this.state = {
      verificationCode: '',
      email: '',
      newPassword: '',
      confirmNewPassword: '',
    }

    this.handleVerificationCodeChange = this.handleVerificationCodeChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmNewPasswordChange = this.handleConfirmNewPasswordChange.bind(this);
  }

  handleVerificationCodeChange(event) {
    this.setState({verificationCode: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleNewPasswordChange(event) {
    this.setState({newPassword: event.target.value})
  }

  handleConfirmNewPasswordChange(event) {
    this.setState({confirmNewPassword: event.target.value});
  }

    // perform validation and submit request
    handleSubmit = async (event) => {
      event.preventDefault();
      let verificationCodeField = document.getElementById('verificationCode');
      let emailField = document.getElementById('email');
      let newPasswordField = document.getElementById('newPassword');
      let confirmNewPasswordField = document.getElementById('confirmNewPassword');
      
      let regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid= regEx.test(emailField.value);
      
      if (verificationCodeField.value === '' || emailField.value === '' || newPasswordField.value === '' || confirmNewPasswordField.value === ''){
        document.getElementById('errorMessage').innerHTML='All fields are required'
      } else if (!isValid) {
        document.getElementById("errorMessage").innerHTML='Please enter a valid email address'
      } else if (newPasswordField.value !== confirmNewPasswordField.value) {
        document.getElementById("errorMessage").innerHTML='Password fields do not match'
      } else {
        document.getElementById("errorMessage").innerHTML=''
        
        // cognito integration
        try {
          await Auth.forgotPasswordSubmit(
            this.state.email,
            this.state.verificationCode,
            this.state.newPassword
          );
          this.props.history.push('/change-password-confirmation');
        } catch(error) {
          console.log(error);
          Alert('Something went wrong. Please ensure all of your information is correct.');
        }
      }
    }

  render() {
    return (
      <>
        <div className={classes.dialogoverlay} id ="dialogoverlay"></div>
        <div className= {classes.dialogbox} id="dialogbox">
          <div>
            <div className={classes.dialoghead} id="dialogboxhead"></div>
            <div className={classes.dialogbody} id="dialogboxbody"></div>
            <div className={classes.dialogfoot} id="dialogboxfoot">
              <button id="yes1" className={classes.alertbutton} onClick={
                () => {document.getElementById('dialogbox').style.display = "none";
                  document.getElementById('dialogoverlay').style.display = "none";}
              }>OK</button>
            </div>
          </div>
        </div>
        <main className={classes.main}>
          <div className={classes.wrapper}>
            <h3 className={classes.header}>Set new password</h3>
            <p>Please enter the verification code sent to your email address below, your email address, and a new password.</p>

            <form onSubmit={this.handleSubmit}>
              <input
                type='text'
                id='verificationCode'
                className={classes.inputField}
                name='verificationCode'
                placeholder='Enter verification code'
                onChange={this.handleVerificationCodeChange}
              />
              <br />

              <input
                type='text'
                id='email'
                className={classes.inputField}
                name='email'
                placeholder='Enter email'
                onChange={this.handleEmailChange}
              />
              <br />

              <input
                type='password'
                id='newPassword'
                className={classes.inputField}
                name='newPassword'
                placeholder='Enter new password'
                onChange={this.handleNewPasswordChange}
              />
              <br />

              <input
                type='password'
                id='confirmNewPassword'
                className={classes.inputField}
                name='confirmNewPassword'
                placeholder='Confirm new password'
                onChange={this.handleConfirmNewPasswordChange}
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
      </>
    );
  }
}


export default withRouter(ResetPasswordVerification);