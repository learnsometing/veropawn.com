import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { CallToAction, ItemCard, ItemCards, Pagination, PureShoppingPage as ShoppingPage } from "../shopping-page/shopping-page";
import { defaultPhoto, mainPhotos } from "../__fixtures__/all-photos";
import { allItemsJson, rings } from "../__fixtures__/all-items-json";

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

describe('Pagination', () => {
  let displayRangeText;
  let itemsOnPage;
  const setDisplayRangeText = txt => displayRangeText = txt;
  const setItemsOnPage = items => itemsOnPage = items;
  const items = rings.nodes;
  Object.defineProperty(window, 'scrollTo', { value: undefined });

  beforeEach(() => {
    displayRangeText = undefined;
    itemsOnPage = undefined;
  });

  it('should render the pagination with less buttons when width < 568px', () => {
    const { queryByTestId } = render(
      <Pagination
        items={items}
        setDisplayRangeText={setDisplayRangeText}
        setItemsOnPage={setItemsOnPage}
        width={320}
      />
    );

    const pagination = queryByTestId("rc-pagination");

    expect(pagination).toBeInTheDocument();
    // only five buttons on screen, one is hidden until third page is reached
    expect(pagination.childElementCount).toBeLessThan(7);
  });

  it('should render the full pagination when width >= 568px', () => {
    const { queryByTestId } = render(
      <Pagination
        items={items}
        setDisplayRangeText={setDisplayRangeText}
        setItemsOnPage={setItemsOnPage}
        width={800}
      />
    );

    const pagination = queryByTestId("rc-pagination");

    expect(pagination).toBeInTheDocument();
    expect(pagination.childElementCount).toBeGreaterThan(7);
  });

  it('should set displayRangeText to the correct items when the page is changed forward', () => {
    const { queryByTitle } = render(
      <Pagination
        items={items}
        setDisplayRangeText={setDisplayRangeText}
        setItemsOnPage={setItemsOnPage}
        width={320}
      />
    );

    const page2Btn = queryByTitle('2');

    fireEvent.click(page2Btn);

    expect(displayRangeText).toBe('Items 25-48 of 192');
  });

  it('should set displayRangeText to the correct items when the page is changed backwards', () => {
    const { queryByTitle } = render(
      <Pagination
        items={items}
        setDisplayRangeText={setDisplayRangeText}
        setItemsOnPage={setItemsOnPage}
        width={320}
      />
    );

    const page2Btn = queryByTitle('2');
    const page3Btn = queryByTitle('3');

    fireEvent.click(page3Btn);
    fireEvent.click(page2Btn);

    expect(displayRangeText).toBe('Items 25-48 of 192');
  });

  it('should set itemsOnPage to the correct items when the page is changed forward', () => {
    const { queryByTitle } = render(
      <Pagination
        items={items}
        setDisplayRangeText={setDisplayRangeText}
        setItemsOnPage={setItemsOnPage}
        width={320}
      />
    );

    const page2Btn = queryByTitle('2');

    fireEvent.click(page2Btn);

    expect(itemsOnPage).toEqual(items.slice(24, 48));
  });

  it('should set itemsOnPage to the correct items when the page is changed backwards', () => {
    const { queryByTitle } = render(
      <Pagination
        items={items}
        setDisplayRangeText={setDisplayRangeText}
        setItemsOnPage={setItemsOnPage}
        width={320}
      />
    );

    const page2Btn = queryByTitle('2');
    const page3Btn = queryByTitle('3');

    fireEvent.click(page3Btn);

    expect(itemsOnPage).toEqual(items.slice(48, 72));

    fireEvent.click(page2Btn);

    expect(itemsOnPage).toEqual(items.slice(24, 48));
  });
});

describe('ShoppingPage', () => {
  const allItems = rings.nodes;
  const subcategory = allItems[0].subcategory;
  it('should only render 24 items per page', () => {
    const { queryAllByRole } = render(
      <ShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
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

  it('should update itemsOnPage after changing pages', () => {
    const { queryAllByRole, queryByTitle } = render(
      <ShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={667}
      />
    );

    const expectedItems = allItems.slice(24, 48);
    const page2Button = queryByTitle('2');

    fireEvent.click(page2Button);

    const lists = queryAllByRole('list');
    const itemCards = lists[0];

    expectedItems.forEach((item, index) => (
      expect(itemCards.children[index]).toHaveTextContent(item.descript)
    ));
  });

  it('should update displayRangeText after changing pages', () => {
    const { queryByText, queryByTitle } = render(
      <ShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={667}
      />
    );

    const expectedText = /Items 169-192/;
    const page8Button = queryByTitle('8');

    fireEvent.click(page8Button);

    expect(queryByText(expectedText)).toBeInTheDocument();
  });
});