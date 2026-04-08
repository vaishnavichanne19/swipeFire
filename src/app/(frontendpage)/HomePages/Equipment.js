import { Globe } from "lucide-react";
import { FaHome, FaUsers } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";
import { GrCertificate } from "react-icons/gr";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { PiFireExtinguisherBold } from "react-icons/pi";
import Counter from "../about/Counter";

async function getEquipmentData() {
  const res = await fetch("http://localhost:3000/api/home/equipment", {
    cache: "no-store",
  });

  return res.json();
}

const icons = [
  { icon: <MdOutlineRealEstateAgent color="#c20016" size={45} /> },
  { icon: <PiFireExtinguisherBold color="#c20016" size={45} /> },
  { icon: <GiStarsStack color="#c20016" size={45} /> },
  { icon: <FaUsers color="#c20016" size={45} /> },
  { icon: <GrCertificate color="#c20016" size={45} /> },
  { icon: <Globe color="#c20016" size={45} /> },
];

export default async function Equipment() {
  const res = await getEquipmentData();
  const alldata = res.data;

  return (
    <div className="div-spread equipment-sec container-fluid">
      <div className="py-5 container">
        {alldata.slice(0, 1).map((data) => (
          <div key={data._id}>
            <h1 className="text-center text-white">{data.heading}</h1>
          </div>
        ))}
        <div className="row pt-4">
          {alldata.slice(1).map((data, index) => (
            <div
              key={data._id}
              className="col-lg-4 col-md-4 col-sm-6 col-6 my-2"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div
                className="bg-white h-full flex gap-2 flex-col
              
              justify-center items-center py-2 lg:!py-4"
              >
                <div>{icons[index]?.icon}</div>
                <div className="text-center">
                  <strong className="text-2xl lg:!text-4xl">
                    <Counter
                      target={Number(data.heading)}
                      suffix={data.suffix}
                    />
                  </strong>
                  <p className="mt-2">{data.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
