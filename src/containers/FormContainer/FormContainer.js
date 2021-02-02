import React from 'react';
import classes from './FormContainer.module.css';

const formcontainer = (props) => {
  const handleSubmit = event => {
   event.preventDefault();
   alert('You have submitted the form.')
 }

  return(
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <fieldset>
            {props.children}
        </fieldset>
      </form>
    </div>
  )
}

export default formcontainer;