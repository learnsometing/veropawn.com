/*
* A button placed in a menu that should trigger an event when clicked.
*/

import React from "react";
import dropdownMenuStyles from "./dropdown-menu.module.css"

function MenuBtn({ text }) {
  return (
    <li className={dropdownMenuStyles.menuItem}>
      <button className={dropdownMenuStyles.menuItem}>
        {text}
      </button>
    </li>
  );
}

export { MenuBtn };