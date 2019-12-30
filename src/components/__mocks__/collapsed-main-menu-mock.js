// Mock implementation of CollapsedMainMenu

import React from "react";

import mdPageLinkData from "../src/components/__fixtures__/md-page-links";
import { PureMDPageLinks as MDPageLinks } from "../src/components/shared/md-page-links";
import { PureCollapsedMainMenu as CollapsedMainMenu } from "../src/components/header-modal-menus/collapsed-main-menu";

export default ({ openBrowseMenu }) => {
  const { data } = mdPageLinkData;
  return (
    <CollapsedMainMenu openBrowseMenu={openBrowseMenu}>
      <MDPageLinks allMarkdownRemark={data.allMarkdownRemark} collapsed={true} />
    </CollapsedMainMenu>
  );
}