/*
* Dropdown Menu Status Icon
*
* Returns a font awesome angle up icon if isOpen is true or angle down icon if
* isOpen is false.
*/

import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

export default ({ isOpen }) => {
  let icon = <FaAngleDown />;

  if (isOpen) {
    icon = <FaAngleUp />;
  }

  return icon;
}