import React from 'react';
import aboutPic from '../images/about.png'
import { useState } from "react";
import QuoteModal from "../components/QuoteModal";

const Process = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  return (
    <section className="process-area p-100">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 col-xl-7 col-xxl-7 d-none d-xl-block" data-aos="fade-right" data-aos-delay="200">
            <div className="process-left">
              <img src="https://salujaautomobile.com/wp-content/themes/saluja/images/about-1.jpeg" alt="" />
            </div>
          </div>

          <div className="col-md-12 col-lg-12 col-xl-5 col-xxl-5 position-relative"  data-aos="fade-left" data-aos-delay="200">
            <div className="process-right">
              <div className="title-box">
                <h4>
                  <span></span> How We Process
                </h4>
                <h3>Three Simple Easy Steps To Get Your Bike Booked</h3>
              </div>

              <ul className="d-flex justify-content-between text-center">
                <li>
                  <h3>1</h3>
                  <h5>Book Appointment</h5>
                </li>
                <li>
                  <h3>2</h3>
                  <h5>Get A Callback</h5>
                </li>
                <li>
                  <h3>3</h3>
                  <h5>Get Bike Booked</h5>
                </li>
              </ul>

              <button
                className="common-btn" onClick={() => setShowQuoteModal(true)}>
                Request a Callback
              </button>
            </div>
          </div>
        </div>
      </div>
      <QuoteModal
        show={showQuoteModal}
        handleClose={() => setShowQuoteModal(false)}
      />
    </section>
  );
};

export default Process;
