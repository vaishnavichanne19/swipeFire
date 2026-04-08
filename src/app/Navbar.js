"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Menu, PhoneCall, X } from "lucide-react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ScrollToTop />
      <div className="container-fluid navbar-main">
        <div className="navbar-section">
          <div className="hidden lg:block nav-contact-info">
            <div className="_9307250673">
              <a className="flex gap-2" href="tel:+919307250673">
                <PhoneCall /> 9307250673
              </a>
            </div>

            <div className="_9956777734">
              <a className="flex gap-2" href="tel:+919956777734">
                <PhoneCall /> 9956777734
              </a>
            </div>

            <div className="swipefire-2018-gmail-com">
              <a className="flex gap-2" href="mailto:swipefire2018@gmail.com">
                <Mail /> swipefire2018@gmail.com
              </a>
            </div>
          </div>

          <div className="top-black">
            <div className="nav-menu flex justify-between items-center px-2 lg:!px-4 py-1">
              <div className="nav-logo">
                <Link href="/">
                  <Image src="/img/Logo.svg" alt="" width={100} height={100} />
                </Link>
              </div>
              <div className="hidden lg:block">
                <ul className="desh1024 flex gap-10 justify-center items-center pt-3">
                  <li className={pathname === "/" ? "active" : ""}>
                    <Link href="/">HOME</Link>
                  </li>
                  <li className={pathname === "/about" ? "active" : ""}>
                    <Link href="/about">ABOUT</Link>
                  </li>
                  <li className={pathname === "/products" ? "active" : ""}>
                    <Link href="/products">PRODUCTS</Link>
                  </li>
                  <li className={pathname === "/service" ? "active" : ""}>
                    <Link href="/service">SERVICES</Link>
                  </li>
                  <li className={pathname === "/blog" ? "active" : ""}>
                    <Link href="/blog">BLOG</Link>
                  </li>
                  <li className={pathname === "/resource" ? "active" : ""}>
                    <Link href="/resource">resource</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bottom-red"></div>
          <div className="hidden lg:block contact-btn">
            <div className="flex items-center justify-center text-center">
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="d-lg-none toggle-bar">
            <button onClick={ToggleMenu} aria-label="Close">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
            <ul>
              <li>
                <Link href="/" onClick={ToggleMenu}>
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={ToggleMenu}>
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/products" onClick={ToggleMenu}>
                  PRODUCTS
                </Link>
              </li>
              <li>
                <Link href="/service" onClick={ToggleMenu}>
                  SERVICES
                </Link>
              </li>
              <li>
                <Link href="/blog" onClick={ToggleMenu}>
                  BLOG
                </Link>
              </li>
              <li>
                <Link href="/resource" onClick={ToggleMenu}>
                  resource
                </Link>
              </li>
              <li className="mobile-contact mt-5">
                <Link href="/contact" onClick={ToggleMenu}>
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
