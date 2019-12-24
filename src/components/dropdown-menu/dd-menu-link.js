import React from "react";
import { Link } from "gatsby";

import ddMenuStyles from "./dd-menu.module.css";

export default (props) => (
  <li className={ddMenuStyles.listItem}>
    <Link className={ddMenuStyles.link} to={props.link}>{props.value}</Link>
  </li>
);