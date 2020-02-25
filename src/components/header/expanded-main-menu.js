import React from 'react';

import { DDMenuToggleBtn } from './dd-menu';
import { HeaderMenuLink } from './header';
import CategoryMenu from './category-menu';

import layout from '../../styles/layout.module.css';
import expanded from './expanded-main-menu.module.css';

export default (props) => {
  var categoryMenu = <CategoryMenu data={props.allPagesJson} />;
  var toggleMenu = props.toggleMenu.bind(null, categoryMenu);

  // The header menu that is rendered when the screen width is above 667 px.
  return (
    <>
      <DDMenuToggleBtn
        isOpen={props.isOpen}
        value={'All Items'}
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
};