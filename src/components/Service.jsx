import React, { useEffect, useState } from "react";

const Service = () => {
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://salujaautomobile.com/wp-json/wp/v2/service_directory?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((post) => ({
          type: post.acf?.service_type || "",
          name: post.acf?.name || "",
          designation: post.acf?.designation || "",
          unit: post.acf?.unit || "",
          location: post.acf?.location || "",
          phone: post.acf?.phone_number || "",
        }));

        setAllRows(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Service directory fetch error:", err);
        setLoading(false);
      });
  }, []);

  // 🔹 FILTER PER TAB
  const serviceRows = allRows.filter(
    (row) => row.type === "service_scheduling"
  );

  const partsRows = allRows.filter(
    (row) => row.type === "parts_accessories"
  );

  const insuranceRows = allRows.filter(
    (row) => row.type === "insurance"
  );

  const contactRows = allRows.filter(
    (row) => row.type === "contact"
  );

  // 🔹 REUSABLE TABLE RENDER (NO CLASS CHANGE)
  const renderTable = (rows) => (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>SL NO</th>
            <th>NAME</th>
            <th>DESIGNATION</th>
            <th>UNIT</th>
            <th>LOCATION</th>
            <th>NUMBER</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="6">Loading data...</td>
            </tr>
          )}

          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}

          {!loading &&
            rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.designation}</td>
                <td>{row.unit}</td>
                <td>{row.location}</td>
                <td>{row.phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <section
        className="offer-area p-100"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="title-box">
                <h4>
                  <span></span> What We Offer
                </h4>
                <h3>We Provide The Best Services In The Town</h3>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <button className="common-btn">View All Services</button>
            </div>
          </div>

          <ul className="nav nav-tabs service-tabs" id="serviceTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="tab-1"
                data-bs-toggle="tab"
                data-bs-target="#service-scheduling"
                type="button"
                role="tab"
              >
                Service Scheduling
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="tab-2"
                data-bs-toggle="tab"
                data-bs-target="#parts-accessories"
                type="button"
                role="tab"
              >
                Parts and Accessories
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="tab-3"
                data-bs-toggle="tab"
                data-bs-target="#insurance"
                type="button"
                role="tab"
              >
                Insurance
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="tab-4"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
              >
                Contact
              </button>
            </li>
          </ul>

          <div className="tab-content" id="serviceTabsContent">
            {/* TAB 1 */}
            <div
              className="tab-pane fade show active"
              id="service-scheduling"
              role="tabpanel"
            >
              <h4>Service Scheduling</h4>
              <p>
                Conveniently schedule your next service appointment online.
                Choose a time that works for you, and we’ll take care of the rest.
              </p>
              {renderTable(serviceRows)}
            </div>

            {/* TAB 2 */}
            <div
              className="tab-pane fade"
              id="parts-accessories"
              role="tabpanel"
            >
              <h4>Parts and Accessories</h4>
              <p>
                Genuine Hyundai parts and accessories to ensure performance,
                durability, and safety.
              </p>
              {renderTable(partsRows)}
            </div>

            {/* TAB 3 */}
            <div className="tab-pane fade" id="insurance" role="tabpanel">
              <h4>Insurance Services</h4>
              <p>Hassle-free insurance support and claim assistance.</p>
              {renderTable(insuranceRows)}
            </div>

            {/* TAB 4 */}
            <div className="tab-pane fade" id="contact" role="tabpanel">
              <h4>Contact</h4>
              <p>Reach out to our team for any service-related queries.</p>
              {renderTable(contactRows)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
