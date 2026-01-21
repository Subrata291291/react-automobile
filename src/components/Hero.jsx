import React from 'react'
import videoBg from "../assets/videos/video-bg.mp4";
import { useState } from "react";
import QuoteModal from "../components/QuoteModal";

const Hero = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  return (
    <>
      <section className="banner-area">
        {/* <video autoPlay muted loop playsInline className="bg-video">
          <source
            src="http://mydem027.unaux.com/wp-content/uploads/2026/01/video-bg.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video> */}
         <video autoPlay muted loop playsInline className="bg-video">
          <source src={videoBg} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        <div className="video-overlay"></div>

        <div className="banner-content container">
          <h3><span></span> Professional Auto Car Servicing</h3>
          <h1>Bajaj Auto Mobiles In Kolkata</h1>
          <p>
            We provide professional car servicing with expert mechanics and modern equipment, offering transparent service, genuine parts, and complete peace of mind for every customer.
          </p>
          <button className="common-btn" type="button" onClick={() => setShowQuoteModal(true)}>get free quote</button>
        </div>
        <QuoteModal
        show={showQuoteModal}
        handleClose={() => setShowQuoteModal(false)}
      />
      </section>
    </>
  )
}

export default Hero
