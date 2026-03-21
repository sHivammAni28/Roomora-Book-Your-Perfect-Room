import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAvailableHotels,
  registerHotel,
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.post("/", protect, registerHotel);
hotelRouter.get("/", protect, getAvailableHotels);

export default hotelRouter;
