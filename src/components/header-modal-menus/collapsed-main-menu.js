/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// External Imports
import React, { useState } from "react";
import ReactModal from "react-modal";

// Internal Imports
import DDMenuHeader from "../dropdown-menu/dd-menu-header";
import DDMenuBtn from "../dropdown-menu/dd-menu-btn";
import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn";
import headerModalMenuStyles from "./header-modal-menu.module.css";
import MDPageLinks from "../shared/md-page-links";

import NestedCategoryMenu from "../header-modal-menus/nested-category-menu";

export default (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);

  const toggle = () => {
    setIsOpen(!isOpen);
    setModalMenu(
      modalMenu
        ? null
        : <ul className={headerModalMenuStyles.ulist}>
          <DDMenuHeader key="main-menu">
            Main Menu
          </DDMenuHeader>
          <DDMenuBtn key="browse-by-category" onClick={openCategoryMenu}>
            Categories
          </DDMenuBtn>
          <MDPageLinks allMarkdownRemark={props.allMarkdownRemark} collapsed={true} />
        </ul >
    );
  }

  const closeModal = () => {
    setIsOpen(false);
    setModalMenu(null);
  }

  const openCategoryMenu = () => {
    // NestedCategoryMenu needs to be able to be mocked.
    setIsOpen(true);
    setModalMenu(
      <NestedCategoryMenu data={props.allInvJson} backToMainMenu={backToMainMenu} />
    );
  }

  const backToMainMenu = () => {
    setIsOpen(true);
    setModalMenu(
      <ul className={headerModalMenuStyles.ulist}>
        <DDMenuHeader key="main-menu">
          Main Menu
        </DDMenuHeader>
        <DDMenuBtn key="browse-by-category" onClick={openCategoryMenu}>
          Categories
        </DDMenuBtn>
        <MDPageLinks allMarkdownRemark={props.allMarkdownRemark} collapsed={true} />
      </ul >
    );
  }

  return (
    <>
      <DDMenuToggleBtn
        isOpen={isOpen}
        value={"Menu"}
        toggleMenu={toggle}
      />
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1
          },
          content: {
            width: '85vw',
            height: '100%',
            position: 'fixed',
            top: '48px',
            left: 0,
            margin: 0,
            borderRadius: 0,
            backgroundColor: '#fff',
            zIndex: 1,
            overflowY: 'auto',
            overflowX: 'hidden'
          }
        }}
      >
        {modalMenu}
      </ReactModal >
    </>
  );
}