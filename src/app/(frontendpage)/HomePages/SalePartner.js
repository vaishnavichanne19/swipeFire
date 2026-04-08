"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const featuresicon = [
  { icon: "✅" },
  { icon: "⚡" },
  { icon: "🏅" },
  { icon: "🔧" },
];

export default function SalesPartner() {
  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/home/salepartner");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="main-spread">
      <div className="relative bg-[#1a191d] py-20 overflow-hidden">
        <div className="container">
          <div className="pointer-events-none  absolute right-[-80px] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(232,40,30,0.09)_0%,transparent_68%)]" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-[7px] h-[7px] bg-[#c20016] flex-shrink-0"
                style={{
                  clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                }}
              />
              <span className="text-[11px] font-bold tracking-[3px] uppercase text-[#c20016]">
                Our Partner
              </span>
            </div>

            {fetchAllData.slice(0, 1).map((data) => (
              <div key={data._id}>
                <h2 className="tracking-[2px] !text-[#f0ece8] mb-3">
                  {data.heading.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={index === 2 ? "text-[#c20016]" : ""}
                    >
                      {word}{" "}
                    </span>
                  ))}
                </h2>

                <div
                  className="text-[#a09890] [&_*]:!text-[#a09890] leading-relaxed max-w-[460px] mb-9"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
              </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="relative bg-[#141414] border-1 border-[#e8281e2e] p-7 ">
                <div className="absolute top-0 left-0 w-11 h-[3px] bg-[#c20016]" />

                <div
                  className="h-10 lg:!h-15 inline-block bg-[#ffffff] border-1 border-[#c20016] px-3 py-1 mb-2"
                  style={{
                    clipPath:
                      "polygon(16px 0%,100% 0%,calc(100% - 16px) 100%,0% 100%)",
                  }}
                >
                  <Image
                    src="/img/Blaze gard logo.svg"
                    alt="Blaze Guard Logo"
                    width={100}
                    height={100}
                    className="h-full w-full"
                  />
                </div>
                {fetchAllData.slice(1, 2).map((data) => (
                  <div key={data._id}>
                    <span
                      className="inline-block bg-[#e8281e1a] border-1 border-[#c20016] text-[#c20016] text-[11px] font-bold tracking-[2px] uppercase px-3 py-1 mb-4"
                      style={{
                        clipPath:
                          "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                      }}
                    >
                      {data.heading}
                    </span>
                    <div
                      className="text-[#a09890] [&_*]:!text-[#a09890] mb-5"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fetchAllData.slice(2,6).map((data, index) => (
                  <div
                    key={data._id}
                    className="group relative bg-[#141414] border-1 border-[#e8281e24] hover:border-[rgba(232,40,30,0.45)] hover:-translate-y-1 transition-all duration-300 p-[18px] overflow-hidden"
                  >
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c20016] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                    <div className="text-[22px] leading-none mb-2">
                      {featuresicon[index]?.icon}
                    </div>
                    <h6 className="tracking-[1px] uppercase !text-[#f0ece8] mb-1">
                      {data.heading}
                    </h6>
                    <p
                      className="text-[#a09890] [&_*]:!text-[#a09890] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-[rgba(232,40,30,0.15)]" />
          <h6 className="tracking-[3px] uppercase !text-[#a09890] whitespace-nowrap">
            Blaze Guard Products — Swipe Fire Certified
          </h6>
          <div className="flex-1 h-px bg-[rgba(232,40,30,0.15)]" />
        </div>

        {/* ── Products Grid ── */}
        <div className="container div-spread ">
          <div className="row flex justify-center">
                {fetchAllData.slice(6).map((data) => (

            <div key={data._id} className="col-lg-3 col-md-6 col-sm-12 my-4">
              <div className="group  relative h-100 bg-[#141414] border-1 border-[rgba(232,40,30,0.14)] hover:border-[rgba(232,40,30,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e8281e] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              <div className="h-70 w-full relative bg-[#1c1c1c] overflow-hidden">
                <img
                  src={data.productimg}
                  alt={data.heading}
                  className="absolute object-contain w-full h-full inset-0 p-2 group-hover:scale-105 transition-transform duration-400"
                />
              </div>

              <div className="p-3 flex flex-col gap-2 flex-1">
                <h6 className="!text-[#f0ece8] uppercase text-center tracking-wide">
                  {data.heading}
                </h6>
              </div>
            </div>
            </div>
                ))}
          </div>
        </div>

        <div className="mt-14 h-[3px] w-full bg-gradient-to-r from-[#c20016] via-[#ff6b2b] to-transparent" />
      </div>
    </main>
  );
}
