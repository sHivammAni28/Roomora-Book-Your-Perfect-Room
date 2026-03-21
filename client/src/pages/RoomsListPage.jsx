import React from "react";
import { Link, useParams } from "react-router-dom";
import { roomsDummyData, facilityIcons } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const RoomsListPage = () => {
  const { id } = useParams();
  const { rooms: roomAPI } = useAppContext();
  const [rooms, setRooms] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await roomAPI.getByHotel(id);

        if (data.success) {
          setRooms(data.rooms);
        } else {
          setError(data.message);
        }

        // throw new Error("Integrate with AppContext helpers");
      } catch (e) {
        if (!cancelled) {
          // setRooms(roomsDummyData);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Available Rooms</h1>
        </div>
      </div>

      {loading && <div className="mt-6 text-gray-600">Loading rooms...</div>}

      {!loading && error && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
          {error}
        </div>
      )}

      {!loading && rooms.length === 0 && (
        <div className="mt-6 text-gray-600">No rooms found.</div>
      )}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map((r) => (
          <Link
            key={r._id}
            to={`/hotels/${id}/room/${r._id}`}
            className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition"
          >
            <div className="h-44 bg-gray-100">
              <img
                src={r.images?.[0]}
                alt={r.roomType}
                className="h-44 w-full object-cover group-hover:scale-[1.02] transition"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{r.roomType}</div>
                <div className="text-sm font-semibold">
                  Rs {r.pricePerNight}{" "}
                  <span className="text-sm font-normal text-gray-500">
                    / night
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-1">
                {r.hotel?.name ? r.hotel.name : "Hotel"}
                {r.hotel?.city ? ` • ${r.hotel.city}` : ""}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(r.amenities || []).slice(0, 3).map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {facilityIcons[a] ? (
                      <img src={facilityIcons[a]} alt="" className="w-3 h-3" />
                    ) : null}
                    {a}
                  </span>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-700">View details →</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default RoomsListPage;
