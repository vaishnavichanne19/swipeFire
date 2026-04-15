"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { toast } from "react-toastify";
import { Modal } from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Data {
  _id: string;
  heading: string;
  date: string;
  description: string;
  blogdetail: string;
  blogimg: string;
  blogtype: string[];
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [fetchAllData, setFetchAllData] = useState<Data[]>([]);
  const [selectedType, setSelectedType] = useState("All");

  const [ViewId, setViewId] = useState<string | null>(null);

  const [ViewData, setViewData] = useState({
    heading: "",
    date: "",
    description: "",
    blogdetail: "",
    blogimg: "",
    blogtype: [] as string[],
  });

  // ✅ Fetch All Data
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/blog/bloglist");
      setFetchAllData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Fetch View Data
  useEffect(() => {
    if (!ViewId) return;

    const fetchViewData = async () => {
      try {
        const res = await axios.get(`/api/blog/bloglist/${ViewId}`);
        setViewData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchViewData();
  }, [ViewId]);

  // ✅ Delete
  const Deletedata = async (UserId: string) => {
    try {
      await axios.delete(`/api/blog/bloglist/${UserId}`);
      setFetchAllData((prev) => prev.filter((u) => u._id !== UserId));
      toast.error("Data Deleted Successfully!");
      router.push("/dashboard/blog/bloglist");
    } catch (error) {
      toast.error("Server Error");
    }
  };

  // ✅ Blog Types (Unique)
  const blogTypes = [
    "All",
    ...Array.from(new Set(fetchAllData.flatMap((item) => item.blogtype || []))),
  ];

  // ✅ Filter
  const filteredData =
    selectedType === "All"
      ? fetchAllData
      : fetchAllData.filter((item) => item.blogtype?.includes(selectedType));

  // ✅ Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Blog List
      </h3>

      <div className="flex justify-end mr-4 my-5">
        <Link
          href="bloglist/addpage"
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

      <div>
        <div className="flex flex-wrap gap-3 justify-between items-center my-4">
          {/* Show Entries */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg p-2">
            <span>Show</span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border px-2 py-1 rounded"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

            <span>entries</span>
          </div>

          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded-lg bg-white"
          >
            {blogTypes.map((type, index) => (
              <option key={type + index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-hidden  rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <div>
              <Table>
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Sr. No
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Blog Image
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Heading
                    </TableCell>
                    <TableCell
                      isHeader
                      className="hidden md:!table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Descripion
                    </TableCell>
                    <TableCell
                      isHeader
                      className="hidden md:!table-cell px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Blog Type
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {currentRows.map((data, index) => (
                    <TableRow key={data._id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {indexOfFirstRow + index + 1}
                      </TableCell>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-30 h-30 overflow-hidden relative">
                            <Image
                              fill
                              src={data.blogimg}
                              alt={data.heading}
                              objectFit="cover"
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.heading}
                      </TableCell>
                      <TableCell className="hidden md:!table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div
                          dangerouslySetInnerHTML={{ __html: data.description }}
                        ></div>
                      </TableCell>
                      <TableCell className="hidden md:!table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.blogtype}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {new Date(data.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => {
                              setViewId(data._id);
                              openModal();
                            }}
                            className="flex items-center gap-2 rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-white hover:bg-green-600"
                          >
                            View
                          </button>
                          <Link
                            href={`bloglist/${data._id}`}
                            className="flex items-center gap-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white hover:bg-blue-600"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => Deletedata(data._id)}
                            className="flex items-center gap-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-5 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-red-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px]  rounded-3xl  h-[600px] bg-white p-4  dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              View Data
            </h4>
          </div>
          <div className="no-scrollbar overflow-y-auto h-[470px] bg-white p-5 my-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col-reverse gap-6  lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="grid grid-cols-1 gap-4 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Image
                    </p>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {ViewData.blogimg && (
                        <div className="h-[200px] w-auto lg:w-100 relative">
                          <Image
                            src={ViewData.blogimg}
                            alt=" grid"
                            className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
                            fill
                            objectFit="cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Heading
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {ViewData.heading}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Description
                    </p>
                    <p
                      className="text-sm font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{
                        __html: ViewData.description,
                      }}
                    ></p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Date
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {new Date(ViewData.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Blog Type
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {ViewData.blogtype}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Blog Detail
                    </p>
                    <p
                      className="ck-content text-sm font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{
                        __html: ViewData.blogdetail,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
