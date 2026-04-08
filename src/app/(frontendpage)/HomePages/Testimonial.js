"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const Testimonial = () => {
    const [fetchAllData, setFetchAllData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("/api/home/testimonial");
          setFetchAllData(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);


  return (
    <main>
      <div className="container-fluid testimonial-wrapper">
        <div className="container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {fetchAllData.map((item) => (
              <SwiperSlide key={item._id}>
                <div className="testimonial-sec" data-aos="fade-up">
                  <div className="testimonial_portrait" />
                  <div>
                    <h4 className="mt-4 italic">
                      <span className="text-[#bf0016]">{item.heading}</span>
                    </h4>
                    
                    <div dangerouslySetInnerHTML={{__html: item.description}}></div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </main>
  );
};

export default Testimonial;
