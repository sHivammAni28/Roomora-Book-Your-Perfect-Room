import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const OwnerAddRoomPage = () => {
  const { axios, getToken } = useAppContext();
  const navigate = useNavigate();

  const [adding, setAdding] = useState(false);

  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: "",
    pricePerNight: "",
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "Pool Access": false,
    },
  });

  const createRoom = async (e) => {
    e.preventDefault();

    if (!inputs.roomType) {
      toast.error("Select room type");
      return;
    }

    if (!inputs.pricePerNight || inputs.pricePerNight <= 0) {
      toast.error("Enter valid price");
      return;
    }

    if (!inputs.amenities) {
      toast.error("PLease select at least one amenities");
      return;
    }

    const fd = new FormData();

    fd.append("roomType", inputs.roomType);
    fd.append("pricePerNight", inputs.pricePerNight);

    const selectedAmenities = Object.keys(inputs.amenities).filter(
      (key) => inputs.amenities[key],
    );

    fd.append("amenities", JSON.stringify(selectedAmenities));

    Object.keys(images).forEach((key) => {
      images[key] && fd.append("images", images[key]);
    });

    try {
      setAdding(true);

      // const token = await getToken();
      const { data } = await axios.post("/api/rooms", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Room added successfully");

      navigate("/owner");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-10 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <section className="bg-white p-8 rounded-2xl shadow-sm border">
          {/* HEADER */}
          <h1 className="text-3xl font-bold mb-2">Add New Room</h1>
          <p className="text-sm text-gray-500 mb-6">
            Fill in room details below
          </p>

          <form onSubmit={createRoom}>
            {/* ROOM TYPE + PRICE */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-800">Room Type</p>
                <select
                  value={inputs.roomType}
                  onChange={(e) =>
                    setInputs({ ...inputs, roomType: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black/20"
                >
                  <option value="">Select Room Type</option>
                  <option value="Single Bed">Single Bed</option>
                  <option value="Double Bed">Double Bed</option>
                  <option value="Luxury Room">Luxury Room</option>
                  <option value="Family Suite">Family Suite</option>
                </select>
              </div>

              <div>
                <p className="text-gray-800">
                  Price <span className="text-xs">/night</span>
                </p>
                <input
                  type="number"
                  placeholder="0"
                  value={inputs.pricePerNight}
                  onChange={(e) =>
                    setInputs({ ...inputs, pricePerNight: e.target.value })
                  }
                  className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
              </div>
            </div>

            {/* AMENITIES */}
            <p className="text-lg font-semibold mt-6">Amenities</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 text-gray-600">
              {Object.keys(inputs.amenities).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <input
                    type="checkbox"
                    id={`amenities${index}`}
                    checked={inputs.amenities[amenity]}
                    onChange={() =>
                      setInputs({
                        ...inputs,
                        amenities: {
                          ...inputs.amenities,
                          [amenity]: !inputs.amenities[amenity],
                        },
                      })
                    }
                  />
                  <label htmlFor={`amenities${index}`}>{amenity}</label>
                </div>
              ))}
            </div>

            {/* IMAGES */}
            <p className="text-lg font-semibold mt-6">Images</p>
            <div className="flex flex-wrap gap-4 mt-2">
              {Object.keys(images).map((key) => (
                <label htmlFor={`roomImage${key}`} key={key}>
                  <img
                    src={
                      images[key]
                        ? URL.createObjectURL(images[key])
                        : assets.uploadArea
                    }
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                  />
                  <input
                    type="file"
                    id={`roomImage${key}`}
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setImages({ ...images, [key]: e.target.files[0] })
                    }
                  />
                </label>
              ))}
            </div>

            {/* BUTTON */}
            <button
              disabled={adding}
              className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition"
            >
              {adding ? "Adding..." : "Add Room"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default OwnerAddRoomPage;
