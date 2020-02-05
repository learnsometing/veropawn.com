import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Carousel, { Cues, Cue, Slides, CarouselControl } from "../carousel/carousel";
import createContentObj from '../../helpers/createContentObj';
import { allPhotoNodes } from "../../templates/__fixtures__/all-photos";

describe('Cue', () => {
  it('should have the correct color when isActive and !isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={true} isFullScreen={false} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(0, 0, 0, 0.8)');
  });

  it('should have the correct color when !isActive and !isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={false} isFullScreen={false} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(0, 0, 0, 0.4)');
  });

  it('should have the correct color when isActive and isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={true} isFullScreen={true} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(255, 255, 255, 0.8)');
  });

  it('should have the correct color when !isActive and isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={false} isFullScreen={true} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(255, 255, 255, 0.4)');
  });
});

describe('Cues', () => {
  it('should render the number of Cues specified by "length"', () => {
    const length = 3;
    const { queryAllByTestId } = render(
      <Cues
        currentIndex={0}
        length={length}
      />
    );

    const cues = queryAllByTestId('carousel-pos-indicator');

    expect(cues.length).toBe(3);
    cues.forEach(indicator => expect(indicator).toBeInTheDocument());
  });

  it('should give the cue specified by currentIndex the active color', () => {
    const length = 3;
    const { queryAllByTestId } = render(
      <Cues
        currentIndex={2}
        length={length}
      />
    );

    const cues = queryAllByTestId('carousel-pos-indicator');


    expect(cues[0]).toHaveStyle('color: rgba(0, 0, 0, 0.4)');
    expect(cues[1]).toHaveStyle('color: rgba(0, 0, 0, 0.4)');
    expect(cues[2]).toHaveStyle('color: rgba(0, 0, 0, 0.8)');
  });

  it('should give the Cue specified by currentIndex the active color', () => {
    const length = 3;
    const { queryAllByTestId } = render(
      <Cues
        currentIndex={2}
        isFullScreen={true}
        length={length}
      />
    );

    const cues = queryAllByTestId('carousel-pos-indicator');


    expect(cues[0]).toHaveStyle('color: rgba(255, 255, 255, 0.4)');
    expect(cues[1]).toHaveStyle('color: rgba(255, 255, 255, 0.4)');
    expect(cues[2]).toHaveStyle('color: rgba(255, 255, 255, 0.8)');
  });
});

describe('Slides', () => {
  const alt = "Alt Text";
  const photos = allPhotoNodes.slice(0, 4);
  const content = createContentObj(alt, photos);

  it('should render the carousel correctly with a single photo', () => {
    const { queryByAltText } = render(
      <Slides
        content={content.slice(0, 1)}
        isDisabled={true}
        visibleRange={[0, 0, 0]}
      />
    );
    var image = queryByAltText(/Alt Text/);
    expect(image).toBeInTheDocument();
    // gatsby image wrapper. Can't reference directly.
    var wrapper = image.parentElement.parentElement;
    expect(wrapper).toHaveClass('singleSlide gatsby-image-wrapper');
  });

  it('should render the carousel correctly with two photos', () => {
    const { queryAllByAltText } = render(
      <Slides
        content={content.slice(0, 2)}
        isDisabled={false}
        visibleRange={[1, 0, 1]}
      />
    );

    var photos = queryAllByAltText(/Alt Text/);

    expect(photos.length).toEqual(3);

    photos.forEach(photo => expect(photo).toBeInTheDocument());

    // gatsby image wrapper. Can't reference directly.
    var wrappers = photos.map(photo => photo.parentElement.parentElement);

    expect(wrappers[0]).toHaveClass('slide gatsby-image-wrapper')
    expect(wrappers[1]).toHaveClass('currentSlide gatsby-image-wrapper')
    expect(wrappers[2]).toHaveClass('slide gatsby-image-wrapper')
  });

  it('should render the carousel correctly with more than 2 photos', () => {
    const { queryAllByAltText } = render(
      <Slides
        content={content.slice(0, 4)}
        isDisabled={false}
        visibleRange={[3, 0, 1]}
      />
    );

    var photos = queryAllByAltText(/Alt Text/);

    expect(photos.length).toEqual(3);

    photos.forEach(photo => expect(photo).toBeInTheDocument());

    // gatsby image wrapper. Can't reference directly.
    var wrappers = photos.map(photo => photo.parentElement.parentElement);

    expect(wrappers[0]).toHaveClass('slide gatsby-image-wrapper')
    expect(wrappers[1]).toHaveClass('currentSlide gatsby-image-wrapper')
    expect(wrappers[2]).toHaveClass('slide gatsby-image-wrapper')
  });
});

describe('CarouselControl', () => {
  const onClick = jest.fn();

  beforeEach(() => onClick.mockReset());

  it('should give the control the onClick fcn', () => {
    const { queryByRole } = render(
      <CarouselControl isDisabled={false} onClick={onClick} />
    );

    fireEvent.click(queryByRole('button'));

    expect(onClick.mock.calls.length).toEqual(1);
  });
});

describe('Carousel', () => {
  var alt = "Handgun With Case 2 Mags";
  var photos = allPhotoNodes.slice(0, 4);
  var content = createContentObj(alt, photos);
  var onIndexChangeMock = jest.fn();

  beforeEach(() => onIndexChangeMock.mockReset());

  it('should render the main photo and prev/next photos into the carousel on mount', () => {
    const { queryByAltText } = render(
      <Carousel content={content} />
    );
    expect(queryByAltText('Handgun With Case 2 Mags 1')).toBeInTheDocument();
    expect(queryByAltText('Handgun With Case 2 Mags 2')).toBeInTheDocument();
    expect(queryByAltText('Handgun With Case 2 Mags 4')).toBeInTheDocument();
  });

  it('should cycle through the photos when the next button is clicked', () => {
    const { queryByAltText, queryByTestId } = render(
      <Carousel content={content} />
    );

    const startPhoto = queryByAltText(/Handgun With Case 2 Mags 1/);
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;

    expect(startPhoto).toBeInTheDocument();
    expect(startPhoto.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper');

    fireEvent.click(nextBtn);

    var photo2 = queryByAltText(/Handgun With Case 2 Mags 2/);
    expect(photo2.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper')

    fireEvent.click(nextBtn);

    var photo3 = queryByAltText(/Handgun With Case 2 Mags 3/);
    expect(photo3.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper')
  });

  it('should cycle through the photos when the next button is clicked', () => {
    const { queryByAltText, queryByTestId } = render(
      <Carousel content={content} />
    );

    const startPhoto = queryByAltText(/Handgun With Case 2 Mags 1/);
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;

    expect(startPhoto).toBeInTheDocument();
    expect(startPhoto.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper');

    fireEvent.click(prevBtn);

    var photo4 = queryByAltText(/Handgun With Case 2 Mags 4/);
    expect(photo4.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper')

    fireEvent.click(prevBtn);

    var photo3 = queryByAltText(/Handgun With Case 2 Mags 3/);
    expect(photo3.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper')
  });

  it('should not render either carousel button if content.length is 1', () => {
    const { queryByTestId } = render(
      <Carousel content={[{ alt: alt, photo: photos[0] }]} />
    );
    const prevBtn = queryByTestId('fa-angle-left-icon');
    const nextBtn = queryByTestId('fa-angle-right-icon');

    expect(prevBtn).not.toBeInTheDocument();
    expect(nextBtn).not.toBeInTheDocument();
  });

  it('should display the correct photo if given a startIndex other than 0', () => {
    var { queryByAltText } = render(
      <Carousel content={content} startIndex={2} />
    );

    var startPhoto = queryByAltText(/Handgun With Case 2 Mags 3/);

    expect(startPhoto.parentElement.parentElement).toHaveClass('currentSlide gatsby-image-wrapper');
  });

  it('should call the onIndexChange prop if provided', () => {
    const { queryByTestId } = render(
      <Carousel content={content} startIndex={2} onIndexChange={onIndexChangeMock} />
    );
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;

    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);

    expect(onIndexChangeMock.mock.calls.length).toEqual(2);
  });
});