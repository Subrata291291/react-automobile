import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { useNavigate } from "react-router-dom";

const AboutData = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [about, setAbout] = useState(null);

  // Slider API
  useEffect(() => {
    fetch("https://salujaautomobile.com/wp-json/custom/v1/about-slider")
      .then(res => res.json())
      .then(data => setImages(data))
      .catch(err => console.log(err));
  }, []);

  // About Content API
  useEffect(() => {
    fetch("https://salujaautomobile.com/wp-json/wp/v2/about_section")
      .then(res => res.json())
      .then(data => {
        setAbout(data[0].acf); // first post
      })
      .catch(err => console.log(err));
  }, []);

  const goToAbout = () => {
    navigate("/about");
  };

  if (!about) return <p>Loading...</p>;

  return (
    <section className="about-area p-100">
      <div className="container">
        <div className="row align-items-stretch">

          {/* LEFT SLIDER */}
          <div className="col-12 col-lg-6">
            <div className="about-left h-100" data-aos="fade-right" data-aos-delay="200">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={25}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="about-swiper"
              >
                {images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img.src} alt={img.alt} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* RIGHT CONTENT (DYNAMIC) */}
          <div className="col-12 col-lg-6">
            <div className="about-right h-100" data-aos="fade-left" data-aos-delay="200">

              <div className="title-box">
                <h4><span></span> {about.heading_small}</h4>
                <h3>{about.heading_main}</h3>
              </div>

              <p>{about.description_1}</p>

              {/* STATIC STATS */}
              <ul className="d-flex align-items-center justify-content-between">
                <li>
                  <div className="about-box text-center">
                    <h2>20<span>+</span></h2>
                    <h3>Years of Experience</h3>
                  </div>
                </li>
                <li>
                  <div className="about-box text-center">
                    <h2>52<span>+</span></h2>
                    <h3>Award Winners</h3>
                  </div>
                </li>
                <li>
                  <div className="about-box text-center">
                    <h2>3k<span>+</span></h2>
                    <h3>Happy Clients</h3>
                  </div>
                </li>
              </ul>

              <p>{about.description_2}</p>

              <button className="common-btn" onClick={goToAbout}>
                LEARN MORE ABOUT US
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutData;