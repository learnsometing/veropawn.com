/*
* Header Modal Left
*
* Modal for header menu dropdown content that appears on the left side of the screen.
* 
* The modal renders either the main menu or browse menu content based on props.
* 
*/

import React from "react";
import ReactModal from "react-modal";

import CollapsedMainMenu from "./collapsed-main-menu";
import BrowseByCategoryMenu from "./browse-category-menu";

// import headerModalLeftStyles from "./header-modal-left.module.css";
ReactModal.setAppElement('#___gatsby');

export default (props) => {
  const isOpen = props.isOpen;
  const mainMenuOpen = props.mainMenuOpen;
  const browseMenuOpen = props.browseMenuOpen;

  let modal = null;
  if (isOpen) {
    let menu;

    if (mainMenuOpen) {
      menu = <CollapsedMainMenu
        id="main-menu"
        openBrowseMenu={props.openBrowseMenu}
      />
    } else if (browseMenuOpen) {
      menu = <BrowseByCategoryMenu
        closeBrowseMenu={props.closeBrowseMenu}
      />;
    }

    modal = <ReactModal
      isOpen={isOpen}
      onRequestClose={props.closeModal}
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
      {menu}
    </ReactModal >
  }

  return modal;
}