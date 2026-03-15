import React from 'react'
import { Link } from 'react-router-dom'
import { assets, cities, exclusiveOffers, testimonials } from '../assets/assets'

const HomePage = () => {
  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Find your next stay
          </h1>
          <p className="mt-3 text-gray-600">
            Browse rooms, check availability, and manage bookings.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/rooms"
              className="bg-black text-white px-6 py-3 rounded-full inline-flex items-center justify-center"
            >
              Explore rooms
            </Link>
          </div>

          <div className="mt-8">
            <div className="text-sm text-gray-500 mb-2">Popular cities</div>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <span key={c} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src={assets.heroImage || assets.regImage}
            alt="hero"
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      {/* Exlusive offers */}

      {/* <section className="mt-12">
        <h2 className="text-xl font-semibold">Exclusive offers</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exclusiveOffers.map((o) => (
            <div key={o._id} className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
              <img src={o.image} alt={o.title} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="font-medium">{o.title}</div>
                <div className="text-sm text-gray-600 mt-1">{o.description}</div>
                <div className="text-sm text-gray-700 mt-3">
                  Save <span className="font-semibold">{o.priceOff}%</span> • Expires {o.expiryDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className="mt-12">
        <h2 className="text-xl font-semibold">What guests say</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl border border-gray-100 bg-white p-4">
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.address}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700">{t.review}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
