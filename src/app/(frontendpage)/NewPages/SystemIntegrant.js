"use client";

import { useState } from "react";

const services = [
  {
    id: "hydrant",
    category: "Active Fire Protection",
    title: "Hydrant System",
    intro:
      "Fire hydrant system is a safety measure or emergency equipment required in buildings that comprises a series of components that when assembled together provide a source of water to assist fire.",
    details: [
      "A fire hydrant is an active fire protection measure, and a source Of water provided in most urban, suburban and rural areas with municipal water service to enable firefighters to tap into the municipal water supply to assist in extinguishing a fire. It works effectively in improving the firefighting capacity of a place where it is installed. Apart from firefighting purpose, these hydrated systems are also used in several other applications such as water transfer, irrigation",
      "Such systems fight with the fire using well designed water distribution system that includes water tank and fire pumps. It also has distributed piping system which is connected all over the building using the pipes, nozzles and hydrants. The main purpose of using fire hydrant system is to give best possible source of water to each corner of the building. It helps in protecting the building by simply making control on fire during an emergency.",
    ],

    subItems: [
      { label: "WET RISER", desc: "A Wet riser is a supply system intended to distribute water to multiple levels or compartments of a building, as a component of its firefighting systems." },
      {
        label: "DOWN COMER",
        desc: "An arrangement of firefighting within the building by means of down-comer pipe connected to terrace tank through terrace pump, gate valve and non-return valve and having mains not less than 100 mm internal diameter with landing valves on each floor/landing.",
      },
      {
        label: "YARD RING",
        desc: "External hydrants Hose houses or hose boxes shall be located all around the periphery of buildings.",
      },
    ],
  },
    {
    id: "sprinkler",
    category: "Active Fire Protection",
    title: "Sprinkler System",

    intro:
      "Sprinkler systems are self-acting fire extinguishing systems having an uncomplicated as well a safe functioning principle. A network of piping and sprinkler heads is installed throughout the areas of the building requiring protection and is constantly under pressure.",
    details: [
        "Under normal conditions the sprinkler head is closed off by a liquid filled bulb. If due to the effects of a fire, the ambient temperature in the immediate vicinity rises by approximately 30 oc above the maximum temperature expected under normal conditions, the glass bulb bursts. The pressurized extinguishing water then flows through the piping into the sprinkler head and the resulting water jet hits the spray plate which diverts the spray to the areas to be covered. At the same time the water flow in the piping network trips the alarm systems. When the fire is extinguished, you replace the sprinkler that was activated and the system is ready for operation again.",
        "The different types of systems, such as wet or dry systems or pre-controlled dry systems, are adapted to meet specific criteria, for instance places prone to frost or special risk areas."
    ],
    subItems: [],
  },
  {
    id: "extinguisher",
    category: "Active Fire Protection",
    title: "Fire Extinguishers",
    intro:
    "SWIPE FIRE SOLUTION PVT LTD manufacturing For all fire classifications (A, B, C, D, F), ideal fire extinguishers Mobile fire extinguishers from 1-12 kg or liters.",
    details: [],
    subItems: [
        { label: "Foam fire extinguishers", desc: "" },
        { label: "Foam Cartridge  extinguishers", desc: "" },
        { label: "Powder (ABC) Fire extinguishers", desc: "" },
        { label: "Carbon dioxide fire extinguishers", desc: "" },
      { label: "Water Fire extinguishers", desc: "" },
      { label: "Water mist fire extinguishers", desc: "" },
    ],
  },
  {
    id: "doors",
    category: "Passive Fire Protection",
    title: "Fire Doors",
    intro:
      "A ire door is a door witha ire-resistance rating sometimes re erred to asa ire protection rating for closures) used as part of a passive fire protection system to reduce the spread of fire and smoke between separate compartments of a structure and to enable safe egress from a building or structure or ship.",
    details: [],
    subItems: [],
  },
  {
    id: "shaftdoor",
    category: "Passive Fire Protection",
    title: "Fire Shaft Door",
    intro:
      "There are many means-resistant systems used to ensure the safety in buildings. As well as emergency exit doors and fire escapes, doors that are used to protect electrical and mechanical installations and to prevent dangers from reflecting out are called shaft doors.",
    details: [],
    subItems: [],
  },

  {
    id: "signage",
    category: "Passive Fire Protection",
    title: "Signages",
    intro:
      "  A sign giving information on emergency exits, first aid, or rescue facilities (e.g., \"Emergency Exit\") These information signs should be used to indicate escape routes, emergency exits and first aid equipment.",
    details: [
      "The purpose of having safety signage in the workplace or residential area is to identify and warn workers or peoples who may be exposed to hazards in the workplace or residential areas. Safety signs can assist in the communication of important instructions, reinforce safety messages and provide instruction for emergency situations.",
      "Safety signs are vitally important to remind employees/ peoples to be careful and remain alert at all times to any potential hazards that exist at the workplace or residential areas. Activate Win",
    ],
    subItems: [],
  },
  {
    id: "suspension",
    category: "Fire Suspension Systems",
    title: "Fire Suspension Systems",
    intro:
      "With the increasing demand for fire protection of critical assets, assessing the risk from fire, providing the correct system to meet the customer's protection requirements requires experience and knowledge.",
    details: [
      "Swipefire has developed the expertise to undertake all types Of projects for the provision and installation of fire suppression systems as specialist providers. From kitchen fire suppression systems to server room fire suppression, we design and install systems to the requirements specified by our clients.",
      "Our Fire Suppression capability covers a wide range of systems, including: • Water • Water mist • Foam • Foam mist • Dry chemical • C02 • Argon • Tube technology",
    ],
    subItems: [],
  },
  {
    id: "watercurtain",
    category: "Water Curtain Systems",
    title: "Water Curtain Systems",
    intro:
      "Water Curtain systems constitute a set Of nozzles that are mounted radially to diffuse water at high pressure during fire accidents. This system best prevents the spread Of fire across walls, windows, and ceiling thus preventing total unwanted damage in the space.",
    details: [
      "The discharge and distribution of water is uniform in high-velocity water curtain systems or otherwise known as sprayers. These nozzles are usually connected to water, air or pressurized nitrogen sources through which a deluge valve is opened which fire detection systems raise an alarm. Nozzles are usually mounted in the horizontal position facing opposite to the ground and these nozzles which are used in high-velocity water spray systems are also called projectors.",
    ],
    subItems: [],
  },
];

const categories = [
  "All",
  "Active Fire Protection",
  "Passive Fire Protection",
  "Fire Suspension Systems",
  "Water Curtain Systems",
];

export default function SystemIntegrantPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <main className="div-spread">
        <div className="container">
          <div>

            <h1>
              We as System <span className="text-[#c20016]">Integrant</span>
            </h1>
            <p >
          We as System Integrant Provides Complete Installation of....
            </p>
          </div>

      <section className="my-5">
        <div className="flex justify-center items-center flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-4 py-2 rounded-full border font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#c20016] text-[#fefeff] border-[#c20016]"
                  : "bg-[#fefeff] text-[rgb(134,134,134)] border-gray-200 hover:border-[#c20016] hover:text-[#c20016]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid gap-5">
          {filtered.map((svc) => (
            <div
              key={svc.id}
              className="border border-gray-100 rounded-2xl overflow-hidden"
            >
              {/* Card Header */}
              <button
                className="w-full bg-[#1a191d] px-6 py-4 flex items-center gap-4 text-left hover:bg-[#222] transition-colors"
              >
             
                <div className="flex-1">
                  <span className="text-[rgba(255,255,255,0.4)] text-[10px] font-bold tracking-[1.5px] uppercase block mb-0.5">
                    {svc.category}
                  </span>
                  <h3 className="!text-[#fefeff]">{svc.title}</h3>
                </div>
             
              </button>

              {/* Card Body */}
          
                <div className="px-6 py-6 bg-[#fafafa] border-t border-gray-100">
            
                  {svc.intro && (
                    <div className="border-l-4 border-[#c20016] pl-4 mb-5">
                      <p>{svc.intro}</p>
                    </div>
                  )}

                  {svc.details.map((d, i) => (
                    <p key={i} className="mb-4">
                      {d}
                    </p>
                  ))}

                  {/* Sub Items */}
                  {svc.subItems.length > 0 && (
                    <div className="grid gap-3 mt-2">
                      {svc.subItems.map((sub, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-[#fefeff] border border-gray-100 rounded-xl px-4 py-3"
                        >
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
                            {sub.label && (
                              <span className="text-[#c20016] text-xs font-bold uppercase tracking-wide">
                                {sub.label}
                                {sub.desc ? ": " : ""}
                              </span>
                            )}
                            {sub.desc && (
                              <span className="text-[rgb(134,134,134)] text-sm leading-relaxed">
                                {sub.desc}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
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