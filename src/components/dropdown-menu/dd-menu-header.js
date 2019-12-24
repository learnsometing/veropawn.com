/*
* Dropdown Menu Header
*
* Heading for dropdown menu with text set by props.text.
*/

import React from "react";
import ddMenuStyles from "./dd-menu.module.css";

export default (props) => {
  return (
    <li className={ddMenuStyles.listItem}>
      <h2 className={ddMenuStyles.heading}>
        {props.children}
      </h2>
    </li>
  );
}