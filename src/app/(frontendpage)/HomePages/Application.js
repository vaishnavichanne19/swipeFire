import Image from "next/image";
import Link from "next/link";

async function getAllData() {
  const res = await fetch("http://localhost:3000/api/home/applicationsec", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Application() {
  const res = await getAllData();
  const alldata = res.data;

  return (
    <div className="container-fluid div-spread">
      {alldata.slice(0, 1).map((data) => (
        <div key={data._id} className="text-center mb-5">
          <h1>{data.heading}</h1>
          <div
            className="mx-2 lg:!mx-25"
            dangerouslySetInnerHTML={{ __html: data.description }}
          ></div>
        </div>
      ))}
      <div className="use-product  lg:!py-7">
        <div className="container">
          <div className="row flex justify-center">
            {alldata.slice(1).map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12 my-2 lg:!my-5"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div className="mx-2">
                  {data.applicationimage && (
                    <div className="use-product-card">
                      <Link
                        href={`/ApplicationDetail/${data._id}`}
                        className="use-product-link"
                        title=""
                      >
                        <span className="use-product-img">
                          <Image
                            src={data.applicationimage}
                            alt="use product"
                            width={500}
                            height={500}
                          />
                          <span className="use-product-text">
                            {data.heading}
                          </span>
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
