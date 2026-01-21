import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch single product from WooCommerce (via Netlify Function)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `/.netlify/functions/get-products?id=${id}`
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Add to cart
  const handleBookNow = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const numericPrice = Number(product.price || 0);

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.qty += 1;
      toast.info("Product quantity updated 🧾");
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: numericPrice,
        displayPrice: `₹${numericPrice.toLocaleString("en-IN")}`,
        image: product.images?.[0]?.src,
        qty: 1
      });
      toast.success("Product added to cart 🛒");
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update header cart count instantly
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Loading state
  if (loading) {
    return <h2 className="text-center p-100">Loading product...</h2>;
  }

  // Not found
  if (!product || product.id === undefined) {
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
                  {product.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img.src}
                        alt={`${product.name} ${index + 1}`}
                      />
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
                  ₹{Number(product.price).toLocaleString("en-IN")}
                  <span> onwards</span>
                </h4>

                {/* Woo description */}
                <div
                  className="product-desc"
                  dangerouslySetInnerHTML={{
                    __html: product.description
                  }}
                />

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
