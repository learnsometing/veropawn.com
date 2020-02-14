import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeaturedCategories from '../featured-categories/featured-categories';

describe('FeaturedCategories', () => {
  it('should return null if the node has no frontmatter', () => {
    let featured = category();
    featured.frontmatter = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no background image', () => {
    let featured = category();
    featured.frontmatter.backgroundImage = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no frontmatter linkText property', () => {
    let featured = category();
    featured.frontmatter.linkText = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no frontmatter to property', () => {
    let featured = category();
    featured.frontmatter.to = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render correctly if all properties are present', () => {
    let featured = category();
    const { queryByRole, queryByText } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).toBeInTheDocument();
    expect(queryByText('Pistols')).toBeInTheDocument();
  });
});

function category() {
  return {
    "frontmatter": {
      "backgroundImage": {
        "publicURL": "/static/logo-0bf2a83f6b65d12e37a91163f1440090.svg"
      },
      "linkText": "Pistols",
      "to": "/firearm/pistol",
    },
    "id": "f88364d1-67b0-5311-9077-bced24ab4c21",
  };
}