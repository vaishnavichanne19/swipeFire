"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const icons = {
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  icon: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className="w-6 h-6"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      <line x1="12" y1="2" x2="12" y2="4" />
    </svg>
  ),
};
export default function FireDetectionPage() {
  const [fetchAllData, setFetchAllData] = useState([]);
  const [activeSystem, setActiveSystem] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/service/firedetection");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="div-spread">
      {fetchAllData.slice(0, 1).map((data) => (
        <section key={data._id} className="container">
          <h2>{data.heading}</h2>

          <div className="border-l-4 border-[#c20016] bg-[#fafafa] rounded-r-xl mt-4 px-6 py-4">
            <div
              className="text-[rgb(134,134,134)] text-sm leading-loose"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
          </div>
        </section>
      ))}

      <section className="max-w-5xl mx-auto px-6 pb-12 mt-5">
        <p className=" font-semibold tracking-[2px] uppercase text-[#c20016] mb-3">
          Types of Fire Alarm Systems
        </p>

        <div className="flex gap-2 mb-5 flex-wrap">
          {fetchAllData.slice(1).map((s, i) => (
            <button
              key={s._id}
              onClick={() => setActiveSystem(i)}
              className={`text-sm px-5 py-2.5 rounded-full border font-medium transition-all duration-200 ${
                activeSystem === i
                  ? "bg-[#c20016] text-[#fefeff] border-[#c20016]"
                  : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#c20016] hover:text-[#c20016]"
              }`}
            >
              {s.heading}
            </button>
          ))}
        </div>

        <div className="bg-[#1a191d] rounded-2xl p-8 md:p-10 flex gap-6 items-start transition-all duration-300">
          <div className="text-[#c20016] bg-white rounded-full p-2 flex items-center justify-center mt-1 shrink-0">
            {icons.icon}
          </div>

          <div>
            <h3 className="!text-[#fefeff] text-lg font-semibold mb-3">
             {fetchAllData[activeSystem + 1]?.heading}
            </h3>
            <div
              className="[&_p]:text-white/55 text-sm leading-loose"
              dangerouslySetInnerHTML={{
               __html: fetchAllData[activeSystem + 1]?.description || ""
              }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  );
}
