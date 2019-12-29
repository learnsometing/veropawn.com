// Mock implementation of CategoryMenuBtns component

import React from "react";

import { PureCategoryMenuBtns as CategoryMenuBtns } from "../src/components/header-modal-menus/category-menu-btns";
import { PureNestedCategoryMenu as NestedCategoryMenu } from "../src/components/header-modal-menus/nested-category-menu";

import categoryMenuBtnsData from "../src/components/__fixtures__/category-menu-btns-data";

export const CategoryMenuBtnsMock = ({ onClick }) => {
  const { data } = categoryMenuBtnsData;
  return <CategoryMenuBtns data={data.allInvJson} onClick={onClick} />;
}

export const NestedCategoryMenuMock = (props) => {
  const { onClick, ...passThroughProps } = props
  const { data } = categoryMenuBtnsData;
  const displayName = "NestedCategoryMenu";
  return (
    <NestedCategoryMenu displayName={displayName} {...passThroughProps}>
      <CategoryMenuBtns data={data.allInvJson} onClick={onClick} />
    </NestedCategoryMenu>
  );
}