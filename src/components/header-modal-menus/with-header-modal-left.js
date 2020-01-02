/*
* Collapsed Main Menu
*
* The main menu that is rendered when the screen width is below 767 px.
*/

// Node_Modules Imports
import React, { useState } from "react";

// Internal Imports
import HeaderModalLeft from "../modals/header-modal-left";

export const withHeaderModalLeft = MenuComponent => {
  const WithHeaderModalLeft = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalMenu, setModalMenu] = useState(null);

    const openModalWithMenu = (menu) => {
      setIsOpen(true);
      setModalMenu(menu);
    };

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
          allInvJson={props.allInvJson}
          allMarkdownRemark={props.allMarkdownRemark}
          isOpen={isOpen}
          openModalWithMenu={openModalWithMenu}
          toggleMenu={toggleMenu}
        />
        <HeaderModalLeft isOpen={isOpen} closeModal={closeModal} >
          {modalMenu}
        </HeaderModalLeft>
      </>
    );
  }

  return WithHeaderModalLeft;
}