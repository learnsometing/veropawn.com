/*
* An button placed in a dropdown menuthat links to another page.
*/

import React from "react";
import { Link } from "gatsby";

function MenuLink({ link, text }) {
  return (
    <li>
      <button>
        <Link to={link}>{text}</Link>
      </button>
    </li>
  );
}

export { MenuLink };