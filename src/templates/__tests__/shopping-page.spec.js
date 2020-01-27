import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { CallToAction, DisplayRange, ItemCard, ItemCards, PureShoppingPage, query } from "../shopping-page/shopping-page";
import { defaultPhoto, mainPhotos } from "../__fixtures__/all-photos";
import { allItemsJson, rings } from "../__fixtures__/all-items-json";

Object.defineProperty(window, 'scrollTo', { value: undefined });

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

  it('should only render 24 items per page', () => {
    const { queryAllByRole } = render(
      <PureShoppingPage
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

  it('should set itemsOnPage correctly when the page is changed forward', () => {
    const { queryAllByTestId, queryByTitle } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={667}
      />
    );

    const page2Btn = queryByTitle('2');

    const descripts = allItems.slice(24, 48).map(item => item.descript);

    fireEvent.click(page2Btn);

    let itemCardTexts = queryAllByTestId('item-card-text').map(span => span.textContent);

    itemCardTexts.forEach(text => expect(descripts).toContain(text));
  });

  it('should set itemsOnPage to the correct items when the page is changed backwards', () => {
    const { queryAllByTestId, queryByTitle } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={667}
      />
    );

    const page2Btn = queryByTitle('2');
    const page3Btn = queryByTitle('3');

    fireEvent.click(page3Btn);

    fireEvent.click(page2Btn);

    const descripts = allItems.slice(24, 48).map(item => item.descript);

    let itemCardTexts = queryAllByTestId('item-card-text').map(span => span.textContent);

    itemCardTexts.forEach(text => expect(descripts).toContain(text));
  });

  it('should set itemsOnPage to the correct items when the last page is visited', () => {
    const { queryAllByTestId, queryByTitle } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={667}
      />
    );

    const page8Button = queryByTitle('8');
    // only 186 items
    const descripts = allItems.slice(168, 192).map(item => item.descript);

    fireEvent.click(page8Button);

    let itemCardTexts = queryAllByTestId('item-card-text').map(span => span.textContent);

    itemCardTexts.forEach(text => expect(descripts).toContain(text));
  });

  it('should update upperLimit and lowerLimit after changing pages', () => {
    const { queryByText, queryByTitle } = render(
      <PureShoppingPage
        allItems={allItems}
        allMainPhotos={mainPhotos}
        defaultPhoto={defaultPhoto}
        subcategory={subcategory}
        width={667}
      />
    );

    const expectedText = /Items 169-186/;
    const page8Button = queryByTitle('8');

    fireEvent.click(page8Button);

    expect(queryByText(expectedText)).toBeInTheDocument();
  });
});