"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import TextArea from "@/components/form/input/TextArea";
import Link from "next/link";
import Image from "next/image";
import Select from "@/components/form/Select";

const AddData = () => {
  const router = useRouter();

  const [AddData, setAddData] = useState({
    heading: "",
    description: "",
    resourcetype: "",
    youtubeLink: "",
  });

  const [imageFile, setimageFile] = useState(null);
  const [videoFile, setvideoFile] = useState(null);
  const [pdfFile, setpdfFile] = useState(null);
  const [previewimg, setpreviewimg] = useState("");

  const resourceTypeOptions = [
    { value: "PDF's", label: "PDF's" },
    { value: "Videos", label: "Videos" },
    { value: "Certificates", label: "Certificates" },
  ];

  /* ================= IMAGE ================= */

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

  /* ================= PDF ================= */

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF allowed");
      return;
    }

    setpdfFile(file);
  };

  /* ================= VIDEO ================= */

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Only Video allowed");
      return;
    }

    setvideoFile(file);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (videoFile && AddData.youtubeLink) {
      toast.error("Upload video OR add YouTube link, not both");
      return;
    }

    const formData = new FormData();

    formData.append("heading", AddData.heading);
    formData.append("description", AddData.description);
    formData.append("resourcetype", AddData.resourcetype);

    if (AddData.resourcetype === "Certificates") {
      if (imageFile) formData.append("image", imageFile);
      if (pdfFile) formData.append("pdf", pdfFile);
    }

    if (AddData.resourcetype === "PDF's" && pdfFile) {
      formData.append("pdf", pdfFile);
    }

    if (AddData.resourcetype === "Videos") {
      if (videoFile) {
        formData.append("video", videoFile);
      }

      if (AddData.youtubeLink) {
        formData.append("youtubeLink", AddData.youtubeLink);
      }
    }

    try {
      const res = await axios.post("/api/resource", formData);
      if (res.data.success) {
      toast.success("Data Added Successfully");
      router.push("/dashboard/resource");
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
                    <Label>Select Resource Type</Label>

                    <Select
                      options={resourceTypeOptions}
                      placeholder="Select Resource Type"
                      defaultValue={AddData.resourcetype}
                      onChange={(value) =>
                        setAddData({ ...AddData, resourcetype: value })
                      }
                    />
                  </div>

                  {AddData.resourcetype && (
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
                  )}

                  {AddData.resourcetype === "PDF's" && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Description</Label>
                      <TextArea
                        value={AddData.description}
                        onChange={(value) =>
                          setAddData({
                            ...AddData,
                            description: value,
                          })
                        }
                      />
                    </div>
                  )}

                 {(AddData.resourcetype === "PDF's" || AddData.resourcetype === "Certificates") && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Upload PDF</Label>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={handlePdfChange}
                      />
                    </div>
                  )}

                  {AddData.resourcetype === "Videos" && (
                    <>
                      <div className="col-span-2 lg:col-span-1">
                        <Label>Upload Video</Label>
                        <Input
                          type="file"
                          accept="video/*"
                          onChange={handleVideoChange}
                        />
                      </div>
                      <h4 className="text-center">OR</h4>
                      <div className="col-span-2 lg:col-span-1">
                        <Label>YouTube Link [Example: (https://www.youtube.com/watch?v=<span className="text-red-500">oi4MBo-eyBk</span>&t=1s) Add only video id]</Label>
                        <Input
                          type="text"
                          placeholder="Enter YouTube URL"
                          value={AddData.youtubeLink || ""}
                          onChange={(e) =>
                            setAddData({
                              ...AddData,
                              youtubeLink: e.target.value,
                            })
                          }
                        />
                      </div>
                    </>
                  )}

                  {AddData.resourcetype === "Certificates" && (
                    <div>
                      <h4 className="text-center">OR</h4>
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
                  </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href="/dashboard/resource"
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
