"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import CKEditorClient from "@/app/(admin)/dashboard/CKEditorClient";
import Link from "next/link";
import Image from "next/image";

const AddData = () => {
  const router = useRouter();

  const [AddData, setAddData] = useState({
    heading: "",
    description: "",
   guidelinepoint: [{ guidelineheading: "", guidelinedesc: "" }],
  });

  const [imageFile, setimageFile] = useState(null);
  const [previewimg, setpreviewimg] = useState("");

  // MAIN IMAGE
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


  // ADD GUIDELINE
  const addGuideline = () => {
    setAddData({
      ...AddData,
      guidelinepoint: [
        ...AddData.guidelinepoint,
        { guidelineheading: "", guidelinedesc: "" },
      ],
    });
  };

  // REMOVE GUIDELINE
  const removeGuideline = (index) => {
    const updated = AddData.guidelinepoint.filter((_, i) => i !== index);
    setAddData({ ...AddData, guidelinepoint: updated });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("heading", AddData.heading);
    formData.append("description", AddData.description);

    if (imageFile) {
      formData.append("applicationimage", imageFile);
    }
    formData.append("guidelinepoint", JSON.stringify(AddData.guidelinepoint));

    try {
      const res = await axios.post("/api/home/applicationsec", formData);

      if (res.data.success) {
        toast.success("Data Added Successfully");
        router.push("/dashboard/application");
      }
    } catch (error) {
      toast.error("Add Failed");
    }
  };

  return (
    <main>
      <div className="max-w-[700px] lg:m-4 border border-gray-300 rounded-2xl">
        <div className="bg-white p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">Add Data</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Heading */}
            <div>
              <Label>Heading</Label>
              <Input
                type="text"
                value={AddData.heading}
                onChange={(e) =>
                  setAddData({ ...AddData, heading: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <CKEditorClient
                value={AddData.description}
                onChange={(data) =>
                  setAddData((prev) => ({ ...prev, description: data }))
                }
              />
            </div>

            {/* Main Image */}
            <div>
              <Label>Application Image</Label>
              <Input
                type="file"
                accept="image/webp"
                onChange={handleImageChange}
                className="my-3"
              />

              {previewimg && (
                <Image
                  src={previewimg}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="rounded"
                />
              )}
            </div>


            {/* Guideline */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Guidelines</Label>
                <button
                  type="button"
                  onClick={addGuideline}
                  className="bg-brand-500 text-white px-3 py-1 rounded"
                >
                  + Add
                </button>
              </div>

              {AddData.guidelinepoint.map((item, index) => (
                <div key={index} className="border p-4 mb-4 rounded-lg">
                  <Input
                    type="text"
                    placeholder="Guideline Heading"
                    value={item.guidelineheading}
                    onChange={(e) => {
                      const updated = [...AddData.guidelinepoint];
                      updated[index].guidelineheading = e.target.value;
                      setAddData({ ...AddData, guidelinepoint: updated });
                    }}
                    className="my-3"
                  />

                  <Input
                    type="text"
                    placeholder="Guideline Description"
                    value={item.guidelinedesc}
                    onChange={(e) => {
                      const updated = [...AddData.guidelinepoint];
                      updated[index].guidelinedesc = e.target.value;
                      setAddData({ ...AddData, guidelinepoint: updated });
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => removeGuideline(index)}
                    className="bg-red-500 text-white px-3 py-1 mt-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Link
                href="/dashboard/application"
                className="border px-4 py-2 rounded"
              >
                Cancel
              </Link>

              <Button type="submit">
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