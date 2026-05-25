"use client";

import axios from "axios";
import { ArrowRight, Star } from "lucide-react";
import { useEffect, useState } from "react";



import parse, { domToReact } from "html-react-parser";

function RenderData({ html }) {
  return (
    <div className="space-y-2">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <div className=" relative flex items-start py-1 gap-2  text-gray-400 !text-sm">
                <span className="w-5 h-5">
                  <ArrowRight className="text-[#c20016] " />
                </span>
                {domToReact(domNode.children)}
              </div>
            );
          }
        },
      })}
    </div>
  );
}

export default function SafetyServices() {
  const [activeCard, setActiveCard] = useState(null);
  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/service/ourpriority");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <section className="bg-[#0a0a0a] relative overflow-hidden py-20">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #e53e3e, #ff6b35, #e53e3e)",
        }}
      />

      <div className="container">
        {fetchAllData.slice(0, 1).map((data) => (

        <div key={data._id} style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="!text-[#c20016] flex items-center justify-center gap-2 ">
            <Star /> {data.title}
          </p>
          <h1 className="text-white">
            {data?.heading?.split(" ").map((word, idx) => (
              <span
                key={idx}
                className={`${idx === data?.heading?.split(" ").length - 1 ? "text-[#c20016]" : "text-white"}`}
              >
                {" " + word}
              </span>
            ))}
          </h1>
          <p>{data.description}</p>
        </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {fetchAllData.slice(1).map((service) => (
            <div
              key={service._id}
              onMouseEnter={() => setActiveCard(service._id)}
              onMouseLeave={() => setActiveCard(null)}
              className={`flex flex-col gap-3 border  h-full transition-all duration-500 p-5 rounded-xl
             ${activeCard === service._id ? "bg-[#1a1a1a]" : "bg-[#111111]"} `}
            >
              {/* Icon */}
              <div className="bg-red-100 p-2 text-[#c20016] w-10  h-10 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
                  />
                </svg>
              </div>

              <h5
                style={{
                  color: activeCard === service._id ? "#e53e3e" : "#ffffff",
                }}
              >
                {service.heading}
              </h5>

              {/* Items */}
              <div className="safety-service">
                <RenderData html={service.description} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
