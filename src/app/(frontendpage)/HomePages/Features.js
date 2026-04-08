import Image from "next/image";

async function getfeaturesData() {
  const res = await fetch("http://localhost:3000/api/home/featuressec", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Features() {
  const res = await getfeaturesData();
  const alldata = res.data;

  return (
    <div className="container ">
      <div className="div-spread">
        {alldata
          .filter((user) => user._id === "69aea08df3c97c6b67efc0a5")
          .map((data) => (
            <div key={data._id}>
              <div className="text-center">
                <h1>{data.heading}</h1>
                <div
                  className="px-3"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
              </div>

              <h3 className="text-center py-4 !text-[#D42427]">
                {data.subheading}
              </h3>
            </div>
          ))}

        <div className="row">
          {alldata
            .filter((user) => user._id === "69aea8a91ff0b5427c5595c5")
            .map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="features-card m-2">
                  <div>
                    <Image
                      src="/img/Group 349.svg"
                      alt="Certificate"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="my-3">
                    <h4>{data.heading}</h4>
                    <h5 className="!text-[#D42427]">{data.subheading}</h5>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
              </div>
            ))}
          {alldata.filter((user) => user._id === "69aea8b81ff0b5427c5595c7").map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div className="features-card m-2">
                  <div>
                    <Image
                      src="/img/Group 350.svg"
                      alt="Certificate"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="my-3">
                    <h4>{data.heading}</h4>
                    <h5 className="!text-[#D42427]">{data.subheading}</h5>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
              </div>
            ))}
          {alldata
            .filter((user) => user._id === "69aea8be1ff0b5427c5595c9")
            .map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12"
                data-aos="fade-up"
                data-aos-delay={600}
              >
                <div className="features-card m-2">
                  <div>
                    <Image
                      src="/img/Group 349.svg"
                      alt="Certificate"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="my-3">
                    <h4>{data.heading}</h4>
                    <h5 className="!text-[#D42427]">{data.subheading}</h5>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
