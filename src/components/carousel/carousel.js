import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { FaAngleLeft, FaAngleRight, FaDollarSign } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import carousel from './carousel.module.scss';
import layout from '../../styles/layout.module.css';

import { useCurrentIndex } from './hooks/useCurrentIndex';

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

export function Slide({ slide, className }) {
  return (
    <Img
      alt={slide.alt}
      key={slide.photo.id}
      fluid={slide.photo.childImageSharp.fluid}
      loading={'eager'}
      className={className}
    />
  );
}

export const Slides = ({ content, current, visibleRange }) => {
  // Make a list of all the slides
  var slides = content.map((el, idx) => {
    let className;

    if (idx === current) {
      className = carousel.currentSlide;
    } else if (visibleRange.includes(idx)) {
      className = carousel.slide;
    } else {
      className = carousel.hiddenSlide;
    }

    return <Slide slide={el} className={className} />;
  });

  return visibleRange.map(idx => slides[idx]);
};

Slides.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  current: PropTypes.number.isRequired,
};

export const CarouselControl = ({ children, isDisabled, name, onClick }) => {
  const controlClass = `${layout.columnCenterCenter} ${carousel.carouselControl}`;
  return (
    <button
      className={isDisabled
        ? ` ${controlClass} ${carousel.disabledCarouselControl}`
        : ` ${controlClass} ${carousel.enabledCarouselControl}`
      }
      disabled={isDisabled}
      name={name}
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

export const NextPrevBtns = ({ isDisabled, onClick }) => {
  var controlContainerClass = `${layout.rowSpaceBtnCenter} ${carousel.controlContainer}`;
  var controlsClass = `${layout.rowSpaceBtnCenter} ${carousel.controls}`;
  return (
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
          <CarouselControl
            isDisabled={isDisabled}
            name="prev"
            onClick={onClick}
          >
            <FaAngleLeft data-testid="fa-angle-left-icon" />
          </CarouselControl>
          <CarouselControl
            isDisabled={isDisabled}
            name="next"
            onClick={onClick}
          >
            <FaAngleRight data-testid="fa-angle-right-icon" />
          </CarouselControl>
        </div>
      </IconContext.Provider>
    </div>
  );
};

const Carousel = ({ content, startIndex, onIndexChange }) => {
  // keeps track of its own index but can also take a start index that
  // specifies which of the photos to display when the carousel is first opened.
  var length = content.length;
  var isDisabled = length < 2;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);

  // css classes because couldn't configure scss partials
  const carouselClass = `${layout.columnStartCenter} ${carousel.carousel}`;
  var slideContainerClass = `${carousel.slideContainer}`;

  return (
    <>
      <div className={carouselClass}>
        <div className={slideContainerClass}>
          <Slides
            content={content}
            current={currentIndex.value}
            visibleRange={currentIndex.visibleRange}
          />
        </div>
        <NextPrevBtns
          isDisabled={isDisabled}
          onClick={currentIndex.onClick}
        />
      </div>
      <CarouselPositionDisplay
        currentIndex={currentIndex.value}
        length={length}
      />
    </>
  );
}

Carousel.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  startIndex: PropTypes.number,
  onIndexChange: PropTypes.func,
};

Carousel.defaultProps = {
  startIndex: 0,
  onIndexChange: undefined,
}

export default Carousel;