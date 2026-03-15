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
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <section className="rounded-3xl border border-gray-100 bg-white p-6">
        <h1 className="text-2xl font-semibold">Add Room</h1>

        <form onSubmit={createRoom} className="mt-6">
          {/* Room Type + Price Row */}

          <div className="flex gap-6 mt-4">
            {/* Room Type */}
            <div className="max-w-48 w-full">
              <p className="text-gray-800">Room Type</p>

              <select
                value={inputs.roomType}
                onChange={(e) =>
                  setInputs({ ...inputs, roomType: e.target.value })
                }
                className="border border-gray-300 mt-1 rounded p-2 w-full"
              >
                <option value="">Select Room Type</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Family Suite">Family Suite</option>
              </select>
            </div>

            {/* Price */}
            <div className="max-w-48 w-full">
              <p className="text-gray-800">
                Price <span className="text-xs">/night</span>
              </p>

              <input
                type="number"
                placeholder="0"
                className="border border-gray-300 mt-1 rounded p-2 w-full"
                value={inputs.pricePerNight}
                onChange={(e) =>
                  setInputs({ ...inputs, pricePerNight: e.target.value })
                }
              />
            </div>
          </div>

          {/* Amenities */}

          <p className="text-gray-800 mt-4">Amenities</p>

          <div className="flex flex-col flex-wrap mt-1 text-gray-500 max-w-sm">
            {Object.keys(inputs.amenities).map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
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

          {/* Images Upload */}

          <p className="text-gray-800 mt-4">Images</p>

          <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
            {Object.keys(images).map((key) => (
              <label htmlFor={`roomImage${key}`} key={key}>
                <img
                  className="max-h-13 cursor-pointer opacity-80"
                  src={
                    images[key]
                      ? URL.createObjectURL(images[key])
                      : assets.uploadArea
                  }
                  alt=""
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

          {/* Submit */}

          <button
            disabled={adding}
            className="bg-black text-white rounded-full px-6 py-2.5 text-sm mt-6 hover:opacity-90 transition"
          >
            {adding ? "Adding..." : "Add Room"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default OwnerAddRoomPage;
