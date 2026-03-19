import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { sendMail } from "../utils/sendMail.js";

// function to check availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const booking = await Booking.findOne({
      room,
      status: { $ne: "cancelled" },
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn },
    });

    return !booking;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

// api to check avaialability of rooms

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to create new bookings

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;

    // before booking check availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    // get total price from room
    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.json({
        success: false,
        message: "Room not found",
      });
    }

    let totalPrice = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      return res.json({
        success: false,
        message: "Invalid date selection",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      return res.json({
        success: false,
        message: "Check-in date cannot be in the past",
      });
    }

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= Math.max(1, nights);
    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: Number(guests),
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await sendMail({
      to: req.user?.email,
      subject: "Hotel Booking Details",
      html: `
    <h2>Your Booking Details</h2>
    <p>Dear ${req.user.username},</p>
    <p>Thank you for your booking, your booking details</p>
    <ul>
      <li><strong>Booking ID:</strong> ${booking._id}</li>
      <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
      <li><strong>Location:</strong> ${roomData.hotel.address}</li>
      <li><strong>Check In Date:</strong> ${booking.checkInDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</li>
      <li><strong>Check Out Date:</strong> ${booking.checkOutDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</li>
      <li><strong>Booking Amount:</strong> Rs: ${booking.totalPrice} /night</li>
    </ul>
    <p>We look forward to welcome you!</p>
  `,
    });

    res.json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to create booking" });
  }
};

// api to get all booking for a user
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });
    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res.json({ success: false, message: "No hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id.toString() })
      .populate("user", "username")
      .populate("room", "roomType price")
      .populate("hotel")
      // .populate("bookingstatus")
      .sort({ createdAt: -1 });
    // .limit(10);

    const validBookings = bookings.filter((b) => b.status !== "cancelled");

    // total bookings
    const totalBookings = validBookings.length;
    //total revenue
    const totalRevenue = validBookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0,
    );

    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};
