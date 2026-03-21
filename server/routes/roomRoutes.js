import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  getRoomsByHotel,
  toggleRoomAvailability,
} from "../controllers/roomController.js";
import upload from "../middleware/uploadMiddleware.js";

const roomRouter = express.Router();

roomRouter.post("/", protect, upload.array("images", 4), createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.get("/hotel/:hotelId", getRoomsByHotel);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

export default roomRouter;
