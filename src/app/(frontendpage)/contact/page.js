"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { PiPhoneCallFill } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  const validate = () => {
    if (!AddData.email) {
      toast.error("Email is required");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(AddData.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!AddData.name) {
      toast.error("First name is required");
      return false;
    }

    if (!AddData.lastname) {
      toast.error("Last name is required");
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

    if (!AddData.message) {
      toast.error("Message is required");
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
          lastname: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <main>
      <div className="container-fluid bg-[#AE1208] pt-2 lg:!pt-5 -mb-15">
        <div className="container main-spread">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="flex flex-col justify-between  h-130">
                <div className="contact-sec">
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
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="my-2">
                    <label className="text-white font-medium text-xl w-full">
                      Email:{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={AddData.email}
                      onChange={(e) =>
                        setAddData({ ...AddData, email: e.target.value })
                      }
                      required
                      className=" rounded-xl my-2 w-full p-2.5 outline-2 outline-white text-white !text-xl font-medium"
                    />
                  </div>
                  <div className="my-2 flex flex-col lg:!flex-row gap-2 lg:!gap-4">
                    <div>
                      <label className="text-white font-medium text-xl w-full">
                        First Name:{" "}
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={AddData.name}
                        onChange={(e) =>
                          setAddData({ ...AddData, name: e.target.value })
                        }
                        required
                        className=" rounded-xl my-2 w-full p-2.5 outline-2 outline-white text-white !text-xl font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-white font-medium text-xl w-full">
                        Last Name:{" "}
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={AddData.lastname}
                        onChange={(e) =>
                          setAddData({ ...AddData, lastname: e.target.value })
                        }
                        required
                        className=" rounded-xl my-2 w-full p-2.5 outline-2 outline-white text-white !text-xl font-medium"
                      />
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="text-white font-medium text-xl w-full">
                      Phone No:{" "}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={AddData.phone}
                      onChange={(e) =>
                        setAddData({ ...AddData, phone: e.target.value })
                      }
                      required
                      className=" rounded-xl my-2 w-full p-2.5 outline-2 outline-white text-white !text-xl font-medium"
                    />
                  </div>
                  <div className="my-2">
                    <label className="text-white font-medium text-xl w-full">
                      Message:{" "}
                    </label>
                    <textarea
                      type="text"
                      name="message"
                      value={AddData.message}
                      onChange={(e) =>
                        setAddData({ ...AddData, message: e.target.value })
                      }
                      required
                      rows={5}
                      className=" rounded-xl my-2 w-full p-2.5 outline-2 outline-white text-white !text-xl font-medium"
                    />
                  </div>
                  <div className="button-white-bg text-right">
                    <button type="submit" className="!text-xl font-bold">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid bg-[#f5f5f5] px-3 lg:!px-5 py-2 lg:!py-5">
          {fetchAllData.slice(1, 2).map((data) => (
            <h1 key={data._id} className="my-5 text-center">
              {data.heading}
            </h1>
          ))}

          <div className="row flex flex-wrap justify-center">
            {fetchAllData.slice(2).map((branch, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-3 col-sm-6 col-6 my-3"
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
                        <b className="w-[100px] md:w-full break-all">
                          {branch.branchname}
                        </b>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            key={selectedBranch}
            className={`mt-4 container branch-details ${direction}`}
          >
            <div className="row">
              <div
                className="col-lg-4 col-md-4 col-sm-12 my-3"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="mx-3">
                  <div className="cont_detail">
                    <div className="cont_content">
                      <div className="cont_circle flex justify-center items-center">
                        <span className="et_pb_image_wrap">
                          <span>
                            <MdLocationPin color="#c20016" size={50} />
                          </span>
                        </span>
                      </div>
                      <div>
                        <h4 className="cont_header">
                          <span>Address</span>
                        </h4>
                        <p
                          className="cont_description text-[#ffffff] [&_*]:!text-[#ffffff] "
                          dangerouslySetInnerHTML={{
                            __html: branches[selectedBranch]?.branchaddress,
                          }}
                        ></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-4 col-sm-12 my-3"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <div className="mx-3">
                  <div className="cont_detail">
                    <div className="cont_content">
                      <div className="cont_circle flex justify-center items-center">
                        <span className="et_pb_image_wrap">
                          <span>
                            <PiPhoneCallFill color="#c20016" size={50} />
                          </span>
                        </span>
                      </div>
                      <div>
                        <h4 className="cont_header">
                          <span>Number</span>
                        </h4>
                        <p className="cont_description">
                          {branches[selectedBranch]?.branchphone}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-4 col-md-4 col-sm-12 my-3"
                data-aos="fade-up"
                data-aos-delay={600}
              >
                <div className="mx-3">
                  <div className="cont_detail">
                    <div className="cont_content">
                      <div className="cont_circle flex justify-center items-center">
                        <span className="et_pb_image_wrap">
                          <span>
                            <IoMdMail color="#c20016" size={50} />
                          </span>
                        </span>
                      </div>
                      <div>
                        <h4 className="cont_header">
                          <span>Email Address</span>
                        </h4>
                        <p className="cont_description">
                          {branches[selectedBranch]?.branchemail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pb-25">
          <div className="pt-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.9067674195617!2d79.00193851769664!3d21.156108291826975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4eaee7fe3f361%3A0xe4658bb0c38559b8!2sSwipe%20Fire%20Solutions%20Pvt%20Ltd%20(Head%20Office)!5e0!3m2!1sen!2sin!4v1771488582079!5m2!1sen!2sin"
              width="100%"
              height={450}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default Contact;
