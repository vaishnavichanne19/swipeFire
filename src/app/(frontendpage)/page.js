import HeroSection from "../(frontendpage)/HomePages/HeroSection.js";
import Features from "../(frontendpage)/HomePages/Features.js";
import About from "../(frontendpage)/HomePages/About.js";
import Products from "../(frontendpage)/HomePages/Products.js";
import Service from "../(frontendpage)/HomePages/Service.js";
import ChooseUs from "../(frontendpage)/HomePages/ChooseUs.js";
import Application from "./HomePages/Application.js";
import Certificate from "../(frontendpage)/HomePages/Certificate.js";
import Testimonial from "../(frontendpage)/HomePages/Testimonial.js";
import Equipment from "../(frontendpage)/HomePages/Equipment.js";
import Client from "../(frontendpage)/HomePages/Client.js";
import SalesPartner from "./HomePages/SalePartner.js";
import CompanyInfoForm from "./NewPages/CompanyInfoform.js";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <About />
      <SalesPartner/>
      <Products />
      <Equipment />
      <Service />
      <ChooseUs />
      <Application />
      <Client />
      <CompanyInfoForm />
      <Testimonial />
      <Certificate />
    </>
  );
}
