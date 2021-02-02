import React, {Component} from 'react';
import {Auth} from 'aws-amplify';
import {withRouter} from 'react-router-dom';

import classes from './ChangePassword.module.css';
import Alert from '../../components/UI/Alert/Alert';

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }

    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmNewPasswordChange = this.handleConfirmNewPasswordChange.bind(this);
  }

  handleOldPasswordChange(event) {
    this.setState({oldPassword: event.target.value});
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
      let oldPasswordField = document.getElementById('oldPassword');
      let newPasswordField = document.getElementById('newPassword');
      let confirmNewPasswordField = document.getElementById('confirmNewPassword');
      
      if (oldPasswordField.value === '' || newPasswordField.value === '' || confirmNewPasswordField.value === ''){
        document.getElementById('errorMessage').innerHTML='All fields are required'
      } else if (newPasswordField.value !== confirmNewPasswordField.value) {
        document.getElementById('errorMessage').innerHTML='Password fields do not match'
      } else if (oldPasswordField.value === newPasswordField.value) {
        document.getElementById('errorMessage').innerHTML='Your new password cannot be the same as your old password'
      } else {
        document.getElementById('errorMessage').innerHTML=''
        
        // cognito integration
        try {
          const user = await Auth.currentAuthenticatedUser()
          console.log(user);
          await Auth.changePassword(
            user,
            this.state.oldPassword,
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
            <h3 className={classes.header}>Change password</h3>
            <p>Please enter your old password, and a new password of your choosing.</p>

            <form onSubmit={this.handleSubmit}>
              <input
                type='password'
                id='oldPassword'
                className={classes.inputField}
                name='oldPassword'
                placeholder='Enter old password'
                onChange={this.handleOldPasswordChange}
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


export default withRouter(ChangePassword);