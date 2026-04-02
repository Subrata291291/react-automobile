import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import CommonBanner from "../components/CommonBanner";
import Footer from "../components/Footer";

const Showroom = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from WordPress (NO layout change)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://salujaautomobile.com/wp-json/custom/v1/products"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // 🛡️ Normalize data (design-safe)
        setProducts(
          Array.isArray(data)
            ? data.map(item => ({
                ...item,
                images: Array.isArray(item.images) ? item.images : [],
              }))
            : []
        );
      } catch (error) {
        console.error("Products fetch error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <CommonBanner />

      <div className="products-area p-100">
        <div className="product-box">
          {loading ? (
            <p className="text-center">Loading products...</p>
          ) : (
            <div className="container">
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
                        onClick={() => navigate(`/product/${product.slug || product.id}`)}
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
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Showroom;
