/*
* An item for a dropdown menu list.
*/

import React from "react";
import dropdownMenuStyles from "./dropdown-menu.module.css"

function MenuItem({ child }) {
  return (
    <li className={dropdownMenuStyles.menuItem}>
      <button className={dropdownMenuStyles.menuItem}>
        {child}
      </button>
    </li>
  );
}

export default MenuItem;