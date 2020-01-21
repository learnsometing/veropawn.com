/*
* Header Modal Left
*
* Modal for header menu dropdown content that appears on the left side of the screen.
* 
*/

import React from "react";
import ReactModal from "react-modal";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";

import styles from "./header-modal-left.module.css";

export const CloseButton = ({ closeModal }) => (
  <div className={styles.closeButtonContainer}>
    <IconContext.Provider value={{ size: '48px' }}>
      <button onClick={closeModal} className={styles.closeButton}>
        <MdClose />
      </button>
    </IconContext.Provider>
  </div>
);

export default ({ isOpen, closeModal, children }) => {
  return (
    <ReactModal
      ariaHideApp={false}
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
          <CloseButton closeModal={closeModal} />
          {children}
        </ul >
      </div>
    </ReactModal >
  );
}