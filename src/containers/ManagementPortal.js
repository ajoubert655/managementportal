import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Auth} from 'aws-amplify';
import axios from 'axios';

import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import LoginPage from './LoginPage/LoginPage';
import LandingPage from './LandingPage/LandingPage';
import OrgsAndTests from './OrgsAndTests/OrgsAndTests';
import ManageOrgs from './ManageOrgs/ManageOrgs';
import ManageTests from './ManageTests/ManageTests';
import ViewUsers from './ViewUsers/ViewUsers';
import ViewSession from './ViewSessions/ViewSession/ViewSession';
import ViewSessions from './ViewSessions/ViewSessions';
import OrgForm from './OrgForm/OrgForm';
import TestForm from './TestForms/TestForm/TestForm';
import AddTestConfirmation from './ConfirmationPages/AddTestConfirmation/AddTestConfirmation';
import EditTestForm from './TestForms/EditTestForm/EditTestForm';
import AddOrgConfirmation from './ConfirmationPages/AddOrgConfirmation/AddOrgConfirmation';
import EditOrgForm from './EditOrgForm/EditOrgForm';
import ResetPassword from './ResetPassword/ResetPassword';
import ResetPasswordVerification from './ResetPasswordVerification/ResetPasswordVerification';
import ChangePassword from './ChangePassword/ChangePassword';
import ChangePasswordConfirmation from './ConfirmationPages/ChangePasswordConfirmation/ChangePasswordConfirmation';

class ManagementPortal extends Component {
  // set global state to track authentication and user object
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = (authenticated) => {
    this.setState({isAuthenticated: authenticated});
  }

  setUser = (user) => {
    this.setState({user: user})
  }
  
  // ensure login state persists through reloads
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);

      // set axios defaults
      axios.defaults.baseURL = 'https://jiyfwa9bs1.execute-api.us-west-2.amazonaws.com/v1';
      axios.defaults.headers.common['Authorization'] = `Bearer ${session.accessToken.jwtToken}`;

      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      console.log(error);
    }
    this.setState({isAuthenticating: false});
  }

  render() {
    // pass global state and helper functions as props
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    // create private route component, which will render component w/ props if user is logged in,
    // and if not, will redirect to login page
    const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render={(props) => (
        this.state.isAuthenticated === true
          ? <Component {...props} auth={authProps} />
          : <Redirect to='/login' />
      )} />
    )

    return (
      !this.state.isAuthenticating &&
      <>
        <NavBar auth={authProps} />

        {/* public routes */}
        <Route path='/login' exact render={(props) => <LoginPage {...props} auth={authProps} />} />
        <Route path='/reset-password' exact render={(props) => <ResetPassword {...props} auth={authProps} />} />
        <Route path='/reset-password-verification' exact render={(props) => <ResetPasswordVerification {...props} auth={authProps} />} />
        <Route path='/change-password' exact render={(props) => <ChangePassword {...props} auth={authProps} />} />
        <Route path='/change-password-confirmation' exact render={(props) => <ChangePasswordConfirmation {...props} auth={authProps} />} />

        {/* private routes */}
        <PrivateRoute path='/' exact component={LandingPage} />
        <PrivateRoute path='/manage-orgs-and-tests' exact component={OrgsAndTests} />
        <PrivateRoute path='/manage-orgs' exact component={ManageOrgs} />
        <PrivateRoute path='/manage-tests' exact component={ManageTests} />
        <PrivateRoute path='/view-users' exact component={ViewUsers} />
        <PrivateRoute path='/view-sessions' exact component={ViewSessions} />
        <PrivateRoute path='/view-selected-session' component={ViewSession} />
        <PrivateRoute path='/add-test' exact component={TestForm} />
        <PrivateRoute path='/add-test-confirmation' exact component={AddTestConfirmation} />
        <PrivateRoute path='/edit-test' component={EditTestForm} />
        <PrivateRoute path='/add-org' exact component={OrgForm} />
        <PrivateRoute path='/add-org-confirmation' exact component={AddOrgConfirmation} />
        <PrivateRoute path='/edit-org' component={EditOrgForm} />

        <Footer />
      </>
    );
  }
}

export default ManagementPortal;