import React from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  roomsDummyData,
  facilityIcons,
  roomCommonData,
} from "../assets/assets";
import { useAppContext } from "../context/AppContext";

// function normalizeRoomsResponse(data) {
//   const success = data?.success ?? data?.sucess;
//   const rooms = data?.rooms;
//   return { success, rooms };
// }

const RoomDetailsPage = () => {
  const { id } = useParams();
  const { rooms } = useAppContext();

  const [room, setRoom] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [checkInDate, setCheckInDate] = React.useState("");
  const [checkOutDate, setCheckOutDate] = React.useState("");
  const [guests, setGuests] = React.useState(1);

  const [availabilityLoading, setAvailabilityLoading] = React.useState(false);
  const [isAvailable, setIsAvailable] = React.useState(null);
  const [availabilityError, setAvailabilityError] = React.useState("");

  const [bookingLoading, setBookingLoading] = React.useState(false);
  const [bookingResult, setBookingResult] = React.useState("");

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const data = await rooms.list();

        if (data.success) {
          const foundRoom = data.rooms.find((r) => r._id === id);
          setRoom(foundRoom || null);
        }
      } catch (e) {
        const found = roomsDummyData.find((r) => r._id === id);
        if (!cancelled) {
          setRoom(found || null);
          // setError(e?.message || 'Failed to load room')
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

  async function onCheckAvailability() {
    setAvailabilityError("");
    setIsAvailable(null);
    setBookingResult("");

    if (!checkInDate || !checkOutDate) {
      setAvailabilityError("Please select check-in and check-out dates.");
      return;
    }

    setAvailabilityLoading(true);
    try {
      // Backend expects: { room, checkInDate, checkOutdate }
      // Use AppContext axios helper for bookings in next step; simulate available for demo
      setIsAvailable(true);
    } catch (e) {
      setAvailabilityError(e?.message || "Failed to check availability");
    } finally {
      setAvailabilityLoading(false);
    }
  }

  async function onBook() {
    setBookingResult("");

    if (!checkInDate || !checkOutDate) {
      setBookingResult("Please select check-in and check-out dates.");
      return;
    }

    setBookingLoading(true);
    try {
      // Backend expects: { room, checkInDate, checkOutDate, guests }
      // Use AppContext axios helper for bookings in next step; simulate booking success
      setBookingResult("Booking created successfully");
      Navigate("/bookings");
    } catch (e) {
      setBookingResult(e?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="text-gray-600">Loading room...</div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
        <div className="text-gray-700 font-medium">Room not found.</div>
        {error && <div className="mt-2 text-sm text-gray-600">{error}</div>}
      </main>
    );
  }

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      {error && (
        <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <div className="grid grid-cols-2 gap-3">
            {(room.images || []).slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="room"
                className="w-full h-40 md:h-52 object-cover rounded-2xl"
              />
            ))}
          </div>

          <h1 className="text-2xl font-semibold mt-5">{room.roomType}</h1>
          <div className="text-gray-600 mt-1">
            {room.hotel?.name ? room.hotel.name : "Hotel"}
            {room.hotel?.city ? ` • ${room.hotel.city}` : ""}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(room.amenities || []).map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full bg-gray-100"
              >
                {facilityIcons[a] ? (
                  <img src={facilityIcons[a]} alt="" className="w-4 h-4" />
                ) : null}
                {a}
              </span>
            ))}
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {roomCommonData.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="flex items-center gap-2 font-medium">
                  <img src={d.icon} alt="" className="w-5 h-5" />
                  {d.title}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {d.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-3xl border border-gray-100 bg-white p-5 h-fit">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-gray-500">Price</div>
              <div className="text-2xl font-semibold">
                ${room.pricePerNight}{" "}
                <span className="text-sm font-normal text-gray-500">
                  / night
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <label className="text-sm">
              <div className="text-gray-600 mb-1">Check-in</div>
              <input
                type="date"
                className="w-full border rounded-xl px-3 py-2"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </label>

            <label className="text-sm">
              <div className="text-gray-600 mb-1">Check-out</div>
              <input
                type="date"
                className="w-full border rounded-xl px-3 py-2"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </label>
          </div>

          <label className="text-sm block mt-3">
            <div className="text-gray-600 mb-1">Guests</div>
            <input
              type="number"
              min={1}
              className="w-full border rounded-xl px-3 py-2"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </label>

          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={onCheckAvailability}
              disabled={availabilityLoading}
              className="border border-gray-300 rounded-full px-5 py-2.5 text-sm"
            >
              {availabilityLoading ? "Checking..." : "Check availability"}
            </button>

            {availabilityError && (
              <div className="text-sm text-red-600">{availabilityError}</div>
            )}

            {isAvailable !== null && (
              <div
                className={`text-sm ${isAvailable ? "text-green-700" : "text-red-700"}`}
              >
                {isAvailable
                  ? "Available for selected dates."
                  : "Not available for selected dates."}
              </div>
            )}

            <button
              onClick={onBook}
              disabled={bookingLoading}
              className="bg-black text-white rounded-full px-5 py-2.5 text-sm"
            >
              {bookingLoading ? "Booking..." : "Book now"}
            </button>

            {bookingResult && (
              <div className="text-sm text-gray-700">{bookingResult}</div>
            )}
          </div>

          <div className="mt-5 text-xs text-gray-500">
            After a successful booking, you can view it in /bookings.
          </div>
        </aside>
      </div>
    </main>
  );
};

export default RoomDetailsPage;
