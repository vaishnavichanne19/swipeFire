import Image from "next/image";
import Link from "next/link";
import { Lock, PhoneCall } from "lucide-react";
import { SiTrustpilot } from "react-icons/si";
import Counter from "./Counter";

async function getAboutData() {
  const res = await fetch("http://localhost:3000/api/about/aboutsec", {
    cache: "no-store",
  });

  return res.json();
}

async function getProductionData() {
  const res = await fetch("http://localhost:3000/api/about/production", {
    cache: "no-store",
  });

  return res.json();
}

async function getWhatwedoData() {
  const res = await fetch("http://localhost:3000/api/about/whatwedo", {
    cache: "no-store",
  });

  return res.json();
}

async function getManufactureData() {
  const res = await fetch("http://localhost:3000/api/about/manufacture", {
    cache: "no-store",
  });

  return res.json();
}

async function getCoreValueData() {
  const res = await fetch("http://localhost:3000/api/about/corevalue", {
    cache: "no-store",
  });

  return res.json();
}

export default async function About() {
  const res = await getAboutData();
  const allaboutdata = res.data;

  const prodres = await getProductionData();
  const allproductiondata = prodres.data;

  const whatwoderes = await getWhatwedoData();
  const allwhatwodedata = whatwoderes.data;

  const manufactureres = await getManufactureData();
  const allmanufacturedata = manufactureres.data;

  const corevalueres = await getCoreValueData();
  const allcorevaluedata = corevalueres.data;

  return (
    <div>

      <div className="container-fluid about-bg">
        <div className="container ">
          <div className="about-para">
            {allaboutdata
              .filter((user) => user._id === "69b0fa51b48ff26914dc56a7")
              .map((data) => (
                <div key={data._id} className="text-center">
                  <h1 className="!text-[#FEFEFF]" data-aos="fade-down">
                    {data.heading}
                  </h1>
                  <div
                    className="text-[#fffdfd] [&_*]:!text-[#fffdfd] my-5 mx-3 lg:!mx-30"
                    data-aos="fade-right"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                  <div className="red-full-border-button" data-aos="fade-up">
                    <Link href="/contact">Get in touch</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="container div-spread">
        {allaboutdata
          .filter((user) => user._id === "69b0fbeeb48ff26914dc56c2")
          .map((data) => (
            <div key={data._id} className="row flex items-center">
              <div className="col-lg-5 col-md-5 col-sm-12">
                <div>
                  <div data-aos="zoom-in" className="about-img lg:!mx-4">
                    <Image
                      src={data.aboutimage}
                      alt="Owner Image"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12">
                <div className="text-center lg:!text-left mt-5 lg:!mt-1">
                  <h2>{data.heading}</h2>
                  <div
                    className="mr-1 lg:!mr-15"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                  <div className="red-half-border-button">
                    <Link href="/contact">Joined under his leadership</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="container">
        {allproductiondata.slice(0, 1).map((data) => (
          <h1 key={data._id} className="text-center m-5">
            {data.heading}
          </h1>
        ))}
        <div className="row div-spread">
          {allproductiondata.slice(1).map((data) => (
            <div
              key={data._id}
              className="col-lg-4 col-md-4 col-sm-12 mb-4"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="product-facts text-center m-2">
                <div>
                  <p className="percent-value">
                    <Counter target={Number(data.number)} />
                  </p>
                </div>
                <h4>{data.heading}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="div-spread">
        <div className="container-fluid bg-[#303236] h-auto py-5">
          <div className="container">
            {allaboutdata
              .filter((user) => user._id === "69b10429cf0bf0f2e6975ae9")
              .map((data) => (
                <div key={data._id} className="about-text">
                  <h1 className="!text-[#FFFFFF]" data-aos="fade-up">
                    {data.heading}
                  </h1>
                  <div
                    className="text-[#EBEBEB] [&_*]:!text-[#EBEBEB]"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                </div>
              ))}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="-mt-29 about-fire-img">
                    <Image
                      src="/img/Group 55.svg"
                      alt="fire"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
                {allaboutdata
                  .filter((user) => user._id === "69b1044bcf0bf0f2e6975aeb")
                  .map((data) => (
                    <div key={data._id} data-aos="fade-up">
                      <h3 className="mb-3">{data.heading}</h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="text-center">
                <div className="flex justify-center">
                  <div className="mt-1 md:!-mt-29 lg:!-mt-29 about-fire-img">
                    <Image
                      src="/img/Group 55.svg"
                      alt="fire"
                      width={400}
                      height={400}
                    />
                  </div>
                </div>
                {allaboutdata
                  .filter((user) => user._id === "69b10453cf0bf0f2e6975aed")
                  .map((data) => (
                    <div key={data._id} data-aos="fade-up">
                      <h3 className="mb-3">{data.heading}</h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      ></div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="div-spread">
        <div className="container-fluid px-5">
          {allwhatwodedata.slice(0, 1).map((data) => (
            <h1 key={data._id} className="lg:!mx-7">
              {data.heading}
            </h1>
          ))}

          <div className="row py-5">
            {allwhatwodedata.slice(1).map((data) => (
              <div
                key={data._id}
                className="col-lg-3 col-md-6 col-sm-12 my-3"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="h-100 bg-[#F4F3F8] hover:bg-[#c20016] hover:text-white transition-all duration-0.5s  pt-5 pb-3 px-2 m-2 rounded-3xl relative">
                  <div className="absolute -top-5 -left-5  bg-white rounded-b-4xl">
                    <Image
                      src="/img/fire.svg"
                      alt="What We Do"
                      width={110}
                      height={100}
                    />
                  </div>
                  <h5 className="text-center pt-5">
                    <b>{data.heading}</b>
                  </h5>
                </div>
              </div>
            ))}
          </div>

          <div className="red-half-border-button text-center m-4">
            <Link href="/contact">Get in touch</Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="div-spread relative flex justify-center items-center">
          <div className="fire-team" data-aos="zoom-in">
            {allaboutdata
              .filter((user) => user._id === "69b1132fcf0bf0f2e6975b53")
              .map((data) => (
                <h2 key={data._id} className="!text-[#FEFEFF]">
                  {data.heading}
                </h2>
              ))}
          </div>
          {allaboutdata
            .filter((user) => user._id === "69b11335cf0bf0f2e6975b55")
            .map((data) => (
              <div key={data._id} className="our-team-point our-team-point1">
                <h5>
                  <b>{data.heading}</b>
                </h5>
              </div>
            ))}

          {allaboutdata
            .filter((user) => user._id === "69b11339cf0bf0f2e6975b57")
            .map((data) => (
              <div key={data._id} className="our-team-point our-team-point2">
                <h5>
                  <b>{data.heading}</b>
                </h5>
              </div>
            ))}

          {allaboutdata
            .filter((user) => user._id === "69b1133ecf0bf0f2e6975b59")
            .map((data) => (
              <div key={data._id} className="our-team-point our-team-point3">
                <h5>
                  <b>{data.heading}</b>
                </h5>
              </div>
            ))}

          {allaboutdata
            .filter((user) => user._id === "69b11342cf0bf0f2e6975b5b")
            .map((data) => (
              <div key={data._id} className="our-team-point our-team-point4">
                <h5>
                  <b>{data.heading}</b>
                </h5>
              </div>
            ))}

          {allaboutdata
            .filter((user) => user._id === "69b11346cf0bf0f2e6975b5d")
            .map((data) => (
              <div key={data._id} className="our-team-point our-team-point5">
                <h5>
                  <b>{data.heading}</b>
                </h5>
              </div>
            ))}
        </div>
      </div>

      <div className="container-fluid manufacture-sec">
        <div className="container py-5">
          {allmanufacturedata.slice(0, 1).map((data) => (
            <h2 key={data._id} className="p-5 text-center text-white">
              {data.heading}
            </h2>
          ))}

          <div className="row text-center">
            {allmanufacturedata.slice(1).map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-4 col-sm-6 col-6 my-3"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="manufacture-card max-1 lg:!mx-3 ">
                  <div className="mb-3 flex justify-center">
                    <SiTrustpilot color="#c20016" size={50} />
                  </div>
                  <h4 className="!text-[#fff]">{data.heading}</h4>
                  <p>{data.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {allcorevaluedata.slice(0, 1).map((data) => (
          <h1 key={data._id} className="text-center py-5">
            {data.heading}
          </h1>
        ))}
        <div className="row div-spread">
          {allcorevaluedata.slice(1).map((data) => (
            <div
              key={data._id}
              className="col-lg-6 col-md-6 col-sm-12"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <div className="flex gap-4 items-center bg-[#FEF2F2] p-3 mx-2 my-3 rounded-2xl">
                <div className="bg-[#E82D20] p-2 rounded-xl">
                  <Lock size={40} strokeWidth={4} color="#FEF2F2" />
                </div>
                <div>
                  <h4 className="!text-[#DA170A]">{data.heading}</h4>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Ready to Secure Your Space?
              </span>
            </h1>
            <p className="px-5 py-2">
              <span className="text-[#FFFFFF]">
                Partner with us for reliable and certified fire safety solutions
                tailored to your needs.
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 items-center m-5">
            <div className="button-white-rounded-bg" data-aos="fade-up">
              <Link href="/contact">Contact Us Today</Link>
            </div>
            <div
              className="button border-2 border-amber-50 rounded-4xl"
              data-aos="fade-up"
            >
              <a href="tel:9956777734" className="flex gap-3">
                <PhoneCall /> 9956777734
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

