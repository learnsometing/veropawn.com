import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { FaAngleLeft, FaAngleRight, FaDollarSign } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import uniqueId from 'lodash/uniqueId';

import carousel from './carousel.module.scss';
import layout from '../../styles/layout.module.css';

import { useCurrentIndex } from './hooks/useCurrentIndex';

export const Cue = ({ isActive, isFullScreen }) => {
  var color = getColor(isActive, isFullScreen);

  return (
    <IconContext.Provider
      value={{
        className: carousel.cue,
        color: `rgba(${color})`,
      }}
    >
      <FaDollarSign data-testid="carousel-pos-indicator" />
    </IconContext.Provider>
  );

  function getColor(isActive, isFullScreen) {
    let alpha, color;
    if (isActive) {
      alpha = '0.8';
    } else {
      alpha = '0.4';
    }

    if (isFullScreen) {
      color = '255, 255, 255';
    } else {
      color = '0, 0, 0';
    }

    return `${color}, ${alpha}`;
  }
};

Cue.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
};

export const Cues = ({ className, currentIndex, isFullScreen, length }) => {
  var cues = createCues(length);

  return <div className={className}>{cues}</div>;

  function createCues(length) {
    let range = [...Array(length).keys()];

    return range.map(n => {
      let isActive = n === currentIndex;
      return (
        <Cue
          key={n}
          isActive={isActive}
          isFullScreen={isFullScreen}
        />
      );
    })
  }
};

Cues.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  length: PropTypes.number.isRequired,
};

Cues.defaultProps = {
  isFullScreen: false,
};

export function Slide({ slide, className }) {
  return (
    <Img
      alt={slide.alt}
      fluid={slide.photo.childImageSharp.fluid}
      loading={'eager'}
      className={className}
    />
  );
}

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
};

export const Slides = ({ content, isDisabled, visibleRange }) => {
  // Make a list of all the slides
  var slides = createSlides();

  // Only display slides in the visible range (prev, current, next)
  return (
    <div className={carousel.slideContainer}>
      {slides}
    </div>
  );

  function createSlides() {
    let _slides;

    if (isDisabled) {
      let slide = content[0];
      _slides = <Slide key={slide.photo.id} slide={slide} className={carousel.singleSlide} />;
    } else {
      _slides = visibleRange.map((n, idx) => {
        let slide = content[n];
        return <Slide key={getId()} slide={slide} className={getClassName()} />;

        function getClassName() {
          let _className;

          if (idx === 1) {
            _className = carousel.currentSlide;
          } else {
            _className = carousel.slide;
          }

          return _className;
        }

        function getId() {
          /*
          * Generate a key for the slide. When only two slides are in the 
          * carousel, the data id can't be used, because the id will be repeated
          * on the next and previous slide, causing duplication errors.
          */

          let id;
          if (content.length === 2) {
            id = uniqueId();
          } else {
            id = slide.photo.id;
          }
          return id;
        }
      });
    }

    return _slides;
  }
};

Slides.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  visibleRange: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export const CarouselControl = ({ children, name, onClick }) => (
  <button
    className={`${layout.columnCenterCenter} ${carousel.carouselControl}`}
    name={name}
    onClick={onClick}
  >
    {children}
  </button>
);

CarouselControl.propTypes = {
  onClick: PropTypes.func.isRequired
};

export const NextPrevBtns = ({ isDisabled, onClick }) => {
  var controlContainerClass = `${layout.rowSpaceBtnCenter} ${carousel.controlContainer}`;
  var controlsClass = `${layout.rowSpaceBtnCenter} ${carousel.controls}`;

  if (isDisabled) { return null; }

  return (
    <div className={controlContainerClass}>
      <IconContext.Provider
        value={{
          color: 'hsla(255, 255%, 255%, 0.8)',
          size: '1.5em'
        }}
      >
        <div className={controlsClass}>
          <CarouselControl
            name="prev"
            onClick={onClick}
          >
            <FaAngleLeft data-testid="fa-angle-left-icon" />
          </CarouselControl>
          <CarouselControl
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

  return (
    <>
      <div className={carouselClass}>
        <Slides
          content={content}
          isDisabled={isDisabled}
          visibleRange={currentIndex.visibleRange}
        />
        <NextPrevBtns
          isDisabled={isDisabled}
          onClick={currentIndex.onClick}
        />
      </div>
      <Cues
        className={`${layout.rowCenterCenter} ${carousel.cues}`}
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