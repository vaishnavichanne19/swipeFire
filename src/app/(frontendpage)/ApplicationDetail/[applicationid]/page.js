"use client";

import Image from "next/image";
import Link from "next/link";
import { PhoneCall } from "lucide-react";
import Certificate from "../../HomePages/Certificate";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const ApplicationDetail = () => {
  const { applicationid } = useParams();

  const [ViewData, setViewData] = useState({
    heading: "",
    description: "",
    applicationimage: "",
    guidelinepoint: [
      {
        guidelineheading: "",
        guidelinedesc: "",
      },
    ],
  });

  useEffect(() => {
    const fetchViewData = async () => {
      try {
        const res = await axios.get(
          `/api/home/applicationsec/${applicationid}`,
        );

        setViewData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (applicationid) {
      fetchViewData();
    }
  }, [applicationid]);

  // fetch data

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/home/applicationsec");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/product/productlist");
        setProductList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const causeData = [
    {
      id: 1,
      heading: "gas leakage",
      image: "/img/gas-leakage.svg",
      cause: [
        "Residential Apartments",
        "Commercial Malls",
        "Oil & Gas Refineries",
      ],
    },
    {
      id: 2,
      heading: "Electrical short circuit",
      image: "/img/Electrical-fires.svg",
      cause: [
        "Residential Apartments",
        "Commercial Malls",
        "Industrial Sector",
        "Banks",
        "High-Rise Buildings",
        "Government Sector",
      ],
    },
    {
      id: 3,
      heading: "Improper or Poor Maintenance",
      image: "/img/poor-maintenance.webp",
      cause: [
        "Residential Apartments",
        "Industrial Sector",
        "High-Rise Buildings",
        "Pharmaceuticals Sector",
        "Warehouses",
      ],
    },
    {
      id: 4,
      heading: "Kitchen oil fires",
      image: "/img/Overheating-cooking-oil copy.svg",
      cause: ["Residential Apartments", "Commercial Malls"],
    },
    {
      id: 5,
      heading: "Outlived or Damaged Appliances",
      image: "/img/printer-paper-office-equipment.webp",
      cause: ["Residential Apartments", "Commercial Malls", "Banks"],
    },
    {
      id: 6,
      heading: "Electrical Faults",
      image: "/img/Over-currents.webp",
      cause: [
        "Residential Apartments",
        "Industrial Sector",
        "Transportation",
        "Power Sector",
        "Defence & Aviation",
        "High-Rise Buildings",
      ],
    },
    {
      id: 7,
      heading: "Smoking",
      image: "/img/Smoking.webp",
      cause: [
        "Residential Apartments",
        "Commercial Malls",
        "Industrial Sector",
        "Warehouses",
      ],
    },
    {
      id: 8,
      heading: "Electric Arcs and Loose Connections",
      image: "/img/Electric-arcs-in-cables-and-loose-connections copy.webp",
      cause: [
        "Residential Apartments",
        "Industrial Sector",
        "Power Sector",
        "High-Rise Buildings",
      ],
    },
    {
      id: 9,
      heading: "Faulty Fire Detection Alarms",
      image: "/img/Faulty Fire Detection Alarms.webp",
      cause: [
        "Residential Apartments",
        "Commercial Malls",
        "High-Rise Buildings",
        "Government Sector",
      ],
    },
    {
      id: 10,
      heading: "Hot Works",
      image: "/img/Hot Works.webp",
      cause: [
        "Industrial Sector",
        "Oil & Gas Refineries",
        "Defence & Aviation",
        "Warehouses",
      ],
    },
    {
      id: 11,
      heading: "Over Voltages and Arching",
      image: "/img/Over Voltages and Arching.webp",
      cause: [
        "Industrial Sector",
        "Power Sector",
        "Transportation",
        "Defence & Aviation",
      ],
    },
    {
      id: 12,
      heading: "Electrical Equipment Failure",
      image: "/img/Electrical Equipment Failure.webp",
      cause: [
        "Industrial Sector",
        "Power Sector",
        "Transportation",
        "Commercial Malls",
        "Government Sector",
        "Warehouses",
      ],
    },
    {
      id: 13,
      heading: "Combustible  Waste",
      image: "/img/Combustible  Waste.webp",
      cause: [
        "Industrial Sector",
        "Oil & Gas Refineries",
        "Pharmaceuticals Sector",
        "Warehouses",
      ],
    },
    {
      id: 14,
      heading: "Human Negligence",
      image: "/img/Human Negligence.webp",
      cause: [
        "Residential Apartments",
        "Industrial Sector",
        "Commercial Malls",
        "Transportation",
        "Government Sector",
        "High-Rise Buildings",
        "Banks",
      ],
    },
    {
      id: 15,
      heading: "Unattended Cooking",
      image: "/img/Unattended Cooking.webp",
      cause: ["Residential Apartments", "Commercial Malls"],
    },
    {
      id: 16,
      heading: "Fires in Cooking Appliances",
      image: "/img/Faulty-appliances.webp",
      cause: ["Residential Apartments", "Commercial Malls"],
    },
    {
      id: 17,
      heading: "Improper Disposal of Cooking Grease",
      image: "/img/Improper Disposal of Cooking Grease.webp",
      cause: ["Residential Apartments", "Commercial Malls"],
    },
    {
      id: 18,
      heading: "Lack of Training",
      image: "/img/Lack-of-training.webp",
      cause: [
        "Industrial Sector",
        "Pharmaceuticals Sector",
        "Oil & Gas Refineries",
        "Warehouses",
      ],
    },
    {
      id: 19,
      heading: "Presence of Flammable Materials",
      image: "/img/Presence of Flammable Materials.webp",
      cause: [
        "Residential Apartments",
        "Industrial Sector",
        "Oil & Gas Refineries",
        "Pharmaceuticals Sector",
        "Warehouses",
      ],
    },
    {
      id: 20,
      heading: "Cooking Oil Spillage",
      image: "/img/Cooking Oil Spillage.webp",
      cause: ["Residential Apartments", "Commercial Malls"],
    },
    {
      id: 21,
      heading: "Damaged Machinery",
      image: "/img/Damaged Machinery.webp",
      cause: ["Industrial Sector", "Warehouses", "Oil & Gas Refineries"],
    },
    {
      id: 22,
      heading: "Mismatch of Fittings Ratings",
      image: "/img/Mismatch of Fittings Ratings.webp",
      cause: ["Industrial Sector", "Power Sector", "High-Rise Buildings"],
    },
    {
      id: 23,
      heading: "Electrical Overloads",
      image: "/img/Electrical Overloads.webp",
      cause: [
        "Residential Apartments",
        "Commercial Malls",
        "Industrial Sector",
        "High-Rise Buildings",
        "Banks",
      ],
    },
    {
      id: 24,
      heading: "Overheating",
      image: "/img/Overheating.webp",
      cause: [
        "Residential Apartments",
        "Industrial Sector",
        "Power Sector",
        "Transportation",
      ],
    },
    {
      id: 25,
      heading: "Wrong Selection of Cables",
      image: "/img/Wrong Selection of Cables.webp",
      cause: ["Industrial Sector", "Power Sector", "High-Rise Buildings"],
    },
    {
      id: 26,
      heading: "Mechanical Malfunctions",
      image: "/img/Mechanical Malfunctions.webp",
      cause: ["Industrial Sector", "Transportation", "Oil & Gas Refineries"],
    },
    {
      id: 27,
      heading: "Specialised Machining Metals",
      image: "/img/Specialised Machining Metals.webp",
      cause: ["Industrial Sector"],
    },
    {
      id: 28,
      heading: "High Speed Operations",
      image: "/img/High Speed Operations.webp",
      cause: ["Industrial Sector", "Transportation", "Defence & Aviation"],
    },
    {
      id: 29,
      heading: "Unmanned Remotely Managed Operations",
      image: "/img/Unmanned Remotely Managed Operations.webp",
      cause: ["Industrial Sector", "Defence & Aviation"],
    },
    {
      id: 30,
      heading: "Short Circuits",
      image: "/img/Short Circuits.webp",
      cause: [
        "Residential Apartments",
        "Commercial Malls",
        "Industrial Sector",
        "Banks",
        "High-Rise Buildings",
        "Government Sector",
      ],
    },
    {
      id: 31,
      heading: "Faulty Batteries",
      image: "/img/Faulty Batteries.webp",
      cause: ["Residential Apartments", "Transportation", "Industrial Sector"],
    },
    {
      id: 32,
      heading: "Overcharging",
      image: "/img/Overcharging.webp",
      cause: ["Residential Apartments", "Transportation", "Industrial Sector"],
    },
    {
      id: 33,
      heading: "Chemical Spills and Leaks",
      image: "/img/Chemical Spills and Leaks.webp",
      cause: [
        "Industrial Sector",
        "Pharmaceuticals Sector",
        "Oil & Gas Refineries",
        "Warehouses",
      ],
    },
  ];

  return (
    <main>
      <div className="container-fluid div-spread">
        <div
          style={{
            backgroundImage: `url(${ViewData.applicationimage})`,
            backgroundRepeat: "no-repeat",
            height: "600px",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="flex justify-center items-center"
        >
          <div className="container flex justify-center">
            <div
              className="row application-detail-container"
              data-aos="zoom-in"
            >
              <div className=" py-4 px-3 lg:!px-5">
                <span className="text-3xl font-light">Fire Solution for</span>
                <h1>
                  <b>{ViewData.heading}</b>
                </h1>

                <p
                  className="mt-4 font-light text-xl text-[#616161] [&_*]:!text-[#616161] "
                  dangerouslySetInnerHTML={{ __html: ViewData.description }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container div-spread">
        <div className="row">
          {fetchAllData.slice(1, 2).map((data) => (
            <h2 key={data._id} className="text-center mb-4">
              {data.heading}
              <span className="text-[#cc2330]"> {ViewData.heading}</span>
            </h2>
          ))}

          {causeData
            .filter((item) => item.cause.includes(ViewData.heading))
            .map((data) => (
              <div
                key={data.id}
                className="col-lg-3 col-md-3 col-sm-12 my-3"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="flex mx-2 flex-col justify-center items-center gap-2 text-center">
                  <div>
                    <Image
                      src={data.image}
                      width={100}
                      height={100}
                      alt={data.heading}
                    />
                  </div>
                  <h5>{data.heading}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="container div-spread">
        {fetchAllData.slice(2, 3).map((data) => (
          <h2 key={data._id}>{data.heading}</h2>
        ))}
        <div className="row flex justify-center mt-5">
          {productList
            .slice(3)
            .filter((item) => item.applicationtype?.includes(ViewData.heading))
            .map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12 my-4"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="products-card mx-2">
                  <Link href={`/products/${data._id}`}>
                    <div className="card-inner ">
                      <div className="product-img relative">
                        <Image
                          src={data.productimage}
                          alt={data.heading}
                          fill
                          objectFit="contain"
                        />
                      </div>
                      <div>
                        <h4 className="mt-4 text-center">
                          <b className="text-[#0e0e0e]">{data.heading}</b>
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="container-fluid div-spread bg-[#0f0f0f]">
        <div className="container install-section py-20 text-white">
          {fetchAllData.slice(3, 4).map((data) => (
            <h2 key={data._id} className="text-center pb-5">
              {data.heading}
            </h2>
          ))}

          <div className="install-timeline">
            {ViewData.guidelinepoint.map((points, index) => (
              <div
                key={index}
                className="timeline-item"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="timeline-circle">0{index + 1}</div>
                <div>
                  <h4>{points.guidelineheading}</h4>
                  <p>{points.guidelinedesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Certificate />
      </div>

      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Protect Your Home Before It’s Too Late
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

export default ApplicationDetail;
