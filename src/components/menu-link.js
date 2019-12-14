import React from "react";
import { Link } from "gatsby";

import dropdownMenuStyles from "./dropdown-menu.module.css"

export default ({ link, text }) => (
  <li className={dropdownMenuStyles.menuItem}>
    <Link className={dropdownMenuStyles.menuItem} to={link}>{text}</Link>
  </li>
);