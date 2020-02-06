import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Slides, { Slide, TextOverlay } from '../carousel/slides';
import { createContentArray, createSlideContent } from '../../helpers/slides';
import { allPhotoNodes } from '../../templates/__fixtures__/all-photos';

import content from '../__fixtures__/slides-content';

describe('TextOverlay', () => {
  var node = content[0];
  var slideContent = createSlideContent(node);
  var title = 'Cash Pawn & Jewelry';
  var txt = "We've proudly served Vero Beach and the surrounding areas since 1995.";
  it('should return null if the html prop is falsy', () => {
    const { queryByText } = render(
      <TextOverlay html={null} title={null} />
    );

    expect(queryByText(txt)).not.toBeInTheDocument();
    expect(queryByText(title)).not.toBeInTheDocument();
  });

  it('should properly render the slideContent when the html property is defined', () => {
    const { queryByText } = render(
      <TextOverlay html={slideContent.html} title={slideContent.title} />
    );

    expect(queryByText(txt)).toBeInTheDocument();
    expect(queryByText(title)).toBeInTheDocument();
  });
});

describe('Slide', () => {
  var node = content[0];
  var slideContent = createSlideContent(node);
  var title = 'Cash Pawn & Jewelry';
  var txt = "We've proudly served Vero Beach and the surrounding areas since 1995.";

  it('should render the photo and text content correctly', () => {
    const { queryByAltText, queryByText } = render(
      <Slide content={slideContent} wrapperClassName={'foo'} />
    );
    const img = queryByAltText('shop-front');
    const gatsbyImgWrapper = img.parentElement.parentElement;
    const slideWrapper = gatsbyImgWrapper.parentElement;
    const _title = queryByText(title);
    const _txt = queryByText(txt);

    expect(img).toBeInTheDocument();
    expect(gatsbyImgWrapper).toHaveClass('img gatsby-image-wrapper');
    expect(slideWrapper).toHaveClass('foo');
    expect(_title).toBeInTheDocument();
    expect(_txt).toBeInTheDocument();
  });

  it('should pass wrapperStyle to the slide wrapper element', () => {
    const { queryByAltText } = render(
      <Slide
        content={slideContent}
        wrapperClassName={'foo'}
        wrapperStyle={{ minWidth: '100%' }}
      />
    );
    const img = queryByAltText('shop-front');
    const gatsbyImgWrapper = img.parentElement.parentElement;
    const slideWrapper = gatsbyImgWrapper.parentElement;

    expect(slideWrapper).toHaveStyle('min-width: 100%');
  });
});

describe('Slides', () => {
  var alt = 'Alt Text';
  var photos = allPhotoNodes.slice(0, 4);
  var contentArray = createContentArray(alt, photos);

  it('should render the carousel correctly with a single photo', () => {
    const { queryByAltText } = render(
      <Slides
        content={contentArray.slice(0, 1)}
        isDisabled={true}
        visibleRange={[0, 0, 0]}
      />
    );
    const image = queryByAltText(/Alt Text/);
    // Can't reference directly.
    const gatsbyImgWrapper = image.parentElement.parentElement;
    const wrapper = gatsbyImgWrapper.parentElement;

    expect(image).toBeInTheDocument();
    expect(gatsbyImgWrapper).toHaveClass('img gatsby-image-wrapper');
    expect(wrapper).toHaveClass('singleSlide');
  });

  it('should pass only currentSlideStyle to the slide wrapper of a single slide', () => {
    const { queryByAltText } = render(
      <Slides
        content={contentArray.slice(0, 1)}
        currentSlideStyle={{ maxWidth: '50%' }}
        isDisabled={true}
        slideStyle={{ minWidth: '100%' }}
        visibleRange={[0, 0, 0]}
      />
    );
    const image = queryByAltText(/Alt Text/);
    const gatsbyImgWrapper = image.parentElement.parentElement;
    const wrapper = gatsbyImgWrapper.parentElement;

    expect(wrapper).toHaveStyle('max-width: 50%');
  });

  it('should render the carousel correctly with two photos', () => {
    const { queryAllByAltText } = render(
      <Slides
        content={contentArray.slice(0, 2)}
        isDisabled={false}
        visibleRange={[1, 0, 1]}
      />
    );

    var photos = queryAllByAltText(/Alt Text/);
    var slideWrappers = photos.map(photo => photo.parentElement.parentElement.parentElement);

    expect(photos.length).toEqual(3);
    photos.forEach(photo => expect(photo).toBeInTheDocument());
    expect(slideWrappers[0]).toHaveClass('slide')
    expect(slideWrappers[1]).toHaveClass('currentSlide')
    expect(slideWrappers[2]).toHaveClass('slide')
  });

  it('should render the carousel correctly with more than 2 photos', () => {
    const { queryAllByAltText } = render(
      <Slides
        content={contentArray.slice(0, 4)}
        isDisabled={false}
        visibleRange={[3, 0, 1]}
      />
    );

    var photos = queryAllByAltText(/Alt Text/);
    var slideWrappers = photos.map(photo => photo.parentElement.parentElement.parentElement);

    expect(photos.length).toEqual(3);
    photos.forEach(photo => expect(photo).toBeInTheDocument());
    expect(slideWrappers[0]).toHaveClass('slide');
    expect(slideWrappers[1]).toHaveClass('currentSlide');
    expect(slideWrappers[2]).toHaveClass('slide');
  });

  it('should properly apply currentSlideStyle and slideStyle', () => {
    const { queryAllByAltText } = render(
      <Slides
        content={contentArray.slice(0, 4)}
        currentSlideStyle={{ maxWidth: '50%' }}
        isDisabled={false}
        slideStyle={{ minWidth: '100%' }}
        visibleRange={[3, 0, 1]}
      />
    );
    var photos = queryAllByAltText(/Alt Text/);
    var slideWrappers = photos.map(photo => photo.parentElement.parentElement.parentElement);

    expect(slideWrappers[0]).toHaveStyle('min-width: 100%');
    expect(slideWrappers[1]).toHaveStyle('max-width: 50%');
    expect(slideWrappers[2]).toHaveStyle('min-width: 100%');
  });
});
