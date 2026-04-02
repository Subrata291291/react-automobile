import React, { useState, useEffect } from "react";
import CareerModal from "../components/CareerModal";

const CareerOptions = () => {
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    fetch("https://salujaautomobile.com/wp-json/wp/v2/career_content")
      .then((res) => res.json())
      .then((data) => {
        setCareers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Career fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="career-area p-100">
        <div className="container">
          <div className="row">

            <div className="col-12">
              <div className="title-box text-center">
                <h1>Explore Opportunities</h1>
              </div>
            </div>

            {loading && <p>Loading Career Portals......</p>}

            {!loading &&
              careers.map((item) => {
                const acf = item.acf;

                return (
                  <div className="col-xxl-6" key={item.id}>
                    <div className="vacancy-box mt-4">
                    <div className="row align-items-center">
                      <div className="col-lg-8">
                        <div className="vacancy-content">
                          <ul className="d-flex align-items-center">
                            <li>
                              <h3>{acf.vacancy_name}</h3>
                            </li>
                            <li>
                              <h4
                                className={
                                  acf.urgency_level === "Urgent Hiring"
                                    ? "blink-txt"
                                    : ""
                                }
                              >
                                {acf.urgency_level}
                              </h4>
                            </li>
                          </ul>
                          <p>{acf.vacancy_details}</p>
                          {/* Mobile view */}
                          <div className="vacancy-area d-md-none">
                            <p>
                              <span>
                                <i className="fa-solid fa-location-dot"></i>
                              </span>{" "}
                              {acf.vacancy_location}
                            </p>
                            <p>
                              <span>
                                <i className="fa-solid fa-briefcase"></i>
                              </span>{" "}
                              {acf.vacancy_period}
                            </p>
                            <p>
                              <span>
                                <i className="fa-solid fa-person-walking-luggage"></i>
                              </span>{" "}
                              {acf["vacancy-position"]}
                            </p>
                          </div>
                          <button
                            className="common_btn career_btn"
                            onClick={() => {
                              setSelectedService(acf.vacancy_name); 
                              setShowCareerModal(true);
                            }}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>

                      {/* Desktop view */}
                      <div className="col-lg-4 d-none d-md-block">
                        <div className="vacancy-area">
                          <p>
                            <span>
                              <i className="fa-solid fa-location-dot"></i>
                            </span>{" "}
                            {acf.vacancy_location}
                          </p>
                          <p>
                            <span>
                              <i className="fa-solid fa-briefcase"></i>
                            </span>{" "}
                            {acf.vacancy_period}
                          </p>
                          <p>
                            <span>
                              <i className="fa-solid fa-person-walking-luggage"></i>
                            </span>{" "}
                            {acf["vacancy-position"]}
                          </p>
                        </div>
                      </div>

                    </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/*serviceName */}
      <CareerModal
        show={showCareerModal}
        serviceName={selectedService}
        handleClose={() => setShowCareerModal(false)}
      />
    </div>
  );
};

export default CareerOptions;
