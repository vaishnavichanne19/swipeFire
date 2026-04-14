async function getChooseusData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/home/chooseus`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function ChooseUs() {
  const res = await getChooseusData();
  const alldata = res.data;

  return (
    <div className="container-fluid bg-[#1F1F1F] py-1 ">
      <div className="container div-spread text-center">
        {alldata.slice(0, 1).map((data) => (
          <div key={data._id}>
            <h1 className="!text-[#fefeff]">{data.heading}</h1>
            <div
              className="!text-[#fefeff]"
              dangerouslySetInnerHTML={{ __html: data.description }}
            ></div>
          </div>
        ))}

        <div className="row my-5 flex justify-center">
          {alldata.slice(1).map((data) => (
            <div
              key={data._id}
              className="col-lg-6 col-md-6 col-sm-12 my-3"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="home-choose-us-card px-3 py-5 m-2 lg:!m-3 flex justify-center items-center">
                <div>
                  <h4 className="!text-[#fefeff]">{data.heading}</h4>
                  <div
                    className="text-[#fefeff] [&_*]:!text-[#fefeff]"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
