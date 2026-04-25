"use client";

const commitments = [
    {
        text: "Ensure that Skilled Workers are provided for installation services which will give Quality Assurance of installed systems.",
    },
    {
        text: "Establishing of Quality Management System confirming of National Standards.",
    },
    {
        text: "Institutionalizing a culture of Getting it Right at First Time.",
    },
    {
        text: "Upgrading our technology continuously to meet expectations of costumers.",
    },
    {
        text: "Planned and structured Maintenance and Training Programs.",
    },
    {
        text: "Delivered the services to our customer of Right Quality at Time, Every time."
    },
];

const pillars = [
    {
        label: "Quality",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
    {
        label: "Reliability",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <polyline points="20 6 9 17 4 12" />
            </svg>
        ),
    },
    {
        label: "Delivery",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
                <rect x="1" y="3" width="15" height="13" rx="1" />
                <path d="M16 8h4l3 5v4h-7V8z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
        ),
    },
];

export default function QualityPolicyPage() {
    return (
        <main className="div-spread">

            {/* ── Hero ── */}
            <section className="container-fluid">
                <div className="relative bg-[#1a191d] overflow-hidden">

                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(45deg,#fff 0px,#fff 1px,transparent 1px,transparent 36px)",
                        }}
                    />

                    <div className="relative px-8 py-14 md:px-16 text-center">
                        <h1 className="!text-[#fefeff] text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
                            QUALITY POLICY
                        </h1>
                        <p className="py-3 max-w-2xl mx-auto">
                            We at  <b className="text-white">SWIPE FIRE SOLUTION PVT LTD </b> are committed to
                            provide full satisfaction to our customers with respect to Quality,
                            Reliability and Delivery and attain Quality Leadership of all the
                            products that are offered by us.
                        </p>

                        {/* 3 pillars */}
                        <div className="flex justify-center gap-4 mt-8 flex-wrap">
                            {pillars.map((p) => (
                                <div
                                    key={p.label}
                                    className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-xl px-5 py-3 text-[#fefeff]"
                                >
                                    <span className="text-[#c20016]">{p.icon}</span>
                                    <span className="text-sm font-semibold">{p.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            <section className="div-spread max-w-5xl mx-auto px-6 pb-12">
                <p className="!text-sm font-bold tracking-[2px] uppercase !text-[#c20016] mb-4">
                    This will be achieved by our total commitment to:
                </p>

                <div className="grid gap-4">
                    {commitments.map((c, i) => (
                        <div
                            key={i}
                            className="group flex items-start gap-5 bg-[#fafafa] border border-gray-100 rounded-2xl px-6 py-4 hover:border-[#c20016] hover:bg-[#fff5f5] transition-all duration-200"
                        >
                            <div className="shrink-0 w-9 h-9 rounded-full bg-[#1a191d] group-hover:bg-[#c20016] transition-colors flex items-center justify-center">
                                <span className="text-[#fefeff] text-xs font-bold">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <div className="flex items-start gap-3 flex-1 pt-1">

                                <p className="leading-relaxed">{c.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </main>
    );
}