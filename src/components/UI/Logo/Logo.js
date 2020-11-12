import React from 'react';

import invigulusLogo from '../../../assets/images/Logo.PNG';
import classes from './Logo.module.css';

const logo = (props) => {
  return(
    <div>
      <img src={invigulusLogo} alt="Invigulus Logo" />
    </div>
  );
};

export default logo;
