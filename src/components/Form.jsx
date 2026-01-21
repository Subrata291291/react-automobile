import React, { useState } from "react";
import { toast } from "react-toastify";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    service: "",
    phone: "",
    email: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.service || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby-lU2iK6c8AHDd4YuJmAzNGuM9Uy3Y7tDOTDbzomgVjYKytecHJCdwGAT3zu4uNtz6/exec", // 🔴 paste Apps Script URL here
        {
          method: "POST",
          body: JSON.stringify(formData)
        }
      );

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        toast.success("Request submitted successfully 📩");

        setFormData({
          fullName: "",
          service: "",
          phone: "",
          email: ""
        });
      } else {
        toast.error("Submission failed ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
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
                />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="common-btn"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "GET FREE QUOTE"}
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
