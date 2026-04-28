"use client";

import axios from "axios";
import { Mail, Map, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MapIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
    </svg>
  );

  const MailIcon = () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const InfoRow = ({ icon, label, children }) => (
    <div className="flex gap-4 items-start pb-4 border-b border-white/60 last:border-0 last:pb-0">
      <div className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center shrink-0 text-white">
        {icon}
      </div>
      <div>
        <p className="!text-[10px] tracking-[0.15em] uppercase !text-white/60 mb-1">
          {label}
        </p>
        <div className="text-md !text-white leading-relaxed">{children}</div>
      </div>
    </div>
  );

  const Field = ({ label, children }) => (
    <div className="flex flex-col gap-2">
      <label className="text-[11px] tracking-[0.14em] uppercase">{label}</label>
      {children}
    </div>
  );


const Contact = () => {
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [direction, setDirection] = useState("forward");

  const handleBranchClick = (index) => {
    if (index > selectedBranch) {
      setDirection("forward");
    } else if (index < selectedBranch) {
      setDirection("backward");
    }
    setSelectedBranch(index);
  };

  const [fetchAllData, setFetchAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/contact");
        setFetchAllData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const branches = fetchAllData.slice(2);

  // form api
  const [AddData, setAddData] = useState({
    name: "",
    phone: "",
    branch: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  setAddData((prev) => ({ ...prev, [name]: value }));
};

  const validate = () => {
    if (!AddData.name) {
      toast.error("First name is required");
      return false;
    }

    if (!AddData.phone) {
      toast.error("Phone number is required");
      return false;
    }

    if (!/^[0-9]{10}$/.test(AddData.phone)) {
      toast.error("Enter valid 10 digit phone number");
      return false;
    }

    if (!AddData.branch) {
      toast.error("Branch is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post(`/api/contact/contactform`, AddData);

      if (res.data.success) {
        toast.success("Message Added Successfully");
        setAddData({
          name: "",
          phone: "",
          branch: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  
  return (
    <main>
      <div className="container-fluid  bg-[#AE1208] pt-2 lg:!pt-5 -mb-15">
        <div className="container main-spread">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div>
                <div className="contact-sec mb-18">
                  <h1 data-aos="fade-up-right">
                    <span className="contact">Contact</span>
                    <br />
                    <span className="us">Us</span>
                    <br />
                    <span className="today">Today</span>
                  </h1>
                </div>

                {fetchAllData.slice(0, 1).map((data) => (
                  <div key={data._id}>
                    <h5>
                      <b className="text-[#FEFEFF]">{data.heading}</b>
                    </h5>
                    <div
                      className="py-2 text-[#FEFEFF] [&_*]:!text-[#FEFEFF] "
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 flex items-center justify-center">
              <div className="flex flex-col gap-6 px-8 py-14 md:px-12">
                <div>
                  <p className="!text-[11px] tracking-[0.18em] uppercase !text-white/60 mb-1">
                    Headquarters
                  </p>
                  <h3 className="font-normal !text-[#f0ece4]">Head Office</h3>
                </div>
                <InfoRow icon={<MapIcon />} label="Address">
                  <p className="!text-md !text-white">
                    {" "}
                    Plot No. 182 &amp; House No. 915, Amravati Rd, Tawakal
                    Layout, Wadi, Maharashtra 440023
                  </p>
                </InfoRow>
                <InfoRow icon={<PhoneIcon />} label="Phone">
                  <a
                    href="tel:9682779993"
                    className="!text-white hover:underline"
                  >
                    9682779993
                  </a>
                  {" · "}
                  <a
                    href="tel:9359104862"
                    className="!text-white hover:underline"
                  >
                    9359104862
                  </a>
                </InfoRow>
                <InfoRow icon={<MailIcon />} label="Email">
                  <a
                    href="mailto:swipefire2018@gmail.com"
                    className="!text-white hover:underline"
                  >
                    swipefire2018@gmail.com
                  </a>
                </InfoRow>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="px-8 py-14 md:px-12 border-b md:border-b-0 md:border-r border-black/80">
          <p className="tracking-[0.18em] uppercase !text-[#c20016] font-medium mb-4">
            01 — Enquiry
          </p>
          <h2 className=" leading-snug  mb-4">
            Send us
            <br />a message
          </h2>
          <p className="max-w-md  leading-[1.8]">
            Fill in your details and select your nearest branch. Our team will
            get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-14 md:px-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field label="Your name">
              <input
                type="text"
                name="name"
                value={AddData.name}
                onChange={handleChange
                }
                placeholder="e.g. Rahul Sharma"
                className="w-full bg-white/4 border border-white/10 rounded-lg  text-[15px] px-4 py-3 outline-none"
              />
            </Field>

            <Field label="Phone number">
              <input
                type="tel"
                name="phone"
                maxLength={10}
                value={AddData.phone}
                onChange={handleChange
                }
                placeholder="10-digit number"
                className="w-full bg-white/4 border border-white/10 rounded-lg  text-[15px] px-4 py-3 outline-none"
              />
            </Field>

            <Field label="Select branch">
              <select
                value={AddData.branch}
                name="branch"
                onChange={handleChange}
                className="w-full bg-white/4 border border-white/10 rounded-lg  text-[15px] px-4 py-3 outline-none"
              >
                <option value="">Choose a branch…</option>
                {fetchAllData.slice(2).map((b, i) => (
                  <option key={i} value={b.branchname}>
                    {b.branchname}
                  </option>
                ))}
              </select>
            </Field>

            <button
              type="submit"
              className="flex items-center justify-between px-5 py-[14px] bg-[#c20016] hover:bg-[#a00012] rounded-lg text-white text-sm font-medium tracking-wide transition-colors mt-1 cursor-pointer"
            >
              Submit enquiry
              <span className="w-5 h-5 border border-white/50 rounded-full flex items-center justify-center">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                >
                  <line x1="2" y1="5" x2="8" y2="5" />
                  <polyline points="5,2 8,5 5,8" />
                </svg>
              </span>
            </button>
          </form>
        </div>
      </section>

      <div className="container-fluid bg-[#f5f5f5] px-3 lg:!px-5 py-2 lg:!py-18">
        <div className="mb-9 text-center">
          <p className=" tracking-[0.18em] uppercase !text-[#c20016] font-medium mb-4">
            02 — Locations
          </p>
          {fetchAllData.slice(1, 2).map((data) => (
            <h2
              key={data._id}
              className="font-serif text-4xl font-normal text-[#f0ece4]"
            >
              {data.heading}
            </h2>
          ))}
        </div>

        <div className="row flex flex-wrap justify-center">
          {fetchAllData.slice(2).map((branch, index) => (
            <div
              key={index}
              className="col-lg-2 col-md-2 col-sm-6 col-6 my-3"
              data-aos="fade-up"
            >
              <div
                onClick={() => handleBranchClick(index)}
                className={`branch_info cursor-pointer ${selectedBranch === index ? "active_branch" : ""}`}
              >
                <div>
                  <div className="contact-circle flex justify-center items-center">
                    <div className="contact-icon">
                      <FaGlobe color="#c20016" size={50} />
                    </div>
                  </div>
                  <div>
                    <h5>
                      <b className="w-[100px]  md:w-full break-all">
                        {branch.branchname}
                      </b>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#c20016] ">
        <div className="container -mb-15 pb-25">
          <div className="pt-5">
            {branches[selectedBranch]?.branchaddress ? (
              <div
                className="[&_iframe]:w-full ![&_iframe]:w-full "
                dangerouslySetInnerHTML={{
                  __html: branches[selectedBranch].branchaddress,
                }}
              />
            ) : (
              <p className="text-center text-white text-gray-500">
                No map available for this branch
              </p>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
};

export default Contact;
