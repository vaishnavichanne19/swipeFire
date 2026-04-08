import Image from "next/image";
import Link from "next/link";

async function getProductData() {
  const res = await fetch("http://localhost:3000/api/product/productdata", {
    cache: "no-store",
  });

  return res.json();
}

async function getProductListData() {
  const res = await fetch("http://localhost:3000/api/product/productlist", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Products() {
  const res = await getProductData();
  const alldata = res.data;

  const res1 = await getProductListData();
  const alldata1 = res1.data;

  return (
    <div className="container home-product-sec" id="home-products">
      <div className="div-spread">
        {alldata.slice(0, 1).map((data) => (
          <div key={data._id} className="text-center lg:!text-left">
            <h1>{data.heading}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
        ))}
        <div className="row">
          {alldata1.slice(3, 9).map((data) => (
            <div
              key={data._id}
              className="col-lg-4 col-md-6 col-sm-12"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="m-3">
                {data.productimage && (
                  <div className="home-product-img relative w-full flex justify-center ">
                    <Image
                      src={data.productimage}
                      alt="Produuct1"
                      fill
                      objectFit="contain"
                    />
                  </div>
                )}
                <div className="h-100 button-no-radius text-center mt-1">
                  <Link href={`/products/${data._id}`}>{data.heading}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="white-button text-center mt-20">
          <Link href="/products">Explore Our Products</Link>
        </div>
      </div>
    </div>
  );
}
