import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import aboutPic from '../images/about.png'

const AboutData = () => {
  return (
    <section className="about-area p-100">
      <div className="container">
        <div className="row align-items-stretch">

          {/* LEFT SLIDER */}
          <div className="col-12 col-lg-6">
            <div className="about-left h-100">
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
                <SwiperSlide>
                  <img src={aboutPic} alt="about 1" />
                </SwiperSlide>

                <SwiperSlide>
                  <img src={aboutPic} alt="about 2" />
                </SwiperSlide>

                <SwiperSlide>
                  <img src={aboutPic} alt="about 3" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-12 col-lg-6">
            <div className="about-right h-100">
              <div className="title-box">
                <h4><span></span> Who We Are</h4>
                <h3>Saluja Auto Mobiles – A Legacy on Wheels</h3>
              </div>

              <p>
                We are continuously improving our craft to provide the highest
                level of service for our customers.
              </p>

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

              <button className="common-btn">LEARN MORE ABOUT US</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutData
