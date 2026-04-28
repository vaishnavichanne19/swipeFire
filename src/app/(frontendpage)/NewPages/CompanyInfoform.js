"use client";


import { useState } from "react";


const inputClass =
  "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1a191d] placeholder:text-[rgb(190,190,190)] focus:outline-none focus:border-[#c20016] focus:ring-1 focus:ring-[rgba(194,0,22,0.15)] bg-[#fefeff] transition-all duration-200";

const labelClass = "block text-xs font-semibold text-[#1a191d] mb-1.5 tracking-wide";

export default function CompanyInfoForm() {
  const [form, setForm] = useState({
    organizationName: "",
    officeAddress: "",
    branchOffice: "",
    mfsLicNo: "",
    panNo: "",
    gstin: "",
    email: "",
    contactPerson: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({
      organizationName: "",
      officeAddress: "",
      branchOffice: "",
      mfsLicNo: "",
      panNo: "",
      gstin: "",
      email: "",
      contactPerson: "",
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-sm">
          {/* Success icon */}
          <div className="w-16 h-16 bg-[rgba(194,0,22,0.08)] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#c20016" strokeWidth={2.5} className="w-8 h-8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[#1a191d] text-2xl font-extrabold mb-2">Form Submitted!</h2>
          <p className="text-[rgb(134,134,134)] text-sm leading-relaxed mb-6">

            <span className="font-semibold text-[#1a191d]">Swipe Fire</span> team will contact you soon.
          </p>
          <button
            onClick={handleReset}
            className="bg-[#c20016] text-[#fefeff] font-bold text-sm px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Submit new form
          </button>
        </div>
      </div>
    );
  }

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

          <div className="px-8 py-8 grid gap-6">

            {/* Organization Name */}
            <div>
              <label className={labelClass}>
                Name of Organization <span className="text-[#c20016]">*</span>
              </label>
              <input
                type="text"
                name="organizationName"
                value={form.organizationName}
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
                name="officeAddress"
                value={form.officeAddress}
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
                name="branchOffice"
                value={form.branchOffice}
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
                  name="mfsLicNo"
                  value={form.mfsLicNo}
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
                  name="panNo"
                  value={form.panNo}
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
                name="gstin"
                value={form.gstin}
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
                value={form.email}
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
                name="contactPerson"
                value={form.contactPerson}
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
                onClick={handleSubmit}
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
        </div>
      </section>

    </main>
  );
}