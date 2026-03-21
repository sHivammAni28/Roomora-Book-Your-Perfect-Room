import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import RoomsListPage from "./pages/RoomsListPage";
import HotelsListPage from "./pages/HotelsListPage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import UserBookingsPage from "./pages/UserBookingsPage";
import OwnerDashboardPage from "./pages/OwnerDashboardPage";
// import OwnerRoomsPage from './pages/OwnerRoomsPage'
// import UserProfilePage from "./pages/UserProfilePage";
import RegisterHotelPage from "./pages/RegisterHotelPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import OwnerAddRoomPage from "./pages/OwnerAddRoomPage";
import OwnerManageRoomsPage from "./pages/OwnerManageRoomsPage";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/hotels" element={<HotelsListPage />} />
          <Route path="/hotels/:id" element={<RoomsListPage />} />
          <Route
            path="/hotels/:hotelId/room/:roomId"
            element={<RoomDetailsPage />}
          />

          <Route path="/bookings" element={<UserBookingsPage />} />
          {/* <Route path="/profile" element={<UserProfilePage />} /> */}

          <Route path="/register-hotel" element={<RegisterHotelPage />} />

          {/* Owner area - Navbar is hidden already for any /owner path */}
          <Route path="/owner" element={<OwnerDashboardPage />} />
          <Route path="/owner/add-room" element={<OwnerAddRoomPage />} />
          <Route
            path="/owner/manage-rooms"
            element={<OwnerManageRoomsPage />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
