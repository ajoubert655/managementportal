import React from 'react';

import classes from './RadioButton.module.css';

const radiobutton = (props) => {
  return (
      <form>
      <input  className={classes.RadioButton} type="radio" id="test" name="Testradio" vale="Testradio1"/>
    </form> 
  );
}

export default radiobutton;