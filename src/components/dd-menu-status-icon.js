import React from "react"
import { FaAngleUp, FaAngleDown } from "react-icons/fa"

export default (props) => {
  let icon = <FaAngleDown />;

  if (props.menuOpen) {
    icon = <FaAngleUp />;
  }

  return icon;
}