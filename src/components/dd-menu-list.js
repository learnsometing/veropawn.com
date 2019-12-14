import React from "react";
import ddMenuStyles from "./dropdown-menu.module.css";

export default ({ children }) => {
  return (
    <ul className={ddMenuStyles.ulist}>
      {children}
    </ul>
  );
}