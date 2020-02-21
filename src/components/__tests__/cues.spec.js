import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Cues, { Cue } from '../carousel/cues';

describe('Cue', () => {
  it('should have the correct color when isActive and !isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={true} isFullScreen={false} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(64, 61, 52, 0.8)');
  });

  it('should have the correct color when !isActive and !isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={false} isFullScreen={false} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(64, 61, 52, 0.4)');
  });

  it('should have the correct color when isActive and isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={true} isFullScreen={true} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(231, 232, 200, 0.8)');
  });

  it('should have the correct color when !isActive and isFullScreen', () => {
    const { queryByTestId } = render(<Cue isActive={false} isFullScreen={true} />);

    const cue = queryByTestId('carousel-pos-indicator');

    expect(cue).toHaveStyle('color: rgba(231, 232, 200, 0.4)');
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


    expect(cues[0]).toHaveStyle('color: rgba(64, 61, 52, 0.4)');
    expect(cues[1]).toHaveStyle('color: rgba(64, 61, 52, 0.4)');
    expect(cues[2]).toHaveStyle('color: rgba(64, 61, 52, 0.8)');
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


    expect(cues[0]).toHaveStyle('color: rgba(231, 232, 200, 0.4)');
    expect(cues[1]).toHaveStyle('color: rgba(231, 232, 200, 0.4)');
    expect(cues[2]).toHaveStyle('color: rgba(231, 232, 200, 0.8)');
  });
});