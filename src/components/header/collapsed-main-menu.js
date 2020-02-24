import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import { DDMenuHeader, DDMenuBtn, DDMenuLink, DDMenuToggleBtn } from './dd-menu';
import CategoryMenu from './category-menu';

export const MainMenu = (props) => {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const openCategoryMenu = () => {
    setCategoryMenuOpen(true);
  }

  const backToMainMenu = () => {
    setCategoryMenuOpen(false);
  }

  return (
    categoryMenuOpen
      ? <>
        <DDMenuBtn
          key='back-to-main-menu'
          onClick={backToMainMenu}
          text={'Main Menu'}
          isNavButton={true}
        >
          <FaAngleLeft data-testid='fa-angle-left-icon' />
        </DDMenuBtn>
        <CategoryMenu data={props.allPagesJson} />
      </>
      : <>
        <DDMenuHeader key='main-menu'>
          Main Menu
        </DDMenuHeader>
        <DDMenuBtn
          key='browse-by-category'
          onClick={openCategoryMenu}
          text={'Browse'}
          isNavButton={true}
          isIconAfterText={true}
        >
          <FaAngleRight data-testid='fa-angle-right-icon' />
        </DDMenuBtn>
        <DDMenuLink link={'/jewelry/ring'} text={'Rings'} />
        <DDMenuLink link={'/firearm/pistol'} text={'Pistols'} />
        <DDMenuLink link={'/'} text={'Home'} />
        <DDMenuLink link={'/contact'} text={'Contact'} />
        <DDMenuLink link={'/about'} text={'About'} />
        <DDMenuLink link={'/faq'} text={'FAQ'} />
      </>
  );
};

export default (props) => {
  /*
  * Collapsed Main Menu
  *
  * The main menu that is rendered when the screen width is below 668 px.
  */

  // hard bind the correct menu parameter to props.toggleMenu
  const toggleMenu = props.toggleMenu.bind(
    null,
    <MainMenu
      allPagesJson={props.allPagesJson}
    />
  );

  return (
    <DDMenuToggleBtn
      isOpen={props.isOpen}
      value={'Menu'}
      toggleMenu={toggleMenu}
    />
  );
};