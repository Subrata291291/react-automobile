import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CareerForm = ({ serviceName }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: ""
  });

  const [loading, setLoading] = useState(false);
  

  // Set service silently (not shown in UI)
  useEffect(() => {
    if (serviceName) {
      setFormData(prev => ({
        ...prev,
        service: serviceName
      }));
    }
  }, [serviceName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!formData.fullName || !formData.phone || !formData.service) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Optional debug (remove later if needed)
      // console.log("Submitting Career Form:", formData);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzZSsUYmKmNLbIWnvemW7CvelFKtDwiZe3Ok_wuJIbXghXfdX1sdny3fhHU-9DPpI8n/exec",
        {
          method: "POST",
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Request submitted successfully 📩");

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          service: serviceName || ""
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
            <h4><span></span> We Are Happy To Help You</h4>
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
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
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
                  {loading ? "Submitting..." : "Request a Callback"}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CareerForm;
