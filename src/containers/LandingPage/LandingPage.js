import React, {Component} from 'react';

import Button from '../../components/UI/Button/Button';

class LandingPage extends Component {
  buttonClickedHandler = () => {
    alert('You clicked a button');
  }

  render () {
    return (
      <Button
        clicked={this.buttonClickedHandler}
      />
    );
  }
}

export default LandingPage;