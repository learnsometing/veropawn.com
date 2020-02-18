import React from 'react';
import { graphql } from 'gatsby'
import SizedLayout from '../components/layout/layout';
import SEO from '../components/seo';
import ExpandableSection from '../components/expandable-section/expandable-section'
import faq from './faq.module.css';

export default function FAQ({ data }) {
  return (
    <SizedLayout title={'About Us'}>
      <SEO title='About Us' />
      <main id='content' style={{ padding: '1rem' }}>
        <h1 style={{ textAlign: 'center' }}>FAQ</h1>
        <ExpandableSection heading={'How does a pawn loan work?'}>
          <p>
            Pawn loans are a quick and easy way to borrow money.
            The loan amount is based on the value of your collateral instead of your credit score.
            We don’t check your credit during the loan process. A pawn loan has a term length of 60 days.
            We also offer extensions and renewals on your loan term to give you more time to pay it off.
            If you’re still struggling to pay off your loan after its term, you may choose to surrender your collateral as payment in full.
          </p>
          <p>
            We provide pawn loans on a variety of items, including gold jewelry and coins, electronics, musical instruments, tools, guns, and more.
            Simply bring us an item of value along with a valid government photo ID and we’ll get you money in minutes.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={"What's an extension?"}>
          <p>
            If you’re unable to pay back your pawn loan in full on its default date, you will be eligible for an extension on your pawn loan.
            You’ll be required to pay a single interest payment to extend your loan term by another 30 days and may do so as many times as needed.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'Is my collateral safe while in pawn?'}>
          <p>
            While your item is in pawn, you still own it.
            It’s our responsibility to keep it safe and in good condition while it’s in our care.
            We keep all accessories (remote controls, cables, etc.) with your item and place it in a secure area until you return to pay your pawn loan in full.
            We are the only pawn shop in the area backed by the world-renowned Lloyds of London, which guarantees your item is insured for its total loan value.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'Can I pawn a gun?'}>
          <p>
            We accept firearms as collateral for pawn loans.
            We’re a registered firearms dealer, so we must comply with all federal and state regulations when pawning, redeeming, or purchasing firearms.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'How do I choose which gun to buy?'}>
          <p>
            If you're not sure which gun is right for you, you're not alone.
            We've included a guide that we hope will help guide your decision.
          </p>
          <a
            alt="Click to download our first-time gun buyer's guide pdf"
            className={faq.gunGuideLink}
            href={data.file.publicURL}
            download='what-gun-should-I-buy.pdf'
          >
            Download a copy of our first-time gun buyer's guide
          </a>
        </ExpandableSection>
        <ExpandableSection heading={'Will I lose my merchandise?'}>
          <p>
            Only if you choose not to repay your pawn loan.
            You may also choose to forfeit your collateral as payment for the loan if you’re unable to pay it back in full.
            Many of our customers repay their pawn loans and pick up their merchandise.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'How do you determine an item’s value?'}>
          <p>
            An item’s value is based on its appraised value, condition, and our ability to sell the item.
            The appraisal process varies depending on the type of item.
            For example, jewelry is evaluated differently than a DVD player.
            We research and review items using all of the research tools we have at our disposal to ensure that our pawn loans and purchase prices align with market values for pre-owned merchandise.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'How do you determine the value of jewelry?'}>
          <p>
            When jewelry is being purchased or put up as collateral for a pawn loan, we test the metals and stones to determine their worth.
            Testing includes a visual inspection using a jeweler’s loupe, weighing the item and determining the properties of metals or stones in the item.
          </p>
          <p>
            Stones are appraised by sizing (determining carat weight) and noting the cut/color/clarity of each.
            You may know this as the 4 Cs.
          </p>
          <p>
            To appraise gold, we must determine its composition (karat) by using an acid test.
            The acid test results are highly accurate and tell us the karat of your gold.
          </p>
          <p>
            Once we’ve determined the properties of your jewelry, we’ll offer you a price based on the market values of any metal and stones and our ability to resell it.
            We routinely review and update our market values to get you the most accurate prices possible.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'How do you determine the condition of an item?'}>
          <p>
            To determine an item’s condition, we visually inspect the item for wear and tear, damage, or defects.
            Then, we check to see if the item still works.
            For example, we’ll plug in and turn on any electronic items.
            Finally, we’ll note if any accessories (remote controls, manuals, etc.) are included.
          </p>
          <p>
            If one 32-inch television comes in that’s in perfect condition and one 32-inch television comes in with a crack in the case, we’ll offer more on the TV that’s in better condition.
            The better the condition of your item, the more money we can offer/loan you.
            This is true for any item.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'Can you give a quote on an item over the phone?'}>
          <p>
            Unfortunately, we can’t give quotes over the phone.
            We must appraise the item in person in order to give you an accurate quote.
          </p>
        </ExpandableSection>
        <ExpandableSection heading={'Are pawnshops stocked with stolen merchandise?'}>
          <p>
            Pawnshops are highly regulated.
            We work closely with local and federal law enforcement, and train our staff to identify stolen property.
            As a result, less than one percent of pawned items are identified as stolen goods.
            In addition, Cash Pawn & Jewelry utilizes an internet-based crime-fighting tool in which every pawn transaction is shared with police departments nationwide every day.
          </p>
        </ExpandableSection>
      </main>
    </SizedLayout >
  );
}

export const pdfQuery = graphql`
  query {
    file(relativePath: {regex: "/pdf/i"}) {
      publicURL
    }
  }
`