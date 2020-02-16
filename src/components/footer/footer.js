import React from "react";
import { FaEbay, FaFacebookSquare } from "react-icons/fa";
import { IconContext } from "react-icons";

import footer from "./footer.module.css";
import layout from "../../styles/layout.module.css";

export default () => {
  const socialIconsClass = `${layout.rowCenterCenter} ${footer.socialIcons}`;
  const socialIconClass = `${layout.rowCenterCenter} ${footer.socialIcon}`;
  const copyrightContainerClass = `${layout.rowCenterCenter} ${footer.copyrightContainer}`;

  return (
    <footer className={`${layout.columnCenterCenter} ${footer.footer}`}>
      <div className={socialIconsClass}>
        <IconContext.Provider value={{ color: '#fff', size: '48px' }}>
          <a className={socialIconClass} href="https://www.ebay.com/usr/cashpawn"><FaEbay /></a>
          <a className={socialIconClass} href="https://www.facebook.com/VBPawn"><FaFacebookSquare /></a>
        </IconContext.Provider>
      </div>
      <div className={copyrightContainerClass}>
        <span className={footer.copyright}>&#169;{new Date().getFullYear()}</span>
        <span>Cash Pawn and Jewelry, Vero Beach, FL</span>
      </div>
    </footer>
  );
};