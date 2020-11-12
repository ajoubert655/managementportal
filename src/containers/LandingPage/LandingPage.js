import React, {Component} from 'react';

//import Button from '../../components/UI/Button/Button';
import NavBar from '../../components/NavBar/NavBar';
//import Aux from '../../hoc/Auxilliary';

class LandingPage extends Component {
  buttonClickedHandler = () => {
    alert('You clicked a button');
  }

  render () {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default LandingPage;