import React from "react";
import ddMenuStyles from "./dropdown-menu.module.css";

export default ({ children, setDropdownMenuRef }) => {
  return (
    <ul
      className={ddMenuStyles.ulist}
      ref={setDropdownMenuRef}
    >
      {children}
    </ul>
  );
}