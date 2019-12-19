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
import CategoryMenu from "./category-menu";

// import headerModalLeftStyles from "./header-modal-left.module.css";
ReactModal.setAppElement('#___gatsby');

export default ({ state, closeModal, setToBrowseMenu, setToMainMenu }) => {
  let menu;
  if (state.isCollapsedMainMenu) {
    menu = <CollapsedMainMenu openBrowseMenu={setToBrowseMenu} />
  } else if (state.isNestedCategoryMenu) {
    menu = <CategoryMenu backToMainMenu={setToMainMenu} />;
  }

  return (
    <ReactModal
      isOpen={state.isOpen}
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
      {menu}
    </ReactModal >
  );
}