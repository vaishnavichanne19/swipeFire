"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from "next/image";

const AddData = () => {
  const router = useRouter();

  const [AddData, setAddData] = useState({
    prodtype: [],
  });

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/product/productlist");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
   formData.append("prodtype", JSON.stringify(AddData.prodtype));

    try {
      const res = await axios.post("/api/product/producttypelist", formData);

      if (res.data.success) {
        toast.success("Data Added Successfully");
        router.push("/dashboard/product/productlist");
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
                    <Label>Select Product Type</Label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      {fetchAllData.slice(3).map((data) => (
                        <label
                          key={data._id}
                          className={`border p-3 rounded cursor-pointer flex items-center gap-2 ${
                            AddData.prodtype.includes(data._id)
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={data._id}
                            checked={AddData.prodtype.includes(data._id)}
                            onChange={(e) => {
                              const value = e.target.value;

                              setAddData((prev) => ({
                                ...prev,
                                prodtype: e.target.checked
                                  ? [...prev.prodtype, value]
                                  : prev.prodtype.filter((id) => id !== value),
                              }));
                            }}
                          />

                          {data.heading}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 justify-end">
              <Link
                href="/dashboard/product/productlist"
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
