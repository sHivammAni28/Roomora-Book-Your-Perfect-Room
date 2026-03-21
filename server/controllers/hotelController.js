import Hotel from "../models/Hotel.js";
import User from "../models/Users.js";
import Room from "../models/Room.js";

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
      hotel: newHotel,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAvailableHotels = async (req, res) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $lookup: {
          from: "rooms",
          let: { hotelId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$hotel", { $toString: "$$hotelId" }],
                },
              },
            },
          ],
          as: "rooms",
        },
      },
      {
        $match: {
          "rooms.0": { $exists: true },
        },
      },
    ]);

    if (!hotels || hotels.length === 0) {
      return res.json({ success: true, hotels: [] });
    }

    res.json({ success: true, hotels });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
