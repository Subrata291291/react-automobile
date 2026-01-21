import React, { useState } from 'react';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    service: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send this data to API / Google Sheet later
    console.log('Form Data:', formData);

    // optional reset
    setFormData({
      fullName: '',
      service: '',
      phone: '',
      email: '',
    });
  };

  return (
    <section className="form-area">
      <div className="container">
        <div className="form-box">
          <div className="title-box">
            <h4>
              <span></span> We Are Happy To Help You
            </h4>
            <h3>Request A Call Back</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-6">
                <select
                  className="custom-select"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Product</option>
                  <option value="Bajaj Chetak Electric">Bajaj Chetak Electric</option>
                  <option value="Bajaj Pulsar 125">Bajaj Pulsar 125</option>
                  <option value="Bajaj Pulsar 150">Bajaj Pulsar 150</option>
                </select>
              </div>

              <div className="col-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <button type="submit" className="common-btn">
                  GET FREE QUOTE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Form;
