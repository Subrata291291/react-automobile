import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";

const SingleProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImages, setActiveImages] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://store.januskitchen.nl/wp-json/custom/v1/product-by-slug/mt-15`
        );

        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();

        const safeProduct = {
          ...data,
          images: Array.isArray(data.images) ? data.images : [],
          variations: Array.isArray(data.variations) ? data.variations : [],
          specifications: data.specifications || {},
          key_features: Array.isArray(data.features) ? data.features : [],
        };

        setProduct(safeProduct);
        setActiveImages(safeProduct.images); // default parent gallery
      } catch (err) {
        console.error("Fetch error:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // ================= COLOR CHANGE =================
  const handleColorChange = (e) => {
  const color = e.target.value;
  setSelectedColor(color);

  const variation = product.variations.find(
    (v) => v.attributes?.color === color
  );

  if (variation && variation.images?.length) {
    // start with variation image
    const mergedImages = [...variation.images];

    // append parent gallery (avoid duplicates)
    product.images.forEach((img) => {
      if (!mergedImages.some((vImg) => vImg.src === img.src)) {
        mergedImages.push(img);
      }
    });

    setActiveImages(mergedImages);

    // reset slider to first image
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(0);
    }
  } else {
    setActiveImages(product.images);
  }
};

  // ================= RESET SLIDER =================
  useEffect(() => {
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(0);
    }
    console.log('thumbsSwiper2', thumbsSwiper);

  }, [activeImages, thumbsSwiper]);

  // ================= ADD TO CART =================
  const handleBookNow = () => {
    if (product.variations.length && !selectedColor) {
      toast.error("Please select a color");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numericPrice = Number(product.price || 0);

    const existingItem = cart.find(
      (item) =>
        item.id === product.id && item.color === selectedColor
    );

    if (existingItem) {
      existingItem.qty += 1;
      toast.info("Product quantity updated 🧾");
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: numericPrice,
        displayPrice: `₹${numericPrice.toLocaleString("en-IN")}`,
        image: activeImages?.[0]?.src,
        qty: 1,
        color: selectedColor || null,
      });
      toast.success("Product added to cart 🛒");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (loading) {
    return <h2 className="text-center p-100">Loading product...</h2>;
  }

  if (!product || !product.id) {
    return <h2 className="text-center p-100">Product Not Found</h2>;
  }

  const specifications = Object.entries(product.specifications || {});

  return (
    <>
      <Header />

      <div className="common-banner text-center">
        <h3>Shop</h3>
      </div>

      <section className="single-product-area p-100">
        <div className="container">
          <div className="row">

            {/* LEFT IMAGES */}
            <div className="col-lg-6">
              <div className="position-sticky top-0">

                {/* MAIN SLIDER */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, Thumbs]}
                  spaceBetween={25}
                  slidesPerView={1}
                  navigation
                  // pagination={{ clickable: true }}
                  // autoplay={{ delay: 3000 }}
                  loop={activeImages.length > 1}
                  thumbs={{ swiper: thumbsSwiper }}
                  className="swiper product-main-slider"
                >
                  {activeImages.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img.src} alt={`${product.name} ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* THUMB SLIDER */}
                {activeImages.length > 1 && (
                  <Swiper
                    modules={[Thumbs]}
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress
                    className="swiper product-thumbs-slider mt-3"
                  >
                    {activeImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img src={img.src} alt={`Thumb ${index + 1}`} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

              </div>
            </div>

            {/* RIGHT DETAILS */}
            <div className="col-lg-6">
              <div className="product-details-right">

                <h2>{product.name}</h2>

                <h4 className="price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                  <span> (Ex-showroom Price)</span>
                </h4>

                {product.variations.length > 0 && (
                    <div className="d-flex align-items-center variation-box mt-5">
                      <label className="me-2 fw-bold">Select Color</label>
                      <select
                        className="form-select"
                        style={{ width: "180px" }}
                        value={selectedColor}
                        onChange={handleColorChange}
                      >
                        <option value="">Choose an option</option>
                        {product.variations.map((v, i) => (
                          <option key={i} value={v.attributes.color}>
                            {v.attributes.color}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                <div
                  className="product-desc"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />

                {/* ACTIONS */}
                <div className="d-flex align-items-center flex-wrap gap-3 mt-3">

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

                {/* SPECIFICATIONS */}
                {specifications.length > 0 && (
                  <div className="specification-box mt-6">
                    <h4>Key Specifications</h4>
                    <table className="table table-bordered table-striped specification-table">
                      <tbody>
                        {specifications.map(([key, value]) => (
                          <tr key={key}>
                            <th style={{ width: "40%" }}>
                              {key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                            </th>
                            <td>{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* KEY FEATURES */}
                {product.key_features.length > 0 && (
                  <div className="specification-box mt-6 mt-lg-4">
                    <h4>Key Features</h4>
                    <table className="table table-bordered specification-table">
                      <tbody>
                        {product.key_features.map((feature, index) => (
                          <tr key={index}>
                            <th>
                              <i className="fas fa-check-circle text-success me-2"></i>
                              {feature}
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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

export default SingleProduct;
