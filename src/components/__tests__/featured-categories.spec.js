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

  it('should return null if the node has no htmlAst', () => {
    let featured = category();
    featured.htmlAst = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no p tag wrapper', () => {
    let featured = category();
    featured.htmlAst.children[0] = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no a tag', () => {
    let featured = category();
    featured.htmlAst.children[0].children[0] = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no a tag properties', () => {
    let featured = category();
    featured.htmlAst.children[0].children[0].properties = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no href', () => {
    let featured = category();
    featured.htmlAst.children[0].children[0].properties.href = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no text node', () => {
    let featured = category();
    featured.htmlAst.children[0].children[0].children[0] = null;
    const { queryByRole } = render(
      <FeaturedCategories data={{ nodes: [featured] }} />
    );

    expect(queryByRole('img')).not.toBeInTheDocument();
  });

  it('should return null if the node has no text value', () => {
    let featured = category();
    featured.htmlAst.children[0].children[0].children[0].value = null;
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
      }
    },
    "htmlAst": {
      "type": "root",
      "children": [
        {
          "type": "element",
          "tagName": "p",
          "properties": {},
          "children": [
            {
              "type": "element",
              "tagName": "a",
              "properties": {
                "href": "/firearm/pistol/"
              },
              "children": [
                {
                  "type": "text",
                  "value": "Pistols"
                }
              ]
            }
          ]
        }
      ],
      "data": {
        "quirksMode": false
      }
    },
    "id": "f88364d1-67b0-5311-9077-bced24ab4c21",
  };
}