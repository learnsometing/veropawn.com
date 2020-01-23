import React from "react";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import headerModalMenu from "./header-menu-modal.module.css";
import layout from "../../styles/layout.module.css";

const HeaderModalMenu = ({ isOpen, closeModal, children }) => {
  const overlayClassName = `${layout.rowStart} ${headerModalMenu.overlay}`
  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={headerModalMenu.content}
      overlayClassName={overlayClassName}
    >
      <div className={headerModalMenu.uListWrapper}>
        <ul className={headerModalMenu.uList}>
          {children}
        </ul >
      </div>
    </ReactModal >
  );
};

HeaderModalMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

export default HeaderModalMenu;