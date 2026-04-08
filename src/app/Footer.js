import Image from "next/image";

import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

async function getCertificateData() {
  const res = await fetch("http://localhost:3000/api/home/certificate", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Footer() {
  
  const res = await getCertificateData();
  const alldata = res.data;

  return (
    <div className="container-fluid bg-[#000000] footer-section">
      <div className="container pt-3 lg:!pt-20 pb-4">
        <div className="row">
          <div className="col-lg-6 col-md-5 col-sm-12 ">
            <div className="pr-1 lg:!pr-15">
               <div className="flex justify-center lg:!justify-start">
              <div className="footer-logo ">
                  <Image src="/img/Logo.svg" alt="Footer Logo" width={100} height={100} />
               </div>
              </div>
              <div>
                <p className="mt-3 lg:!mt-5 mb-4 text-center lg:!text-left">
                  <span className="text-[#9CA3A1]">
                    Family-owned since 2018, we are dedicated to making fire safety accessible, understandable, and dependable for every home and business.
                  </span>
                </p>
                <div className="flex justify-center lg:!justify-start">
                  <p>
                    {" "}
                    <span className="text-[#D42427] flex gap-1.5">
                      <ShieldCheck /> Certified Safety Experts
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-5 col-5">
            <div className="mt-4 lg:!mt-0">
              <h4 className="mb-4">
                <span className="text-[#FFFFFF]">Quick Links</span>
              </h4>
              <ul className="footer-menu">
                <li className="my-3">
                  <Link href="/">Home</Link>
                </li>
                <li className="my-3">
                  <Link href="/about">About</Link>
                </li>
                <li className="my-3">
                  <Link href="/products">Products</Link>
                </li>
                <li className="my-3">
                  <Link href="/service">Services</Link>
                </li>
                <li className="my-3">
                  <Link href="/blog">Blog</Link>
                </li>
                <li className="my-3">
                  <Link href="/resource">resource</Link>
                </li>
                <li className="my-3">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-5 col-sm-7 col-7">
            <div className="mt-4 lg:!mt-0">
              <h4 className="mb-4">
                <span className="text-[#FFFFFF]">Get in Touch</span>
              </h4>
              <ul className="footer-menu">
                <li>
                  <a href="tel:+91 9956777734" className="flex gap-3 flex-wrap mb-3">
                    <Phone color="#D42427" size={30} /> 9956777734 / 9307250673
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:swipefire2018@gmail.com"
                    className="flex gap-3 flex-wrap mb-3 footer-email"
                  >
                    <Mail color="#D42427" size={30} /> swipefire2018@gmail.com
                  </a>
                </li>
                <li>
                  <a href="/" className="flex gap-3 flex-wrap mb-3">
                    <MapPin color="#D42427" size={30} /> Plot No- 182 & House No. 915, Amravati Rd, Tawakal Layout, Wadi, Nagpur, Maharashtra 440023
                  </a>
                </li>
              </ul>


              <div className="bg-white flex flex-wrap gap-2 items-center hidden lg:flex px-2">
                {alldata.slice(1).map((data) => (
                  <div key={data._id}>
                  <div  className="w-12 h-12 relative" >
                  {data.certificateimage && (
                  <Image  src={data.certificateimage} alt="certificates" fill objectFit="contain"/>
                  )}
                </div>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
            <div className="bg-white flex flex-wrap gap-2 items-center block lg:hidden">
                {alldata.slice(1).map((data) => (
                  <div key={data._id}>
                  <div  className="w-12 h-12 relative" >
                  {data.certificateimage && (
                  <Image  src={data.certificateimage} alt="certificates" fill objectFit="contain"/>
                  )}
                </div>
                <div className="border-r-2 border-gray-200 h-100" />
                </div>
                ))}
              </div>

        <div className="text-center mt-5">
          <h5>
            <span className="text-[#c7c7c7]">
              Copyright @ 2026 All rights reserved. Made with passion by <br />{" "}
              <Link
                href="https://thecy.in/"
                target="_blank"
                className="!text-[#c20016]"
              >
                Customization & You
              </Link>{" "}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};


