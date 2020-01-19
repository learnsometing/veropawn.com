import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Carousel, { CarouselPositionDisplay, CarouselPositionIndicator, CarouselSlides, CarouselControl } from "../carousel/carousel";

import { allPhotoNodes } from "../../templates/__fixtures__/all-photos";

describe('CarouselPositionIndicator', () => {
  it('should have posIndicator and activePosIndicator classes when isActive', () => {
    const { queryByTestId } = render(<CarouselPositionIndicator isActive={true} />);

    const positionIndicator = queryByTestId('carousel-pos-indicator');

    expect(positionIndicator).toHaveClass('posIndicator activePosIndicator');
  });

  it('should have posIndicator and inactivePosIndicator classes when !isActive', () => {
    const { queryByTestId } = render(<CarouselPositionIndicator isActive={false} />);

    const positionIndicator = queryByTestId('carousel-pos-indicator');

    expect(positionIndicator).toHaveClass('posIndicator inactivePosIndicator');
  });
});

describe('CarouselPositionDisplay', () => {
  it('should render the number of CarouselPositionIndicators specified by "length"', () => {
    const length = 3;
    const { queryAllByTestId } = render(
      <CarouselPositionDisplay
        currentIndex={0}
        length={length}
      />
    );

    const posIndicators = queryAllByTestId('carousel-pos-indicator');

    expect(posIndicators.length).toBe(3);
    posIndicators.forEach(indicator => expect(indicator).toBeInTheDocument());
  });

  it('should give the posIndicator specified by currentIndex the activePosIndicator class', () => {
    const length = 3;
    const { queryAllByTestId } = render(
      <CarouselPositionDisplay
        currentIndex={2}
        length={length}
      />
    );

    const posIndicators = queryAllByTestId('carousel-pos-indicator');

    expect(posIndicators[0]).toHaveClass('posIndicator inactivePosIndicator');
    expect(posIndicators[1]).toHaveClass('posIndicator inactivePosIndicator');
    expect(posIndicators[2]).toHaveClass('posIndicator activePosIndicator');
  });
});

describe('CarouselSlides', () => {
  const alt = "Alt Text";
  const photos = allPhotoNodes.slice(0, 6);
  it('should render each photo passed as props', () => {
    const { queryAllByAltText } = render(
      <CarouselSlides
        alt={alt}
        currentIndex={0}
        photos={photos}
      />
    );
    const photoElements = queryAllByAltText(/Alt Text/);

    expect(photoElements.length).toEqual(photos.length);
    photoElements.forEach(el => expect(el).toBeInTheDocument());
  });

  it('should give each photo wrapper the correct class', () => {
    const { queryAllByAltText } = render(
      <CarouselSlides
        alt={alt}
        currentIndex={1}
        photos={photos}
      />
    );

    const photoElements = queryAllByAltText(/Alt Text/);
    // get the div elements that the class is set on
    const photoElementWrappers = photoElements.map(el => el.parentElement.parentElement);
    // assert by class because the visibility assertion only checks inline style
    expect(photoElementWrappers[0]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[1]).toHaveClass('slide currentSlide gatsby-image-wrapper');
    expect(photoElementWrappers[2]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
  });
});

describe('CarouselControl', () => {
  const onClick = jest.fn();

  beforeEach(() => onClick.mockReset());

  it('should give the control the correct className when isDisabled', () => {
    const { queryByRole } = render(
      <CarouselControl isDisabled={true} onClick={onClick} />
    );

    expect(queryByRole('button')).toHaveClass("carouselControl disabledCarouselControl");
  });

  it('should give the control the correct className when !isDisabled', () => {
    const { queryByRole } = render(
      <CarouselControl isDisabled={false} onClick={onClick} />
    );

    expect(queryByRole('button')).toHaveClass("carouselControl enabledCarouselControl");
  });

  it('should give the control the onClick fcn', () => {
    const { queryByRole } = render(
      <CarouselControl isDisabled={false} onClick={onClick} />
    );

    fireEvent.click(queryByRole('button'));

    expect(onClick.mock.calls.length).toEqual(1);
  });
});

describe('Carousel', () => {
  const alt = "Handgun With Case 2 Mags";
  const photos = allPhotoNodes.slice(0, 3);

  it('should render the main photo into the carousel on mount', () => {
    const { queryByAltText } = render(
      <Carousel alt={alt} photos={photos} />
    );
    expect(queryByAltText('Handgun With Case 2 Mags 0')).toBeInTheDocument();
  });

  it('should correctly cycle through the photos when the next button is clicked', () => {
    const { queryAllByAltText, queryByTestId } = render(
      <Carousel alt={alt} photos={photos} />
    );
    const photoElements = queryAllByAltText(/Handgun With Case 2 Mags/);
    // get the div elements that wrap the Img tags
    const photoElementWrappers = photoElements.map(el => el.parentElement.parentElement);
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;

    expect(photoElementWrappers[0]).toHaveClass('slide currentSlide gatsby-image-wrapper');

    fireEvent.click(nextBtn);

    expect(photoElementWrappers[0]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[1]).toHaveClass('slide currentSlide gatsby-image-wrapper');

    fireEvent.click(nextBtn);

    expect(photoElementWrappers[1]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[2]).toHaveClass('slide currentSlide gatsby-image-wrapper');

    fireEvent.click(nextBtn);

    expect(photoElementWrappers[2]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[0]).toHaveClass('slide currentSlide gatsby-image-wrapper');
  });

  it('should correctly cycle through the photos when the prev button is clicked', () => {
    const { queryAllByAltText, queryByTestId } = render(
      <Carousel alt={alt} photos={photos} />
    );
    const photoElements = queryAllByAltText(/Handgun With Case 2 Mags/);
    // get the div elements that wrap the Img tags
    const photoElementWrappers = photoElements.map(el => el.parentElement.parentElement);
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;

    expect(photoElementWrappers[0]).toHaveClass('slide currentSlide gatsby-image-wrapper');

    fireEvent.click(prevBtn);

    expect(photoElementWrappers[0]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[2]).toHaveClass('slide currentSlide gatsby-image-wrapper');

    fireEvent.click(prevBtn);

    expect(photoElementWrappers[2]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[1]).toHaveClass('slide currentSlide gatsby-image-wrapper');

    fireEvent.click(prevBtn);

    expect(photoElementWrappers[1]).toHaveClass('slide hiddenSlide gatsby-image-wrapper');
    expect(photoElementWrappers[0]).toHaveClass('slide currentSlide gatsby-image-wrapper');
  });

  it('should disable both carousel buttons if photos is empty', () => {
    const { queryByTestId } = render(
      <Carousel alt={alt} photos={[]} />
    );
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeDisabled();
  });

  it('should disable both carousel buttons if photos.length is 1', () => {
    const { queryByTestId } = render(
      <Carousel alt={alt} photos={[photos[0]]} />
    );
    const prevBtn = queryByTestId('fa-angle-left-icon').parentElement;
    const nextBtn = queryByTestId('fa-angle-right-icon').parentElement;

    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeDisabled();
  });
});
