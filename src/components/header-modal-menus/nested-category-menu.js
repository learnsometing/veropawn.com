// External imports
import React from "react";
import { FaAngleLeft } from "react-icons/fa";

// Internal imports
import DDMenuBtn from "../dropdown-menu/dd-menu-btn";
import CategoryMenuBtns from "./category-menu-btns";

export const PureNestedCategoryMenu = (props) => {
  return (
    <>
      <DDMenuBtn key="back-to-main-menu" onClick={props.backToMainMenu} >
        <FaAngleLeft />
        {"Main Menu"}
      </DDMenuBtn>
      {props.children}
    </>
  );
}

export default (props) => {
  const { onClick, ...passThroughProps } = props

  return (
    <PureNestedCategoryMenu {...passThroughProps}>
      <CategoryMenuBtns onClick={onClick} />
    </PureNestedCategoryMenu >
  );
}