import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Accordion2.module.css";

const Accordion4 = ({ children, onChange, isOpen4, label }) => {
  const onChangeHandler = () => {
    onChange && onChange(!isOpen4);
  };


  return (
    <div className={styles.wrapper}>
      <span
        className={cx(styles.toggler, { [styles.active]: isOpen4 })}
        onClick={onChangeHandler}>
        {label}
      </span>
      <div
        className={cx(styles.panel, {
          [styles.active]: isOpen4
        })}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

Accordion4.propTypes = {
  isOpen4: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string.isRequired
};

Accordion4.defaultProps = {
  isOpen4: false,
  children: null,
  label: "Accordion"
};

export default Accordion4;