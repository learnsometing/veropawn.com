import React, { useState } from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { FaAngleLeft, FaAngleRight, FaDollarSign } from "react-icons/fa";
import { IconContext } from "react-icons";

import styles from "./carousel.module.scss";

export const CarouselPositionIndicator = ({ isActive }) => {
  const activeClass = `${styles.posIndicator} ${styles.activePosIndicator}`;
  const inactiveClass = `${styles.posIndicator} ${styles.inactivePosIndicator}`;

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
  for (let i = 0; i < length; i++) {
    let isActive = i === currentIndex ? true : false;
    controls.push(<CarouselPositionIndicator key={i} isActive={isActive} />);
  }
  return <div className={styles.carouselPositionContainer}>{controls}</div>;
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
        ? `${styles.slide} ${styles.currentSlide}`
        : `${styles.slide} ${styles.hiddenSlide}`
      }
    />
  ));
};

CarouselSlides.propTypes = {
  alt: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired
};

export const CarouselControl = ({ children, isDisabled, onClick }) => (
  <button
    className={isDisabled
      ? ` ${styles.carouselControl} ${styles.disabledCarouselControl}`
      : ` ${styles.carouselControl} ${styles.enabledCarouselControl}`
    }
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);

CarouselControl.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

const Carousel = ({ alt, photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = photos.length;
  const isDisabled = length < 2;
  const setNextPhoto = () => setCurrentIndex((currentIndex + 1) % length);
  const setPrevPhoto = () => {
    let prevIndex = (currentIndex - 1) % length;
    if (prevIndex === -1) { prevIndex += length; }
    setCurrentIndex(prevIndex);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slideContainer}>
        <CarouselSlides alt={alt} currentIndex={currentIndex} photos={photos} />
        <div className={styles.controlContainer}>
          <IconContext.Provider
            value={{
              color: isDisabled
                ? 'hsla(255, 255%, 255%, 0.5)'
                : 'hsla(255, 255%, 255%, 0.8)',
              size: '1.5em'
            }}
          >
            <div className={styles.controls}>
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
  photos: PropTypes.array.isRequired
};

export default Carousel;