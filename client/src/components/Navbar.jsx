import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Experience", path: "/" },
    { name: "About", path: "/" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { openSignIn } = useClerk();
  const location = useLocation();
  const { user, navigate, isOwner } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }

    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 left-0 bg-blue-600  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/90 shadow-lg text-slate-800 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}
    >
      {/* Logo */}
      <Link
        to="/"
        className={`text-xl font-semibold tracking-wide ${isScrolled ? "text-slate-800" : "text-white"}`}
      >
        Roomora : Book Your Perfect Room
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className={`group flex flex-col gap-0.5 transition-colors duration-300 ${isScrolled ? "text-slate-700" : "text-slate-200"}`}
          >
            {link.name}
            <div
              className={`${isScrolled ? "bg-emerald-600" : "bg-emerald-400"} h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </a>
        ))}

        {user && (
          <button
            className="border border-emerald-500 text-emerald-400 px-4 py-1 text-sm font-light rounded-full cursor-pointer hover:bg-emerald-500 hover:text-white transition-all"
            onClick={() =>
              isOwner ? navigate("/owner") : navigate("/register-hotel")
            }
          >
            {isOwner ? "Dashboard" : "Register Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src={assets.searchIcon}
          alt="search"
          className={`h-7 transition-all duration-500 ${isScrolled ? "invert-0" : "invert"}`}
        />

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 
                    ${
                      isScrolled
                        ? "bg-[#00ccff] text-white hover:bg-[#00b8e6]"
                        : "bg-[#00ccff] text-white hover:bg-[#00b8e6]"
                    }`}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}

      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<BookIcon />}
                onClick={() => navigate("/bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={assets.menuIcon}
          alt=""
          className={`${isScrolled && "invert"} h-4`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-slate-900 text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-slate-100 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={assets.closeIcon}
            alt="close-menu"
            className="h-6.5 invert"
          />
        </button>

        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-emerald-400 transition-colors"
          >
            {link.name}
          </a>
        ))}

        {user && (
          <button
            className="border border-emerald-500 text-emerald-400 px-4 py-1 text-sm font-light rounded-full cursor-pointer hover:bg-emerald-500 hover:text-white transition-all"
            onClick={() =>
              isOwner ? navigate("/owner") : navigate("/register-hotel")
            }
          >
            Dashboard
          </button>
        )}
        {!user && (
          <button
            onClick={openSignIn}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
