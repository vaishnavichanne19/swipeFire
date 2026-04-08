import Link from "next/link";
import Image from "next/image";

async function getHeroSecData() {
  const res = await fetch("http://localhost:3000/api/home/herosec", {
    cache: "no-store",
  });

  return res.json();
}

export default async function HeroSection() {
  const res = await getHeroSecData();
  const alldata = res.data;

  return (
    <main className="container-fluid hero-section py-5">
      <div className="container hero-container relative ">
        <div className="des1" data-aos="fade-right" data-aos-duration={1500}>
          <Image src="/img/Group 32.svg" alt="" width={100} height={100} />
        </div>
        <div className="des2" data-aos="fade-left" data-aos-duration={1500}>
          <Image src="/img/OBJECTS.svg" alt="" width={100} height={100} />
        </div>
        {alldata.map((data) => (
          <div
            key={data._id}
            className="text-center py-5"
            data-aos="fade-up"
            data-aos-duration={1500}
          >
            <h1>
              {data.heading.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={index === 3 ? "text-[#D42427]" : ""}
                >
                  {word}{" "}
                </span>
              ))}
            </h1>

            <div
              className="px-2.5 lg:!px-20 py-0 lg:!py-10 text-xl"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />

            <div className="red-full-border-button">
              <Link href="#home-products">Find Your Extinguisher</Link>
            </div>
          </div>
        ))}
        <div className="des3" data-aos="fade-up-right" data-aos-duration={1500}>
          <Image src="/img/Group 33.svg" alt="" width={100} height={100} />
        </div>
        <div className="des4" data-aos="fade-up-right" data-aos-duration={1500}>
          <Image src="/img/Group 34.svg" alt="" width={100} height={100} />
        </div>
      </div>
    </main>
  );
}
