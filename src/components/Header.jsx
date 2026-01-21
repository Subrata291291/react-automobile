import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import QuoteModal from "../components/QuoteModal";

const Header = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((total, item) => total + item.qty, 0);
      setCartCount(count);
    };

    // Initial load
    updateCartCount();

    // Listen to cart changes (same tab)
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <>
      <header>
        {/* TOP BAR */}
        <section className="topbar-area">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-10 col-xl-10 col-xxl-8">
                <div className="topbar-left">
                  <ul className="d-flex align-items-center">
                    <li>
                      <a href="#">
                        <span><i className="fa-solid fa-phone-volume me-2"></i></span>
                        +91-7001906952
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span><i className="fa-regular fa-envelope me-2"></i></span>
                        subrata@gmail.com
                      </a>
                    </li>
                    <li className="d-none d-md-block">
                      <a href="#">
                        <span><i className="fa-solid fa-location-dot me-2"></i></span>
                        Salt lake, Sector V, Kolkata, WB - 700159
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>  
          </div>
        </section>

        {/* HEADER */}
        <section className="header-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-3 col-md-2">
                <div className="header-left">
                  <img src={logo} alt="logo" />
                </div>
              </div>
              <div className="col-9 col-md-10">
                <div className="header-right align-items-center">
                  <ul className="d-none d-lg-flex align-items-center me-4">
                      <li><Link to="/">Home</Link></li>
                      <li><Link to="/about">About</Link></li>
                      <li><Link to="/services">Services</Link></li>
                      <li><Link to="/career">Career</Link></li>
                      <li><Link to="/csr">CSR</Link></li>
                      <li><Link to="/contact">Contact</Link></li>

                      {/* CART */}
                      <li className="position-relative cart-area">
                        <Link to="/cart">
                          <i className="fa-solid fa-bag-shopping"></i>
                          {cartCount > 0 && (
                            <span className="cart-count">{cartCount}</span>
                          )}
                        </Link>
                      </li>
                    </ul>

                    <button className="common-btn" onClick={() => setShowQuoteModal(true)}>
                      Get Free Quote
                    </button>
                    <button className="menu-icon d-lg-none"> <i className="fa-solid fa-bars"></i> </button>
                </div>
              </div>
            </div>
          </div>

          <QuoteModal
            show={showQuoteModal}
            handleClose={() => setShowQuoteModal(false)}
          />
        </section>
      </header>
    </>
  );
};

export default Header;
