"use client";

import axios from "axios";
import { CheckIcon, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

function RenderDesignData({ html }) {
  return (
    <div className="space-y-2">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <div className="bg-[#fefeff] border border-gray-200  rounded px-4 py-3 flex items-start gap-2 hover:shadow-md transition-shadow duration-200">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#c20016] flex-shrink-0" />
                <span className="text-[#1a191d] text-title-md font-medium leading-snug">
                  {domToReact(domNode.children)}
                </span>
              </div>
            );
          }
        },
      })}
    </div>
  );
}

function RenderCheckListData({ html }) {
  return (
    <div className="space-y-2">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <div className="my-2 text-lg font-semibold  flex items-start gap-3 bg-[#fefeff] border border-gray-200 rounded px-4 py-3  text-gray-700">
                <span className="w-5 h-5  rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon color="#c20016" size={20} />
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

function RenderCheckListCardData({ html }) {
  return (
    <div className="space-y-2">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <div className="flex items-start gap-2 text-[rgb(192,191,191)] text-lg">
                <span className="text-[#c20016] mt-0.5">
                  <ChevronRight />
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

export default function ConsultantPage() {
  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/resource/consultant");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="div-spread">
      <section className="bg-[#f4f4f4]  py-14">
        <div className="container px-4">
          {fetchAllData.slice(0, 1).map((data) => (
            <div key={data._id}>
              <h2 className="text-[#1a191d] font-extrabold text-2xl md:text-3xl mb-1">
                {data.heading}
              </h2>
              <div
                className="[&_*]:text-[rgb(134,134,134)] [&_*]:text-sm mb-10"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          ))}

          {/* ── DESIGNING ──────────────────────────────────────── */}
          {fetchAllData.slice(1, 2).map((data) => (
            <div key={data._id} className="my-10 ">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 bg-[#c20016] rounded flex items-center justify-center">
                  <svg className="w-5 h-5 fill-[#fefeff]" viewBox="0 0 24 24">
                    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#1a191d] font-bold text-xl leading-none">
                    {data.heading}
                  </h3>
                  <div className="w-8 h-[3px] bg-[#c20016] rounded mt-1.5" />
                </div>
              </div>

              <div
                className="[&_*]:text-[rgb(134,134,134)] [&_*]:text-sm leading-relaxed mb-5"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>

              {/* system cards grid */}
              <div className="consultant-design-point mb-5">
                <RenderDesignData html={data.designpoints} />
              </div>

              {/* additional notes */}
              <div className="amc-points space-y-2.5 !pl-0">
                <RenderCheckListData html={data.checkpoints} />
              </div>
            </div>
          ))}

          {/* ── COMPLIANCE DOCUMENTS ──────*/}
          <div className="div-spread ">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 bg-[#c20016] rounded flex items-center justify-center">
                <svg className="w-5 h-5 fill-[#fefeff]" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              {fetchAllData.slice(2, 3).map((data) => (
                <div key={data._id}>
                  <h3>{data.heading}</h3>
                  <div className="w-8 h-[3px] bg-[#c20016] rounded mt-1.5" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fetchAllData.slice(3).map((item) => (
                <div
                  key={item._id}
                  className="bg-[#1a191d] rounded-md px-4 py-5"
                >
                  <p className="!text-[#c20016]  uppercase mb-2">
                    {item.heading}
                  </p>
                  <div
                    className="[&_*]:text-[rgb(192,191,191)]"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  ></div>
                  {item.checkpoints && (
                    <div className="safety-service mt-3 space-y-1 !pl-0">
                      <RenderCheckListCardData html={item.checkpoints} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
