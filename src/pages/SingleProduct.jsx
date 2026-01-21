
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(item => item.id === Number(id));

  const convertPriceToNumber = (price) => {
    if (!price) return 0;
    const lower = price.toLowerCase();
    if (lower.includes("lakh")) {
      return Number(price.replace(/[^\d.]/g, "")) * 100000;
    }
    return Number(price.replace(/[^\d]/g, ""));
  };

  const handleBookNow = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numericPrice = convertPriceToNumber(product.price);

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.qty += 1;
      toast.info("Product quantity updated 🧾");
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: numericPrice,
        displayPrice: product.price,
        image: product.images[0],
        qty: 1
      });
      toast.success("Product added to cart 🛒");
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // notify header instantly
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!product) {
    return <h2 className="text-center p-100">Product Not Found</h2>;
  }

  return (
    <>
      <Header />

      <div className="common-banner text-center">
        <h3>Shop</h3>
      </div>

      <section className="single-product-area p-100">
        <div className="container">
          <div className="row align-items-center">
            {/* Images */}
            <div className="col-lg-6">
              <div className="product-details-left">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={25}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  loop
                >
                  {product.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={`${product.name} ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Details */}
            <div className="col-lg-6">
              <div className="product-details-right">
                <h2>{product.name}</h2>
                <h4 className="price">
                  {product.price} <span>{product.note}</span>
                </h4>

                <p className="product-desc">{product.desc}</p>

                {/* Buttons */}
                <button className="common-btn" onClick={handleBookNow}>
                  Book Now
                </button>

                <button
                  className="common-btn ms-3"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>

                {/* Specs */}
                <div className="specification-box">
                  <h4>Key Specifications</h4>

                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li><p><i className="fa-brands fa-searchengin"></i> Engine</p></li>
                        <li><p>{product.specifications.engine}</p></li>
                      </ul>

                      <ul>
                        <li><p><i className="fa-solid fa-bolt"></i> Power</p></li>
                        <li><p>{product.specifications.power}</p></li>
                      </ul>

                      <ul>
                        <li><p><i className="fa-solid fa-gear"></i> Transmission</p></li>
                        <li><p>{product.specifications.transmission}</p></li>
                      </ul>
                    </div>

                    <div className="col-md-6 mt-5 mt-md-0">
                      <ul>
                        <li><p><i className="fa-solid fa-charging-station"></i> Ground Clearance</p></li>
                        <li><p>{product.specifications.groundClearance}</p></li>
                      </ul>

                      <ul>
                        <li><p><i className="fa-solid fa-gears"></i> Torque</p></li>
                        <li><p>{product.specifications.torque}</p></li>
                      </ul>

                      <ul>
                        <li><p><i className="fa-solid fa-satellite-dish"></i> Drive Type</p></li>
                        <li><p>{product.specifications.driveType}</p></li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SingleProduct;
