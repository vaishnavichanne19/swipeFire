"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import CKEditorClient from "@/app/(admin)/dashboard/CKEditorClient";
import Select from "@/components/form/Select";
import Link from "next/link";
import Image from "next/image";

const AddData = () => {
  const router = useRouter();

  const [AddData, setAddData] = useState({
    heading: "",
    description: "",
    blogtype: "All Blog",
    blogdetail: "",
  });

  const [imageFile, setimageFile] = useState(null);
  const [previewimg, setpreviewimg] = useState("");

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

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", AddData.heading);
    formData.append("description", AddData.description);
    formData.append("blogtype", AddData.blogtype);
    formData.append("blogdetail", AddData.blogdetail);
    formData.append("blogimg", imageFile);

    try {
      const res = await axios.post("/api/blog/bloglist", formData);
        if (res.data.success) {
      toast.success("Data Added Successfully");
      router.push("/dashboard/blog/bloglist");
    }
    } catch (error) {
      toast.error("Add Failed");
    }
  };

  const blogTypeOptions = [
    { value: "All Blog", label: "All Blog" },
    { value: "Fire Prevention Tips", label: "Fire Prevention Tips" },
    {
      value: "Fire Extinguishers Guide",
      label: "Fire Extinguishers Guide",
    },
    { value: "Fire Alarm System", label: "Fire Alarm System" },
    { value: "Maintenance & Inspection", label: "Maintenance & Inspection" },
    { value: "Industrial Fire Safety", label: "Industrial Fire Safety" },
  ];

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
                    <Label>Image</Label>
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
                    <Label>Blog Type</Label>

                    <Select
                      options={blogTypeOptions}
                      placeholder="Select Blog Type"
                      defaultValue={AddData.blogtype}
                      onChange={(value) =>
                        setAddData({ ...AddData, blogtype: value })
                      }
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Blog Detail</Label>
                    <CKEditorClient
                      value={AddData.blogdetail}
                      onChange={(data) =>
                        setAddData((prev) => ({
                          ...prev,
                          blogdetail: data,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href="/dashboard/blog/bloglist"
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

export default AddData;
