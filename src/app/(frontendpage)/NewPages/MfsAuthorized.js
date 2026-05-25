import Image from "next/image";

async function getHeroSecData() {
  const res = await fetch("http://localhost:3000/api/home/herosec", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MFSPage() {
  const res = await getHeroSecData();
  const alldata = res.data;

  const heroItem = alldata[1];
  return (
    <main className="div-spread">
      <section className="py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 bg-[#fff5f5] rounded-2xl px-8 py-6 border border-red-100">
          {/* Badge Image */}
          <div className="shrink-0 h-24 w-40">
            <Image
              src="/img/mfs.png"
              alt="MFS License"
              width={200}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-14 bg-red-200" />

          {/* Text */}
          <div>
            <p className="!text-xs tracking-widest uppercase !text-[#c20016] font-medium mb-1">
              {heroItem.title}
            </p>
            <h3 className=" mb-1">{heroItem.heading}</h3>
            <div
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: heroItem.description }}
            ></div>
          </div>
        </div>
      </section>
    </main>
  );
}
