"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextArea from "@/components/form/input/TextArea";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

const Update = () => {
  const { editid } = useParams();
  const router = useRouter();

  const [homeaboutData, sethomeaboutData] = useState({
    heading: "",
    homeaboutimage: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState({});

  useEffect(() => {
    const fetchhomeabout = async () => {
      const res = await axios.get(`/api/home/homeabout/${editid}`);
      if (res.data.success) {
        sethomeaboutData(res.data.data);
      }
    };
    fetchhomeabout();
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

    sethomeaboutData((prev) => ({
      ...prev,
      [field]: URL.createObjectURL(file),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", homeaboutData.heading);
    formData.append("description", homeaboutData.description);

    Object.keys(selectedImages).forEach((key) => {
      formData.append(key, selectedImages[key]);
    });

    try {
      const res = await axios.put(`/api/home/homeabout/${editid}`, formData);
      if (res.data.success) {
        toast.info("Data Updated Successfully");
        router.push("/dashboard/homepages/homeabout");
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
                      value={homeaboutData.heading}
                      onChange={(e) =>
                        sethomeaboutData({
                          ...homeaboutData,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Description</Label>
                    <TextArea
                      rows={6}
                      value={homeaboutData.description}
                      onChange={(value) =>
                        sethomeaboutData({
                          ...homeaboutData,
                          description: value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 ">
                    {["homeaboutimage"].map((img) => (
                      <div key={img}>
                        <Label className="admin-panel-p mt-2  leading-normal text-gray-500 ">
                          {img}
                        </Label>
                        <Input
                          type="file"
                          onChange={(e) => handleImageChange(e, img)}
                          className="border w-full p-2 my-2"
                        />
                        {homeaboutData[img] && (
                          <Image
                            src={homeaboutData[img]}
                            alt={img}
                            width={200}
                            height={120}
                            className="mt-2 rounded"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href="/dashboard/homepages/homeabout"
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
