import logo from "./logo.svg";
import searchIcon from "./searchIcon.svg";
import userIcon from "./userIcon.svg";
import calenderIcon from "./calenderIcon.svg";
import locationIcon from "./locationIcon.svg";
import starIconFilled from "./starIconFilled.svg";
import arrowIcon from "./arrowIcon.svg";
import starIconOutlined from "./starIconOutlined.svg";
import instagramIcon from "./instagramIcon.svg";
import facebookIcon from "./facebookIcon.svg";
import twitterIcon from "./twitterIcon.svg";
import linkendinIcon from "./linkendinIcon.svg";
import freeWifiIcon from "./freeWifiIcon.svg";
import freeBreakfastIcon from "./freeBreakfastIcon.svg";
import roomServiceIcon from "./roomServiceIcon.svg";
import mountainIcon from "./mountainIcon.svg";
import poolIcon from "./poolIcon.svg";
import homeIcon from "./homeIcon.svg";
import closeIcon from "./closeIcon.svg";
import locationFilledIcon from "./locationFilledIcon.svg";
import heartIcon from "./heartIcon.svg";
import badgeIcon from "./badgeIcon.svg";
import menuIcon from "./menuIcon.svg";
import closeMenu from "./closeMenu.svg";
import guestsIcon from "./guestsIcon.svg";
import roomImg1 from "./roomImg1.png";
import roomImg2 from "./roomImg2.png";
import roomImg3 from "./roomImg3.png";
import roomImg4 from "./roomImg4.png";
import regImage from "./regImage.png";
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";

export const assets = {
  logo,
  searchIcon,
  userIcon,
  calenderIcon,
  locationIcon,
  starIconFilled,
  arrowIcon,
  starIconOutlined,
  instagramIcon,
  facebookIcon,
  twitterIcon,
  linkendinIcon,
  freeWifiIcon,
  freeBreakfastIcon,
  roomServiceIcon,
  mountainIcon,
  poolIcon,
  closeIcon,
  homeIcon,
  locationFilledIcon,
  heartIcon,
  badgeIcon,
  menuIcon,
  closeMenu,
  guestsIcon,
  regImage,
  addIcon,
  dashboardIcon,
  listIcon,
  uploadArea,
  totalBookingIcon,
  totalRevenueIcon,
};

export const cities = [
  "Goa",
  "Manali",
  "Jaipur",
  "Udaipur",
  "Mumbai",
  "Bengaluru",
  "Delhi",
  "Gorakhpur",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
  {
    _id: 1,
    title: "Early Bird Smart Saver",
    description:
      "Book 45 days in advance and unlock premium rooms at discounted rates with complimentary breakfast.",
    priceOff: 35,
    expiryDate: "Oct 15",
    image: exclusiveOfferCardImg1,
  },
  {
    _id: 2,
    title: "Weekend Power Stay",
    description:
      "Flat discount on all Friday–Sunday bookings plus late checkout at no extra cost.",
    priceOff: 22,
    expiryDate: "Nov 10",
    image: exclusiveOfferCardImg2,
  },
  {
    _id: 3,
    title: "Executive Business Bundle",
    description:
      "Corporate-ready package with airport transfer, workspace access, and priority check-in included.",
    priceOff: 28,
    expiryDate: "Dec 05",
    image: exclusiveOfferCardImg3,
  },
];

// Testimonials Dummy Data
export const testimonials = [
  {
    id: 1,
    name: "Ritika Sharma",
    address: "Delhi, India",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    rating: 5,
    review:
      "I booked a family vacation through this platform and everything was exactly as shown in the listing. No hidden fees, no last-minute surprises. The booking confirmation was instant and smooth.",
  },
  {
    id: 2,
    name: "Marcus Thompson",
    address: "Toronto, Canada",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 4,
    review:
      "The filtering system made it easy to compare hotels by price and rating. I’d like to see more verified guest photos, but overall the experience was solid and reliable.",
  },
  {
    id: 3,
    name: "Yuna Park",
    address: "Busan, South Korea",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200",
    rating: 5,
    review:
      "Customer support handled my date change request within minutes. The refund difference was processed quickly. That kind of responsiveness makes me trust the platform.",
  },
];

// Facility Icon
export const facilityIcons = {
  "Free WiFi": assets.freeWifiIcon,
  "Free Breakfast": assets.freeBreakfastIcon,
  "Room Service": assets.roomServiceIcon,
  "Mountain View": assets.mountainIcon,
  "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
  {
    icon: assets.homeIcon,
    title: "Professionally Maintained",
    description:
      "Rooms are inspected regularly to ensure cleanliness, comfort, and quality standards.",
  },
  {
    icon: assets.badgeIcon,
    title: "Verified Property",
    description:
      "All listings are verified with authentic photos and accurate descriptions.",
  },
  {
    icon: assets.locationFilledIcon,
    title: "Prime Connectivity",
    description:
      "Easy access to public transport, restaurants, and major city attractions.",
  },
  {
    icon: assets.heartIcon,
    title: "Hassle-Free Check-In",
    description:
      "Quick confirmation and smooth arrival process with dedicated support.",
  },
];

// User Dummy Data
export const userDummyData = {
  _id: "user_2unqyL4diJFP1E3pIBnasc7w8hP",
  username: "Shivam",
  email: "user.shivammani@gmail.com",
  image:
    "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
  role: "hotelOwner",
  createdAt: "2025-03-25T09:29:16.367Z",
  updatedAt: "2025-04-10T06:34:48.719Z",
  __v: 1,
  recentSearchedCities: ["Goa"],
};

// Hotel Dummy Data
export const hotelDummyData = {
  _id: "67f76393197ac559e4089b72",
  name: "The Royal Orchid Residency",
  address: "Plot 18, MG Road, Sector 14",
  contact: "+91 98765 43210",
  owner: userDummyData,
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302001",
  createdAt: "2025-04-10T06:22:11.663Z",
  updatedAt: "2025-04-10T06:22:11.663Z",
  __v: 0,
};

// Rooms Dummy Data
export const roomsDummyData = [
  {
    _id: "67f7647c197ac559e4089b96",
    hotel: hotelDummyData,
    roomType: "Deluxe King Room",
    pricePerNight: 5499,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Breakfast Included",
    ],
    images: [roomImg1, roomImg2, roomImg3, roomImg4],
    isAvailable: true,
    createdAt: "2025-04-10T06:26:04.013Z",
    updatedAt: "2025-04-10T06:26:04.013Z",
    __v: 0,
  },
  {
    _id: "67f76452197ac559e4089b8e",
    hotel: hotelDummyData,
    roomType: "Premium Suite",
    pricePerNight: 8999,
    amenities: ["King Bed", "Private Balcony", "Mini Bar", "Pool Access"],
    images: [roomImg2, roomImg3, roomImg4, roomImg1],
    isAvailable: true,
    createdAt: "2025-04-10T06:25:22.593Z",
    updatedAt: "2025-04-10T06:25:22.593Z",
    __v: 0,
  },
  {
    _id: "67f76406197ac559e4089b82",
    hotel: hotelDummyData,
    roomType: "Standard Double Room",
    pricePerNight: 3499,
    amenities: ["Free WiFi", "Work Desk", "Room Service"],
    images: [roomImg3, roomImg4, roomImg1, roomImg2],
    isAvailable: false,
    createdAt: "2025-04-10T06:24:06.285Z",
    updatedAt: "2025-04-10T06:24:06.285Z",
    __v: 0,
  },
  {
    _id: "67f763d8197ac559e4089b7a",
    hotel: hotelDummyData,
    roomType: "Executive Single Room",
    pricePerNight: 2799,
    amenities: ["Free WiFi", "Smart TV", "24x7 Support"],
    images: [roomImg4, roomImg1, roomImg2, roomImg3],
    isAvailable: true,
    createdAt: "2025-04-10T06:23:20.252Z",
    updatedAt: "2025-04-10T06:23:20.252Z",
    __v: 0,
  },
];

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/
