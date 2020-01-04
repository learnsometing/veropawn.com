/*
* Header Modal Left
*
* Modal for header menu dropdown content that appears on the left side of the screen.
* 
*/

import React from "react";
import ReactModal from "react-modal";

import headerModalLeftStyles from "./header-modal-left.module.css";

export default ({ isOpen, closeModal, children }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      role={'menu'}
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
          border: 'none',
          borderRadius: 0,
          backgroundColor: '#fff',
          zIndex: 1,
          overflowY: 'auto',
          overflowX: 'hidden'
        }
      }}
    >
      <ul className={headerModalLeftStyles.uList}>
        {children}
      </ul >
    </ReactModal >
  );
}