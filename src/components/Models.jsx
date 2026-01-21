import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Models = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_WC_URL}/wp-json/wc/v3/products?per_page=20&consumer_key=${import.meta.env.VITE_WC_KEY}&consumer_secret=${import.meta.env.VITE_WC_SECRET}`
        );

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("WooCommerce API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="products-area p-100">
      <div className="container">

        {/* Section Heading */}
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="title-box">
              <h4>
                <span></span> Our Products
              </h4>
              <h3>We Serve The Most Makes And Models</h3>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block text-end">
            <button className="common-btn">Explore More</button>
          </div>
        </div>

        {/* Products */}
        <div className="product-box">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <ul className="d-flex flex-wrap">
              {products.map((product) => (
                <li key={product.id} className="product-item">
                  <div className="product-pic">
                    <img
                      src={product.images?.[0]?.src}
                      alt={product.name}
                    />
                    <button
                      className="common-btn"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Explore More
                    </button>
                  </div>

                  <div className="product-content">
                    <h3>{product.name}</h3>
                    <h5>
                      ₹{Number(product.price).toLocaleString("en-IN")}{" "}
                      <span>onwards</span>
                    </h5>
                    <p>*(Ex-showroom price)</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </section>
  );
};

export default Models;
