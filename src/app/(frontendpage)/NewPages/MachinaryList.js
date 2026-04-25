"use client";

import { useState } from "react";

const machineryData = [
  {
    category: "Drilling & Rolling Machines",
    items: [
      { name: "Working Machine 3000rpm Universal Make" },
      { name: "Chain Saw Cutter Machine" },
      { name: "Plate Rolling Machine – Capacity 20mm thick x 2000mm Width, Make: Raja Machinery" },
      { name: "Pillar Drill No. 25mm" },
      { name: "Pillar Drill No. 13mm" },
    ],
  },
  {
    category: "Welding Machines",
    items: [
      { name: "Welding Rectifier 400Amp Odha Make" },
      { name: "Working Machine 3000rpm – Universal Make" },
      { name: "Working Machine 3000rpm – Crane Make" },
      { name: "Working Machine 3000rpm – World Tech Make" },
      { name: "TIG Welding Rectifier L&T Make" },
    ],
  },
  {
    category: "Hand Tools & Grinders",
    items: [
      { name: "Hand Grinder – AKG, OTT, DeWalt" },
      { name: "Hand Scanner 4\" Makit" },
      { name: "Magnetic Drill Machine 35mm OTT Make" },
      { name: "Hand Drill Machine 13mm OTT" },
      { name: "Bench Grinder" },
    ],
  },
  {
    category: "Cutting & Lifting",
    items: [
      { name: "Concrete Drill Machine 25mm" },
      { name: "Chain Pulley Block 1MT" },
      { name: "Chain Pulley Block 1.5MT" },
      { name: "Chain Pulley Block 5MT" },
      { name: "Argon Set" },
      { name: "Gas Cutting Set" },
      { name: "Gas Cutting K/G" },
    ],
  },
  {
    category: "Ropes & Compressors",
    items: [
      { name: "Air Compressor 10 CFM" },
      { name: "Nylon Ropes 1\"" },
      { name: "Manila Rope 5\"" },
    ],
  },
  {
    category: "Hydraulic & Testing",
    items: [
      { name: "Radial Drill 20mm 2 Motul Alfa Bed" },
      { name: "Flexible Wrench 3HP" },
      { name: "Hydraulic Testing Machine (Pump 60 Kg/cm²)" },
      { name: "Hydraulic Testing Machine (Pump 250 Kg/cm²)" },
    ],
  },
  {
    category: "Ovens & Misc Equipment",
    items: [
      { name: "Electric Oven 2 KW ATT for Welding Electrode" },
      { name: "Rope Clamp 1/2\", 1\"" },
      { name: "Masher – Owens 30 Kg" },
      { name: "Portable Testing Machine" },
      { name: "Portable Grinder 2HP" },
    ],
  },
];

const totalMachines = machineryData.reduce((acc, cat) => acc + cat.items.length, 0);

export default function MachineryListPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = machineryData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(
      (cat) =>
        (activeCategory === null || cat.category === activeCategory) &&
        cat.items.length > 0
    );

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
            <div className="flex-1">
              <h1 className="!text-[#fefeff] text-4xl md:text-5xl font-extrabold leading-tight mb-3 tracking-tight">
                Machinery <span className="text-[#c20016]">List</span>
              </h1>
              <p className="leading-relaxed max-w-md">
                Complete inventory of fire safety machinery and equipment used by Swipe Fire
                for installation, inspection, and maintenance services.
              </p>
            </div>

            <div className="flex gap-4 md:flex-col md:gap-3 shrink-0">
              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-4 text-center">
                <p className="text-[#c20016] text-3xl font-extrabold">{totalMachines}+</p>
                <p className="text-[rgba(255,255,255,0.45)] text-xs mt-0.5">Machines Listed</p>
              </div>
              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-xl px-6 py-4 text-center">
                <p className="text-[#c20016] text-3xl font-extrabold">{machineryData.length}</p>
                <p className="text-[rgba(255,255,255,0.45)] text-xs mt-0.5">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search + Filter ── */}
      <section className="container div-spread">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(134,134,134)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search machinery..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1a191d] placeholder:text-[rgb(134,134,134)] focus:outline-none focus:border-[#c20016] bg-[#fefeff]"
            />
          </div>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="text-xs text-[#c20016] border border-[#c20016] px-4 py-2.5 rounded-xl hover:bg-[#c20016] hover:text-white transition-colors"
            >
              Clear Filter ✕
            </button>
          )}
        </div>

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
          {machineryData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`text-xs px-4 py-1.5 rounded-full border font-medium transition-all ${
                activeCategory === cat.category
                  ? "bg-[#c20016] text-[#fefeff] border-[#c20016]"
                  : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#c20016] hover:text-[#c20016]"
              }`}
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
                key={cat.category}
                className="border border-gray-100 rounded-2xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-[#1a191d] px-6 py-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#c20016] shrink-0" />
                  <h4 className="!text-[#fefeff] tracking-wide uppercase">
                    {cat.category}
                  </h4>
                  <span className="ml-auto bg-[rgba(194,0,22,0.2)] text-[#ff5555] text-xs px-2.5 py-0.5 rounded-full font-medium">
                    {cat.items.length} items
                  </span>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-50">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#fff5f5] transition-colors group"
                    >
                      <span className="text-xs font-bold text-[rgb(134,134,134)] w-6 shrink-0 group-hover:text-[#c20016] transition-colors">
                        {String(idx + 1).padStart(2, "0")}
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
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}