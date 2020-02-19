import React from "react";
import { Link } from "gatsby";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import PropTypes from "prop-types";

import ddMenu from "./dd-menu.module.css";
import layout from "../../styles/layout.module.css";

export const DDMenuBtn = ({ children, isIconAfterText, isNavButton, onClick, text }) => {
  let buttonClass = isNavButton ? ddMenu.navButton : ddMenu.button;
  buttonClass += ` ${layout.rowCenterCenter}`;

  let childNodes = isIconAfterText
    ? <>
      {text}
      {children}
    </>
    : <>
      {children}
      {text}
    </>

  return (
    <li className={layout.rowCenterCenter}>
      <button className={buttonClass} onClick={onClick}>
        {childNodes}
      </button>
    </li>
  );
};

DDMenuBtn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  isIconAfterText: PropTypes.bool,
  isNavButton: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string
};

export const DDMenuHeader = (props) => {
  const headerClass = `${layout.rowCenterCenter} ${ddMenu.heading}`
  return (
    <li className={ddMenu.listItem}>
      <header className={headerClass} data-testid="dd-menu-heading">
        <h1 style={{ fontSize: '1.375rem' }}>
          {props.children}
        </h1>
      </header>
    </li>
  );
}

export const DDMenuLink = (props) => {
  const linkClass = `${layout.rowCenterCenter} ${ddMenu.link}`
  return (
    <li className={ddMenu.listItem}>
      <Link className={linkClass} to={props.link}>
        {props.children}
        {props.text}
      </Link>
    </li>
  );
};

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

  const className = `${layout.rowCenterCenter} ${ddMenu.toggleMenuBtn}`;

  return (
    <button
      className={className}
      onClick={toggleMenu}
    >
      {value} <DDMenuStatusIcon isOpen={isOpen} />
    </button>
  );
}