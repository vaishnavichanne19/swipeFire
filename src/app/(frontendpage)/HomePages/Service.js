import Link from "next/link";

async function getServiceData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/service/servicelist`, {
    cache: "no-store",
  });

  return res.json();
}

const limitWords = (html, wordLimit) => {
  const text = html.replace(/<[^>]*>?/gm, "");
  const words = text.split(" ");
  return (
    words.slice(0, wordLimit).join(" ") +
    (words.length > wordLimit ? "..." : "")
  );
};

export default async function Service() {
  const res = await getServiceData();
  const alldata = res.data;

  return (
    <div className="container">
      <div className="div-spread">
        {alldata.slice(0, 1).map((data) => (
          <div key={data._id} className="text-center lg:!text-left">
            <h1>{data.heading}</h1>
            <h4>
              <span className="text-[#D42427]">{data.subheading}</span>
            </h4>
            <p>{data.description}</p>
          </div>
        ))}

        <div className="m-1 lg:!m-5">
          <div className="row flex justify-center">
            {alldata.slice(3).map((data, index) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 col-sm-12 my-3"
                data-aos="fade-up"
                data-aos-delay={100}
              >
                <div
                  className={`mx-2 text-center ${
                    index % 2 === 0 ? "service-card-red" : "service-card-white"
                  }`}
                >
                  <div>
                    <h4 className="mx-4 ">{data.heading}</h4>
                    <div
                      className={`mb-4 mt-3  text-lg font-semibold ${
                        index % 2 === 0
                          ? "text-[#fefeff] [&_*]:!text-[#fefeff]"
                          : "text-[#c20016] [&_*]:!text-[#c20016]"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: limitWords(data.description, 10),
                      }}
                    ></div>

                    <Link href={`/service#service${index + 1}`} scroll={true}>
                      <button
                        className={`${
                          index % 2 === 0 ? "read-more" : "read-more-red-bg"
                        }`}
                      >
                        <span
                          className={`${
                            index % 2 === 0 ? "circle" : "circle-red-bg"
                          }`}
                          aria-hidden="true"
                        >
                          <span
                            className={`${
                              index % 2 === 0
                                ? "icon arrow"
                                : "icon-red-bg arrow-red-bg"
                            }`}
                          />
                        </span>
                        <span
                          className={`${
                            index % 2 === 0
                              ? "button-text"
                              : "button-text-red-bg"
                          }`}
                        >
                          Read More
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
