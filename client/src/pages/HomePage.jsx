import React from "react";
import { Link } from "react-router-dom";
import {
  assets,
  cities,
  exclusiveOffers,
  testimonials,
} from "../assets/assets";

const HomePage = () => {
  return (
    <main className="min-h-screen px-6 md:px-16 lg:px-24 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Find and book the perfect stay
            </h1>

            <p className="mt-4 text-gray-600 max-w-md">
              Discover hotels, check real-time room availability, and book
              instantly — all in one seamless experience.
            </p>

            <div className="mt-6">
              <Link
                to="/hotels"
                className="bg-black text-white px-6 py-3 rounded-lg inline-flex items-center justify-center hover:bg-gray-800 transition"
              >
                Browse Hotels
              </Link>
            </div>

            {/* CITIES */}
            <div className="mt-8">
              <p className="text-sm text-gray-500 mb-3">Popular cities</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition cursor-pointer"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="hidden lg:block h-full">
            <img
              src={assets.heroImage || assets.regImage}
              alt="hero"
              className="w-full h-[420px] object-cover rounded-2xl shadow-md"
            />
          </div>
        </section>

        {/* OFFERS */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Exclusive Offers</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusiveOffers.map((o) => (
              <div
                key={o._id}
                className="rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition"
              >
                <img
                  src={o.image}
                  alt={o.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <div className="font-medium text-lg">{o.title}</div>

                  <p className="text-sm text-gray-600 mt-1">{o.description}</p>

                  <p className="text-sm text-gray-700 mt-3">
                    Save <span className="font-semibold">{o.priceOff}%</span> •
                    Expires {o.expiryDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-16 mb-10">
          <h2 className="text-2xl font-semibold mb-6">What Guests Say</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl bg-white border shadow-sm p-5"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <div className="font-medium">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.address}</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-700">{t.review}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
