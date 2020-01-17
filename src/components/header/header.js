// Node_Modules Imports
import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import sizeMe from "react-sizeme";

// Internal Imports
import headerStyles from "../header/header.module.css";
import HeaderModalLeft from "../modals/header-modal-left";
import CollapsedMainMenu from "../header/collapsed-main-menu";
import ExpandedMainMenu from "../header/expanded-main-menu";

export const HeaderLogo = ({ logo }) => (
  // A link to the home page that contains the site's SVG logo

  <Link to='/' className={headerStyles.link}>
    <span className={headerStyles.iconWrapper}>
      <div className={headerStyles.svgWrapper}>
        <img
          className={headerStyles.svg}
          src={logo.publicURL}
          alt="Cash Pawn and Jewelry Logo"
        />
      </div>
    </span>
  </Link>
);

export const withHeaderModalLeft = MenuComponent => {
  return props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalMenu, setModalMenu] = useState(null);

    const toggleMenu = (menu) => {
      setIsOpen(!isOpen);
      setModalMenu(modalMenu ? null : menu);
    };

    const closeModal = () => {
      setIsOpen(false);
      setModalMenu(null);
    };

    return (
      <>
        <MenuComponent
          allPagesJson={props.allPagesJson}
          allMarkdownRemark={props.allMarkdownRemark}
          isOpen={isOpen}
          toggleMenu={toggleMenu}
        />
        <HeaderModalLeft isOpen={isOpen} closeModal={closeModal} >
          {modalMenu}
        </HeaderModalLeft>
      </>
    );
  }
}

export const PureHeader = ({ size, ...props }) => {
  let HeaderMenu;

  if (size.width < 668) {
    HeaderMenu = withHeaderModalLeft(CollapsedMainMenu);
  } else {
    HeaderMenu = withHeaderModalLeft(ExpandedMainMenu);
  }

  return (
    <div className={headerStyles.headerWrapper}>
      <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
          <HeaderLogo logo={props.logo} />
          <HeaderMenu
            allPagesJson={props.allPagesJson}
            allMarkdownRemark={props.allMarkdownRemark}
          />
          <span>{size.width}</span>
        </nav >
      </header >
    </div >
  );
}

export const Header = ({ size }) => {
  const { logo, allMarkdownRemark, allPagesJson } = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: { eq: "logos-and-icons/logo.svg" }) {
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

        allPagesJson(sort: {fields: subcategory}) {
          distinct(field: category)
          nodes {
            category
            subcategory
            fields {
              slug
            }
            id
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
      allPagesJson={allPagesJson}
    />
  );
}

export default sizeMe()(Header);