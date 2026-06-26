"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import parse, { domToReact } from "html-react-parser";

function RenderData({ html, search }) {
  let count = 0;

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

            count++;

            return (
              <div className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#fff5f5] transition-colors group">
                <span className="text-xs font-bold text-[rgb(134,134,134)] w-6 shrink-0 group-hover:text-[#c20016] transition-colors">
                  {String(count).padStart(2, "0")}
                </span>
                <span className="shrink-0">
                  <svg
                    className="w-3.5 h-3.5 text-[#c20016]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-[#1a191d] text-sm leading-relaxed flex-1">
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

export default function MachineryListPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/resource/machinery");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filtered = fetchAllData
    .slice(1)
    .filter(
      (cat) =>
        activeCategory === null ||
        cat?.category?.trim()?.toLowerCase() ===
          activeCategory?.trim()?.toLowerCase(),
    );

  const totalMachines = fetchAllData.reduce((acc, cat) => {
    const matches = cat?.items?.match(/<li/gi) || [];

    return acc + matches.length;
  }, 0);

  return (
    <main className="div-spread">
      {/* ── Hero Banner ── */}
      <section className="container-fluid px-6 pt-8 pb-10">
        <div className="relative bg-[#1a191d] overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 36px)",
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c20016]" />

          <div className="relative px-8 py-12 md:px-14 flex flex-col md:flex-row md:items-center gap-8">
            {fetchAllData.slice(0, 1).map((data) => (
              <div className="flex-1" key={data._id}>
                <h1 className="!text-[#fefeff] text-4xl md:text-5xl font-extrabold leading-tight mb-3 tracking-tight">
                  {data?.heading?.split(" ").map((word, idx) => (
                    <span
                      key={idx}
                      className={`${idx === data?.heading?.split(" ").length - 1 ? "text-[#c20016]" : "text-white"}`}
                    >
                      {" " + word}
                    </span>
                  ))}
                </h1>
                <p className="leading-relaxed max-w-md">{data.description}</p>
              </div>
            ))}

            <div className="flex gap-4 md:flex-col md:gap-3 shrink-0">
              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-4 text-center">
                <p className="text-[#c20016] text-3xl font-extrabold">
                  {totalMachines}+
                </p>
                <p className="text-[rgba(255,255,255,0.45)] text-xs mt-0.5">
                  Machines Listed
                </p>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-4 text-center">
                <p className="text-[#c20016] text-3xl font-extrabold">
                  {fetchAllData.slice(1).length}
                </p>
                <p className="text-[rgba(255,255,255,0.45)] text-xs mt-0.5">
                  Categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search + Filter ── */}
      <section className="container div-spread">
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs px-4 py-1.5 rounded-full border font-medium transition-all ${
              activeCategory === null
                ? "bg-[#1a191d] text-[#fefeff] border-[#1a191d]"
                : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#1a191d]"
            }`}
          >
            All
          </button>
          {fetchAllData.slice(1).map((cat) => (
            <button
              key={cat._id}
              onClick={() =>
                setActiveCategory(cat?.category?.trim()?.toLowerCase())
              }
              className={`text-xs px-4 py-2  rounded-full border ${
                activeCategory === cat?.category?.trim()?.toLowerCase()
                  ? "bg-[#c20016] text-white"
                  : ""
              }`}
              style={{ textTransform: "uppercase" }}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </section>

      {/* ── Machinery List ── */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-[rgb(134,134,134)] text-sm">
            No machinery found for &ldquo;{search}&rdquo;
          </div>
        ) : (
          <div className="grid gap-5">
            {filtered.map((cat) => (
              <div
                key={cat._id}
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-[#1a191d] px-6 py-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#c20016] shrink-0" />
                  <h5 className="!text-[#fefeff] tracking-wide uppercase">
                    {cat.category}
                  </h5>
                  <span className="ml-auto bg-[rgba(194,0,22,0.2)] text-[#ff5555] text-xs px-2.5 py-0.5 rounded-full font-medium">
                    {(cat?.items?.match(/<li/gi) || []).length} items
                  </span>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-50">
                  <RenderData html={cat.items} search={search} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
