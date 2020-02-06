import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import ReactHtmlParser from 'react-html-parser';
import { IconContext } from 'react-icons';
import uniqueId from 'lodash/uniqueId';

import Cues from './cues';
import { useCurrentIndex } from './hooks/useCurrentIndex';

import carousel from './carousel.module.scss';
import layout from '../../styles/layout.module.css';

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
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export const NextPrevBtns = ({ isDisabled, onClick }) => {
  // Returns null if isDisabled or buttons to move the carousel slides
  if (isDisabled) {
    return null;
  }

  return (
    <IconContext.Provider
      value={{
        color: 'hsla(255, 255%, 255%, 0.8)',
        size: '1.5em'
      }}
    >
      <div className={`${layout.rowSpaceBtnCenter} ${carousel.controls}`}>
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
  );
};

export function Slide({ slide, className, style }) {
  return (
    <div className={className} style={style}>
      <Img
        alt={slide.alt}
        fluid={slide.photo.childImageSharp.fluid}
        loading={'eager'}
        className={carousel.img}
      />
      <TextOverlay content={slide} />
    </div>
  );
}

Slide.propTypes = {
  slide: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

function TextOverlay({ content }) {
  var html = content.html;
  if (html) {
    let title = content.title;
    return (
      <div className={carousel.textOverlayWrapper}>
        <div className={`${layout.columnStartCenter} ${carousel.textOverlay}`}>
          <p className={carousel.title}>{title}</p>
          {ReactHtmlParser(html)}
        </div>
      </div>
    );
  }

  return null;
}

export const Slides = (props) => {
  var {
    content,
    currentSlideStyle,
    isDisabled,
    onClick,
    slideStyle,
    visibleRange
  } = props;
  // Make a list of all the slides
  var slides = createSlides();

  // Only display slides in the visible range (prev, current, next)
  return (
    <div className={carousel.slideContainer}>
      {slides}
      <NextPrevBtns
        isDisabled={isDisabled}
        onClick={onClick}
      />
    </div>
  );

  function createSlides() {
    // return either a single slide (one photo), or multiple slides
    let _slides;

    if (isDisabled) {
      // isDisabled if content.length < 2, so return one slide.
      let slide = content[0];
      _slides = <Slide key={slide.photo.id} slide={slide} className={carousel.singleSlide} />;
    } else {
      _slides = visibleRange.map((n, idx) => {
        let slide = content[n];
        let [className, style] = getClassAndStyle();
        let key = getId();

        return (
          <Slide
            key={key}
            className={className}
            slide={slide}
            style={style}
          />
        );

        function getClassAndStyle() {
          let _className;
          let _style = undefined;

          if (idx === 1) {
            _className = carousel.currentSlide;
            if (currentSlideStyle) {
              _style = currentSlideStyle;
            }
          } else {
            _className = carousel.slide;
            if (slideStyle) {
              _style = slideStyle;
            }
          }

          return [_className, _style];
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
  currentSlideStyle: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  slideStyle: PropTypes.string,
  visibleRange: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export const FullScreenButton = ({ onClick }) => (
  <button className={carousel.fullScreenIcon} onClick={onClick}>
    <IconContext.Provider value={{ color: '#000', size: '2em' }}>
      <MdFullscreen data-testid="md-fullscreen-icon" />
    </IconContext.Provider>
  </button>
);

FullScreenButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const MinimizeButton = ({ onClick }) => (
  <button className={carousel.minimizeIcon} onClick={onClick}>
    <IconContext.Provider value={{ color: 'rgba(255, 255, 255, 0.8)', size: '2em' }}>
      <MdFullscreenExit data-testid="md-fullscreen-exit-icon" />
    </IconContext.Provider>
  </button>
);

MinimizeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export function FSIcon({ isFullScreen, onClick }) {
  var c = isFullScreen
    ? <MinimizeButton onClick={onClick} />
    : <FullScreenButton onClick={onClick} />;

  return c;
}

const Carousel = (props) => {
  var {
    content,
    currentSlideStyle,
    isFullScreen,
    isTimed,
    onFSIconClick,
    onIndexChange,
    slideStyle,
    startIndex
  } = props;

  var length = content.length;
  var isDisabled = length < 2;
  var currentIndex = useCurrentIndex(startIndex, onIndexChange, length);
  useEffect(() => {
    if (isTimed) {
      let timerID = currentIndex.setTimer(8000);
      return () => clearInterval(timerID);
    }
  }, [currentIndex, isTimed]);

  return (
    <div className={`${layout.columnStartCenter} ${carousel.wrapper}`}>
      <div className={`${carousel.carousel}`}>
        <Slides
          content={content}
          currentSlideStyle={currentSlideStyle}
          isDisabled={isDisabled}
          onClick={currentIndex.onClick}
          slideStyle={slideStyle}
          visibleRange={currentIndex.visibleRange}
        />
      </div>
      <div className={`${layout.rowEndCenter} ${carousel.FSControlContainer}`}>
        <Cues
          currentIndex={currentIndex.value}
          isFullScreen={isFullScreen}
          length={length}
        />
        <FSIcon isFullScreen={isFullScreen} onClick={onFSIconClick} />
      </div>
    </div>
  );
}

Carousel.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSlideStyle: PropTypes.string,
  isFullScreen: PropTypes.bool.isRequired,
  isTimed: PropTypes.bool.isRequired,
  onFSIconClick: PropTypes.func.isRequired,
  onIndexChange: PropTypes.func.isRequired,
  slideStyle: PropTypes.string,
  startIndex: PropTypes.number.isRequired,
};

Carousel.defaultProps = {
  isFullScreen: false,
  isTimed: false,
  onFSIconClick: () => { },
  onIndexChange: () => { },
  startIndex: 0,
}

export default Carousel;