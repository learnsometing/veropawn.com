// Imports from Node_Modules
import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import sizeMe from "react-sizeme";
import ReactModal from "react-modal";

// Imports used in PureHeader/Header
import headerStyles from "../header/header.module.css";
import HeaderLogo from "../header/header-logo";
import CollapsedMainMenu from "../header-modal-menus/collapsed-main-menu";
import ExpandedMainMenu from "../header/expanded-main-menu";

ReactModal.setAppElement('#___gatsby');

export const PureHeader = ({ size, ...props }) => {

  let headerMenu;
  if (size.width < 768) {
    headerMenu =
      <CollapsedMainMenu
        allMarkdownRemark={props.allMarkdownRemark}
        allInvJson={props.allInvJson}
      />;
  } else {
    headerMenu =
      <ExpandedMainMenu
        allMarkdownRemark={props.allMarkdownRemark}
        allInvJson={props.allInvJson}
      />;
  }

  return (
    <div className={headerStyles.headerWrapper}>
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <HeaderLogo logo={props.logo} />
          {headerMenu}
          <span>{size.width}</span>
        </nav >
      </header >
    </div >
  );
}

export const Header = ({ size, ...props }) => {
  const { logo, allMarkdownRemark, allInvJson } = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: { eq: "logo.svg" }) {
          publicURL
        }
        
        allMarkdownRemark(sort: {fields: frontmatter___title}){
          nodes{
            id
            frontmatter{
              title
            }
            fields {
              slug
            }
          }
        }

        allInvJson(sort: {fields: category}) {
          distinct(field: category)
          nodes{
            category
            id
            subcategory
            slug
          }
        }
      }
    `
  );

  return (
    <PureHeader
      size={size}
      logo={logo}
      allMarkdownRemark={allMarkdownRemark}
      allInvJson={allInvJson}
    />
  );
}

export default sizeMe()(Header);