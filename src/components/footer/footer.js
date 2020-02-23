import React from "react";
import { FaEbay, FaFacebookSquare } from "react-icons/fa";
import { IconContext } from "react-icons";

import footer from "./footer.module.css";
import layout from "../../styles/layout.module.css";

export default () => (
  <footer className={`${layout.columnCenterCenter} ${footer.footer}`}>
    <div className={footer.wrapper}>
      <div className={`${layout.rowCenterCenter} ${footer.socialIcons}`}>
        <IconContext.Provider value={{ color: 'rgba(54, 115, 63, 1)', size: '48px' }}>
          <a
            className={`${layout.rowCenterCenter} ${footer.socialIcon}`}
            href="https://www.ebay.com/usr/cashpawn">
            <FaEbay />
          </a>
          <a
            className={`${layout.rowCenterCenter} ${footer.socialIcon}`}
            href="https://www.facebook.com/VBPawn">
            <FaFacebookSquare />
          </a>
        </IconContext.Provider>
      </div>
      <div className={`${layout.rowCenterCenter} ${footer.copyrightContainer}`}>
        <span >
          &#169;{new Date().getFullYear()} Cash Pawn and Jewelry, Vero Beach, FL
        </span>
      </div>
    </div>
  </footer>
);