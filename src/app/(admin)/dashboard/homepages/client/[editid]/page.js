"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CKEditorClient from "@/app/(admin)/dashboard/CKEditorClient";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

const Update = () => {
  const { editid } = useParams();
  const router = useRouter();

  const [UpdateData, setUpdateData] = useState({
    heading: "",
    clientimage: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`/api/home/client/${editid}`);
      if (res.data.success) {
        setUpdateData(res.data.data);
      }
    };
    fetchdata();
  }, [editid]);

  const handleImageChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/svg+xml") {
      toast.error("Only SVG images allowed");
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
    formData.append("description", UpdateData.description);

    Object.keys(selectedImages).forEach((key) => {
      formData.append(key, selectedImages[key]);
    });

    try {
      await axios.put(`/api/home/client/${editid}`, formData);
      toast.info("Data Updated Successfully");
      router.push("/dashboard/homepages/client");
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
                  {UpdateData.heading && (
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

                  {UpdateData.clientimage && (
                    <div className="grid grid-cols-1 gap-4 ">
                      {["clientimage"].map((img) => (
                        <div key={img}>
                          <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                            {img}
                          </Label>
                          <Input
                            type="file"
                            accept=".svg,image/svg+xml"
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
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href="/dashboard/homepages/client"
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

export default Update;
