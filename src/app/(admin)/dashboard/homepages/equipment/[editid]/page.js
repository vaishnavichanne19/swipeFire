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

const Update = () => {
  const { editid } = useParams();
  const router = useRouter();

  const [equipmentData, setequipmentData] = useState({
    heading: "",
    suffix: "",
    description: "",
  });

  useEffect(() => {
    const fetchequipment = async () => {
      const res = await axios.get(`/api/home/equipment/${editid}`);
      if (res.data.success) {
        setequipmentData(res.data.data);
      }
    };
    fetchequipment();
  }, [editid]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/home/equipment/${editid}`, equipmentData);
      toast.info("Data Updated Successfully");
      router.push("/dashboard/homepages/equipment");
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
                    <Label>Number</Label>
                    <Input
                      type="number"
                      id="heading"
                      value={equipmentData.heading}
                      onChange={(e) =>
                        setequipmentData({
                          ...equipmentData,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>

                  {equipmentData.suffix && (
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Suffix</Label>
                      <Input
                        type="text"
                        id="suffix"
                        value={equipmentData.suffix}
                        onChange={(e) =>
                          setequipmentData({
                            ...equipmentData,
                            suffix: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Description</Label>
                    <TextArea
                      rows={4}
                      value={equipmentData.description}
                      onChange={(value) =>
                        setequipmentData({
                          ...equipmentData,
                          description: value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href="/dashboard/homepages/equipment"
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
