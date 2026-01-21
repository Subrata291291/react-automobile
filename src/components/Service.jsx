import React from 'react';

const Service = () => {
  return (
    <>
      <section className="offer-area p-100">
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
                aria-selected="true"
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
                aria-selected="false"
                tabIndex="-1"
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
                aria-selected="false"
                tabIndex="-1"
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
                aria-selected="false"
                tabIndex="-1"
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
              aria-labelledby="tab-1"
            >
              <h4>Service Scheduling</h4>
              <p>
                Conveniently schedule your next service appointment online.
                Choose a time that works for you, and we’ll take care of the rest.
              </p>

              {/* Table */}
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
                    <tr>
                      <td>1</td>
                      <td>AMIT KUMAR GUHA</td>
                      <td>SERVICE MANAGER</td>
                      <td>RUDRA HYUNDAI</td>
                      <td>ASANSOL</td>
                      <td>8348691808</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>AMIT KUMAR GUHA</td>
                      <td>SERVICE MANAGER</td>
                      <td>RUDRA HYUNDAI</td>
                      <td>ASANSOL</td>
                      <td>8348691808</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>AMIT KUMAR GUHA</td>
                      <td>SERVICE MANAGER</td>
                      <td>RUDRA HYUNDAI</td>
                      <td>ASANSOL</td>
                      <td>8348691808</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>AMIT KUMAR GUHA</td>
                      <td>SERVICE MANAGER</td>
                      <td>RUDRA HYUNDAI</td>
                      <td>ASANSOL</td>
                      <td>8348691808</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>AMIT KUMAR GUHA</td>
                      <td>SERVICE MANAGER</td>
                      <td>RUDRA HYUNDAI</td>
                      <td>ASANSOL</td>
                      <td>8348691808</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TAB 2 */}
            <div
              className="tab-pane fade"
              id="parts-accessories"
              role="tabpanel"
              aria-labelledby="tab-2"
            >
              <h4>Parts and Accessories</h4>
              <p>
                Genuine Hyundai parts and accessories to ensure performance,
                durability, and safety.
              </p>
            </div>

            {/* TAB 3 */}
            <div
              className="tab-pane fade"
              id="insurance"
              role="tabpanel"
              aria-labelledby="tab-3"
            >
              <h4>Insurance Services</h4>
              <p>Hassle-free insurance support and claim assistance.</p>
            </div>

            {/* TAB 4 */}
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="tab-4"
            >
              <h4>Contact</h4>
              <p>Reach out to our team for any service-related queries.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
