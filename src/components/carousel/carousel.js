import React, { useState } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { FaAngleLeft, FaAngleRight, FaDollarSign } from "react-icons/fa";
import { IconContext } from "react-icons";

import carousel from "./carousel.module.scss";
import layout from "../../styles/layout.module.css";

export const CarouselPositionIndicator = ({ isActive }) => {
  const activeClass = `${carousel.posIndicator} ${carousel.activePosIndicator}`;
  const inactiveClass = `${carousel.posIndicator} ${carousel.inactivePosIndicator}`;

  return (
    <IconContext.Provider
      value={{ className: (isActive ? activeClass : inactiveClass), }}
    >
      <FaDollarSign data-testid="carousel-pos-indicator" />
    </IconContext.Provider>
  );
};

CarouselPositionIndicator.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export const CarouselPositionDisplay = ({ currentIndex, length }) => {
  const controls = [];
  const carouselPosContainerClass = `${layout.rowCenterCenter} ${carousel.carouselPosContainer}`;

  for (let i = 0; i < length; i++) {
    let isActive = i === currentIndex ? true : false;
    controls.push(<CarouselPositionIndicator key={i} isActive={isActive} />);
  }
  return <div className={carouselPosContainerClass}>{controls}</div>;
};

CarouselPositionDisplay.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export const CarouselSlides = ({ alt, currentIndex, photos }) => {
  return photos.map((photo, idx) => (
    <Img
      alt={`${alt} ${idx}`}
      key={photo.id}
      fluid={photo.childImageSharp.fluid}
      loading={'eager'}
      className={idx === currentIndex
        ? `${carousel.slide} ${carousel.currentSlide}`
        : `${carousel.slide} ${carousel.hiddenSlide}`
      }
    />
  ));
};

CarouselSlides.propTypes = {
  alt: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired
};

export const CarouselControl = ({ children, isDisabled, onClick }) => {
  const controlClass = `${layout.columnCenterCenter} ${carousel.carouselControl}`;
  return (
    <button
      className={isDisabled
        ? ` ${controlClass} ${carousel.disabledCarouselControl}`
        : ` ${controlClass} ${carousel.enabledCarouselControl}`
      }
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

CarouselControl.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const Carousel = ({ alt, startIndex, photos, onIndexChange }) => {
  // keeps track of its own index but can also take a start index that
  // specifies which of the photos to display when the carousel is first opened.
  var [currentIndex, setCurrentIndex] = useState(startIndex);
  var length = photos.length;
  var isDisabled = length < 2;

  const setNextPhoto = () => {
    let nextIndex = (currentIndex + 1) % length;
    setCurrentIndex(nextIndex)
    if (onIndexChange) {
      onIndexChange(nextIndex)
    }
  };

  const setPrevPhoto = () => {
    let prevIndex = (currentIndex - 1) % length;
    if (prevIndex === -1) { prevIndex += length; }
    setCurrentIndex(prevIndex);
    if (onIndexChange) {
      onIndexChange(prevIndex)
    }
  };

  const carouselClass = `${layout.columnStartCenter} ${carousel.carousel}`;
  const controlContainerClass = `${layout.rowSpaceBtnCenter} ${carousel.controlContainer}`;
  const controlsClass = `${layout.rowSpaceBtnCenter} ${carousel.controls}`;

  return (
    <div className={carouselClass}>
      <div className={carousel.slideContainer}>
        <CarouselSlides alt={alt} currentIndex={currentIndex} photos={photos} />
        <div className={controlContainerClass}>
          <IconContext.Provider
            value={{
              color: isDisabled
                ? 'hsla(255, 255%, 255%, 0.5)'
                : 'hsla(255, 255%, 255%, 0.8)',
              size: '1.5em'
            }}
          >
            <div className={controlsClass}>
              <CarouselControl isDisabled={isDisabled} onClick={setPrevPhoto} >
                <FaAngleLeft data-testid="fa-angle-left-icon" />
              </CarouselControl>
              <CarouselControl isDisabled={isDisabled} onClick={setNextPhoto} >
                <FaAngleRight data-testid="fa-angle-right-icon" />
              </CarouselControl>
            </div>
          </IconContext.Provider>
          <CarouselPositionDisplay
            currentIndex={currentIndex}
            length={length}
          />
        </div>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  alt: PropTypes.string.isRequired,
  startIndex: PropTypes.number,
  photos: PropTypes.array.isRequired,
  onIndexChange: PropTypes.func,
};

Carousel.defaultProps = {
  startIndex: 0,
}

export default Carousel;