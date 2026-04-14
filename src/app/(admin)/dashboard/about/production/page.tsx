"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { MoreDotIcon } from "@/icons";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface HeroData {
  _id: string;
  heading: string;
  number: string;
}

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const [fetchAllData, setFetchAllData] = useState<HeroData[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const [ProductionData, setProductionData] = useState({
    heading: "",
    number: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/about/production");
      setFetchAllData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!editId) return;

    const fetchSingleData = async () => {
      try {
        const res = await axios.get(`/api/about/production/${editId}`);

        if (res.data.success) {
          setProductionData(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleData();
  }, [editId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/about/production/${editId}`, ProductionData);

      toast.info("Data Updated Successfully");

      fetchData();
      closeModal();
      setEditId(null);
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  const Deletedata = async (UserId: string) => {
    try {
      await axios.delete(`/api/about/production/${UserId}`);
      setFetchAllData((prev) => prev.filter((user) => user._id !== UserId));
      toast.error("Data Deleted Successfully!");
      router.push("/dashboard/about/production");
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
        Production Facts
      </h3>

      {fetchAllData.slice(0, 1).map((data) => (
        <div
          key={data._id}
          className="bg-white  p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
        >
          <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start lg:justify-between">
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
              <button
                onClick={() => {
                  openModal();
                  setEditId(data._id);
                }}
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
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-end mr-4 my-5">
        <Link
          href="production/addpage"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {fetchAllData.slice(1).map((data) => (
          <div
            key={data._id}
            className="bg-white  p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
          >
            <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="grid grid-cols-1 gap-4 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Number
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {data.number}
                    </p>
                  </div>

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
                    <DropdownItem
                      tag="a"
                      onClick={() => {
                        openModal();
                        setEditId(data._id);
                      }}
                      className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      Edit
                    </DropdownItem>
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

            <Modal
              isOpen={isOpen}
              onClose={closeModal}
              className="max-w-[700px] m-4"
            >
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
                        {ProductionData.number && (
                          <div className="col-span-2 lg:col-span-1">
                            <Label>Number</Label>
                            <Input
                              type="number"
                              id="number"
                              value={ProductionData.number}
                              onChange={(e) =>
                                setProductionData({
                                  ...ProductionData,
                                  number: e.target.value,
                                })
                              }
                            />
                          </div>
                        )}
                        <div className="col-span-2 lg:col-span-1">
                          <Label>Heading</Label>
                          <Input
                            type="text"
                            id="heading"
                            value={ProductionData.heading}
                            onChange={(e) =>
                              setProductionData({
                                ...ProductionData,
                                heading: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-2 mt-6 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        closeModal();
                        setEditId(null);
                      }}
                    >
                      Close
                    </Button>
                    <Button size="sm" type="submit">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
}
