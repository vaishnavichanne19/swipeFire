"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import CKEditorClient from "@/app/(admin)/dashboard/CKEditorClient";
import Link from "next/link";
import Image from "next/image";

const AddData = () => {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const router = useRouter();

  const [AddData, setAddData] = useState({
    heading: "",
    description: "",
    features: "",
    prodtable: "",
    productpdf: "",
    certificate: [],
    applicationtype: [],
  });

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

  const [imageFile, setimageFile] = useState(null);
  const [previewimg, setpreviewimg] = useState("");
  const [pdfFile, setpdfFile] = useState(null);

  // 🔹 Image change
  const handleImageChange = (e) => {
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

    setimageFile(file);
    setpreviewimg(URL.createObjectURL(file));
  };

  // pdf upload
  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF allowed");
      return;
    }

    setpdfFile(file);
  };
  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", AddData.heading);
    formData.append("description", AddData.description);
    formData.append("features", AddData.features);
    formData.append("prodtable", AddData.prodtable);

    AddData.applicationtype.forEach((item) => {
      formData.append("applicationtype", item);
    });

    formData.append("productimage", imageFile);

    AddData.certificate.forEach((img) => {
      formData.append("certificate", img);
    });

    if (pdfFile) {
      formData.append("productpdf", pdfFile);
    }

    try {
      const res = await axios.post("/api/product/productlist", formData);
      if (res.data.success) {
        toast.success("Data Added Successfully");
        if (from === "homeproduct") {
          router.push("/dashboard/homepages/homeproduct");
        } else {
          router.push("/dashboard/product/productlist");
        }
      }
    } catch (error) {
      toast.error("Add Failed");
    }
  };

  return (
    <main>
      <div className="max-w-[700px] lg:m-4 border-1 border-gray-300 rounded-2xl">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add Data
            </h4>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col ">
            <div className="custom-scrollbar h-[auto] overflow-y-scroll px-2 pb-3">
              <div className="mt-7">
                <div className="flex flex-col gap-4">
                  <div className="col-span-2 lg:col-span-1">
                    <Label> Product Image</Label>
                    <Input
                      type="file"
                      accept="image/webp"
                      onChange={handleImageChange}
                      className="w-full border p-2 my-3"
                    />

                    {previewimg && (
                      <Image
                        src={previewimg}
                        alt="Images"
                        width={200}
                        height={150}
                        className="mt-2 rounded"
                      />
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Heading</Label>
                    <Input
                      type="text"
                      id="heading"
                      value={AddData.heading}
                      onChange={(e) =>
                        setAddData({
                          ...AddData,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Description</Label>
                    <CKEditorClient
                      value={AddData.description}
                      onChange={(data) =>
                        setAddData((prev) => ({
                          ...prev,
                          description: data,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Application Type</Label>

                    <div className="grid grid-cols-2 gap-3 mt-2 border p-3 rounded-lg max-h-40 overflow-y-auto">
                      {applicationType.slice(4).map((data) => (
                        <label
                          key={data._id}
                          className={`flex items-center gap-2 cursor-pointer border p-2 rounded ${
                            AddData.applicationtype.includes(data.heading)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={data.heading}
                            checked={AddData.applicationtype.includes(
                              data.heading,
                            )}
                            onChange={(e) => {
                              const value = e.target.value;

                              setAddData((prev) => ({
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

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Features</Label>
                    <CKEditorClient
                      value={AddData.features}
                      onChange={(data) =>
                        setAddData((prev) => ({
                          ...prev,
                          features: data,
                        }))
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Certificate Images</Label>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      {fetchAllData.slice(1).map((data) => (
                        <label
                          key={data._id}
                          className={`border p-2 rounded cursor-pointer ${
                            AddData.certificate.includes(data.certificateimage)
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={data.certificateimage}
                            checked={AddData.certificate.includes(
                              data.certificateimage,
                            )}
                            onChange={(e) => {
                              const value = e.target.value;

                              setAddData((prev) => ({
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

                          <Image
                            src={data.certificateimage}
                            alt="certificate"
                            width={200}
                            height={150}
                            className="rounded"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Upload PDF</Label>
                    <Input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Performance Table</Label>
                    <CKEditorClient
                      value={AddData.prodtable}
                      onChange={(data) =>
                        setAddData((prev) => ({
                          ...prev,
                          prodtable: data,
                        }))
                      }
                    />
                  </div>
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
              <Button
                size="sm"
                type="submit"
                className="bg-green-400 hover:bg-green-500"
              >
                Add Data
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default function AddPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddData />
    </Suspense>
  );
}
