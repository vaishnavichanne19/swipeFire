"use client";

import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    subheading: "",
    productimage1: "",
    productimage2: "",
    productimage3: "",
    productimage4: "",
    description: "",
    points: "",
  });

  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    const fetchhomeproduct = async () => {
      const res = await axios.get(`/api/product/productdata/${editid}`);
      if (res.data.success) {
        setUpdateData(res.data.data);
      }
    };
    fetchhomeproduct();
  }, [editid]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", UpdateData.heading);
    formData.append("subheading", UpdateData.subheading);
    formData.append("description", UpdateData.description);
    formData.append("points", UpdateData.points);

    Object.keys(selectedImages).forEach((key) => {
      formData.append(key, selectedImages[key]);
    });

    try {
      await axios.put(`/api/product/productdata/${editid}`, formData);
      toast.info("Data Updated Successfully");
      if (from === "homeproduct") {
        router.push("/dashboard/homepages/homeproduct");
      } else {
        router.push("/dashboard/product/productdata");
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

                  {UpdateData.subheading && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Subheading</Label>
                      <Input
                        type="text"
                        id="subheading"
                        value={UpdateData.subheading}
                        onChange={(e) =>
                          setUpdateData({
                            ...UpdateData,
                            subheading: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

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

                  {UpdateData.points && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Points</Label>
                      <CKEditorClient
                        value={UpdateData.points}
                        onChange={(data) =>
                          setUpdateData((prev) => ({
                            ...prev,
                            points: data,
                          }))
                        }
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    {UpdateData.productimage1 && (
                      <div>
                        <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                          Product Image 1
                        </Label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            handleImageChange(e, "productimage1")
                          }
                          className="border w-full p-2 my-2"
                        />
                        {UpdateData.productimage1 && (
                          <Image
                            src={UpdateData.productimage1}
                            alt="productimage1"
                            width={200}
                            height={120}
                            className="mt-2 rounded"
                          />
                        )}
                      </div>
                    )}
                    {UpdateData.productimage2 && (
                      <div>
                        <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                          Product Image 2
                        </Label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            handleImageChange(e, "productimage2")
                          }
                          className="border w-full p-2 my-2"
                        />
                        {UpdateData.productimage2 && (
                          <Image
                            src={UpdateData.productimage2}
                            alt="productimage2"
                            width={200}
                            height={120}
                            className="mt-2 rounded"
                          />
                        )}
                      </div>
                    )}
                    {UpdateData.productimage3 && (
                      <div>
                        <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                          Product Image 3
                        </Label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            handleImageChange(e, "productimage3")
                          }
                          className="border w-full p-2 my-2"
                        />
                        {UpdateData.productimage3 && (
                          <Image
                            src={UpdateData.productimage3}
                            alt="productimage3"
                            width={200}
                            height={120}
                            className="mt-2 rounded"
                          />
                        )}
                      </div>
                    )}
                    {UpdateData.productimage4 && (
                      <div>
                        <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                          Product Image 4
                        </Label>
                        <Input
                          type="file"
                          onChange={(e) =>
                            handleImageChange(e, "productimage4")
                          }
                          className="border w-full p-2 my-2"
                        />
                        {UpdateData.productimage4 && (
                          <Image
                            src={UpdateData.productimage4}
                            alt="productimage4"
                            width={200}
                            height={120}
                            className="mt-2 rounded"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                className="border-2 border-gray-200 px-4 py-2  rounded-lg bg-white hover:bg-gray-50"
                href={
                  from === "homeproduct"
                    ? "/dashboard/homepages/homeproduct"
                    : "/dashboard/product/productdata"
                }
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

export default Update;
