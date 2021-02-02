import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import cognitoConfig from './cognitoConfig';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: cognitoConfig.cognito.REGION,
    userPoolId: cognitoConfig.cognito.USER_POOL_ID,
    userPoolWebClientId: cognitoConfig.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: 'projectHyperion',
        endpoint: cognitoConfig.apiGateway.URL,
        region: cognitoConfig.apiGateway.REGION
      }
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
