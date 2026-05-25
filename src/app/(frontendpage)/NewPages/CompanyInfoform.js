"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1a191d] placeholder:text-[rgb(190,190,190)] focus:outline-none focus:border-[#c20016] focus:ring-1 focus:ring-[rgba(194,0,22,0.15)] bg-[#fefeff] transition-all duration-200";

const labelClass =
  "block text-xs font-semibold text-[#1a191d] mb-1.5 tracking-wide";

export default function CompanyInfoForm() {
  const [AddData, setAddData] = useState({
    orgName: "",
    address: "",
    branches: "",
    mfsno: "",
    panno: "",
    gstno: "",
    email: "",
    contact_persoon_name: "",
  });

  const handleReset = () => {
    setAddData({
      orgName: "",
      address: "",
      branches: "",
      mfsno: "",
      panno: "",
      gstno: "",
      email: "",
      contact_persoon_name: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!AddData.orgName) {
      toast.error("Organization name is required");
      return false;
    }

    if (!AddData.address) {
      toast.error("Address is required");
      return false;
    }

    if (!AddData.mfsno) {
      toast.error("MFS No. is required");
      return false;
    }

    if (!AddData.panno) {
      toast.error("PAN No. is required");
      return false;
    }

    if (!AddData.branches) {
      toast.error("Branches is required");
      return false;
    }

    if (!AddData.gstno) {
      toast.error("GSTIN is required");
      return false;
    }

    if (!AddData.email) {
      toast.error("Email is required");
      return false;
    }

    if (!AddData.contact_persoon_name) {
      toast.error("Contact Person is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post(`/api/home/compinfo`, AddData);

      if (res.data.success) {
        toast.success("Message Added Successfully");
        setAddData({
          orgName: "",
          address: "",
          branches: "",
          mfsno: "",
          panno: "",
          gstno: "",
          email: "",
          contact_persoon_name: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main className=" py-5">
      {/* ── Form ── */}
      <section className="max-w-3xl mx-auto px-3 lg:px-6 pb-16">
        <div className="bg-[#fafafa] border border-gray-100 rounded-2xl overflow-hidden">
          <div className="bg-[#1a191d] px-8 py-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#c20016]" />
            <h4 className="!text-[#fefeff]  uppercase">
              Company Information Form
            </h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-8 py-8 grid gap-6">
              {/* Organization Name */}
              <div>
                <label className={labelClass}>
                  Name of Organization <span className="text-[#c20016]">*</span>
                </label>
                <input
                  type="text"
                  name="orgName"
                  value={AddData.orgName}
                  onChange={handleChange}
                  placeholder="Enter your organization name"
                  className={inputClass}
                />
              </div>

              {/* Office Address */}
              <div>
                <label className={labelClass}>
                  Office Address <span className="text-[#c20016]">*</span>
                </label>
                <textarea
                  name="address"
                  value={AddData.address}
                  onChange={handleChange}
                  placeholder="Enter office address"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Branch Office */}
              <div>
                <label className={labelClass}>Branch Office</label>
                <input
                  type="text"
                  name="branches"
                  value={AddData.branches}
                  onChange={handleChange}
                  placeholder="Enter branch office address (if any)"
                  className={inputClass}
                />
              </div>

              {/* MFS Lic No + PAN No — side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    MFS Lic No. <span className="text-[#c20016]">*</span>
                  </label>
                  <input
                    type="text"
                    name="mfsno"
                    value={AddData.mfsno}
                    onChange={handleChange}
                    placeholder="e.g. MFS/2024/XXXXX"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Pan No. <span className="text-[#c20016]">*</span>
                  </label>
                  <input
                    type="text"
                    name="panno"
                    value={AddData.panno}
                    onChange={handleChange}
                    placeholder="e.g. ABCDE1234F"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* GSTIN */}
              <div>
                <label className={labelClass}>
                  GSTIN <span className="text-[#c20016]">*</span>
                </label>
                <input
                  type="text"
                  name="gstno"
                  value={AddData.gstno}
                  onChange={handleChange}
                  placeholder="e.g. 27AABCU9603R1ZX"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email <span className="text-[#c20016]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={AddData.email}
                  onChange={handleChange}
                  placeholder="company@example.com"
                  className={inputClass}
                />
              </div>

              {/* Contact Person */}
              <div>
                <label className={labelClass}>
                  Contact Person <span className="text-[#c20016]">*</span>
                </label>
                <input
                  type="text"
                  name="contact_persoon_name"
                  value={AddData.contact_persoon_name}
                  onChange={handleChange}
                  placeholder="Full name of contact person"
                  className={inputClass}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200" />

              {/* Submit */}
              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#c20016] text-[#fefeff] font-bold text-sm py-3.5 rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-150"
                >
                  Submit Information
                </button>
                <button
                  onClick={handleReset}
                  className="sm:w-auto px-6 py-3.5 border border-gray-200 text-[rgb(134,134,134)] font-semibold text-sm rounded-full hover:border-[#c20016] hover:text-[#c20016] transition-all duration-150"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
