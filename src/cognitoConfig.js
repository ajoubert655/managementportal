const cognitoConfig = ({
  apiGateway: {
    REGION: 'us-west-2',
    URL: 'https://jiyfwa9bs1.execute-api.us-west-2.amazonaws.com/dev',
  },
  cognito: {
    REGION: 'us-west-2',
    USER_POOL_ID: 'us-west-2_XH9EXBVja',
    APP_CLIENT_ID: '18rpva4eqee82pl45tuvslqm9q'
  }
});

export default cognitoConfig;