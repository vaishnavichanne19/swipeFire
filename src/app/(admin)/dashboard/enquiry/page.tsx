"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Data {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
}

export default function UserInfoCard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [fetchAllData, setFetchAllData] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/contact/contactform");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const Deletedata = async (UserId: string) => {
    try {
      await axios.delete(`/api/contact/contactform/${UserId}`);
      setFetchAllData((prev) => prev.filter((user) => user._id !== UserId));
      toast.error("Data Deleted Successfully!");
      router.push("/dashboard/enquiry");
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = fetchAllData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(fetchAllData.length / rowsPerPage);
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Enquiry List
      </h3>

      <div>
        <div className="flex justify-between items-center my-4">
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
                      Email
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Last Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Number
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Message
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
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.email}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.lastname}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.phone}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {data.message}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-2">
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
    </div>
  );
}
