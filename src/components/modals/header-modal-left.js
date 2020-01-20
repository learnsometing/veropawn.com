/*
* Header Modal Left
*
* Modal for header menu dropdown content that appears on the left side of the screen.
* 
*/

import React from "react";
import ReactModal from "react-modal";

import styles from "./header-modal-left.module.css";

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
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2
        },
        content: { inset: '0', }
      }}
      className={styles.content}
    >
      <div className={styles.uListWrapper}>
        <ul className={styles.uList}>
          {children}
        </ul >
      </div>
    </ReactModal >
  );
}