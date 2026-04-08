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

  const [UpdateData, setUpdateData] = useState({
    heading: "",
    image: "",
    description: "",
    video: "",
    pdf: "",
    youtubeLink: "",
  });

  const [selectedFiles, setSelectedFiles] = useState({});

  /* -------- FETCH DATA -------- */

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`/api/resource/${editid}`);

      if (res.data.success) {
        setUpdateData(res.data.data);
      }
    };

    fetchdata();
  }, [editid]);

  /* -------- FILE CHANGE -------- */

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  /* -------- UPDATE -------- */

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("heading", UpdateData.heading);
    formData.append("description", UpdateData.description);
    if (UpdateData.youtubeLink) {
  formData.append("youtubeLink", UpdateData.youtubeLink);
}

    Object.keys(selectedFiles).forEach((key) => {
      formData.append(key, selectedFiles[key]);
    });

    try {
      await axios.put(`/api/resource/${editid}`, formData);

      toast.info("Data Updated Successfully");

      router.push("/dashboard/resource");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <main>
      <div className="max-w-[700px] lg:m-4 border border-gray-300 rounded-2xl">
        <div className="bg-white p-6 rounded-2xl">
          <h4 className="mb-6 text-2xl font-semibold">Edit Resource</h4>

          <form onSubmit={handleUpdate} className="flex flex-col gap-5">
            {/* Heading */}

            <div>
              <Label>Heading</Label>
              <Input
                type="text"
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
              <div>
                <Label>Description</Label>
                <TextArea
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
            {/* Image */}

            {UpdateData.image && (
              <div>
                <Label>Image</Label>

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "image")}
                />

                <Image
                  src={UpdateData.image}
                  alt="image"
                  width={200}
                  height={120}
                  className="mt-2 rounded"
                />
              </div>
            )}

            {/* Video */}

            {UpdateData.video && (
              <div>
                <Label>Video</Label>

                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange(e, "video")}
                />

                <video
                  src={UpdateData.video}
                  controls
                  className="mt-2 w-full rounded"
                />
              </div>
            )}

            {/* PDF */}

            {UpdateData.pdf && (
              <div>
                <Label>PDF File</Label>

                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileChange(e, "pdf")}
                />

                <a
                  href={UpdateData.pdf}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  View PDF
                </a>
              </div>
            )}

            {/* Youtube Link */}
            {UpdateData.youtubeLink && (
              <div>
                <Label>YouTube Link [Example: (https://www.youtube.com/watch?v=<span className="text-red-500">oi4MBo-eyBk</span>&t=1s) Add only video id]</Label>

                <Input
                  type="text"
                  value={UpdateData.youtubeLink}
                  onChange={(e) =>
                    setUpdateData({
                      ...UpdateData,
                      youtubeLink: e.target.value,
                    })
                  }
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <Link
                href="/dashboard/resource"
                className="border px-4 py-2 rounded-lg"
              >
                Cancel
              </Link>

              <Button type="submit" size="sm">
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
