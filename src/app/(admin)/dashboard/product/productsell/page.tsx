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
  features: string;
  prodtable: string;
  description: string;
  productpdf: string;
  productimage: string;
  certificate: string[];
  applicationtype: string;
}

interface BestSellingProduct {
  _id: string;
  sellproductlist: Data[];
}

export default function ProductType() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [fetchBestSellingProductData, setFetchBestSellingProductData] =
    useState<BestSellingProduct[]>([]);

  useEffect(() => {
    const fetchBestSellingProductList = async () => {
      const res = await axios.get("/api/product/sellprodlist");
      setFetchBestSellingProductData(res.data.data);
    };
    fetchBestSellingProductList();
  }, []);

  const DeleteBestSellingProductData = async (prodId: string) => {
    try {
      await axios.delete(`/api/product/sellprodlist/${prodId}`);

      setFetchBestSellingProductData((prev) =>
        prev.map((item) => ({
          ...item,
          sellproductlist: item.sellproductlist.filter((p) => p._id !== prodId),
        })),
      );

      toast.error("Data Deleted Successfully");
    } catch {
      toast.error("Server Error");
    }
  };

  const allProducts = fetchBestSellingProductData.flatMap(
    (item) => item.sellproductlist,
  );

  const filteredData = allProducts.filter((item) =>
    item.heading?.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);


    const limitWords = (html:string, wordLimit:number) => {
    const text = html.replace(/<[^>]*>?/gm, "");
    const words = text.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <div>
      <div className="mt-10">
        <div className="flex justify-end mr-4 my-5">
          <Link
            href="productlist/addsellprod"
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
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Descripion
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
                      <TableRow key={index}>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {indexOfFirstRow + index + 1}
                        </TableCell>
                        <TableCell className="px-5 py-4 sm:px-6 text-start">
                          <div className="flex items-center gap-3">
                            {data.productimage && (
                              <div className="w-30 h-30 overflow-hidden relative">
                                <Image
                                  src={data.productimage}
                                  alt={data.heading}
                                  objectFit="contain"
                                  fill
                                />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {data.heading}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: limitWords(data.description, 20),
                            }}
                          ></div>
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                DeleteBestSellingProductData(data._id)
                              }
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
      </div>
    </div>
  );
}
