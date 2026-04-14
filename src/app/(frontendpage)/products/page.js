"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveLeft, MoveRight, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";

const Products = () => {
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(6);
  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/product/productdata");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // product list
  const [productList, setProductList] = useState([]);
  const firstItem = productList[0];
  const SecondItem = productList[1];
  const ThirdItem = productList[2];
  const resetData = productList.slice(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/product/productlist");
        setProductList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts =
    category === "All"
      ? resetData
      : resetData.filter((p) => p.category === category);


  // product type list
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fetchProductTypeData, setFetchProductTypeData] = useState([]);
  const alltypeProducts = fetchProductTypeData.flatMap((item) => item.prodtype);

  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setActiveIndex((prev) =>
        prev === alltypeProducts.length - 1 ? 0 : prev + 1,
      );
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === alltypeProducts.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [alltypeProducts.length]);

  useEffect(() => {
    const fetchProductTypeDataList = async () => {
      const res = await axios.get("/api/product/producttypelist");
      setFetchProductTypeData(res.data.data);
    };
    fetchProductTypeDataList();
  }, []);

  // product sell list
  const [fetchBestSellingProductData, setFetchBestSellingProductData] =
    useState([]);

  const allsellProducts = fetchBestSellingProductData.flatMap(
    (item) => item.sellproductlist,
  );

  useEffect(() => {
    const fetchBestSellingProductList = async () => {
      const res = await axios.get("/api/product/sellprodlist");
      setFetchBestSellingProductData(res.data.data);
    };
    fetchBestSellingProductList();
  }, []);

  const limitWords = (html, wordLimit) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <main>
      <div className="container-fluid">
        <div className="main-spread container py-3">
          {fetchAllData.slice(1, 2).map((data) => (
            <div key={data._id} className="row relative">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div>
                  <h1 data-aos="fade-up-right" data-aos-delay={100}>
                    {data.heading}
                  </h1>
                  <h5
                    className="my-4"
                    data-aos="fade-up-right"
                    data-aos-delay={200}
                  >
                    <b className="text-[#DA170A]">{data.subheading}</b>
                  </h5>

                  <div
                    className="red-full-border-button pt-1 lg:!pt-4 pb-5 lg:!pb-0"
                    data-aos="fade-up-right"
                    data-aos-delay={300}
                  >
                    <Link href="/contact">Protect Your Space Today</Link>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="pb-5 lg:!pb-0">
                  <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
                </div>
              </div>

              <div className="flex justify-end  h-120 lg:!h-80">
                <div>
                  <div
                    className="bg-[#D9D9D9] relative prod-banner-img1  flex justify-center items-center overflow-hidden w-22 h-22 p-2"
                    style={{ borderRadius: "50%" }}
                  >
                    <Image
                      src={data.productimage2}
                      alt="Images"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div
                    className="bg-[#D9D9D9] relative   prod-banner-img2 flex justify-center items-center overflow-hidden w-35 h-35 md:!w-45 md:!h-45 lg:!w-45 lg:!h-45"
                    style={{ borderRadius: "50%" }}
                  >
                    <Image
                      src={data.productimage1}
                      alt="Images"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div
                    className="bg-[#D9D9D9] relative  prod-banner-img3 flex justify-center items-center overflow-hidden w-48 h-48 md:!w-65 md:!h-65 lg:!w-70 lg:!h-70"
                    style={{ borderRadius: "50%" }}
                  >
                    <Image
                      src={data.productimage3}
                      alt="Images"
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div
                    data-aos="zoom-in"
                    className="bg-[#DA170A] flex justify-center items-center overflow-hidden w-65 h-65 md:!w-105 md:!h-105 lg:!w-110 lg:!h-110 p-5
                   prod-banner-img4"
                    style={{ borderRadius: "50%" }}
                  >
                    <Image
                      src={data.productimage4}
                      alt="Images"
                      fill
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container div-spread">
        {firstItem && <h2 className="py-5">{firstItem.heading}</h2>}

        <div className="row flex justify-center ">
          {filteredProducts.slice(0, visible).map((data) => (
            <div
              key={data._id}
              className="col-lg-4 col-md-6 col-sm-12 my-25 lg:!my-5"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="products-card mx-2 ">
                <div className="card-inner">
                  {data.productimage && (
                    <div className="product-img relative">
                      <Image
                        src={data.productimage}
                        alt={data.heading}
                        fill
                        objectFit="contain"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-center">
                      <b>{data.heading}</b>
                    </h4>

                    <Link href={`/products/${data._id}`}>
                      <button className="read-more-red-bg mt-2">
                        <span className="circle-red-bg" aria-hidden="true">
                          <span className="icon-red-bg arrow-red-bg" />
                        </span>
                        <span className="button-text-red-bg">Read More</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {visible < filteredProducts.length && (
        <div className="red-half-border-button text-xl text-center mt-20">
          <button onClick={() => setVisible(visible + 6)}>
            View More Products
          </button>
        </div>
      )}

      <div className="div-spread">
        <div className="container-fluid bg-[#FEF2F2]">
          <div className="container py-5">
            {fetchAllData.slice(2, 3).map((data) => (
              <div key={data._id} className="row">
                <div className="col-lg-8 col-md-8 col-sm-12">
                  <div className="p-4">
                    <h1>{data.heading}</h1>
                    <h5>
                      <b>{data.subheading}</b>
                    </h5>
                    <p
                      className="my-4 text-[#000000] [&_*]:!text-[#000000]"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></p>

                    <div
                      className="products-choose-point"
                      data-aos="fade-right"
                    >
                      <div
                        dangerouslySetInnerHTML={{ __html: data.points }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12" data-aos="zoom-in">
                  <div className="product-guideline-img lg:!h-[400px]">
                    <Image
                      src={data.productimage1}
                      alt={data.heading}
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container div-spread">
        <div>
          {SecondItem && <h1>{SecondItem.heading}</h1>}

          <div className="products-wrapper">
            <div className="flex justify-center my-5">
              {alltypeProducts.length > 0 && (
                <div
                  className={`row products-type-sec ${isAnimating ? "animate-slide" : ""}`}
                >
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div>
                      <strong>{activeIndex + 1}</strong>
                      <h4>
                        <b>{alltypeProducts[activeIndex].heading}</b>
                      </h4>
                      <p
                        className="my-4  "
                        dangerouslySetInnerHTML={{
                          __html: limitWords(alltypeProducts[activeIndex].description, 20),
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="products-type-img relative">
                      <Image
                        src={alltypeProducts[activeIndex].productimage}
                        alt={alltypeProducts[activeIndex].heading}
                        fill
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center px-2 lg:!px-35 py-4">
              <div className="red-full-border-button">
                <Link href="/contact">Book Now</Link>
              </div>
              <div className="button" onClick={handleNext}>
                <button className="text-4xl font-bold">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="container-fluid bg-[#FEF2F2]">
          {ThirdItem && (
            <div className="p-5">
              <h2>{ThirdItem.heading}</h2>
              <p
                className="lg:!px-5 py-3 text-[#403A38] [&_*]:!text-[#403A38] "
                dangerouslySetInnerHTML={{ __html: ThirdItem.description }}
              ></p>
            </div>
          )}

          <div className="my-slider-wrapper px-3" data-aos="fade-up">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = ".custom-prev";
                swiper.params.navigation.nextEl = ".custom-next";
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
              {allsellProducts.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="shopping-prod">
                    <div className="shopping-prod-img">
                      <div className="shopping-prod-mid-sec relative">
                        <Image
                          src={item.productimage}
                          alt="product"
                          fill
                          objectFit="contain"
                        />
                      </div>
                    </div>
                    <div className="shopping-para  pt-27 2xl:pt-40 px-3 lg:!px-5 pb-5 lg:!pb-0">
                      <h4>{item.heading}</h4>
                      <p
                        dangerouslySetInnerHTML={{ __html: limitWords(item.description, 20), }}
                      ></p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="custom-navigation">
              <button className="custom-prev flex justify-center items-center">
                <MoveLeft size={35} />
              </button>
              <button className="custom-next flex justify-center items-center">
                <MoveRight size={35} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Ready to secure your space?
              </span>
            </h1>
            <p className="px-5 py-2">
              <span className="text-[#FFFFFF]">
                Book a free consultation today. Our certified experts are ready
                to assess your fire safety needs.{" "}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 items-center m-5">
            <div className="button-white-rounded-bg" data-aos="fade-up">
              <Link href="/contact">Schedule Visit</Link>
            </div>
            <div
              className="button border-2 border-amber-50 rounded-4xl"
              data-aos="fade-up"
            >
              <a href="tel:9956777734" className="flex gap-3">
                <PhoneCall /> 9956777734
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
