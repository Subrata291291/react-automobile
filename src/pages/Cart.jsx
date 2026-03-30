import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Sync cart state + localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updatedCart);
    toast.info("Quantity increased ➕");
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    updateCart(updatedCart);
    toast.info("Quantity decreased ➖");
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
    toast.error("Item removed from cart ❌");
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <>
      <Header />

      {/* Banner */}
      <div className="common-banner text-center">
        <div className="container">
          <h3>Your Cart</h3>
        </div>
      </div>

      <section className="cart-area p-100">
        <div className="container">

          {cart.length === 0 ? (
            <h4 className="text-center">Your cart is empty 🛒</h4>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id}>
                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            width="80"
                            className="me-3"
                          />
                          {item.name}
                        </td>

                        {/* Display price */}
                        <td>{item.displayPrice}</td>

                        {/* Quantity */}
                        <td>
                          <button
                            className="btn btn-sm common-btn"
                            onClick={() => decreaseQty(item.id)}
                          >
                            −
                          </button>

                          <span className="mx-3">{item.qty}</span>

                          <button
                            className="btn btn-sm common-btn"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                        </td>

                        {/* Item total */}
                        <td>
                          ₹{(item.price * item.qty).toLocaleString("en-IN")}
                        </td>

                        {/* Remove */}
                        <td>
                          <button
                            className="btn btn-sm btn-danger delete-btn"
                            onClick={() => removeItem(item.id)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cart total */}
              <div className="text-end mt-4 proceed-btn">
                <h4>
                  <strong>Total: ₹{totalPrice.toLocaleString("en-IN")}</strong>
                </h4>
                <button
                className="common-btn mt-5"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
              </div>
            </>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;
