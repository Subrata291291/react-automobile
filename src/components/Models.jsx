import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Models = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Custom WordPress REST API endpoint
  const API_URL = "https://store.januskitchen.nl/wp-json/custom/v1/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Products fetch error:", err);
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section
      className="products-area p-100"
      data-aos="fade-up"
      data-aos-delay="200"
    >
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
          {loading && <p>Loading products...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <ul className="d-flex flex-wrap">
              {products.map((product) => (
                <li key={product.id} className="product-item">
                  <div className="product-pic">
                    <img
                      src={product.images?.[0]?.src}
                      alt={product.name}
                      loading="lazy"
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

                    {product.price && (
                      <h5>
                        ₹{Number(product.price).toLocaleString("en-IN")}{" "}
                        <span>onwards</span>
                      </h5>
                    )}

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
