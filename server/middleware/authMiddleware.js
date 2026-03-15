import User from "../models/Users.js";
import { getAuth } from "@clerk/express";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const protect = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    // console.log("CLERK USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    let user = await User.findById(userId);
    // console.log(user);

    if (!user) {
      // Fetch user directly from Clerk
      const clerkUser = await clerk.users.getUser(userId);

      // console.log("CLERK USER DATA:", clerkUser);

      const email = clerkUser.emailAddresses[0]?.emailAddress || "";

      const firstName = clerkUser.firstName || "";
      const lastName = clerkUser.lastName || "";

      const username =
        `${firstName} ${lastName}`.trim() || email.split("@")[0] || "User";

      const image = clerkUser.imageUrl || "";

      user = await User.create({
        _id: userId,
        username,
        email,
        image,
        role: "user",
        recentSearchedCities: [],
      });

      // console.log("NEW USER CREATED:", user);
    }

    req.user = user;

    next();
  } catch (error) {
    // console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
