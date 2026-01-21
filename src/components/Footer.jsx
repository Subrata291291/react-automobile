import { footerData } from "../data/footerdata.js";

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row">
          {/* LEFT */}
          <div className="col-12 col-md-12 col-lg-4 col-xl-4">
            <div className="footer-left">
              <img src={footerData.logo} alt="Logo" />
              <p>{footerData.description}</p>

              <ul className="d-flex">
                {footerData.socialLinks.map((item, index) => (
                  <li key={index}>
                    <a href={item.url}>
                      <i className={`fa-brands ${item.icon}`}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-6 col-md-3 col-lg-2 col-xl-2">
            <div className="footer-menu">
              <h3>Quick Links</h3>
              <ul>
                {footerData.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DISCOVER MORE */}
          <div className="col-6 col-md-3 col-lg-2 col-xl-3">
            <div className="footer-menu">
              <h3>Discover More</h3>
              <ul>
                {footerData.discoverLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT */}
          <div className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="footer-menu">
              <h3>Contact Information</h3>
              <ul>
                <li>
                  <a href={`tel:${footerData.contact.phone}`}>
                    <span>
                      <i className="fa-solid fa-phone-volume"></i>
                    </span>
                    {footerData.contact.phone}
                  </a>
                </li>

                <li>
                  <a href={`mailto:${footerData.contact.email}`}>
                    <span>
                      <i className="fa-regular fa-envelope"></i>
                    </span>
                    {footerData.contact.email}
                  </a>
                </li>

                <li>
                  <iframe
                    src={footerData.contact.mapEmbed}
                    width="100%"
                    height="80"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="row copyright-area">
          <div className="col-lg-6">
            <p>
              © {footerData.copyright.year}{" "}
              <span>{footerData.copyright.brand}</span>. All Rights Reserved.
            </p>
          </div>

          <div className="col-6">
            <ul className="d-none d-lg-flex">
              {footerData.copyrightLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.url}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
