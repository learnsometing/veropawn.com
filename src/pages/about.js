import React from 'react';

import SizedLayout from '../components/layout/layout';
import ExpandableSection from '../components/expandable-section/expandable-section';

import about from './about.module.css';
export default function About() {
  return (
    <SizedLayout
      description={'Information about Cash Pawn & Jewelry'}
      hasPageHeader={true}
      title={'About Us'}>
      <p className={about.intro}>
        Cash Pawn & Jewelry was established in 1995 and has provided the highest quality pawn services in Vero Beach and the surrounding areas ever since.
        We specialize in short-term loans from $5 to $50,000. We also buy items valued up to $25,000.
      </p>
      <ExpandableSection heading={'Pawn Loans'}>
        <p>
          We provide fast loans with low interest rates using your pawned items as collateral.
          We don’t ask for your banking information or report you to any credit bureaus.
          All you need is a state-issued ID, driver’s license, or passport.
          Our loan forms are simple and let you leave with your money in minutes.
        </p>
        <p>
          Pawn loans offer the flexibility you need without the stress. If you’re struggling to repay your loan, your pawned item may be used to repay your debt in full. Don’t get trapped in a never-ending, risky payday loan with a ridiculous interest rate. Get the money you need immediately with a no-risk cash loan from us.
        </p>
      </ExpandableSection>
      <ExpandableSection heading={'Commonly Pawned'}>
        <p>
          Though we specialize in jewelry and firearms, we buy, sell, and pawn a variety of items:
        </p>
        <ul>
          <li>
            <span>
              Gold coins, silver coins, and scrap
            </span>
          </li>
          <li>
            <span>
              Firearms (unloaded, please)
            </span>
          </li>
          <li>
            <span>
              Electronics, such as laptops, cellphones, and gaming consoles
            </span>
          </li>
          <li>
            <span>
              Power tools (all major name brands)
            </span>
          </li>
          <li>
            <span>
              Hand tools (Snap-On, Blue-Point, or Matco)
            </span>
          </li>
          <li>
            <span>
              Knives (American or German steel)
            </span>
          </li>
          <li>
            <span>
              Musical instruments
            </span>
          </li>
          <li>
            <span>
              One of a kind items
            </span>
          </li>
          <li>
            <span>
              Antiques
            </span>
          </li>
          <li>
            <span>
              Automobiles
            </span>
          </li>
        </ul>
        <p>
          The experienced owner is ready to evaluate your valuables and provide you with the best prices. Our transactions are convenient, confidential and always hassle-free. Your satisfaction is our main concern.
        </p>
      </ExpandableSection>
    </SizedLayout >
  );
}
