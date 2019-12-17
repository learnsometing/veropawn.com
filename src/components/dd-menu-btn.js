/*
* An item for a dropdown menu list.
*/

import React from "react";
import ddMenuStyles from "./dropdown-menu.module.css"

export default (props) => {
  return (
    <li className={ddMenuStyles.listItem}>
      <button className={ddMenuStyles.link} onClick={props.onClick}>
        {props.children}
      </button>
    </li>
  );
}