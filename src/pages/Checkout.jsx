import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Calculate total
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Handle form change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true); // 🔥 START submitting

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      products: cart
        .map(item => `${item.name} (Qty: ${item.qty})`)
        .join(", "),
      totalAmount
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzV5jdmYaCumiFk6sfURDTF_CGI53oPYiEpJ9YxTPubAQvGLpE_Ec4bpE2zHncRnsLy/exec",
        {
          method: "POST",
          body: JSON.stringify(orderData)
        }
      );

      const text = await response.text();
      const result = JSON.parse(text);

      if (result.success) {
        toast.success("Order placed successfully 🎉");

        localStorage.removeItem("cart");
        setCart([]);
        window.dispatchEvent(new Event("cartUpdated"));

        setFormData({
          name: "",
          phone: "",
          email: "",
          address: ""
        });

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        toast.error("Google Sheet error ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmitting(false); // 🔥 END submitting
    }
  };

  return (
    <>
      <Header />

      {/* Banner */}
      <div className="common-banner text-center">
        <div className="container">
          <h3>Checkout</h3>
        </div>
      </div>

      <section className="checkout-area p-100">
        <div className="container">
          <div className="row">

            {/* Billing Details */}
            <div className="col-lg-7 order-md-2 order-lg-1">
              <div className="checkout-box">
                <h4>Billing Details</h4>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label>Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-5">
                    <label>Address *</label>
                    <textarea
                      className="form-control"
                      name="address"
                      rows="4"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="common-btn d-flex align-items-center justify-content-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Submitting...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-5 order-md-1 order-lg-2">
              <div className="checkout-box position-sticky top-0 checkout-right">
                <h4>Your Order</h4>

                {cart.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  <>
                    <ul className="list-group mb-5">
                      {cart.map((item, index) => (
                        <li
                          key={`${item.id}-${index}`}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <p>{item.name}</p>
                            <p className="mt-2">
                              <strong>Qty :</strong> {item.qty}
                            </p>
                          </div>
                          <span>
                            <strong>
                              ₹{(item.price * item.qty).toLocaleString("en-IN")}
                            </strong>
                          </span>
                        </li>
                      ))}
                    </ul>

                    <h5 className="text-end">
                      <strong>
                        Total: ₹{totalAmount.toLocaleString("en-IN")}
                      </strong>
                    </h5>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
