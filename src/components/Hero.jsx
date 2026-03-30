import React, { useEffect, useState } from "react";
import QuoteModal from "../components/QuoteModal";

const Hero = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetch("https://salujaautomobile.com/wp-json/custom/v1/banner")
      .then((res) => res.json())
      .then((data) => {
        console.log("Banner API:", data); // debug
        setBanner(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Loading state
  if (!banner) {
    return <p style={{ textAlign: "center" }}>Loading banner...</p>;
  }

  return (
    <section className="banner-area">
      
      {/* Background Video */}
      {banner.video && (
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={banner.video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}

      <div className="video-overlay"></div>

      {/* Content */}
      <div
        className="banner-content container"
        data-aos="fade-right"
        data-aos-delay="200"
      >
        {banner.subtitle && (
          <h3>
            <span></span> {banner.subtitle}
          </h3>
        )}

        {banner.title && <h1>{banner.title}</h1>}

        {banner.desc && <p>{banner.desc}</p>}

        <button
          className="common-btn"
          type="button"
          onClick={() => setShowQuoteModal(true)}
        >
          Request a Callback
        </button>
      </div>

      {/* Modal */}
      <QuoteModal
        show={showQuoteModal}
        handleClose={() => setShowQuoteModal(false)}
      />
    </section>
  );
};

export default Hero;