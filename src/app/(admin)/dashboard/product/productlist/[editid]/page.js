"use client";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CKEditorClient from "@/app/(admin)/dashboard/CKEditorClient";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

const Update = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const { editid } = useParams();
  const router = useRouter();

  const [UpdateData, setUpdateData] = useState({
    heading: "",
    description: "",
    productimage: "",
    productpdf: "",
    prodtable: "",
    features: "",
    certificate: [],
    applicationtype: [],
  });

  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const res = await axios.get("/api/home/certificate");
      if (res.data.success) {
        setCertificates(res.data.data);
      }
    };

    fetchCertificates();
  }, []);

  const [applicationType, setApplicationType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/home/applicationsec");
        setApplicationType(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [selectedImages, setSelectedImages] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`/api/product/productlist/${editid}`);
      if (res.data.success) {
        setUpdateData(res.data.data);
      }
    };
    fetchdata();
  }, [editid]);

  // image upload
  const handleImageChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/webp") {
      toast.error("Only WEBP images allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setSelectedImages((prev) => ({ ...prev, [field]: file }));

    setUpdateData((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  // pdf upload
  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF allowed");
      return;
    }

    setSelectedFiles((prev) => ({
      ...prev,
      [field]: file,
    }));

    const previewUrl = URL.createObjectURL(file);

    setUpdateData((prev) => ({
      ...prev,
      [field]: previewUrl,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("heading", UpdateData.heading);
    formData.append("description", UpdateData.description);
    formData.append("features", UpdateData.features);
    formData.append("prodtable", UpdateData.prodtable);

    UpdateData.applicationtype.forEach((item) => {
      formData.append("applicationtype", item);
    });

    UpdateData.certificate.forEach((img) => {
      formData.append("certificate", img);
    });

    // Image upload
    Object.keys(selectedImages).forEach((key) => {
      formData.append(key, selectedImages[key]);
    });

    // PDF upload
    Object.keys(selectedFiles).forEach((key) => {
      formData.append(key, selectedFiles[key]);
    });

    try {
      await axios.put(`/api/product/productlist/${editid}`, formData);

      toast.info("Data Updated Successfully");

      if (from === "homeproduct") {
        router.push("/dashboard/homepages/homeproduct");
      } else {
        router.push("/dashboard/product/productlist");
      }
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <main>
      <div className="max-w-[700px] lg:m-4 border-1 border-gray-300 rounded-2xl">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Data
            </h4>
          </div>
          <form onSubmit={handleUpdate} className="flex flex-col ">
            <div className="custom-scrollbar h-[auto] overflow-y-scroll px-2 pb-3">
              <div className="mt-7">
                <div className="flex flex-col gap-4">
                  {UpdateData.productimage && (
                    <div className="grid grid-cols-1 gap-4 ">
                      {["productimage"].map((img) => (
                        <div key={img}>
                          <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                            {img}
                          </Label>
                          <Input
                            type="file"
                            onChange={(e) => handleImageChange(e, img)}
                            className="border w-full p-2 my-2"
                          />
                          {UpdateData[img] && (
                            <Image
                              src={UpdateData[img]}
                              alt={img}
                              width={230}
                              height={130}
                              className="mt-2 rounded"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Heading</Label>
                    <Input
                      type="text"
                      id="heading"
                      value={UpdateData.heading}
                      onChange={(e) =>
                        setUpdateData({
                          ...UpdateData,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>

                  {UpdateData.description && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Description</Label>
                      <CKEditorClient
                        value={UpdateData.description}
                        onChange={(data) =>
                          setUpdateData((prev) => ({
                            ...prev,
                            description: data,
                          }))
                        }
                      />
                    </div>
                  )}

                  {UpdateData.applicationtype.length > 0 && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Application Type</Label>

                      <div className="grid grid-cols-2 gap-3 mt-2 border p-3 rounded-lg max-h-40 overflow-y-auto">
                        {applicationType.slice(4).map((data) => (
                          <label
                            key={data._id}
                            className={`flex items-center gap-2 cursor-pointer border p-2 rounded ${
                              UpdateData.applicationtype.includes(data.heading)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={data.heading}
                              checked={UpdateData.applicationtype.includes(
                                data.heading,
                              )}
                              onChange={(e) => {
                                const value = e.target.value;

                                setUpdateData((prev) => ({
                                  ...prev,
                                  applicationtype: e.target.checked
                                    ? [...prev.applicationtype, value]
                                    : prev.applicationtype.filter(
                                        (item) => item !== value,
                                      ),
                                }));
                              }}
                            />

                            <span className="text-sm">{data.heading}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  {UpdateData.features && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Features</Label>
                      <CKEditorClient
                        value={UpdateData.features}
                        onChange={(data) =>
                          setUpdateData((prev) => ({
                            ...prev,
                            features: data,
                          }))
                        }
                      />
                    </div>
                  )}

                  {UpdateData.certificate?.length > 0 && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Certificates</Label>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        {certificates.slice(1).map((data) => (
                          <label
                            key={data._id}
                            className={`border p-2 rounded cursor-pointer ${
                              UpdateData.certificate.includes(
                                data.certificateimage,
                              )
                                ? "border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={data.certificateimage}
                              checked={UpdateData.certificate.includes(
                                data.certificateimage,
                              )}
                              onChange={(e) => {
                                const value = e.target.value;

                                setUpdateData((prev) => ({
                                  ...prev,
                                  certificate: e.target.checked
                                    ? [...prev.certificate, value]
                                    : prev.certificate.filter(
                                        (img) => img !== value,
                                      ),
                                }));
                              }}
                              className="mb-2"
                            />
                            {data.certificateimage && (
                              <Image
                                src={data.certificateimage}
                                alt="certificate"
                                width={200}
                                height={140}
                                className="rounded"
                              />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {UpdateData.productpdf && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Product PDF</Label>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange(e, "productpdf")}
                        className="border w-full p-2 my-2"
                      />
                      <a
                        href={UpdateData.productpdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View PDF
                      </a>
                    </div>
                  )}

                  {UpdateData.prodtable && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Product Table</Label>
                      <CKEditorClient
                        value={UpdateData.prodtable}
                        onChange={(data) =>
                          setUpdateData((prev) => ({
                            ...prev,
                            prodtable: data,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href={
                  from === "homeproduct"
                    ? "/dashboard/homepages/homeproduct"
                    : "/dashboard/product/productlist"
                }
                className="border-2 border-gray-200 px-4 py-2  rounded-lg bg-white hover:bg-gray-50"
              >
                Close
              </Link>
              <Button size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default function UpdatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Update />
    </Suspense>
  );
}
