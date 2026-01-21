import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate
import products from '../data/products.json';

const Models = () => {
  const navigate = useNavigate(); // <-- Initialize navigate

  return (
    <section className="products-area p-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className="title-box">
              <h4>
                <span></span> Our Products
              </h4>
              <h3>We Serve The Most Makes And Models</h3>
            </div>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <button className="common-btn">Explore More</button>
          </div>
        </div>

        <div className="product-box">
          <ul className="d-flex flex-wrap">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <div className="product-pic">
                  {/* Display first image from images array */}
                  <img src={product.images[0]} alt={product.name} />
                  <button
                    className="common-btn"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Explore More
                  </button>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <h5>{product.price} <span>onwards</span></h5>
                  <p>{product.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Models;
