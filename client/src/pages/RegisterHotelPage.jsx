import React, { useState } from 'react'
import { cities } from '../assets/assets'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from "react-router-dom"

const RegisterHotelPage = () => {

  const { axios, getToken, setIsOwner } = useAppContext()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event)=>{
    event.preventDefault()

    try {

      setLoading(true)

      const token = await getToken()

      const {data} = await axios.post(
        '/api/hotels',
        { name, contact, address, city },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if(data.success){
        toast.success(data.message)
        setIsOwner(true)
        navigate("/")
      }else{
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.response?.data?.message || error.message)

    } finally {

      setLoading(false)

    }
  }

  return (
    <main className="px-4 md:px-16 lg:px-24 xl:px-32 py-8">
      <h1 className="text-2xl font-semibold">Register hotel</h1>

      <form onSubmit={onSubmit} className="mt-6 max-w-xl rounded-3xl border border-gray-100 bg-white p-5">

        <input
          className="w-full border rounded-xl px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-xl px-3 py-2 mt-3"
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-xl px-3 py-2 mt-3"
          placeholder="Contact"
          value={contact}
          onChange={(e)=>setContact(e.target.value)}
          required
        />

        <select
          className="w-full border rounded-xl px-3 py-2 mt-3"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          required
        >
          <option value="">Select city</option>

          {cities.map((c)=>(
            <option key={c} value={c}>{c}</option>
          ))}

        </select>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 bg-black text-white rounded-full px-6 py-2.5 text-sm"
        >
          {loading ? "Submitting..." : "Register"}
        </button>

      </form>
    </main>
  )
}

export default RegisterHotelPage