import React from "react";
import { Link } from "gatsby";

import ddMenuStyles from "./dropdown-menu.module.css"

export default ({ link, text }) => (
  <li className={ddMenuStyles.listItem}>
    <Link className={ddMenuStyles.link} to={link}>{text}</Link>
  </li>
);