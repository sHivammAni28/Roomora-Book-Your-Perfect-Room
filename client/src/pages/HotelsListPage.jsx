import React from "react";
import { Link } from "react-router-dom";
import { assets, facilityIcons } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const HotelsListPage = () => {
  const { hotels: hotelAPI } = useAppContext();
  const [hotels, sethotels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await hotelAPI.list();

        if (data.success) {
          sethotels(data.hotels || []);
        } else {
          setError(data.message);
        }

        // throw new Error("Integrate with AppContext helpers");
      } catch (e) {
        if (!cancelled) {
          // sethotels(hotelsDummyData);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Available Hotels</h1>
        </div>
      </div>

      {loading && <div className="mt-6 text-gray-600">Loading hotels...</div>}

      {!loading && error && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
          {error}
        </div>
      )}

      {!loading && hotels.length === 0 && (
        <div className="mt-6 text-gray-600">No hotels found.</div>
      )}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {hotels.map((r) => (
          <Link
            key={r._id}
            to={`/hotels/${r._id}`}
            className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-md transition"
          >
            {/* IMAGE */}
            <div className="h-44 bg-gray-100">
              <img
                src={r.images?.[0] || assets.regImage}
                alt={r.name}
                className="h-44 w-full object-cover group-hover:scale-[1.02] transition"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <div className="font-semibold text-lg">{r.name}</div>

              <div className="text-sm text-gray-600 mt-1">{r.address}</div>

              <div className="text-sm text-gray-600 mt-1">📍 {r.city}</div>

              <div className="text-sm text-gray-600 mt-1">📞 {r.contact}</div>

              <div className="mt-4 text-sm text-gray-700">
                View Available Rooms →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default HotelsListPage;
