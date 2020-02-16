/*
* Expanded Main Menu
*
* The header menu that is rendered when the screen width is above 667 px.
*/

// Node_Modules Imports
import React from 'react';

// Internal Imports
import { DDMenuToggleBtn } from './dd-menu';
import { HeaderMenuLink } from './header';

import CategoryMenu from './category-menu';
import layout from '../../styles/layout.module.css';
import expanded from './expanded.module.css';
export default (props) => {
  const _categoryMenu = <CategoryMenu data={props.allPagesJson} />

  const toggleMenu = props.toggleMenu.bind(null, _categoryMenu);

  return (
    <>
      <DDMenuToggleBtn
        isOpen={props.isOpen}
        value={'Browse'}
        key='browse-by-category'
        toggleMenu={toggleMenu}
      />
      <nav className={`${layout.rowStartCenter} ${expanded.nav}`}>
        <HeaderMenuLink link={'/jewelry/ring'} text={'Rings'} />
        <HeaderMenuLink link={'/firearm/pistol'} text={'Pistols'} />
        <HeaderMenuLink link={'/'} text={'Home'} />
        <HeaderMenuLink link={'/contact'} text={'Contact'} />
        <HeaderMenuLink link={'/about'} text={'About'} />
        <HeaderMenuLink link={'/faq'} text={'FAQ'} />
      </nav>
    </>
  );
}