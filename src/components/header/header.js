// Node_Modules Imports
import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

// Internal Imports
import header from "./header.module.css";
import layout from "../../styles/layout.module.css";

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

export const PureHeader = ({ allPagesJson, logo, width }) => {
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
        <div className={navClass}>
          <div className={navBarClass}>
            <HeaderLogo logo={logo} />
            <HeaderMenu
              allPagesJson={allPagesJson}
            />
          </div>
        </div >
      </header >
    </div >
  );
};

export default ({ width }) => {
  const { logo, allPagesJson } = useStaticQuery(
    graphql`
      query {
        logo: file(relativePath: { eq: "logos-and-icons/logo.svg" }) {
          publicURL
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
      allPagesJson={allPagesJson}
    />
  );
}
