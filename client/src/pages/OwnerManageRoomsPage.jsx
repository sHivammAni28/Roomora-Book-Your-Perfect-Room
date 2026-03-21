import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const OwnerManageRoomsPage = () => {
  const { rooms: roomAPI } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- API: Load Rooms ---
  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await roomAPI.ownerRooms();

        setRooms(Array.isArray(data.rooms) ? data.rooms : []);
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadRooms();
  }, []);

  // --- API: Toggle Availability ---
  const toggleAvailability = async (roomId) => {
    try {
      const data = await roomAPI.toggleAvailability(roomId);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      // Optimistic Update or State Sync
      setRooms((prev) =>
        prev.map((r) =>
          r._id === roomId ? { ...r, isAvailable: !r.isAvailable } : r,
        ),
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Room Listings</h1>
        <p className="text-gray-500 mt-2">
          View, edit, or manage all listed rooms. Keep the information
          up-to-date to provide the best experience for users.
        </p>
      </div>

      <p className="text-gray-500 mt-8 mb-4">All Rooms</p>

      {/* Table Container */}
      <div className="w-full max-w-5xl text-left border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="py-3 px-4 text-gray-800 font-medium">Room</th>
                <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                  Facilities
                </th>
                <th className="py-3 px-4 text-gray-800 font-medium">
                  Price{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / night
                  </span>
                </th>
                <th className="py-3 px-4 text-gray-800 font-medium text-center">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    Loading rooms...
                  </td>
                </tr>
              ) : rooms.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    No rooms found.
                  </td>
                </tr>
              ) : (
                rooms.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Room Name & Image */}
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.images?.[0] ||
                            "https://via.placeholder.com/150"
                          }
                          alt={item.roomType}
                          className="w-12 h-12 rounded object-cover border"
                        />
                        <span className="font-medium">{item.roomType}</span>
                      </div>
                    </td>

                    {/* Facilities (Hidden on small screens) */}
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300 max-sm:hidden">
                      {item.amenities?.join(", ") || "No amenities"}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                      Rs {item.pricePerNight}
                    </td>

                    {/* Toggle Switch Actions */}
                    <td className="py-3 px-4 border-t border-gray-300 text-center">
                      <label className="relative inline-flex items-center cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.isAvailable}
                          onChange={() => toggleAvailability(item._id)}
                        />
                        {/* Track */}
                        <div
                          className="w-12 h-6 bg-slate-300 rounded-full peer 
                          peer-checked:bg-blue-600 transition-colors duration-200"
                        ></div>
                        {/* Thumb / Dot */}
                        <span
                          className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                          transition-transform duration-200 ease-in-out peer-checked:translate-x-6"
                        ></span>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default OwnerManageRoomsPage;
