"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaFilePdf, FaVideo, FaAward } from "react-icons/fa";
import Link from "next/link";
import { Eye, EyeOff, PhoneCall, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import ConsultantPage from "../NewPages/Consaltant";
import MachineryListPage from "../NewPages/MachinaryList";

const Resource = () => {
  const [activeTab, setActiveTab] = useState("PDF's");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [popupTab, setPopupTab] = useState("login");
  const [form, setForm] = useState({ username: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("resource_token");
    if (token) setIsLoggedIn(true);
  }, []);

  const [fetchAllData, setFetchAllData] = useState([]);

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

  const filteredData =
    activeTab === "All"
      ? fetchAllData
      : fetchAllData.filter((item) => item.resourcetype.includes(activeTab));



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Invalid phone number");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/resourcelogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: form.phone, password: form.password }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        localStorage.setItem("resource_token", data.token);
        toast.success("Login Successfull");
        setIsLoggedIn(true);
        setShowPopup(false);
        setForm({ phone: "", password: "" });
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Invalid phone number");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/resourceregister", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else {
        toast.success("Register Successfull");
        setPopupTab("login");
        setError("");
        setForm({ username: "", phone: "", password: "" });
      }
    } catch {
      setError("Register failed");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setError("");
    setForm({ username: "", phone: "", password: "" });
  };

  return (
    <main>
      {isLoggedIn && (
        <div className="fixed  top-22 lg:!top-26 right-4 z-50 flex items-center gap-2 bg-white shadow-lg rounded-full px-4 py-2 border border-red-100">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium text-gray-700">
            Logged In
          </span>
        </div>
          )}
      <div className="div-spread">
        {fetchAllData.slice(0, 1).map((data) => (
          <section
            key={data._id}
            className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
          >
            <Image
              src="/img/contact-bg.webp"
              alt="Fire Safety Resources"
              fill
              className="object-cover"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-900/70 to-black/80"></div>
            <div className="relative z-10 px-4">
              <h1 className="mb-4 tracking-wide" data-aos="fade-down">
                {data.heading}
              </h1>

              <p
                className="!text-gray-200 max-w-2xl mx-auto  mb-5"
                data-aos="fade-right"
              >
                {data.description}
              </p>

              <div className="red-full-border-button" data-aos="fade-up">
                <Link href="#resources">Explore Resources</Link>
              </div>
            </div>
          </section>
        ))}

        <div className="div-spread  container mx-auto px-4 " id="resources">
      
          <div className="flex justify-center gap-6 mb-12 flex-wrap">
            <button
              onClick={() => setActiveTab("PDF's")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === "PDF's"
                  ? "bg-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              <FaFilePdf className="inline mr-2" />
              PDF's
            </button>

            <button
              onClick={() => setActiveTab("Videos")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === "Videos"
                  ? "bg-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              <FaVideo className="inline mr-2" />
              Videos
            </button>

            <button
              onClick={() => setActiveTab("Certificates")}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 
              ${
                activeTab === "Certificates"
                  ? "bg-red-700 text-white shadow-lg"
                  : "bg-white text-gray-700 border hover:bg-red-50"
              }`}
            >
              <FaAward className="inline mr-2" />
              Certificates
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData
              .filter((item) => item.resourcetype.includes("PDF's"))
              .map((data) => (
                <div key={data._id} data-aos="fade-up">
                  <div className="relative h-100">
                    <div
                      className={`bg-white border border-gray-200  h-100 rounded-lg shadow-md p-6 transition duration-300 
                     ${!isLoggedIn ? "blur-xs pointer-events-none select-none" : "hover:shadow-xl"}`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <FaFilePdf size={40} className="text-red-600" />
                        <h3 className="font-semibold capitalize">
                          {data.heading}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4 ">
                        {data.description}
                      </p>
                      <a
                        href={data.pdf}
                        target="_blank"
                        className="inline-block bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
                      >
                        Download PDF
                      </a>
                    </div>
                    {!isLoggedIn && (
                      <div className="absolute border border-gray-200 inset-0 flex flex-col items-center justify-center rounded-xl bg-white/30 backdrop-blur-[5px]">
                        <FaFilePdf size={30} className="text-red-600 mb-2" />
                        <p className="!text-gray-600 font-semibold mb-3 text-sm">
                          Login to View Pdf
                        </p>
                        <button
                          onClick={() => {
                            setShowPopup(true);
                            setPopupTab("login");
                          }}
                          className="bg-red-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-800 transition"
                        >
                          Login Now!
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="grid md:grid-cols-2 gap-8" data-aos="fade-up">
            {filteredData
              .filter((item) => item.resourcetype.includes("Videos"))
              .map((data) => (
                <div
                  key={data._id}
                  className="bg-white rounded-xl shadow-md p-2 lg:!p-6 hover:shadow-xl transition duration-300"
                >
                  <h3 className="font-semibold text-lg mb-4 text-center">
                    {data.heading}
                  </h3>
                  {data.youtubeLink && (
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${data.youtubeLink}`}
                        title="YouTube video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {data.video && (
                    <div className="aspect-video">
                      <video controls className="w-full h-full rounded-lg">
                        <source src={data.video} />
                      </video>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {filteredData
            .filter((item) => item.resourcetype.includes("Certificates"))
            .map((data) => (
              <div
                key={data._id}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                data-aos="fade-up"
              >
                <div className="bg-white h-auto rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
                  <div className="resource-img">
                    <Image
                      src={data.image}
                      alt={data.heading}
                      width={500}
                      height={500}
                      className="rounded-lg mb-4"
                    />
                  </div>
                  <h5>{data.heading}</h5>
                </div>
              </div>
            ))}
        </div>
      </div>


     
       <ConsultantPage/>
       <MachineryListPage/>

      <div className="container-fluid bg-[#C20016] p-1 lg:!p-5 -mb-15">
        <div className="container mb-26 mt-10 text-center">
          <div>
            <h1>
              <span className="text-[#FFFFFF]">
                Ready to secure your space?
              </span>
            </h1>
            <p className="px-5 py-2">
              <span className="text-[#FFFFFF]">
                Book a free consultation today. Our certified experts are ready
                to assess your fire safety needs.{" "}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-10 items-center m-5">
            <div className="button-white-rounded-bg" data-aos="fade-up">
              <Link href="/contact">Schedule Visit</Link>
            </div>
            <div
              className="button border-2 border-amber-50 rounded-4xl"
              data-aos="fade-up"
            >
              <a href="tel:9956777734" className="flex gap-3">
                <PhoneCall /> 9956777734
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* login / register popup  */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={closePopup}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              <X />
            </button>

            {/* Tabs */}
            <div className="flex mb-6 border-b border-gray-200">
              <button
                onClick={() => {
                  setPopupTab("login");
                  setError("");
                }}
                className={`flex-1 py-2 font-semibold text-center transition ${
                  popupTab === "login"
                    ? "border-b-2 border-red-700 text-red-700"
                    : "text-gray-400"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setPopupTab("register");
                  setError("");
                }}
                className={`flex-1 py-2 font-semibold text-center transition ${
                  popupTab === "register"
                    ? "border-b-2 border-red-700 text-red-700"
                    : "text-gray-400"
                }`}
              >
                Register
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            {/* LOGIN FORM */}
            {popupTab === "login" && (
              <form onSubmit={handleLogin}>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    minLength={10}
                    placeholder="Phone Number"
                    className="w-full mb-3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    required
                  />
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full mb-3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 bottom-3  right-3 px-2 text-gray-500"
                    >
                      {showLoginPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mb-2 bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition disabled:opacity-60"
                  >
                    {loading ? "Logging..." : "Login"}
                  </button>
                  <p className="text-center !text-sm ">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setPopupTab("register");
                        setError("");
                      }}
                      className="text-red-700 underline"
                    >
                      Register Now
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* REGISTER FORM */}
            {popupTab === "register" && (
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full mb-3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  minLength={10}
                  placeholder="Phone Number"
                  className="w-full mb-3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
                <div className="relative">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full mb-3 border px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-700"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute inset-y-0 bottom-3  right-3 px-2 text-gray-500"
                  >
                    {showRegisterPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition disabled:opacity-60"
                >
                  {loading ? "Please wait..." : "Register"}
                </button>
                <p className="text-center !text-sm">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setPopupTab("login");
                      setError("");
                    }}
                    className="text-red-700 underline"
                  >
                    Login Now
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}


     
    </main>
  );
};

export default Resource;
