"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Data {
  _id: string;
  heading: string;
  description: string;
}

export default function UserInfoCard() {
  const [fetchAllData, setFetchAllData] = useState<Data[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/home/testimonial");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const Deletedata = async (UserId: string) => {
    try {
      await axios.delete(`/api/home/testimonial/${UserId}`);
      setFetchAllData((prev) => prev.filter((user) => user._id !== UserId));
      toast.error("Data Deleted Successfully!");
      router.push("/dashboard/homepages/testimonial");
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Testimonial Section
      </h3>

      <div className="flex justify-end mr-4 my-5">
        <Link
          href="testimonial/addpage"
          className="flex w-20  items-center justify-center gap-2 rounded-xl border-2 border-green-300 bg-green-300 px-4 py-3 text-sm font-medium text-gray-900 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="stroke-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {fetchAllData.map((data) => (
          <div
            key={data._id}
            className="bg-white p-5  border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
          >
            <div className="flex flex-col-reverse gap-6  lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="grid grid-cols-1 gap-4 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                     Name
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {data.heading}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Review
                    </p>
                    <p
                      className="text-sm font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{
                        __html: data.description,
                      }}
                    ></p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="relative inline-block ">
                  <button
                    onClick={() => toggleDropdown(data._id)}
                    className="dropdown-toggle"
                  >
                    <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
                  </button>
                  <Dropdown
                    isOpen={openDropdownId === data._id}
                    onClose={closeDropdown}
                    className="w-40 p-2"
                  >
                    <Link href={`testimonial/${data._id}`}>
                      <DropdownItem
                        tag="a"
                        onItemClick={closeDropdown}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        Edit
                      </DropdownItem>
                    </Link>
                    <DropdownItem
                      tag="a"
                      onItemClick={() => Deletedata(data._id)}
                      className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Delete
                    </DropdownItem>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
