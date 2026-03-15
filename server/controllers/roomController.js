import { cloudinary } from "../configs/cloudinary.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// api to create a new room for hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) return res.json({ success: false, message: "No hotel found" });

    // upload images to cloudinary (optional)
    const uploadImages = (req.files || []).map(async (file) => {
      // console.log("Uploading:", file.path);
      const response = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      return response.secure_url;
    });

    // console.log("room created1");
    // console.log("UPLOAD PROMISES:", uploadImages);
    // wait for all uploads to complete
    const images = await Promise.all(uploadImages);
    // console.log("room created2");

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: Number(pricePerNight),
      amenities:
        typeof amenities === "string" ? JSON.parse(amenities) : amenities,
      images,
    });
    // console.log("room created");

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    // console.log("ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// api to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: { path: "owner", select: "image" },
      })
      .sort({ createdAt: -1 });
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to get all rooms for a specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.user._id });
    if (!hotelData)
      return res.json({ success: false, message: "No hotel found" });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel",
    );
    res.json({ success: true, rooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to toggle availability of a room
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    if (!roomData)
      return res.json({ success: false, message: "Room not found" });
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
