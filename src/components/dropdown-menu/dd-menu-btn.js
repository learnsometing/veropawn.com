/*
* Dropdown Menu Button
*
* A button wrapped in a list item tag that should be placed in a dropdown menu
* to activate one of the menu's state functions.
*
*/

import React from "react";
import ddMenuStyles from "./dd-menu.module.css";

export default (props) => {
  return (
    <li className={ddMenuStyles.listItem}>
      <button className={ddMenuStyles.link} onClick={props.onClick}>
        {props.children}
      </button>
    </li>
  );
}