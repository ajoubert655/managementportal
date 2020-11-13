import React from 'react';

import classes from './DropDown.module.css';

const dropdown = (props) => {
  return (
    <select className={classes.DropDown} id="Test" name="TestDropDown">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  );
}

export default dropdown;