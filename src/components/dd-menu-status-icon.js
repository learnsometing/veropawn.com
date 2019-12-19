/*
* Dropdown Menu Status Icon
*
* Returns a font awesome angle up or angle down icon depending on the value of
* isOpen.
*/

import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

export default ({ isOpen }) => {
  let icon = <FaAngleDown />;

  if (isOpen) {
    icon = <FaAngleUp />;
  }

  return icon;
}