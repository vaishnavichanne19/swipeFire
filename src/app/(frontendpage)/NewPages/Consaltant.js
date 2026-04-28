import { CheckIcon } from "lucide-react";


const designingItems = [
  "Yard Hydrant System",
  "Sprinkler System",
  "Wet Risers / Dry Risers / Down Comers System",
  "Gas Suppression Systems",
  "Manually Operated Alarm System",
  "Automatically Operated Alarm System",
];

const additionalNotes = [
  "Complete details of installation will be provided without drawing file.",
  "Technical data & Equipment sheets will be provided.",
  "BOQ will be designed as per drawings.",
];

const complianceDepts = [
  "Industrial Areas: MIDC",
  "City Areas: Municipal Corporation Fire Department",
  "Gramin Areas: Marathi Municipal Corporation",
  "Other States: Desired Fire Departments",
];


const complianceServices = [
  {
    label: "Compliance Documents",
    desc: "Procurement of compliance documents from concern department will be provided.",
    points: complianceDepts,
  },
  {
    label: "Provisional & Final NOC",
    desc: "Provides Provisional & Final NOC with approvals.",
    points: [],
  },
  {
    label: "Form A & B",
    desc: "We will provide Form A & B with complete Fire System Installation.",
    points: [],
  },
  {
    label: "Renewal of Form B ",
    desc: "We also provide renewal of Form B after Fire System's Health Checkup.",
    points: [],
  },
];


export default function ConsultantPage() {
  return (
   
    <main className="div-spread">
      <section className="bg-[#f4f4f4]  py-14">
        <div className="container px-4">

          <h2 className="text-[#1a191d] font-extrabold text-2xl md:text-3xl mb-1">
            We as Consultant
          </h2>
          <p className="text-[rgb(134,134,134)] text-sm mb-10">
           We as Consultant Provides ....
          </p>

          {/* ── DESIGNING ──────────────────────────────────────── */}
          <div className="my-10 ">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-11 h-11 bg-[#c20016] rounded flex items-center justify-center">
                <svg className="w-5 h-5 fill-[#fefeff]" viewBox="0 0 24 24">
                  <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#1a191d] font-bold text-xl leading-none">
                  Designing
                </h3>
                <div className="w-8 h-[3px] bg-[#c20016] rounded mt-1.5" />
              </div>
            </div>

            <p className="text-[rgb(134,134,134)] text-sm leading-relaxed mb-5">
             We provide complete designing solutions for all firefighting & fire detecting systems as per
NBC, which includes:
            </p>

            {/* system cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
              {designingItems.map((item) => (
                <div
                  key={item}
                  className="bg-[#fefeff] border border-gray-200  rounded px-4 py-3 flex items-start gap-2 hover:shadow-md transition-shadow duration-200"
                >
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-[#c20016] flex-shrink-0" />
                  <span className="text-[#1a191d] text-title-md font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* additional notes */}
            <ul className="space-y-2.5 !pl-0">
              {additionalNotes.map((note) => (
                <li
                  key={note}
                  className="flex items-start gap-3 bg-[#fefeff] border border-gray-200 rounded px-4 py-3  text-gray-500"
                >
                  <span className="w-5 h-5  rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckIcon color="#c20016" size={20} />
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* ── COMPLIANCE DOCUMENTS ──────*/}
          <div className="div-spread ">
            <div className="flex items-center gap-4 mb-5">
             <div className="w-11 h-11 bg-[#c20016] rounded flex items-center justify-center">
                <svg className="w-5 h-5 fill-[#fefeff]" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <div>
                <h3>
                  Compliance Documents
                </h3>
                <div className="w-8 h-[3px] bg-[#c20016] rounded mt-1.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complianceServices.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#1a191d] rounded-md px-4 py-5"
                >
                  <p className="!text-[#c20016]  uppercase mb-2">
                    {item.label}
                  </p>
                  <p className="!text-[rgb(192,191,191)]">
                    {item.desc}
                  </p>
                  {item.points.length > 0 && (
                    <ul className="mt-3 space-y-1 !pl-0">
                      {item.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-[rgb(192,191,191)] text-xs"
                        >
                          <span className="text-[#c20016] mt-0.5">›</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
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