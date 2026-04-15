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
import ProductType from "../producttype/page";
import ProductSell from "../productsell/page";

interface Data {
  _id: string;
  heading: string;
  features: string;
  prodtable: string;
  description: string;
  productpdf: string;
  productimage: string;
  certificate: string[];
  applicationtype: string[];
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [fetchAllData, setFetchAllData] = useState<Data[]>([]);
  const firstItem = fetchAllData[0];
  const SecondItem = fetchAllData[1];
  const ThirdItem = fetchAllData[2];
  const restData = fetchAllData.slice(3);

  const [ViewId, setViewId] = useState<string | null>(null);

  const [ViewData, setViewData] = useState({
    heading: "",
    features: "",
    prodtable: "",
    description: "",
    productpdf: "",
    productimage: "",
    certificate: [],
    applicationtype: [],
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/product/productlist");
      setFetchAllData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!ViewId) return;

    const fetchViewData = async () => {
      try {
        const res = await axios.get(`/api/product/productlist/${ViewId}`);

        setViewData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchViewData();
  }, [ViewId]);

  const Deletedata = async (UserId: string) => {
    try {
      await axios.delete(`/api/product/productlist/${UserId}`);
      setFetchAllData((prev) => prev.filter((user) => user._id !== UserId));
      toast.error("Data Deleted Successfully!");
      router.push("/dashboard/product/productlist");
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const filteredData = restData.filter((item) =>
    item.heading.toLowerCase().includes(search.toLowerCase()),
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const limitWords = (html: string, wordLimit: number) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Product List
      </h3>

      {fetchAllData.slice(0, 1).map((data) => (
        <div
          key={data._id}
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
                    {data.heading}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href={`productlist/${data._id}`}
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
      ))}

      <div className="flex justify-end mr-4 my-5">
        <Link
          href="productlist/addpage"
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

          {/* Search */}
          <input
            type="text"
            placeholder="Search Product Name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded-lg bg-white"
          />
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
                      Product Image
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
                      Application Type
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHeader>

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
                              src={data.productimage}
                              alt={data.heading}
                              objectFit="contain"
                              fill
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.heading}
                      </TableCell>
                      <TableCell className="hidden md:!table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: limitWords(data.description, 10),
                          }}
                        ></div>
                      </TableCell>
                      <TableCell className="hidden md:!table-cell px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <ul className="list-disc">
                          {data.applicationtype
                            .slice(0, 3)
                            .map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                        </ul>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center flex-wrap gap-2">
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
                            href={`productlist/${data._id}`}
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
                      Product Image
                    </p>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {ViewData.productimage && (
                        <div className="h-[200px] w-auto lg:w-100 relative">
                          <Image
                            src={ViewData.productimage}
                            alt={ViewData.heading}
                            className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
                            fill
                            objectFit="contain"
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
                      Application Type
                    </p>
                    <ul className="text-sm pl-5 font-medium text-gray-800 dark:text-white/90 list-disc">
                      {ViewData.applicationtype.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Features
                    </p>
                    <p
                      className="ck-content text-sm font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{ __html: ViewData.features }}
                    ></p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Certificate Image
                    </p>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {ViewData?.certificate?.map((item, index) => (
                        <div key={index} className="w-30 h-30  relative">
                          {item && (
                            <Image
                              src={item}
                              alt=" grid"
                              fill
                              objectFit="contain"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Product PDF
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      <a
                        href={ViewData.productpdf}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Product Table
                    </p>
                    <p
                      className="ck-content text-sm font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{
                        __html: ViewData.prodtable,
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div className="mt-10">
        {fetchAllData.slice(1, 2).map((data) => (
          <div
            key={data._id}
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
                      {data.heading}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`productlist/${data._id}`}
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
        ))}

        <ProductType />
      </div>

      <div className="mt-10">
        {fetchAllData.slice(2, 3).map((data) => (
          <div
            key={data._id}
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
                      {data.heading}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Description
                    </p>
                    <p
                      className="text-sm font-medium text-gray-800 dark:text-white/90"
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Link
                  href={`productlist/${data._id}`}
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
        ))}

        <ProductSell />
      </div>
    </div>
  );
}
