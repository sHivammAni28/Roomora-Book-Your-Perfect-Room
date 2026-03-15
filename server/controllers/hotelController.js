import Hotel from "../models/Hotel.js";
import User from "../models/Users.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;

    const existingHotel = await Hotel.findOne({ owner });

    if (existingHotel) {
      return res.json({ success: false, message: "Hotel already registered" });
    }

    const newHotel = await Hotel.create({
      name,
      address,
      contact,
      city,
      owner,
    });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" }, { new: true });

    res.json({
      success: true,
      message: "Hotel registered successfully",
      hotel: newHotel,   // 🔥 return the created hotel
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};