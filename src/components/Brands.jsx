import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import brands from '../data/brands.json';

const Brands = () => {
  return (
    <section className="brand-area p-100">
      <Swiper
          modules={[FreeMode, Autoplay]}
          spaceBetween={25}
          slidesPerView={5}
          freeMode={true}
          loop={true}
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
              <img src={brand.img} alt={brand.alt} />
            </SwiperSlide>
          ))}
        </Swiper>
    </section>
  );
};

export default Brands;
