"use client";

import Image from "next/image";

export default function MFSPage() {
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
        Government Certified
      </p>
      <h3 className=" mb-1">
        Fire Safety License
      </h3>
      <p className="leading-relaxed">
        Authorized Class-A Licensing Agency from Maharashtra Fire Services.
      </p>
    </div>

  </div>
</section>
    </main>
  );
}
