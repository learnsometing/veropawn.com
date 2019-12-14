/*
* An item for a dropdown menu list.
*/

import React from "react";
import ddMenuStyles from "./dropdown-menu.module.css"

export default ({ text, onClick }) => {
  return (
    <li className={ddMenuStyles.listItem}>
      <button className={ddMenuStyles.link} onClick={onClick}>
        {text}
      </button>
    </li>
  );
}