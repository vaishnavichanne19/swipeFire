"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

function RenderData({ html, search }) {
  return (
    <div className="space-y-2">
      {parse(html || "", {
        replace: (domNode) => {
          if (domNode.name === "li") {
            const text = domNode.children?.[0]?.data?.toLowerCase?.() || "";

            // search filter
            if (search && !text.includes(search.toLowerCase())) {
              return <></>;
            }

            return (
              <div className="my-3 flex items-center gap-3 bg-[#fefeff] border border-gray-100 rounded-xl px-4 py-3">
                <svg
                  className="w-3.5 h-3.5 text-[#c20016] mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div>
                  <span className="text-[rgb(156, 154, 154)] text-lg leading-relaxed">
                    {domToReact(domNode.children)}
                  </span>
                </div>
              </div>
            );
          }
        },
      })}
    </div>
  );
}

export default function SystemIntegrantPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/service/systemint");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filtered =
    activeCategory === "All"
      ? fetchAllData.slice(1)
      : fetchAllData.slice(1).filter((s) => s.systemtype === activeCategory);

  return (
    <main className="div-spread">
      <div className="container">
        {fetchAllData.slice(0, 1).map((data) => (
          <div key={data._id}>
            <h1>
              {data?.heading?.split(" ").map((word, idx) => (
                <span
                  key={idx}
                  className={`${idx === data?.heading?.split(" ").length - 1 ? "text-[#c20016]" : ""}`}
                >
                  {" " + word}
                </span>
              ))}
            </h1>
            <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
          </div>
        ))}

        <section className="my-5">
          <div className="flex justify-center items-center flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory("All")}
              className={`text-xs px-4 py-1.5 rounded-full border font-medium transition-all ${
                activeCategory === "All"
                  ? "bg-[#c20016] text-[#fefeff] border-[#c20016]"
                  : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#c20016] hover:text-[#c20016]"
              }`}
            >
              All
            </button>
            {fetchAllData.slice(1).map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat.systemtype)}
                className={`text-xs px-4 py-2 rounded-full border font-semibold transition-all duration-200 ${
                  activeCategory === cat.systemtype
                    ? "bg-[#c20016] text-[#fefeff] border-[#c20016]"
                    : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#c20016] hover:text-[#c20016]"
                }`}
              >
                {cat.systemtype}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid gap-5">
            {filtered.map((svc) => (
              <div
                key={svc._id}
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                {/* Card Header */}
                <button className="w-full bg-[#1a191d] px-6 py-4 flex items-center gap-4 text-left hover:bg-[#222] transition-colors">
                  <div className="flex-1">
                    <span className="text-[rgba(255,255,255,0.4)] text-[10px] font-bold tracking-[1.5px] uppercase block mb-0.5">
                      {svc.systemtype}
                    </span>
                    <h3 className="!text-[#fefeff]">{svc.heading}</h3>
                  </div>
                </button>

                {/* Card Body */}

                <div className="px-6 py-6 bg-[#fafafa] border-t border-gray-100">
                  {svc.para && (
                    <div className="border-l-4 border-[#c20016] pl-4 mb-5">
                      <p dangerouslySetInnerHTML={{ __html: svc.para }}></p>
                    </div>
                  )}

                  {svc.description && (
                    <p
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: svc.description }}
                    ></p>
                  )}

                  {/* Sub Items */}
                  {svc.points && (
                    <div className="grid gap-3 mt-2">
                      <RenderData html={svc.points} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
