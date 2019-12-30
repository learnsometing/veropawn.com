// Mock implementation of MDPageLinks

import React from "react";

import remarkData from "../__fixtures__/all-markdown-remark";
import { PureMDPageLinks as MDPageLinks } from "../shared/md-page-links";

export default ({ collapsed }) => {
  const { allMarkdownRemark } = remarkData;
  return <MDPageLinks allMarkdownRemark={allMarkdownRemark} collapsed={collapsed} />;
}