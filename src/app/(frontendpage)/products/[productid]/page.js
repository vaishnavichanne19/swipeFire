"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { MoveLeft, MoveRight, PhoneCall } from "lucide-react";
import { Navigation, Autoplay } from "swiper/modules";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";

const ProductDetail = () => {
  const [allproduct, setAllProduct] = useState(false);
  const [open, setOpen] = useState(false);

  const { productid } = useParams();

  const [ViewData, setViewData] = useState({
    heading: "",
    description: "",
    features: "",
    prodtable: "",
    productpdf: "",
    certificate: [],
  });

  useEffect(() => {
    const fetchViewData = async () => {
      try {
        const res = await axios.get(`/api/product/productlist/${productid}`);

        setViewData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (productid) {
      fetchViewData();
    }
  }, [productid]);

  // product list
  const [productList, setProductList] = useState([]);
  const ThirdItem = productList[2];

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
    <main className="container-fluid  relative">
      <div className="div-spread">
        <div className="product-detail-sec">
          <div className="container">
            <div className="min-h-screen row flex items-center py-5">
              <div className="col-lg-7 col-md-7 col-sm-12">
                <div>
                  <h2
                    className="text-white"
                    data-aos="fade-up-right"
                    data-aos-delay={100}
                  >
                    {ViewData.heading}
                  </h2>
                  <p
                    className="my-5 text-white [&_*]:!text-white "
                    data-aos="fade-up-right"
                    data-aos-delay={200}
                    dangerouslySetInnerHTML={{ __html: ViewData.description }}
                  ></p>

                  <div
                    className="red-half-border-button"
                    data-aos="fade-up-right"
                    data-aos-delay={300}
                  >
                    <Link href="/contact">Get in touch</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12">
                {ViewData.productimage && (
                  <div className="my-3 lg:!my-0 product-detail-img relative">
                    <Image
                      src={ViewData.productimage}
                      alt={ViewData.heading}
                      fill
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* mobile all products  */}
        <div className="mobile-allproduct-btn block lg:hidden ">
          <div className="p-3 bg-[#c20016] text-white">
            <button onClick={() => setAllProduct(!allproduct)}>
              All Products
            </button>
          </div>

          {allproduct && (
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setAllProduct(false)}
            ></div>
          )}

          <div
            className={`fixed top-19 left-0 h-155  bg-white overflow-y-scroll   z-999 transform transition-transform duration-300 ${
              allproduct ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-3 bg-black text-white  flex justify-around items-center">
              <strong className="text-xl">All Products</strong>
              <button onClick={() => setAllProduct(false)}>
                <X />
              </button>
            </div>

            <div className="product-detail-allproduct h-155 ">
              <ul className="!pl-0">
                {productList.slice(3).map((item) => (
                  <li key={item._id}>
                    <Link href={`/products/${item._id}`}>{item.heading}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="px-3 div-spread ">
          <div className="container-fluid ">
            <div className="row relative">
              <div className="col-lg-3 col-md-3 col-sm-12 hidden lg:!block  sticky top-[105px] self-start h-fit">
                {/* <div className="product-detail-allproduct">
                  <ul className="!pl-0">
                    <li className="bg-black text-white">All Products</li>
                    <li>
                      <Link href="/products/product-detail">
                        Fire Fighting Equipments
                      </Link>
                    </li>
                    <li>
                      <Link href="/products/product-detail">
                        Fire Fighting Equipments
                      </Link>
                    </li>
           
                  </ul>
                </div> */}

                <div>
                  <button
                    onClick={() => setOpen(!open)}
                    className="w-full bg-black text-white p-3 !text-xl"
                  >
                    All Products
                  </button>

                  {open && (
                    <ul className="w-full bg-white shadow-sm !pl-0">
                      {productList.slice(3).map((item) => (
                        <li key={item._id} className="border text-center p-3">
                          <Link
                            className="text-black"
                            href={`/products/${item._id}`}
                          >
                            {item.heading}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="col-lg-9 col-md-9 col-sm-12">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      {ViewData.productimage && (
                        <div className="relative mb-5 h-99" data-aos="zoom-in">
                          <Image
                            src={ViewData.productimage}
                            alt={ViewData.heading}
                            fill
                            objectFit="contain"
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12">
                      <div>
                        <h3>{ViewData.heading}</h3>
                        <hr />

                        <div>
                          <h4>Features</h4>
                          <ul
                            className="product-detail-ul [&_ul]:!pl-0 "
                            dangerouslySetInnerHTML={{
                              __html: ViewData.features,
                            }}
                          ></ul>
                        </div>
                        <hr />
                        <div>
                          <h4>Certificates</h4>
                          <div className="flex flex-wrap gap-4">
                            {ViewData?.certificate?.map((item, index) => (
                              <div
                                key={index}
                                className="border w-27 h-18 flex justify-center items-center"
                              >
                                <Image
                                  src={item}
                                  alt="ISI"
                                  className="object-cover"
                                  width={100}
                                  height={100}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <hr />
                        <div className="flex items-center flex-wrap gap-10 my-5">
                          <div className="red-full-border-button">
                            <Link href="#enquiry">Enquiry Now</Link>
                          </div>
                          <div className="red-full-border-button">
                            <a
                              href={ViewData.productpdf}
                              target="_blank"
                              className="text-[#ffffff] hover:!text-[#c20016]"
                            >
                              Download Datasheet
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container div-spread">
                  <div className="text-3xl text-center underline uppercase">
                    <strong>PERFORMANCE Data</strong>
                  </div>

                  <div
                    className="product-detail-table overflow-x-auto my-10"
                    dangerouslySetInnerHTML={{ __html: ViewData.prodtable }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="div-spread">
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
                    <div className="shopping-para pt-25 2xl:pt-40 px-3 lg:!px-5 pb-5 lg:!pb-0">
                      <h4>{item.heading}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: limitWords(item.description, 20),
                        }}
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

      <div
        className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15 relative -z-10"
        id="enquiry"
      >
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

export default ProductDetail;
