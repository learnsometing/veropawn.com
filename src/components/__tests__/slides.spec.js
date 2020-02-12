import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Slides, { Slide, TextOverlay } from '../carousel/slides';
import { createContentFromSharp, createContentFromMarkdown } from '../../helpers/slides';
import { allPhotoNodes } from '../../templates/__fixtures__/all-photos';

import content from '../__fixtures__/all-markdown-remark';

describe('TextOverlay', () => {
  var firstNode = content[0];
  var secondNode = content[1];

  var slideWithoutLink = createContentFromMarkdown(firstNode);
  var slideWithLink = createContentFromMarkdown(secondNode);

  it('should return null if no linkText, text, title, or to props exist', () => {
    const { queryByText } = render(
      <TextOverlay linkText={null} text={null} title={null} to={null} />
    );

    expect(queryByText(firstNode.frontmatter.text)).not.toBeInTheDocument();
    expect(queryByText(firstNode.frontmatter.title)).not.toBeInTheDocument();
  });

  it('should render an overlay with a title', () => {
    const { queryByText } = render(
      <TextOverlay title={slideWithoutLink.title} />
    );

    expect(queryByText(firstNode.frontmatter.title)).toBeInTheDocument();
  });

  it('should render an overlay with text', () => {
    const { queryByText } = render(
      <TextOverlay text={slideWithoutLink.text} />
    );

    expect(queryByText(firstNode.frontmatter.text)).toBeInTheDocument();
  });

  it('should render an overlay with a link', () => {
    const { queryByRole } = render(
      <TextOverlay linkText={slideWithLink.linkText} to={slideWithLink.to} />
    );

    expect(queryByRole('link')).toHaveTextContent(secondNode.frontmatter.linkText);
    expect(queryByRole('link')).toHaveAttribute('href', secondNode.frontmatter.to);
  });

  it('should not render an overlay with a link if linkText is missing', () => {
    slideWithoutLink.to = '/foo';

    const { queryByRole } = render(
      <TextOverlay to={slideWithoutLink.to} />
    );

    expect(queryByRole('link')).not.toBeInTheDocument();
  });

  it('should not render an overlay with a link if to is missing', () => {
    slideWithoutLink.linkText = '/foo';

    const { queryByRole } = render(
      <TextOverlay linkText={slideWithoutLink.linkText} />
    );

    expect(queryByRole('link')).not.toBeInTheDocument();
  });

  it('should render an overlay with text, title, and a link', () => {
    slideWithLink.text = 'foo';

    const { queryByText, queryByRole } = render(
      <TextOverlay
        linkText={slideWithLink.linkText}
        text={slideWithLink.text}
        title={slideWithLink.title}
        to={slideWithLink.to}
      />
    );
    expect(queryByText(secondNode.frontmatter.title)).toBeInTheDocument();
    expect(queryByText('foo')).toBeInTheDocument();
    expect(queryByRole('link')).toBeInTheDocument();
  });
});

describe('Slide', () => {
  var node = content[0];
  var slideContent = createContentFromMarkdown(node);

  it('should render the photo and text content correctly', () => {
    const { queryByAltText, queryByText } = render(
      <Slide content={slideContent} wrapperClassName={'foo'} />
    );
    const img = queryByAltText('shop-front');
    const gatsbyImgWrapper = img.parentElement.parentElement;
    const slideWrapper = gatsbyImgWrapper.parentElement;
    const title = queryByText(node.frontmatter.title);
    const text = queryByText(node.frontmatter.text);

    expect(img).toBeInTheDocument();
    expect(gatsbyImgWrapper).toHaveClass('img gatsby-image-wrapper');
    expect(slideWrapper).toHaveClass('foo');
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
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
  var cArr = photos.map((photo, idx) => createContentFromSharp(alt, idx, photo));

  it('should render the carousel correctly with a single photo', () => {
    const { queryByAltText } = render(
      <Slides
        content={cArr.slice(0, 1)}
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
        content={cArr.slice(0, 1)}
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
        content={cArr.slice(0, 2)}
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
        content={cArr.slice(0, 4)}
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
        content={cArr.slice(0, 4)}
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
