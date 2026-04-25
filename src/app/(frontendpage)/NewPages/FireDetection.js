"use client";


import { useState } from "react";

const systems = [
  {
    title: "Conventional Fire Alarm System",
    description:
      "A conventional fire alarm system uses one or more circuits, connected to sensors wired in parallel. Each device is connected to the control panel with its own wire. You will find one end of the wire connected to the device, and another connected to the control panel.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    title: "Automatic Fire Alarm System",
    description:
      "Automatic Fire Alarm Systems are intended to notify the building occupants to evacuate in the event of a fire or otheremergency, report the event to an off-premises location in order to summon emergency services, and to prepare the structure and associated systems to control the spread of fire and smoke.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        <line x1="12" y1="2" x2="12" y2="4" />
      </svg>
    ),
  },
];



export default function FireDetectionPage() {
  const [activeSystem, setActiveSystem] = useState(0);

  return (
    <main className="div-spread">
      <section className="container">
        <h2>Fire Detection System</h2>

        <div className="border-l-4 border-[#c20016] bg-[#fafafa] rounded-r-xl mt-4 px-6 py-4">
          <p className="text-[rgb(134,134,134)] text-sm leading-loose">
            Fire detectionsystems are essential components of aresponsiblesafetymanagementconcept.
            Each objectand each areaof useholdsspecial risksand requirements.Fireplan Systemsprovides the
            optimum detection of fires. An automatic fire alarm system is designed to detect the unwanted
            presence of fire by monitoring environmental changes associated with combustion. In general, a
            fire alarm system is classified as either automatically actuated, manually actuated, or both.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-12 mt-5">
        <p className=" font-semibold tracking-[2px] uppercase text-[#c20016] mb-3">
          Types of Fire Alarm Systems
        </p>

   
        <div className="flex gap-2 mb-5 flex-wrap">
          {systems.map((s, i) => (
            <button
              key={s.title}
              onClick={() => setActiveSystem(i)}
              className={`text-sm px-5 py-2.5 rounded-full border font-medium transition-all duration-200 ${activeSystem === i
                  ? "bg-[#c20016] text-[#fefeff] border-[#c20016]"
                  : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#c20016] hover:text-[#c20016]"
                }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        <div className="bg-[#1a191d] rounded-2xl p-8 md:p-10 flex gap-6 items-start transition-all duration-300">
          <div className="text-[#c20016] bg-white rounded-full p-2 flex items-center justify-center mt-1 shrink-0">{systems[activeSystem].icon}</div>
          <div>
            <h3 className="!text-[#fefeff] text-lg font-semibold mb-3">
              {systems[activeSystem].title}
            </h3>
            <p className="!text-[rgba(255,255,255,0.55)] text-sm leading-loose">
              {systems[activeSystem].description}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}