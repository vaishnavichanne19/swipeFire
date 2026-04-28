"use client";

import {
  Fuel,
  MessageSquare,
  PhoneCall,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { FaInstalod } from "react-icons/fa6";
import Image from "next/image";
import { TbFireHydrant } from "react-icons/tb";
import { LuAlarmSmoke, LuLayoutGrid } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import SafetyServices from "../NewPages/SafetyService";
import Amc from "../NewPages/Amc";
import FireDetectionPage from "../NewPages/FireDetection";
import SystemIntegrantPage from "../NewPages/SystemIntegrant";

const Service = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/service/servicedata");
        setServiceData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/service/servicelist");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!fetchAllData.length) return;

    const hash = window.location.hash;

    if (hash) {
      const element = document.querySelector(hash);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [fetchAllData]);

  const limitWords = (html, wordLimit) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  const serviceicons = [
    {
      icon: <ShoppingBag color="#9B2335" size={40} strokeWidth={1} />,
    },
    {
      icon: <FaInstalod color="#9B2335" size={40} strokeWidth={1} />,
    },
    {
      icon: <Fuel color="#9B2335" size={40} strokeWidth={1} />,
    },
    {
      icon: (
        <HiOutlineWrenchScrewdriver color="#9B2335" size={40} strokeWidth={1} />
      ),
    },
    {
      icon: <TbFireHydrant color="#9B2335" size={40} strokeWidth={1} />,
    },
    {
      icon: <LuAlarmSmoke color="#9B2335" size={40} strokeWidth={1} />,
    },
  ];

 const DefaultIcon = () => <LuLayoutGrid color="#9B2335" size={40} strokeWidth={1} />;


  return (
    <main className="container-fluid">
      <div>
        <div className="service-sec min-h-screen">
          <div className="container service-para min-h-screen">
            {serviceData
              .filter((user) => user._id === "69b124b95c28b1f406187d77")
              .map((data) => (
                <div key={data._id} className="col-lg-6 col-md-6 col-sm-12">
                  <h1 data-aos="fade-up-right" data-aos-delay={200}>
                    {data.heading}
                  </h1>
                  <div
                    className="py-3 text-[#3B3838] [&_*]:!text-[#3B3838] "
                    data-aos="fade-up-right"
                    data-aos-delay={400}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                  <div
                    className="red-half-border-button"
                    data-aos="fade-up-right"
                    data-aos-delay={600}
                  >
                    <Link href="/contact">Get in touch</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="container div-spread">
        {fetchAllData.slice(1, 2).map((data) => (
          <h1 key={data._id} className="text-center pb-5">
            {data.heading}
          </h1>
        ))}
        <div className="row flex justify-center">
          {fetchAllData.slice(3).map((data, index) => (
            <div
              key={data._id}
              className="col-lg-4 col-md-6 col-sm-12 my-4"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="service-card mx-2">
                <div className="p-4">
                  <div
                    style={{ borderRadius: "50px" }}
                    className="bg-[#FEF2F2] w-19 h-19 mb-3  flex justify-center items-center"
                  >
                    {serviceicons[index]?.icon  || <DefaultIcon/> }
                  </div>
                  <div>
                    <h3>{data.heading}</h3>
                    <p
                      className="py-3"
                      dangerouslySetInnerHTML={{
                        __html: limitWords(data.description, 10),
                      }}
                    ></p>
                    <Link href={`#service${index + 1}`}>
                      <button className="read-more-red-bg">
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

      <div className="px-3 lg:!px-5 container-fluid">
        <div className="div-spread">
          {fetchAllData.slice(2, 3).map((data) => (
            <div key={data._id}>
              <h5>
                <b className="text-[#9B2335]">{data.heading}</b>
              </h5>
              <h1 className="w-100 lg:!w-140">{data.subheading}</h1>
            </div>
          ))}

          {fetchAllData.slice(3).map((data, index) => (
            <div
              key={data._id}
              className={`row flex items-center  my-5 lg:!p-5 scroll-mt-40 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              id={`service${index + 1}`}
            >
              <div
                className="col-lg-4 col-md-5  col-sm-12"
                data-aos="flip-left"
              >
                <div className="expertise-card bg-[#FDFFFE] rounded-3xl md:p-3 mb-5 lg:!mb-1">
                  <div className="bg-[#FEFCF3] p-2">
                    <div className="flex justify-between items-center px-3">
                      <div
                        style={{ borderRadius: "50px" }}
                        className="bg-[#FDFFFE] w-19 h-19 mb-3  flex justify-center items-center"
                      >
                        {serviceicons[index]?.icon  || <DefaultIcon/> }
                      </div>
                      <div>
                        <strong>0{index + 1}</strong>
                      </div>
                    </div>
                    <div>
                      <ul
                        className="text-[#3B3838] [&_ul]:list-disc  mt-3"
                        dangerouslySetInnerHTML={{
                          __html: data.points,
                        }}
                      ></ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2  col-md-1 col-sm-12"></div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div>
                  <h2>{data.heading}</h2>
                  <div
                    className="py-4"
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></div>

                  <div className="red-half-border-button">
                    <Link href="/contact">Book Services</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


<SafetyServices/>
  <FireDetectionPage/>
  <SystemIntegrantPage/>

      {serviceData
        .filter((user) => user._id === "69b14e59b472d437ba2f5f00")
        .map((data) => (
          <div key={data._id} className="container div-spread">
            <h2 className="text-center">{data.heading}</h2>
            <div className="row mt-5 flex justify-between items-center">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <div>
                  <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                </div>
              </div>
              <div
                className="col-lg-5 col-md-5 col-sm-12 mb-5"
                data-aos="zoom-in"
              >
                <div className="quality-img">
                  <Image
                    src={data.serviceimage}
                    alt="Quality Image"
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}





      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 div-spread">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Ready to Secure Your Property?
              </span>
            </h1>
            <p className="px-5 py-2">
              <span className="text-[#FFFFFF]">
                Protect your home, office, or industry with certified fire
                safety solutions tailored to your needs.
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

      <div className="container div-spread">
        <div>
          {serviceData
            .filter((user) => user._id === "69b15257b472d437ba2f5f0d")
            .map((data) => (
              <h1 key={data._id} className="text-center">
                {data.heading}
              </h1>
            ))}

          <div className="relative mt-5">
            <div className="horizontal-line hidden md:block absolute top-[55px] left-0 right-0">
              <div className="move-line"></div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0 relative">
              <div className="flex flex-col items-center text-center gap-4 px-4 relative">
                <div className="msg-circle flex justify-center items-center relative">
                  <div className="step-number">
                    <strong>01</strong>
                  </div>
                  <MessageSquare color="#9B2335" size={35} strokeWidth={1} />
                </div>
                {serviceData
                  .filter((user) => user._id === "69b15266b472d437ba2f5f0f")
                  .map((data) => (
                    <div key={data._id} data-aos="fade-up">
                      <h4 className="font-semibold text-lg">{data.heading}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data.description,
                        }}
                      ></p>
                    </div>
                  ))}
              </div>

              <div className="vertical-line md:hidden"></div>

              <div className="flex flex-col items-center text-center gap-4 px-4 relative">
                <div className="msg-circle flex justify-center items-center relative">
                  <div className="step-number">
                    <strong>02</strong>
                  </div>
                  <MessageSquare color="#9B2335" size={35} strokeWidth={1} />
                </div>
                {serviceData
                  .filter((user) => user._id === "69b15268b472d437ba2f5f11")
                  .map((data) => (
                    <div key={data._id} data-aos="fade-up">
                      <h4 className="font-semibold text-lg">{data.heading}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data.description,
                        }}
                      ></p>
                    </div>
                  ))}
              </div>

              <div className="vertical-line md:hidden"></div>

              <div className="flex flex-col items-center text-center gap-4 px-4 relative">
                <div className="msg-circle flex justify-center items-center relative">
                  <div className="step-number">
                    <strong>03</strong>
                  </div>
                  <MessageSquare color="#9B2335" size={35} strokeWidth={1} />
                </div>
                {serviceData
                  .filter((user) => user._id === "69b1526ab472d437ba2f5f13")
                  .map((data) => (
                    <div key={data._id} data-aos="fade-up">
                      <h4 className="font-semibold text-lg">{data.heading}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data.description,
                        }}
                      ></p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>


<Amc/>


    </main>
  );
};

export default Service;
