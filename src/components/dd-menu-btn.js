/*
* An item for a dropdown menu list.
*/

import React from "react";
import ddStyles from "./dropdown-menu.module.css"

export default ({ child }) => {
  return (
    <li className={ddStyles.ddMenuItem}>
      <button className={ddStyles.ddMenuItem}>
        {child}
      </button>
    </li>
  );
}