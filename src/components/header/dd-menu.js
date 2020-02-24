import React from "react";
import { Link } from "gatsby";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import PropTypes from "prop-types";

import ddMenu from "./dd-menu.module.css";
import layout from "../../styles/layout.module.css";

export const DDMenuBtn = (props) => {
  var { children, isIconAfterText, isNavButton, onClick, text } = props;
  var buttonClass = isNavButton ? ddMenu.navButton : ddMenu.button;
  buttonClass += ` ${layout.rowCenterCenter}`;

  // controls the row order of text and the btn icon.
  var childNodes = isIconAfterText
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

export const DDMenuHeader = (props) => (
  <li className={ddMenu.listItem}>
    <header
      className={`${layout.rowCenterCenter} ${ddMenu.heading}`}
      data-testid="dd-menu-heading"
    >
      <h1 style={{ fontSize: '1.375rem' }}>
        {props.children}
      </h1>
    </header>
  </li>
);

export const DDMenuLink = (props) => (
  <li className={ddMenu.listItem}>
    <Link
      className={`${layout.rowCenterCenter} ${ddMenu.link}`}
      to={props.link}
    >
      {props.children}
      {props.text}
    </Link>
  </li>
);

export const DDMenuToggleBtn = ({ isOpen, value, toggleMenu }) => {
  return (
    <button
      className={`${layout.rowCenterCenter} ${ddMenu.toggleMenuBtn}`}
      onClick={toggleMenu}
    >
      {value} < DDMenuStatusIcon isOpen={isOpen} />
    </button >
  );

  function DDMenuStatusIcon({ isOpen }) {
    let icon = <FaAngleDown data-testid={"fa-angle-down-icon"} />;

    if (isOpen) {
      icon = <FaAngleUp data-testid={"fa-angle-up-icon"} />;
    }

    return icon;
  }
};