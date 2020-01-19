import React from "react";
import { Link } from "gatsby";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import PropTypes from "prop-types";

import styles from "./dd-menu.module.css";

export const DDMenuBtn = (props) => {
  let buttonClass = props.isNavButton ? styles.navButton : styles.button
  let children = props.isIconAfterText
    ? <>
      {props.text}
      {props.children}
    </>
    : <>
      {props.children}
      {props.text}
    </>
  return (
    <li className={styles.listItem}>
      <button className={buttonClass} onClick={props.onClick}>
        {children}
      </button>
    </li>
  );
};

DDMenuBtn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  text: PropTypes.string
};

export const DDMenuHeader = (props) => {
  return (
    <li className={styles.listItem}>
      <header className={styles.heading} data-testid="dd-menu-heading">
        {props.children}
      </header>
    </li>
  );
}

export const DDMenuLink = (props) => (
  <li className={styles.listItem}>
    <Link className={styles.link} to={props.link}>
      {props.children}
      {props.text}
    </Link>
  </li>
);

const DDMenuStatusIcon = ({ isOpen }) => {
  let icon = <FaAngleDown data-testid={"fa-angle-down-icon"} />;

  if (isOpen) {
    icon = <FaAngleUp data-testid={"fa-angle-up-icon"} />;
  }

  return icon;
}

export const DDMenuToggleBtn = ({ isOpen, value, toggleMenu }) => {
  /*
  * Accepts a dropdown toggle function and text as props.
  *
  * Switches between up and down arrow icons when clicked.
  */

  return (
    <button
      className={styles.toggleMenuBtn}
      onClick={toggleMenu}
    >
      {value} <DDMenuStatusIcon isOpen={isOpen} />
    </button>
  );
}