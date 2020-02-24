import React, { useState } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import HeaderMenuModal from './header-menu-modal';
import CollapsedMainMenu from '../header/collapsed-main-menu';
import ExpandedMainMenu from '../header/expanded-main-menu';

import header from './header.module.css';
import layout from '../../styles/layout.module.css';

export const HeaderLogo = ({ logo }) => (
  <Link to='/' className={`${layout.rowCenterCenter} ${header.link}`}>
    <span className={header.iconWrapper}>
      <div className={header.svgWrapper}>
        <img
          className={header.svg}
          src={logo.publicURL}
          alt='Cash Pawn and Jewelry Logo'
        />
      </div>
    </span>
  </Link>
);

export const HeaderMenuLink = (props) => (
  <Link
    className={`${layout.rowCenterCenter} ${header.link}`}
    to={props.link}
  >
    {props.text}
  </Link>
);

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

  if (width < 667) {
    HeaderMenu = withHeaderMenuModal(CollapsedMainMenu);
  } else {
    HeaderMenu = withHeaderMenuModal(ExpandedMainMenu);
  }

  return (
    <div className={`${layout.columnCenterCenter} ${header.headerWrapper}`}>
      <header className={header.header}>
        <div className={`${layout.rowCenterCenter} ${header.nav}`}>
          <div className={`${layout.rowStartCenter} ${header.navBar}`}>
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
