import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Accordion2.module.css";

const Accordion5 = ({ children, onChange, isOpen5, label }) => {
  const onChangeHandler = () => {
    onChange && onChange(!isOpen5);
  };


  return (
    <div className={styles.wrapper}>
      <span
        className={cx(styles.toggler, { [styles.active]: isOpen5 })}
        onClick={onChangeHandler}>
        {label}
      </span>
      <div
        className={cx(styles.panel, {
          [styles.active]: isOpen5
        })}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

Accordion5.propTypes = {
  isOpen5: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string.isRequired
};

Accordion5.defaultProps = {
  isOpen5: false,
  children: null,
  label: "Accordion"
};

export default Accordion5;