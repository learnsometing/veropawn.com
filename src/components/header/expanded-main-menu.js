/*
* Expanded Main Menu
*
* The header menu that is rendered when the screen width is above 767 px.
*/

// External Imports
import React, { useState } from "react"
import ReactModal from "react-modal";

// Internal Imports
import DDMenuToggleBtn from "../dropdown-menu/dd-menu-toggle-btn"
import MDPageLinks from "../shared/md-page-links"

import CategoryMenu from "../header-modal-menus/category-menu";

export default (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);

  const toggle = () => {
    setIsOpen(!isOpen);
    setModalMenu(modalMenu ? null : <CategoryMenu data={props.allInvJson} />);
  }

  const closeModal = () => {
    setIsOpen(false);
    setModalMenu(null);
  }

  return (
    <>
      <>
        <DDMenuToggleBtn
          isOpen={isOpen}
          value={"Categories"}
          key="browse-by-category"
          toggleMenu={toggle}
        />
        <MDPageLinks allMarkdownRemark={props.allMarkdownRemark} collapsed={false} />
      </>
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