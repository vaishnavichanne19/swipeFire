"use client"

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default  function Certificate() {
  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/home/certificate");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="div-spread text-center">
        {fetchAllData.slice(0, 1).map((data) => (
          <div key={data._id}>
            <h1>{data.heading}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
        ))}

        <div className="flex justify-center flex-wrap lg:flex-row flex-col gap-3 my-5">
          {fetchAllData.slice(1).map((data) => (
            <div key={data._id} className="flex lg:flex-row flex-col gap-3 items-center">
              <div className="certificate-img">
                <Image
                  src={data.certificateimage}
                  alt="certificates"
                  width={500}
                  height={500}
                />
              </div>
              <div className="certificate-vertical-line"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
