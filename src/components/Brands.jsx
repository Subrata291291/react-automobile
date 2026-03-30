import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://store.januskitchen.nl/wp-json/custom/v1/brands";

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setBrands(data);
      } catch (error) {
        console.error("Brand fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading || brands.length === 0) return null;

  return (
    <section className="brand-area p-100">
      <Swiper
        modules={[FreeMode, Autoplay]}
        spaceBetween={25}
        slidesPerView={5}
        freeMode
        loop
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="brand-swiper"
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand.id}>
            <img src={brand.src} alt={brand.alt} loading="lazy" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Brands;
