/*
* Dropdown Menu Toggle Button
*
* Accepts a dropdown toggle function and text as props.
*
* Switches between up and down arrow icons when clicked.
*/

import React from "react";

import ddMenuStyles from "./dd-menu.module.css";
import DDStatusIcon from "./dd-menu-status-icon";

export default ({ isOpen, value, toggleMenu }) => {

  return (
    <button
      className={ddMenuStyles.toggleMenuBtn}
      onClick={toggleMenu}
    >
      {value} <DDStatusIcon isOpen={isOpen} />
    </button>
  );
}