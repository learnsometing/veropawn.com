import React from 'react';
import sizeMe from 'react-sizeme';
import { MdPhone } from 'react-icons/md';
import { FaDirections } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import SEO from '../components/seo';
import { Layout } from '../components/layout/layout';

import layout from '../styles/layout.module.css';
import contact from './contact.module.css';

function ContactHeader() {
  return (
    <header className={`${layout.columnCenterCenter} ${contact.pageHeader}`}>
      <h1>
        Contact
      </h1>
    </header>
  );
}

function SectionHeader({ text }) {
  return (
    <h2 className={contact.secondaryHeading}>
      {text}
    </h2>
  );
}

function Directions() {
  return (
    <div className={`${layout.columnStartStart} ${contact.info}`}>
      <div>
        <div className={contact.store}>
          Cash Pawn & Jewelry
        </div>
        <address className={`${layout.rowStartCenter} ${contact.address}`}>
          854 21st St <br></br>
          Vero Beach, FL 32960
        </address>
        <button
          className={`${layout.rowStartCenter} ${contact.btn}`}
          onClick={selectMapsApp}
        >
          <IconContext.Provider value={{
            size: '1em',
            style: {
              marginRight: '0.5rem',
            },
            className: contact.icon
          }}>
            <FaDirections />
          </IconContext.Provider>
          Directions
        </button>
      </div >
    </div>
  );

  function selectMapsApp() {
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.platform.indexOf("iPhone") !== -1) ||
      (navigator.platform.indexOf("iPad") !== -1) ||
      (navigator.platform.indexOf("iPod") !== -1)) {
      window.open("maps://maps.google.com/maps?daddr=27.639995,-80.3904946&amp;ll=");
    } else /* else use Google */ {
      window.open("https://maps.google.com/maps?daddr=27.639995,-80.3904946&amp;ll=");
    }
  }
}

function Call() {
  return (
    <a href="tel:7722995626" className={`${layout.rowStartCenter} ${contact.btn}`}>
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
    <Layout title={'Contact'} width={width}>
      <SEO title='Contact' />
      <main className={contact.wrapper}>
        <ContactHeader />
        <main className={contact.layout}>
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
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7069.0002050645035!2d-80.390495!3d27.639995!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21e3c9b24b5b4085!2sCash%20Pawn%20%26%20Jewelry!5e0!3m2!1sen!2sus!4v1580428945177!5m2!1sen!2sus" width="1024" height="300" frameborder="0" style="border:0;" allowfullscreen=""></iframe> */}
      </main>
    </Layout >
  );
}

export default sizeMe()(Contact);