/*
* Dropdown Menu Toggle Button
*
* Accepts a dropdown toggle functio and text as props.
*
* Switches between up and down arrow icons when clicked.
*/

import React, { useState } from "react";

import ddMenuStyles from "./dd-menu.module.css";
import DDStatusIcon from "./dd-menu-status-icon";

export default ({ value, toggleMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    toggleMenu();
  }

  return (
    <button
      className={ddMenuStyles.toggleMenuBtn}
      onClick={handleClick}
    >
      {value} <DDStatusIcon isOpen={isOpen} />
    </button>
  )
}