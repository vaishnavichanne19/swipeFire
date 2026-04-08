import Image from "next/image";
import Link from "next/link";

async function getAboutData() {
  const res = await fetch("http://localhost:3000/api/home/homeabout", {
    cache: "no-store",
  });

  return res.json();
}

export default async function About() {
  const res = await getAboutData();
  const alldata = res.data;

  return (
    <div className="container bg-[#CCA47F] relative pt-0 lg:!pt-5">
      {alldata.map((data) => (
        <div key={data._id} className="div-spread row">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="home-about-img  relative">
              <Image
                src={data.homeaboutimage}
                alt={data.heading}
                width={400}
                height={400}
                data-aos="zoom-in"
                data-aos-duration={1500}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 flex justify-center items-end">
            <div>
              <div>
                <h2 className="!text-[#fefeff] underline mx-5">
                  {data.heading}
                </h2>
                <div className="home-about-para">
                  <h5>{data.description}</h5>

                  <div className="red-full-border-button mt-5">
                    <Link href="/contact">Get in touch today</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
