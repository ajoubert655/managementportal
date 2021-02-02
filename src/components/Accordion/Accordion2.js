import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Accordion.module.css";

const Accordion2 = ({ children, onChange, isOpen2, label }) => {
  const onChangeHandler = () => {
    onChange && onChange(!isOpen2);
  };


  return (
    <div className={styles.wrapper}>
      <span
        className={cx(styles.toggler, { [styles.active]: isOpen2 })}
        onClick={onChangeHandler}>
        {label}
      </span>
      <div
        className={cx(styles.panel, {
          [styles.active]: isOpen2
        })}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

Accordion2.propTypes = {
  isOpen2: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string.isRequired
};

Accordion2.defaultProps = {
  isOpen2: false,
  children: null,
  label: "Accordion"
};

export default Accordion2;