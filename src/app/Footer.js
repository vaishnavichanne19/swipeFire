import Image from "next/image";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

async function getCertificateData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/home/certificate`, {
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
                  <Image
                    src="/img/Logo.svg"
                    alt="Footer Logo"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div>
                <p className="mt-3 lg:!mt-5 mb-4 text-center lg:!text-left">
                  <span className="text-[#9CA3A1]">
                    Family-owned since 2018, we are dedicated to making fire
                    safety accessible, understandable, and dependable for every
                    home and business.
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
                <div className="flex justify-center items-center gap-3 lg:!justify-start my-3">
                  <div className="bg-white p-2 w-12 h-12 rounded-full flex justify-center  items-center">
                    <a
                      href="https://www.instagram.com/swipefiresolutions/"
                      target="_blank"
                    >
                      <Instagram color="#D42427" size={30} />
                    </a>
                  </div>
                  <div className="bg-white p-2 w-12 h-12 rounded-full flex justify-center  items-center">
                    <a
                      href="https://www.facebook.com/swipefiresolutions/"
                      target="_blank"
                    >
                      <Facebook color="#D42427" size={30} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-12">
            <div className="mt-4 lg:!mt-0">
              <h4 className="mb-4">
                <span className="text-[#FFFFFF]">Quick Links</span>
              </h4>
              <ul className="footer-menu grid grid-cols-2 md:grid-cols-1 gap-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/service">Services</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/resource">resource</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="mt-4 lg:!mt-0">
              <h4 className="mb-4">
                <span className="text-[#FFFFFF]">Get in Touch</span>
              </h4>
              <ul className="footer-menu space-y-8">
                <li className="flex gap-3  items-start">
                  <div className="bg-white p-2 w-12 h-12 rounded-full flex justify-center items-center">
                    <Phone color="#D42427" size={25} />
                  </div>
                  <a href="tel:+91 9956777734">9956777734 / 9307250673</a>
                </li>
                <li className="flex gap-3  items-start">
                  <div className="bg-white p-2 w-12 h-12 rounded-full flex justify-center items-center">
                    <Mail color="#D42427" size={25} />
                  </div>
                  <a href="mailto:swipefire2018@gmail.com">
                    swipefire2018@gmail.com
                  </a>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="bg-white p-2 w-12 h-12 rounded-full flex justify-center items-center">
                    <MapPin color="#D42427" size={25} />
                  </div>
                  <a
                    href="https://maps.app.goo.gl/YDqdnRGccyCWbdgx6"
                    target="_blank"
                  >
                    Plot No- 182 & House No. 915, Amravati Rd, Tawakal Layout,
                    Wadi, Nagpur, Maharashtra 440023
                  </a>
                </li>
              </ul>

              <div className="bg-white flex flex-wrap gap-2 items-center hidden lg:flex px-2">
                {alldata.slice(1).map((data) => (
                  <div key={data._id}>
                    <div className="w-12 h-12 relative">
                      {data.certificateimage && (
                        <Image
                          src={data.certificateimage}
                          alt="certificates"
                          fill
                          objectFit="contain"
                        />
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
              <div className="w-12 h-12 relative">
                {data.certificateimage && (
                  <Image
                    src={data.certificateimage}
                    alt="certificates"
                    fill
                    objectFit="contain"
                  />
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

      <div className="whatsapp-float">
        <a
          className="text-white"
          href="https://wa.me/919987579688?text=Hello!%20I%20need%20some%20help."
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 448 512"
            height={40}
            width={40}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
