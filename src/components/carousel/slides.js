import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import uniqueId from 'lodash/uniqueId';

import slides from './slides.module.css';
import layout from '../../styles/layout.module.css';

export const Slide = ({ content, wrapperClassName, wrapperStyle }) => (
  <div className={wrapperClassName} style={wrapperStyle}>
    <Img
      alt={content.alt}
      fluid={content.photo.fluid}
      loading={'eager'}
      className={slides.img}
    />
    <TextOverlay
      linkText={content.linkText}
      text={content.text}
      title={content.title}
      to={content.to}
    />
  </div>
);

Slide.propTypes = {
  content: PropTypes.object.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
  wrapperStyle: PropTypes.object
};

export function TextOverlay({ linkText, text, title, to }) {
  var hasNoOverlayContent = !linkText && !text && !title && !to;

  if (hasNoOverlayContent) {
    // If no text and no title, shouldn't be any other content on the slide.
    return null;
  }

  return (
    <div className={slides.textOverlayWrapper}>
      <div className={`${layout.columnStartCenter} ${slides.textOverlay}`}>
        {title ? <p className={slides.textOverlayTitle}>{title}</p> : null}
        {text ? <p>{text}</p> : null}
        {linkText && to ? <Link alt={linkText} to={to}>{linkText}</Link> : null}
      </div>
    </div>
  );

}

// TODO
TextOverlay.propTypes = {
  linkText: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  to: PropTypes.string,
};

export default function Slides(props) {
  var { content, currentSlideStyle, isDisabled, slideStyle, visibleRange } = props;

  /* 
  * Make a list of slides in the visible range (prev, current, next)
  * OR
  * Make a single slide if isDisabled
  */
  return createSlides();

  function createSlides() {
    // return either a single slide (one photo), or multiple slides
    let _slides;

    if (isDisabled) {
      // isDisabled if content.length < 2, so return one slide.
      let node = content[0];
      _slides = <Slide
        key={node.id}
        content={node}
        wrapperStyle={currentSlideStyle}
        wrapperClassName={slides.singleSlide}
      />;
    } else {
      _slides = visibleRange.map((n, idx) => {
        let node = content[n];
        let [className, style] = getClassAndStyle(idx, currentSlideStyle, slideStyle);
        let key = getKey(node.id);
        return (
          <Slide
            key={key}
            content={node}
            wrapperClassName={className}
            wrapperStyle={style}
          />
        );
      });
    }

    return _slides;

    function getClassAndStyle(idx, currentSlideStyle, slideStyle) {
      let _className;
      let _style = undefined;

      if (idx === 1) {
        _className = slides.currentSlide;
        if (currentSlideStyle) {
          _style = currentSlideStyle;
        }
      } else {
        _className = slides.slide;
        if (slideStyle) {
          _style = slideStyle;
        }
      }

      return [_className, _style];
    }

    function getKey(slideId) {
      /*
      * Pick a key for the slide. When only two slides are in the 
      * carousel, the data id can't be used, because the id will be repeated
      * on the next and previous slide, causing duplication errors.
      */

      let id;
      if (content.length === 2) {
        id = uniqueId();
      } else {
        id = slideId;
      }
      return id;
    }
  }
};

Slides.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentSlideStyle: PropTypes.object,
  isDisabled: PropTypes.bool.isRequired,
  slideStyle: PropTypes.object,
  visibleRange: PropTypes.arrayOf(PropTypes.number).isRequired,
};