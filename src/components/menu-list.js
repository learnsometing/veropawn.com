import React from "react";
import menuStyles from "./dropdown-menu.module.css";

const MenuList = ({ children }) => {
  return (
    <ul className={menuStyles.list}>
      {children}
    </ul>
  );
}

export default MenuList;