/*
* A button used to open a dropdown with the onClick function passed in with props.
*/

import React from "react";
import ddMenuStyles from "./dropdown-menu.module.css"

export default ({ children, onClick }) => {
  return (
    <li className={ddMenuStyles.collapsedMainMenu}>
      <button className={ddMenuStyles.openDDMenuBtn} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}