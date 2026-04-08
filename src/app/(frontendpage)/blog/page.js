"use client";

import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [fetchBlogList, setFetchBlogList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blog/bloglist");
        setFetchBlogList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [activeCategory, setActiveCategory] = useState("All Blog");

  const filteredBlogs =
    activeCategory === "All Blog"
      ? fetchBlogList
      : fetchBlogList.filter((blog) =>
          blog.blogtype?.some(
            (type) =>
              type.toLowerCase().trim() === activeCategory.toLowerCase().trim(),
          ),
        );

  const categories = [
    "All Blog",
    ...Array.from(
      new Map(
        fetchBlogList
          .flatMap((blog) => blog.blogtype || [])
          .map((type) => [type.toLowerCase().trim(), type.trim()]),
      ).values(),
    ),
  ];

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/blog/blogdata");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const limitWords = (html, wordLimit) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };
  return (
    <main>
      <div className="blog-sec container-fluid bg-[#F6F3EC] relative  px-0 lg:!px-5 div-spread">
        <div className="blog-banner-wrapper">
          <div className="blog-scroll">
            <Image
              src="img/Group 232.svg"
              alt="Blog Banner"
              width={100}
              height={100}
            />
            <Image
              src="img/Group 232.svg"
              alt="Blog Banner"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="container blog-para">
          <div className="row flex items-center">
            {fetchAllData
              .filter((user) => user._id === "69b16becab3c58e313bc6f39")
              .map((data) => (
                <div
                  key={data._id}
                  className="col-lg-7 col-md-7 col-sm-12  pt-21 md:!pt-27"
                >
                  <h1
                    className="!text-[#C20016]"
                    data-aos="fade-up-right"
                    data-aos-delay={100}
                  >
                    {data.heading}
                  </h1>

                  <h5
                    className="my-4"
                    data-aos="fade-up-right"
                    data-aos-delay={200}
                  >
                    <b>{data.subheading}</b>
                  </h5>
                  <div
                    className="text-[#424242] [&_*]:!text-[#424242] lg:!text-[#575757] lg:[&_*]:!text-[#575757]"
                    data-aos="fade-up-right"
                    data-aos-delay={300}
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                  ></div>

                  <div
                    className="red-half-border-button mt-5"
                    data-aos="fade-up-right"
                    data-aos-delay={400}
                  >
                    <Link href="/contact">Get Fire Safety Tips</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="container div-spread">
        <div className="flex flex-wrap gap-2 lg:!gap-4  justify-center items-center">
          {categories.map((cat, index) => (
            <button
              key={cat + index}
              onClick={() => setActiveCategory(cat)}
              className={`py-2.5 px-5 border-1 border-red-700 !text-xl font-medium !rounded-3xl transition-all duration-0.5s ${
                activeCategory === cat
                  ? "bg-[#C20016] text-white"
                  : "text-[#C20016] bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="div-spread">
          <div className="row flex justify-cente">
            {filteredBlogs.map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12 my-4"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="blog-cards">
                  <article className="blog-post">
                    <div className="blog-img">
                      <a className="blog-url ">
                        <Image
                          src={data.blogimg}
                          alt={data.heading}
                          width={500}
                          height={500}
                        />
                      </a>
                      <p className="post-meta">
                        <span className="published">
                          {new Date(data.date).toLocaleDateString(
                            "en-US",

                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                        |{" "}
                      </p>
                    </div>
                    <div className="p-3">
                      <h5 className="mt-4 mb-3">
                        <b>{data.heading}</b>
                      </h5>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: limitWords(data.description, 20),
                        }}
                      ></p>

                      <div>
                        <Link href={`/blog/` + data._id}>
                          <button className="read-more-red-bg">
                            <span className="circle-red-bg" aria-hidden="true">
                              <span className="icon-red-bg arrow-red-bg" />
                            </span>
                            <span className="button-text-red-bg">
                              Read More
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="div-spread px-2 lg:!px-5">
        <div className="container-fluid">
          <div className="flex gap-20 flex-col md:!flex-row items-center">
            <div className="col-lg-4 col-md-4 col-sm-12">
              {fetchAllData
                .filter((user) => user._id === "69b16c47ab3c58e313bc6f3d")
                .map((data) => (
                  <div
                    key={data._id}
                    className="Professional-img w-80 lg:!w-full"
                    data-aos="zoom-in"
                  >
                    <Image
                      src={data.blogimage}
                      alt="Blog"
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="Professional-para">
                {fetchAllData
                  .filter((user) => user._id === "69b16c47ab3c58e313bc6f3d")
                  .map((data) => (
                    <div key={data._id}>
                      <h2>{data.heading}</h2>
                      <p
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      ></p>
                    </div>
                  ))}

                {fetchAllData
                  .filter((user) => user._id === "69b16c4eab3c58e313bc6f3f")
                  .map((data) => (
                    <div key={data._id} className="my-5">
                      <h4>
                        <b className="text-[#C20016]">{data.heading}</b>
                      </h4>
                      <ul
                        className="list-disc text-[#575757] [&_*]:!text-[#575757] [&_ul]:list-disc  !pl-0 mt-3"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      ></ul>
                    </div>
                  ))}
                <div className="red-full-border-button">
                  <Link href="/contact">Connect for Safety</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Ready to secure your space?
              </span>
            </h1>
            <p className="px-5 py-2">
              <span className="text-[#FFFFFF]">
                Book a free consultation today. Our certified experts are ready
                to assess your fire safety needs.{" "}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 items-center m-5">
            <div className="button-white-rounded-bg" data-aos="fade-up">
              <Link href="/contact">Schedule Visit</Link>
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
    </main>
  );
};

export default Blog;
