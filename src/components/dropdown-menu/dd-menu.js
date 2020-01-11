import React from "react";
import { Link } from "gatsby";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import PropTypes from "prop-types";

import ddMenuStyles from "./dd-menu.module.css";

export const DDMenuBtn = (props) => {
  return (
    <li className={ddMenuStyles.listItem}>
      <button className={ddMenuStyles.link} onClick={props.onClick}>
        {props.children}
        {props.text}
      </button>
    </li>
  );
}

DDMenuBtn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  text: PropTypes.string
};

export const DDMenuHeader = (props) => {
  return (
    <li className={ddMenuStyles.listItem}>
      <h2 className={ddMenuStyles.heading}>
        {props.children}
      </h2>
    </li>
  );
}

export const DDMenuLink = (props) => (
  <li className={ddMenuStyles.listItem}>
    <Link className={ddMenuStyles.link} to={props.link}>
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
      className={ddMenuStyles.toggleMenuBtn}
      onClick={toggleMenu}
    >
      {value} <DDMenuStatusIcon isOpen={isOpen} />
    </button>
  );
}