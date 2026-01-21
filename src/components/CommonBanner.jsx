import { useLocation } from "react-router-dom";

const CommonBanner = () => {
  const location = useLocation();

  // Map routes to page titles
  const pageTitles = {
    "/": "Home",
    "/about": "About Us",
    "/services": "Services",
    "/career": "Career",
    "/csr": "CSR",
    "/contact": "Contact"
  };

  const currentTitle = pageTitles[location.pathname] || "";

  return (
    <div className="common-banner text-center">
      <div className="container">
        <h3>{currentTitle}</h3>
      </div>
    </div>
  );
};

export default CommonBanner;
