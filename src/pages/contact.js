import React from 'react';
import sizeMe from 'react-sizeme';
import { MdPhone } from 'react-icons/md';
import { IconContext } from 'react-icons';
import SEO from '../components/seo';
import { Layout } from '../components/layout/layout';

import layout from '../styles/layout.module.css';
import contact from './contact.module.css';

function SectionHeader({ text }) {
  return (
    <h2 className={contact.secondaryHeading}>
      {text}
    </h2>
  );
}

function Directions() {
  return (
    <div className={layout.columnStartStart}>
      <div className={contact.store}>
        Cash Pawn & Jewelry
      </div>
      <address className={contact.address}>
        854 21st St Vero Beach,<br></br> FL 32960
      </address>
    </div>
  );
}

function Call() {
  return (
    <a href="tel:7722995626" className={`${layout.rowStartCenter}`}>
      <IconContext.Provider value={{ className: contact.icon }}>
        <MdPhone />
      </IconContext.Provider>
      <span className={contact.tel}>(772) 299-5626</span>
    </a>
  );
}

function Hours() {
  return (
    <div className={layout.columnStartStart}>
      <div className={contact.days}>
        Monday - Friday
        </div>
      <div>
        8:30 AM - 5:30 PM
      </div>
      <div className={contact.days}>
        Saturday - Sunday
      </div>
      <div>
        Closed
      </div>
    </div>
  );
}

function Map() {
  return (
    <div className={contact.mapWrapper}>
      <iframe
        src={"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.5001030872522!2d-80.39268328466181!3d27.63999498281992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88de5ee0519c8445%3A0x21e3c9b24b5b4085!2sCash%20Pawn%20%26%20Jewelry!5e0!3m2!1sen!2sus!4v1580426274652!5m2!1sen!2sus"}
        name="Cash Pawn Address"
        title={"Cash Pawn and Jewelry, Vero Beach FL"}
        width={600}
        height={600}
        className={contact.map}
        allowfullscreen=""
        loading={"eager"}
      >
      </iframe>
    </div>
  );
}

function Contact({ size }) {
  var width = size.width;

  return (
    <Layout
      hasPageHeader={true}
      pageHeaderClass={`${layout.columnCenterCenter} ${contact.pageHeader}`}
      title={'Contact'}
      width={width}
    >
      <SEO title='Contact' />
      <main id='content' className={`${contact.layout} ${layout.columnStartCenter}`}>
        <div className={`${layout.columnStartStart} ${contact.infoWrapper}`}>
          {/* Directions */}
          <section className={contact.section}>
            <SectionHeader text={'Get Directions'} />
            <Directions />
          </section>
          {/* Call */}
          <section className={contact.section}>
            <SectionHeader text={'Call Us'} />
            <Call />
          </section>
          {/* Hours */}
          <section className={contact.section}>
            <SectionHeader text={'Hours'} />
            <Hours />
          </section>
        </div>
        {/* Google Maps */}
        <Map />
      </main>
    </Layout >
  );
}

export default sizeMe()(Contact);