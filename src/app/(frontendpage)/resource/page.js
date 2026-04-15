"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFilePdf, FaVideo, FaAward } from "react-icons/fa";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import axios from "axios";

const Resource = () => {
  const [activeTab, setActiveTab] = useState("PDF's");

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/resource");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredData =
    activeTab === "All"
      ? fetchAllData
      : fetchAllData.filter((item) => item.resourcetype.includes(activeTab));

  return (
    <main>
      <div className="div-spread">
        {fetchAllData.slice(0, 1).map((data) => (
          <section
            key={data._id}
            className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
          >
            <Image
              src="/img/contact-bg.webp"
              alt="Fire Safety Resources"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80"></div>
            <div className="relative z-10 px-4">
              <h1 className="mb-4 tracking-wide" data-aos="fade-down">
                {data.heading}
              </h1>

              <p
                className="!text-gray-200 max-w-2xl mx-auto  mb-5"
                data-aos="fade-right"
              >
                {data.description}
              </p>

              <div className="red-full-border-button" data-aos="fade-up">
                <Link href="#resources">Explore Resources</Link>
              </div>
            </div>
          </section>
        ))}

        <div className="div-spread container mx-auto px-4 " id="resources">
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab("PDF's")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === "PDF's"
                  ? "bg-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              <FaFilePdf className="inline mr-2" />
              PDF's
            </button>

            <button
              onClick={() => setActiveTab("Videos")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === "Videos"
                  ? "bg-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              <FaVideo className="inline mr-2" />
              Videos
            </button>

            <button
              onClick={() => setActiveTab("Certificates")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === "Certificates"
                  ? "bg-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              <FaAward className="inline mr-2" />
              Certificates
            </button>
          </div>

          {filteredData
            .filter((item) => item.resourcetype.includes("PDF's"))
            .map((data) => (
              <div
                key={data._id}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                data-aos="fade-up"
              >
                <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <FaFilePdf size={40} className="text-red-600" />
                    <h3 className="font-semibold text-lg">{data.heading}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {data.description}
                  </p>
                  <a
                    href={data.pdf}
                    target="_blank"
                    className="inline-block bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            ))}

          <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up">
            {filteredData
              .filter((item) => item.resourcetype.includes("Videos"))
              .map((data) => (
                <div
                  key={data._id}
                  className="bg-white rounded-xl shadow-md p-2 lg:!p-6 hover:shadow-xl transition duration-300"
                >
                  <h3 className="font-semibold text-lg mb-4 text-center">
                    {data.heading}
                  </h3>
                  {data.youtubeLink && (
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${data.youtubeLink}`}
                        title="YouTube video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {data.video && (
                    <div className="aspect-video">
                      <video controls className="w-full h-full rounded-lg">
                        <source src={data.video} />
                      </video>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {filteredData
            .filter((item) => item.resourcetype.includes("Certificates"))
            .map((data) => (
              <div
                key={data._id}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                data-aos="fade-up"
              >
                <div className="bg-white h-auto rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
                  <div className="resource-img">
                    <Image
                      src={data.image}
                      alt={data.heading}
                      width={500}
                      height={500}
                      className="rounded-lg mb-4"
                    />
                  </div>
                  <h4>{data.heading}</h4>
                </div>
              </div>
            ))}
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

export default Resource;
