"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Data {
  _id: string;
  heading: string;
  description: string;
  resourcetype: string[];
  image: string;
  video: string;
  pdf: string;
  youtubeLink: string;
}

export default function UserInfoCard() {
  const [fetchAllData, setFetchAllData] = useState<Data[]>([]);
  const router = useRouter();
  const [filterType, setFilterType] = useState("All");
  const firstItem = fetchAllData[0];
  const restData = fetchAllData.slice(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/resource");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const Deletedata = async (UserId: string) => {
    try {
      await axios.delete(`/api/resource/${UserId}`);
      setFetchAllData((prev) => prev.filter((user) => user._id !== UserId));
      toast.error("Data Deleted Successfully!");
      router.push("/dashboard/resource");
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

  const filteredData =
    filterType === "All"
      ? restData
      : restData.filter((item) =>
          item.resourcetype?.some(
            (type) =>
              type.toLowerCase().trim() === filterType.toLowerCase().trim(),
          ),
        );

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Resource Page
      </h3>

      {firstItem && (
        <div
          key={firstItem._id}
          className="bg-white p-5 my-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
        >
          <div className="flex flex-col-reverse gap-6  lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="grid grid-cols-1 gap-4 lg:gap-7 2xl:gap-x-32">
                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Heading
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                    {firstItem.heading}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Description
                  </p>
                  <p
                    className="text-sm font-medium text-gray-800 dark:text-white/90"
                    dangerouslySetInnerHTML={{
                      __html: firstItem.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href={`resource/${firstItem._id}`}
                className="flex w-20  lg:w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  />
                </svg>
                Edit
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end mr-4 my-5">
        <Link
          href="resource/addpage"
          className="flex w-20 items-center justify-center gap-2 rounded-xl border-2 border-green-300 bg-green-300 px-4 py-3 text-sm font-medium text-gray-900 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
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

      <div className="flex flex-wrap gap-2 my-5">
        {["All", "PDF's", "Certificates", "Videos"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg text-sm border transition
        ${
          filterType === type
            ? "bg-red-600 text-white border-red-600"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {filteredData.map((data) => (
          <div
            key={data._id}
            className="bg-white p-5  border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
          >
            <div className="flex flex-col-reverse gap-6  lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="grid grid-cols-1 gap-4 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Heading
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {data.heading}
                    </p>
                  </div>

                  {data.description && (
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Description
                      </p>
                      <p
                        className="text-sm font-medium text-gray-800 dark:text-white/90"
                        dangerouslySetInnerHTML={{
                          __html: data.description,
                        }}
                      ></p>
                    </div>
                  )}

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Resource Type
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {data.resourcetype}
                    </p>
                  </div>
                  {data.image && (
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Image
                      </p>
                      <div>
                        <div className="h-[250px] lg:w-100 relative">
                          <Image
                            src={data.image}
                            alt={data.heading}
                            fill
                            style={{ objectFit: "contain" }}
                            className="border border-gray-200 rounded-xl dark:border-gray-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {data.pdf && (
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        PDF
                      </p>

                      <a
                        href={data.pdf}
                        target="_blank"
                        className="inline-block px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        View PDF
                      </a>
                    </div>
                  )}

                  {data.video && (
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Video
                      </p>
                      <div>
                        <div className="h-[250px] lg:w-100 relative">
                          <video
                            className="w-full h-full border border-gray-200 rounded-xl dark:border-gray-800"
                            controls
                          >
                            <source src={data.video} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                  )}

                  {data.youtubeLink && (
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Youtube Link
                      </p>
                      <div>
                        <div className="h-[250px] lg:w-100 relative">
                          <iframe
                            width="100%"
                            height="250"
                            src={`https://www.youtube.com/embed/${data.youtubeLink}`}
                            title="YouTube video"
                            allowFullScreen
                            className="rounded-lg"
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <div className="relative inline-block">
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
                    <Link href={`resource/${data._id}`}>
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
