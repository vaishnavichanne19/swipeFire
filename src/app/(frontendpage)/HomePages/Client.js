import Image from "next/image";


async function getAllData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/home/client`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Client() {
  const res = await getAllData();
  const alldata = res.data;

  return (
    <div className="container div-spread">
      <div className="row   overflow-hidden ">
        <div className="col-lg-5 col-md-5 col-sm-12">
          {alldata.slice(0, 1).map((data) => (
            <div key={data._id} className="mb-5" data-aos="fade-right">
              <h1 className="mb-4">{data.heading}</h1>
              <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
            </div>
          ))}
        </div>
        <div className="col-lg-7 col-md-7 col-sm-12 h-95">
          <div className="marquee flex gap-4 justify-center items-center">
            <div className="marquee-track flex flex-col">
              {alldata.slice(1, 5).map((img, i) => (
                <div key={i} className="marquee-item">
                  <Image src={img.clientimage} alt={`client-${i}`} width={500} height={500} />
                </div>
              ))}
            </div>
            <div className="marquee-track-new flex flex-col">
              {alldata.slice(5, 10).map((img, i) => (
                <div key={i} className="marquee-item">
                  <Image src={img.clientimage} alt={`client-${i}`} width={500} height={500} />
                </div>
              ))}
            </div>
            <div className="!hidden lg:!block">
              <div className="marquee-track flex flex-col">
                {alldata.slice(10, 15).map((img, i) => (
                  <div key={i} className="marquee-item">
                    <Image src={img.clientimage} alt={`client-${i}`} width={500} height={500} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
