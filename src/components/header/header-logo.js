/*
*
* Header Logo
*
* A link to the home page that contains the site's SVG logo.
*
*/

import React from "react";
import headerStyles from "./header.module.css";

import { Link } from "gatsby";

export default ({ logo }) => (
  <Link to='/' className={headerStyles.link}>
    <span className={headerStyles.iconWrapper}>
      <div className={headerStyles.svgWrapper}>
        <img
          className={headerStyles.svg}
          src={logo.publicURL}
          alt="Cash Pawn and Jewelry Logo"
        />
      </div>
    </span>
  </Link>
)