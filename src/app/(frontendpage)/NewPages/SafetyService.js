"use client";

import { ArrowRight, Star } from "lucide-react";
import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Designing",
    items: [
      "Firefighting & Detection System Designing",
      "BOQ Designing",
      "Technical Equipment Data",
    ],
  },
  {
    id: 2,
    title: "Procurement of Compliance Documents",

    items: ["Provisional Fire NOC & Final Fire NOC", "Issuances of Form A & B"],
  },
  {
    id: 3,
    title: "System Integration",
    items: [
      "Active Fire Protection System",
      "Passive Fire Protection System",
      "Fire Alarm System",
    ],
  },
  {
    id: 4,

    title: "Training Programs",

    items: ["System Awareness", "System Maintenance", "Role Play"],
  },
  {
    id: 5,
    title: "We Provide AMC",
    items: [
      "It includes complete maintenance of system with documentation & Training Programs.",
    ],
  },
];

export default function SafetyServices() {
  const [activeCard, setActiveCard] = useState(null);

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
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p className="!text-[#c20016] flex items-center justify-center gap-2 ">
            <Star /> Our Consultancy
          </p>
          <h1 className="text-white">
            SAFETY IS OUR <span className="text-[#c20016]">PRIORITY</span>
          </h1>
          <p>
            We provide complete Fire Fighting & Safety Services from Designing
            to Commissioning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
              className={`flex flex-col gap-3 border  h-full transition-all duration-500 p-5 rounded-xl
             ${activeCard === service.id ? "bg-[#1a1a1a]" : "bg-[#111111]"} `}
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
                  color: activeCard === service.id ? "#e53e3e" : "#ffffff",
                }}
              >
                {service.title}
              </h5>

              {/* Items */}
              <ul className="m-0 p-0">
                {service.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="relative flex items-start py-1 gap-2  text-gray-400 !text-sm"
                  >
                    <ArrowRight className="text-[#c20016] " />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
