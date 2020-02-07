import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { CallToAction, DisplayRange, ItemCard, ItemCards, PureShoppingPage, query } from "../shopping-page/shopping-page";
import { defaultPhoto, mainPhotos } from "../__fixtures__/all-photos";
import { allItemsJson, rings } from "../__fixtures__/all-items-json";
import filteredRings from '../__fixtures__/filtered-rings';
import pistols from '../__fixtures__/filtered-pistols';

describe('ItemCard', () => {
  it('should render the item card with a photo and with the item descript', () => {
    const item = allItemsJson[1];
    const { queryByText } = render(
      <ItemCard
        item={item}
        photo={mainPhotos[7]}
      />
    );

    expect(queryByText(item.descript)).toBeInTheDocument();
  });
});

describe('ItemCards', () => {
  it('should return a list of ItemCards containing a card for each item in the list', () => {
    const { queryByText } = render(
      <ItemCards
        items={allItemsJson}
        defaultPhoto={defaultPhoto}
        photos={mainPhotos}
      />
    );

    expect(queryByText(allItemsJson[0].descript)).toBeInTheDocument();
    expect(queryByText(allItemsJson[1].descript)).toBeInTheDocument();
  });
});

describe('CallToAction', () => {
  it('should render the aboutCTA info when currentPage is even', () => {
    const { queryByRole } = render(<CallToAction currentPage={2} />);
    expect(queryByRole('link').href).toContain('about');
  });

  it('should render the contactCTA info when currentPage is odd', () => {
    const { queryByRole } = render(<CallToAction currentPage={5} />);
    expect(queryByRole('link').href).toContain('contact');
  });
});

describe('DisplayRange', () => {
  it('should set the correct displayRangeText when upperLimit is in bounds', () => {
    const { queryByText } = render(
      <DisplayRange
        lowerLimit={24}
        numItems={48}
        upperLimit={48}
      />
    );

    expect(queryByText('Items 25-48 of 48')).toBeInTheDocument();
  });

  it('should set the correct displayRangeText when upperLimit is out of bounds', () => {
    const { queryByText } = render(
      <DisplayRange
        lowerLimit={24}
        numItems={35}
        upperLimit={48}
      />
    );

    expect(queryByText('Items 25-35 of 35')).toBeInTheDocument();
  });
});

describe('PureShoppingPage', () => {
  const allItems = rings.nodes;
  const subcategory = allItems[0].subcategory;

  it('should render the first 24 items if location has no state prop', () => {
    const { queryAllByRole } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        location={{ pathname: "/some/path", state: null }}
        subcategory={subcategory}
        width={667}
      />
    );

    const lists = queryAllByRole('list');
    const itemCards = lists[0];
    const expectedItems = allItems.slice(0, 24);

    expect(itemCards.childElementCount).toEqual(24);

    expectedItems.forEach((item, index) => (
      expect(itemCards.children[index]).toHaveTextContent(item.descript)
    ));
  });

  it('should render the correct items if location.state has a pageNum property but no filters property', () => {
    const { queryAllByRole } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        location={{ pathname: "/some/path", state: { pageNum: 5, } }}
        subcategory={subcategory}
        width={667}
      />
    );

    const lists = queryAllByRole('list');
    const itemCards = lists[0];
    const expectedItems = allItems.slice(96, 120);

    expect(itemCards.childElementCount).toEqual(24);

    expectedItems.forEach((item, index) => (
      expect(itemCards.children[index]).toHaveTextContent(item.descript)
    ));
  });

  it('should render the correct display range for the page', () => {
    const { queryByText } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        location={{ pathname: "/some/path", state: { pageNum: 2 } }}
        subcategory={subcategory}
        width={667}
      />
    );

    const expectedText = /Items 25-48/;

    expect(queryByText(expectedText)).toBeInTheDocument();
  });

  it('should filter the items to location.state.filters and display the page given in location.state.pageNum', () => {
    const { queryAllByRole } = render(
      <PureShoppingPage
        allItems={filteredRings}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        location={{
          pathname: "/some/path", state: {
            filters: {
              metal: ["18kt Gold", "22kt Gold"]
            },
            pageNum: 2
          }
        }}
        subcategory={subcategory}
        width={667}
      />
    );

    const lists = queryAllByRole('list');
    const itemCards = lists[0];
    const expectedItems = filteredRings.slice(24, 48);

    expect(itemCards.childElementCount).toEqual(24);

    expectedItems.forEach((item, index) => (
      expect(itemCards.children[index]).toHaveTextContent(item.descript)
    ));
  });

  it('should render the correct filtered items', () => {
    const { queryAllByRole } = render(
      <PureShoppingPage
        allItems={filteredRings}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        location={{
          pathname: "/some/path", state: {
            filters: {
              metal: ["22kt Gold"]
            }
          }
        }}
        subcategory={subcategory}
        width={667}
      />
    );

    const lists = queryAllByRole('list');
    const itemCards = lists[0];
    const expectedItems = filteredRings.slice(53, 56);

    expect(itemCards.childElementCount).toEqual(2);

    expectedItems.forEach((item, index) => (
      expect(itemCards.children[index]).toHaveTextContent(item.descript)
    ));
  });

  it('should render the correct items when location.state.filters has multiple entries', () => {
    const { queryAllByRole } = render(
      <PureShoppingPage
        allItems={pistols}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        location={{
          pathname: "/some/path", state: {
            filters: {
              brand: ["GLOCK"],
              ammo: ["9 mm"]
            }
          }
        }}
        subcategory={subcategory}
        width={667}
      />
    );

    const lists = queryAllByRole('list');
    const itemCards = lists[0];
    const expectedItems = pistols.slice(13, 17);

    expect(itemCards.childElementCount).toEqual(4);

    expectedItems.forEach((item, index) => (
      expect(itemCards.children[index]).toHaveTextContent(item.descript)
    ));
  });
});