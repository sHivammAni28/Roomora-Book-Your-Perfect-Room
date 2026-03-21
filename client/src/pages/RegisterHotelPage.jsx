import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RegisterHotelPage = () => {
  const { axios, getToken, setIsOwner } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const token = await getToken();

      const { data } = await axios.post(
        "/api/hotels",
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-10 bg-gray-50">
      {/* TOP CENTER HEADING */}
      <h1 className="text-3xl font-bold text-center mb-10">
        Register Your Hotel
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
        {/* LEFT - FORM */}
        <div className="h-full">
          <form
            onSubmit={onSubmit}
            className="bg-white p-6 rounded-2xl shadow-sm border h-full flex flex-col justify-between"
          >
            <div>
              <p className="text-lg font-semibold mb-4">Hotel Details</p>

              <input
                className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Hotel Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <input
                className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />

              <select
                className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black/20"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              >
                <option value="">Select city</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition"
            >
              {loading ? "Submitting..." : "Register Hotel"}
            </button>
          </form>
        </div>

        {/* RIGHT - IMAGE */}
        <div className="hidden md:block h-full">
          <img
            src={assets.regImage}
            alt="hotel"
            className="w-full h-full object-cover rounded-2xl shadow-md"
          />
        </div>
      </div>
    </main>
  );
};

export default RegisterHotelPage;
