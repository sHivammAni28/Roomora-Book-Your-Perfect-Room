import Booking from "../models/Booking.js";
import { sendMail } from "../utils/sendMail.js";

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("hotel")
      .populate("room");

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // user authorization
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // already cancelled
    if (booking.status === "cancelled") {
      return res.json({ success: false, message: "Already cancelled" });
    }

    // date validation (no cancel on/after check-in)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(booking.checkInDate);
    checkIn.setHours(0, 0, 0, 0);

    if (today >= checkIn) {
      return res.json({
        success: false,
        message: "Cannot cancel on/after check-in date",
      });
    }

    // update booking
    booking.status = "cancelled";
    booking.cancelledAt = new Date();

    await booking.save();

    await sendMail({
      to: req.user?.email,
      subject: "Booking Cancelled",
      html: `
        <h2>Booking Cancelled</h2>
        <p>Dear ${req.user.username},</p>
        <p>Your booking has been successfully cancelled.</p>

        <ul>
          <li><strong>Booking ID:</strong> ${booking._id}</li>
          <li><strong>Hotel:</strong> ${booking.hotel?.name}</li>
          <li><strong>Location:</strong> ${booking.hotel?.address}</li>
        </ul>

        <p>If this was not you, please contact support.</p>
      `,
    });

    res.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Cancel failed" });
  }
};
