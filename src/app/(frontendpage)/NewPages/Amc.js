"use client";

import { CircleCheckBig } from "lucide-react";
import parse, { domToReact } from "html-react-parser";
import { useEffect, useState } from "react";
import axios from "axios";

function RenderData({ html }) {
  return (
    <div className="space-y-2">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <div className="flex gap-3 items-center">
                <span className="w-5 h-5">
                  <CircleCheckBig size={20} color="#c20016" />
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

export default function Amc() {
  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/service/amc");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {fetchAllData.slice(0, 1).map((item) => (
          <h1 key={item._id} className="text-center">
            {item.heading}
          </h1>
        ))}

        <div className="bg-white mt-5 shadow-xs rounded-2xl p-3 lg:p-8 max-w-4xl mx-auto">
          {fetchAllData.slice(1, 2).map((item) => (
            <div key={item._id}>
              <p className="text-gray-600 mb-6 text-center lg:!text-left ">
                {item.heading}
              </p>

              <div className="amc-points space-y-4 text-gray-700">
                <RenderData html={item.points} />
              </div>
            </div>
          ))}

          <div className="my-8 border-t border-gray-200"></div>

          <div className="grid md:grid-cols-2 gap-6">
            {fetchAllData.slice(2).map((item) => (
              <div key={item._id} className="p-4 bg-red-50 rounded-xl">
                <h3 className="mb-2 !text-[#c20016]">{item.heading}</h3>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
