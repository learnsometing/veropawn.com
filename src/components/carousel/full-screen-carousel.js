import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

import Carousel from "./carousel";

import fullScreenCarousel from "./full-screen-carousel.module.css";
import layout from "../../styles/layout.module.css";

const FullScreenCarousel = (props) => {
  var { content, currentSlideStyle, interval, isTimed, slideStyle } = props;
  var [isFullScreen, setIsFullScreen] = useState(false);
  // open the full screen carousel with the correct index
  var [sharedIndex, setSharedIndex] = useState(0);
  var overlayClassName = `${layout.columnCenterCenter} ${fullScreenCarousel.overlay}`;

  return (
    <>
      <Carousel
        content={content}
        currentSlideStyle={currentSlideStyle}
        interval={interval}
        isTimed={isTimed}
        onFSIconClick={openFSModal}
        onIndexChange={setSharedIndex}
        slideStyle={slideStyle}
        startIndex={sharedIndex}
      />
      <ReactModal
        ariaHideApp={false}
        isOpen={isFullScreen}
        onRequestClose={closeFSModal}
        overlayClassName={overlayClassName}
        className={`${layout.columnCenterCenter} ${fullScreenCarousel.content}`}
      >
        <div className={fullScreenCarousel.FSWrapper}>
          <Carousel
            content={content}
            currentSlideStyle={currentSlideStyle}
            interval={interval}
            isFullScreen={isFullScreen}
            isTimed={isTimed}
            onFSIconClick={closeFSModal}
            onIndexChange={setSharedIndex}
            slideStyle={slideStyle}
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
  currentSlideStyle: PropTypes.object, // Override default styles of the current slide
  isTimed: PropTypes.bool.isRequired,
  interval: PropTypes.number.isRequired,
  slideStyle: PropTypes.object // Override default styles of the next/ prev slides
};

FullScreenCarousel.defaultProps = {
  isTimed: false,
  interval: 8000,
};

export default FullScreenCarousel;

