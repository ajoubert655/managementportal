import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Accordion.module.css";

const Accordion3 = ({ children, onChange, isOpen3, label }) => {
  const onChangeHandler = () => {
    onChange && onChange(!isOpen3);
  };

  return (
    <div className={styles.wrapper}>
      <span
        className={cx(styles.toggler, { [styles.active]: isOpen3 })}
        onClick={onChangeHandler}>
        {label}
      </span>
      <div
        className={cx(styles.panel, {
          [styles.active]: isOpen3
        })}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

Accordion3.propTypes = {
  isOpen3: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node,
  label: PropTypes.string.isRequired
};

Accordion3.defaultProps = {
  isOpen3: false,
  children: null,
  label: "Accordion"
};

export default Accordion3;