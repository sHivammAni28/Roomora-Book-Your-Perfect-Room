import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// axios.defaults.withCredentials = true;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOwner, setIsOwner] = useState(false);
  const [showHotelReg, setShowHotelReg] = useState(false);
  const [searchedCities, setSearchedCities] = useState([]);

  // Create an axios instance that automatically injects Clerk token
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
    });
    instance.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return instance;
  }, [getToken]);

  // Backend: ensure user exists; if not, auto-create (fixes "User not found")
  const ensureUserExists = async () => {
    if (!isSignedIn || !user) return;
    try {
      // Hit a lightweight protected route; backend will auto-create user if missing
      await api.get("/api/user");
    } catch (err) {
      // If still fails, surface minimal toast; detailed errors are not required here
      // The backend protect middleware will attempt auto-create (added in server)
    }
  };

  // Reusable API functions
  const auth = {
    // noop for Clerk; ensure existence in DB via protected ping
    ensureUserExists,
  };

  const users = {
    me: async () => {
      const { data } = await api.get("/api/user");
      return data;
    },
    storeRecentSearch: async (recentSearchedCity) => {
      const { data } = await api.post("/api/user/store-recent-search", {
        recentSearchedCity,
      });
      return data;
    },
  };

  const hotels = {
    create: async (payload) => {
      const { data } = await api.post("/api/hotels", payload);
      return data;
    },
    // placeholder for future listing endpoint
    list: async () => {
      const { data } = await api.get("/api/hotels");
      return data;
    },
  };

  const rooms = {
    list: async () => {
      const { data } = await api.get("/api/rooms");
      return data;
    },
    ownerRooms: async () => {
      const { data } = await api.get("/api/rooms/owner");
      return data;
    },
    toggleAvailability: async (roomId) => {
      const { data } = await api.post("/api/rooms/toggle-availability", {
        roomId,
      });
      return data;
    },
    create: async (formData) => {
      const { data } = await api.post("/api/rooms", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    getByHotel: async (hotelId) => {
      const { data } = await api.get(`/api/rooms/hotel/${hotelId}`);
      return data;
    },
  };

  const bookings = {
    checkAvailability: async ({ room, checkInDate, checkOutDate }) => {
      const { data } = await api.post("/api/bookings/check-availability", {
        room,
        checkInDate,
        checkOutDate,
      });
      return data;
    },
    create: async ({ room, checkInDate, checkOutDate, guests }) => {
      const { data } = await api.post("/api/bookings/book", {
        room,
        checkInDate,
        checkOutDate,
        guests,
      });
      return data;
    },
    listUserBookings: async () => {
      const { data } = await api.get("/api/bookings/user");
      return data;
    },
    cancel: async (bookingId) => {
      const { data } = await api.put(`/api/bookings/cancel/${bookingId}`);
      return data;
    },
    hotelDashboard: async () => {
      const { data } = await api.get("/api/bookings/hotel");
      return data;
    },
  };

  const fetchUser = async () => {
    try {
      const data = await users.me();
      if (data.success) {
        setIsOwner(data.role === "hotelOwner");
        setSearchedCities(data.recentSearchedCities || []);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      ensureUserExists().then(fetchUser);
    }
  }, [isSignedIn]);

  const value = {
    currency,
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    axios: api,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,

    // grouped helpers for consumers
    auth,
    users,
    hotels,
    rooms,
    bookings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
