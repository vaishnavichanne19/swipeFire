import parse, { domToReact } from "html-react-parser";

function RenderData({ html }) {
  return (
    <div className="space-y-2">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#c20016] mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <p>{domToReact(domNode.children)}</p>
              </div>
            );
          }
        },
      })}
    </div>
  );
}

function RenderMissionData({ html }) {
  return (
    <div className="space-y-2 ">
      {parse(html, {
        replace: (domNode) => {
          if (domNode.name === "li") {
            return (
              <li className="my-2 flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-[#c20016] mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[rgb(134,134,134)] text-sm leading-relaxed">
                  {domToReact(domNode.children)}
                </span>
              </li>
            );
          }
        },
      })}
    </div>
  );
}

async function FetchAllData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/about/compinfo`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function CompanyInfoPage() {
  const res = await FetchAllData();
  const alldata = res.data;

  const heroItem = alldata[0];
  const FirstItem = alldata[1];
  const secondItem = alldata[2];

  return (
    <main className="div-spread">
      <section className="container">
        <h2 className="my-5">{heroItem.heading}</h2>
        <div className="grid gap-2 [&_ul]:!pl-0">
          <RenderData html={heroItem.description} />
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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c20016"
                    strokeWidth={1.8}
                    className="w-5 h-5"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h2 className="!text-[#fefeff]">{FirstItem.heading}</h2>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: FirstItem.description }}
              />
            </div>
          </div>

          {/* Mission */}
          <div className="bg-[#fafafa] border border-gray-100 rounded-2xl p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[rgba(194,0,22,0.05)] rounded-bl-full" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-[rgba(194,0,22,0.08)] rounded-xl flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c20016"
                    strokeWidth={1.8}
                    className="w-5 h-5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h2>{secondItem.heading}</h2>
              </div>
              <ul className="space-y-3 [&_ul]:!pl-0">
                <RenderMissionData html={secondItem.description} />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
