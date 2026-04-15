"use client";

import axios from "axios";
import { PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogDetail() {
  const { blogid } = useParams();

  const [ViewData, setViewData] = useState({
    heading: "",
    description: "",
    blogdetail: "",
    blogimg: "",
  });

  useEffect(() => {
    const fetchViewData = async () => {
      try {
        const res = await axios.get(`/api/blog/bloglist/${blogid}`);

        setViewData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (blogid) {
      fetchViewData();
    }
  }, [blogid]);

  return (
    <main>
      <div className="container main-spread">
        <div className="pt-5 pb-3">
          <h1 className="text-center">{ViewData.heading}</h1>
          {ViewData.blogimg && (
            <div className="relative h-120 my-5">
              <Image
                src={ViewData.blogimg}
                alt="Blog"
                fill
                objectFit="contain"
              />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: ViewData.description }}></div>
        </div>

        <div
          className="product-detail-table  overflow-x-auto [&_b]:font-bold [&_b]:!text-[#000000] [&_ul]:!list-disc [&_ul]:!text-[#424242] [&_ol]:!list-decimal [&_ol]:!text-[#000000]"
          dangerouslySetInnerHTML={{ __html: ViewData.blogdetail }}
        ></div>
      </div>

      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Protect your property with expert fire safety solutions.
              </span>
            </h1>
            <p className="px-5 py-2">
              <span className="text-[#FFFFFF]">
                Contact Swipe Fire today for a professional safety assessment
                and ensure complete compliance and protection.
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 items-center m-5">
            <div className="button-white-rounded-bg" data-aos="fade-up">
              <Link href="/contact">Schedule Your Visit</Link>
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
}
