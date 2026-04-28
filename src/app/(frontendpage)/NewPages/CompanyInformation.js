"use client";



const aboutPoints = [
    {
        body: "SWIPE FIRE SOLUTION PVT LTD constitutes a full-service provider of Fire and Safety solutions committed to meeting the needs of its customers for protection from fire and to keep them safe.",
    },
    {
        body: "SWIPE FIRE SOLUTION P. LTD has been a firm leader in fire protection Safety through technology in Residential buildings, educational buildings, Institutional building, Assembly buildings, Mercantile buildings, Business buildings, Industrial buildings, Storage buildings, Hazardous buildings - wherever there is a risk of fire.",
    },
    {
        body: "SWIPE FIRE has a range of individual solutions to ensure optimal protection for people, machines, buildings and the environment. As a nationally active provider of integrated solutions, Fire Plan Systems offers all fire protection concepts from one single supplier from simple fire extinguishers, DRY& WET RISERS, all the way to the most cutting-edge sprinkler systems from designing to commissioning.",
    },
    {
        body: "Our quality is tested regularly - for us, a matter of course; for our clients and many admission entities, the guarantee for safe fire protection solutions which comply with all applicable regulations.",
    },
    {
        body: "We deal with designing to commissioning.",
    },
];

const missionPoints = [
    "SWIPE FIRE P. LTD mission is to provide health and safety environment to our client.",
    "Our mission is to provide the highest standard of products and services and exceed the requirements of its customers at all times.",
    "Todelivers assured quality and reliability to all its customers at all times.",
];

export default function CompanyInfoPage() {
    return (
        <main className="div-spread">

            <section className="container">
                <h2 className="my-5">
                    COMPANY INFORMATIONS
                </h2>
                <div className="grid gap-2">
                    {aboutPoints.map((pt, i) => (
                        <div
                            key={i}
                            className="flex items-start gap-3"
                        >
                            <svg className="w-5 h-5 text-[#c20016] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <p>{pt.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 pb-10 div-spread">
                <div className="grid md:grid-cols-2 gap-5">

                    {/* Vision */}
                    <div className="bg-[#1a191d] rounded-2xl p-7 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(194,0,22,0.12)] rounded-bl-full" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-[rgba(194,0,22,0.2)] rounded-xl flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#c20016" strokeWidth={1.8} className="w-5 h-5">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </div>
                                <h2 className="!text-[#fefeff]">Our Vision</h2>
                            </div>
                            <p>
                                To be amongst the top 5 leading providers of fire protection, security systems and HVAC systems in India by
                                the end of 2022, with establish operations delivering quality products and services that are suitable for the
                                region, effective and environmentally sustainable.
                            </p>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-[#fafafa] border border-gray-100 rounded-2xl p-7 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(194,0,22,0.05)] rounded-bl-full" />
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-[rgba(194,0,22,0.08)] rounded-xl flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#c20016" strokeWidth={1.8} className="w-5 h-5">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                </div>
                                <h2>Our Mission</h2>
                            </div>
                            <ul className="space-y-3">
                                {missionPoints.map((m, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <svg className="w-4 h-4 text-[#c20016] mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span className="text-[rgb(134,134,134)] text-sm leading-relaxed">{m}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

        </main>
    );
}