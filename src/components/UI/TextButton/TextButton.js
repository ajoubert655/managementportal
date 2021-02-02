import React from 'react';
import {Button} from 'react-bootstrap';

const TextButton = (props) => {
  return (
    <Button 
      variant="link"
      onClick={props.clicked}
    >
      {props.children}
    </Button>
  );
}

export default TextButton;