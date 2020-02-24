import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import headerModalMenu from "./header-menu-modal.module.css";
import layout from "../../styles/layout.module.css";

const HeaderMenuModal = ({ isOpen, closeModal, children }) => (
  <ReactModal
    // hidden because I couldn't figure out how to test with the aria app component set
    ariaHideApp={false}
    isOpen={isOpen}
    onRequestClose={closeModal}
    className={headerModalMenu.content}
    overlayClassName={`${layout.rowStart} ${headerModalMenu.overlay}`}
  >
    <div className={headerModalMenu.uListWrapper}>
      <ul className={headerModalMenu.uList}>
        {children}
      </ul >
    </div>
  </ReactModal >
);

HeaderMenuModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

export default HeaderMenuModal;