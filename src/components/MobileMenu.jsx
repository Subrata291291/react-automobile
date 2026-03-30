import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Offcanvas } from "bootstrap";
import SiteLogo from "../components/SiteLogo";

const MobileMenu = ({ onQuoteClick }) => {
  const location = useLocation();

  // CLOSE & CLEAN OFFCANVAS ON ROUTE CHANGE
  useEffect(() => {
    const el = document.getElementById("mobileMenu");
    if (!el) return;

    const instance = Offcanvas.getInstance(el);
    if (instance) {
      instance.hide();
      instance.dispose(); // THIS FIXES BACKDROP
    }

    // Extra safety
    document.body.classList.remove("modal-open");
    document
      .querySelectorAll(".offcanvas-backdrop")
      .forEach(el => el.remove());

  }, [location.pathname]);

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="mobileMenu"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">
           <SiteLogo className="site-logo" />
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      <div className="offcanvas-body">
        <ul className="list-unstyled">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/showroom">Showroom</Link></li>
          <li><Link to="/career">Career</Link></li>
          <li><Link to="/csr">CSR</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
