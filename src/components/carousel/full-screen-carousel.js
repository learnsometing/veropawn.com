import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

import Carousel from "./carousel";

import fullScreenCarousel from "./full-screen-carousel.module.css";
import layout from "../../styles/layout.module.css";

const FullScreenCarousel = ({ content }) => {
  var [isFullScreen, setIsFullScreen] = useState(false);
  // open the full screen carousel with the correct index
  var [sharedIndex, setSharedIndex] = useState(0);
  var overlayClassName = `${layout.columnCenterCenter} ${fullScreenCarousel.overlay}`;

  return (
    <>
      <Carousel
        content={content}
        onFSIconClick={openFSModal}
        onIndexChange={setSharedIndex}
        startIndex={sharedIndex}
      />
      <ReactModal
        ariaHideApp={false}
        isOpen={isFullScreen}
        onRequestClose={closeFSModal}
        overlayClassName={overlayClassName}
        className={fullScreenCarousel.content}
      >
        <div className={fullScreenCarousel.FSWrapper}>
          <Carousel
            content={content}
            isFullScreen={isFullScreen}
            onFSIconClick={closeFSModal}
            onIndexChange={setSharedIndex}
            startIndex={sharedIndex}
          />
        </div>
      </ReactModal>
    </>
  );

  function openFSModal() {
    setIsFullScreen(true);
  }

  function closeFSModal() {
    setIsFullScreen(false);
  }
};

FullScreenCarousel.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FullScreenCarousel;

