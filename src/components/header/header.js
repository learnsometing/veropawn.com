// Node_Modules Imports
import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

// Internal Imports
import header from "./header.module.scss";
import layout from "../../styles/layout.module.css";

import { DDMenuLink } from "./dd-menu";
import HeaderMenuModal from "./header-menu-modal";
import CollapsedMainMenu from "../header/collapsed-main-menu";
import ExpandedMainMenu from "../header/expanded-main-menu";

export const HeaderLogo = ({ logo }) => {
  // A link to the home page that contains the site's SVG logo
  const linkClass = `${layout.rowCenterCenter} ${header.link}`;

  return (
    <Link to='/' className={linkClass}>
      <span className={header.iconWrapper}>
        <div className={header.svgWrapper}>
          <img
            className={header.svg}
            src={logo.publicURL}
            alt="Cash Pawn and Jewelry Logo"
          />
        </div>
      </span>
    </Link>
  );
};

export const HeaderMenuLink = (props) => {
  const linkClass = `${layout.rowCenterCenter} ${header.link}`
  return (
    <Link className={linkClass} to={props.link}>{props.text}</Link>
  );
};

export const MDPageLinks = ({ data, collapsed }) => {
  let LinkType = HeaderMenuLink;

  if (collapsed) {
    LinkType = DDMenuLink;
  }

  return (
    <>
      {data.nodes.map(node => (
        <LinkType
          key={node.id}
          link={node.fields.slug}
          text={node.frontmatter.title}
        />
      ))}
    </>
  );
};

export const withHeaderMenuModal = MenuComponent => {
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
        <HeaderMenuModal isOpen={isOpen} closeModal={closeModal} >
          {modalMenu}
        </HeaderMenuModal>
      </>
    );
  }
};

export const PureHeader = ({ width, ...props }) => {
  let HeaderMenu;
  const headerWrapperClass = `${layout.columnCenterCenter} ${header.headerWrapper}`;
  const navClass = `${layout.rowCenterCenter} ${header.nav}`;
  const navBarClass = `${layout.rowStartCenter} ${header.navBar}`;

  if (width < 667) {
    HeaderMenu = withHeaderMenuModal(CollapsedMainMenu);
  } else {
    HeaderMenu = withHeaderMenuModal(ExpandedMainMenu);
  }

  return (
    <div className={headerWrapperClass}>
      <header className={header.header}>
        <nav className={navClass}>
          <div className={navBarClass}>
            <HeaderLogo logo={props.logo} />
            <HeaderMenu
              allPagesJson={props.allPagesJson}
              allMarkdownRemark={props.allMarkdownRemark}
            />
          </div>
        </nav >
      </header >
    </div >
  );
};

export default ({ width }) => {
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
      width={width}
      logo={logo}
      allMarkdownRemark={allMarkdownRemark}
      allPagesJson={allPagesJson}
    />
  );
}
