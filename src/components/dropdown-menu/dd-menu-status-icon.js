/*
* Dropdown Menu Status Icon
*
* Returns a font awesome angle up icon if isOpen is true or angle down icon if
* isOpen is false.
*/

import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default ({ isOpen }) => {
  let icon = <FaAngleDown data-testid={"fa-angle-down-icon"} />;

  if (isOpen) {
    icon = <FaAngleUp data-testid={"fa-angle-up-icon"} />;
  }

  return icon;
}