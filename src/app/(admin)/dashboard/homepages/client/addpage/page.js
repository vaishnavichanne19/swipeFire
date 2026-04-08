"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

const AddData = () => {
  const router = useRouter();
  const [imageFile, setimageFile] = useState(null);
  const [previewimg, setpreviewimg] = useState("");

  // 🔹 Image change
  const handleImageChange = (e) => {
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

    setimageFile(file);
    setpreviewimg(URL.createObjectURL(file));
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("clientimage", imageFile);

    try {
      const res = await axios.post("/api/home/client", formData);
      if (res.data.success) {
      toast.success("Data Added Successfully");
      router.push("/dashboard/homepages/client");
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
                    <Label>Image</Label>
                    <Input
                      type="file"
                      accept=".svg,image/svg+xml"
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
