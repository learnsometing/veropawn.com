import React from "react";
import { Link } from "gatsby";

import headerStyles from "./header.module.css"

export default (props) => (
  <Link className={headerStyles.link} to={props.link}>{props.value}</Link>
);