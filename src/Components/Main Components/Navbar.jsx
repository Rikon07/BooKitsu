import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "../Main Components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  console.log(user.photoURL);
  // const user = null;
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [theme, setTheme] = useState("");
  useEffect(() => {
  const htmlElement = document.documentElement;
  const observer = new MutationObserver(() => {
    setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");
  });

  // Initial check
  setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");

  // Observe changes to class list
  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}, []);

  

   const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully!",
          icon: "success",
          background: theme === "dark" ? "#223A5E" : "#D0E7F9",
          color: theme === "dark" ? "#90D1CA" : "#096B68",
          confirmButtonColor: "#4FD1C5",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Logout Failed",
          text: "Something went wrong while logging out.",
          icon: "error",
          background: theme === "dark" ? "#223A5E" : "#D0E7F9",
          color: theme === "dark" ? "#90D1CA" : "#096B68",
          confirmButtonColor: "#4FD1C5",
          confirmButtonText: "Try Again",
        });
      });
  };""

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 hover:text-[#4FD1C5] ${
      isActive ? "font-bold underline underline-offset-4 text-[#4FD1C5]" : ""
    }`;

  const Links = (
    <>
      <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
      <li><NavLink to="/all-books" className={navLinkStyle}>All Books</NavLink></li>
      <li><NavLink to="/add-book" className={navLinkStyle}>Add Book</NavLink></li>
      <li><NavLink to="/borrowed" className={navLinkStyle}>Borrowed Books</NavLink></li>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className={`cabin fixed z-50 top-0 left-1/2 -translate-x-1/2 w-full px-6 md:px-10 lg:px-14 xl:px-18 py-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#D0E7F9]/20 dark:bg-[#223A5E]/20 backdrop-blur-xl"
          : "bg-[#D0E7F9] dark:bg-[#223A5E]"
      }`}
    >
      {/* Logo  */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-1 qyore tracking-wide text-[#223A5E] dark:text-[#D0E7F9] transition"
      >
        <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#4FD1C5]">
          BooKitsu
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-10 text-[#223A5E] dark:text-[#D0E7F9] font-medium text-lg">
        {Links}
      </ul>

      {/* Right section */}
      <div className="hidden lg:flex items-center gap-5">
        <ThemeToggle />
        {!user ? (
          <>
            <Link to="/login">
              <button className="bg-[#4FD1C5] text-[#223A5E] px-4 py-2 rounded-lg font-semibold hover:scale-105 hover:bg-[#3CA6A6] hover:text-[#F7FAFC] transition">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-[#4FD1C5] text-[#4FD1C5] px-4 py-2 rounded-lg font-semibold hover:bg-[#4FD1C5] hover:text-[#223A5E] transition">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="cursor-pointer">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#4FD1C5]"
                />
              ) : (
                <FaUserCircle className="text-3xl text-[#4FD1C5]" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 space-y-1 bg-[#D0E7F9] dark:bg-[#223A5E] shadow-md rounded-xl w-52 z-50"
            >
              <li className="px-4 py-2 text-[#223A5E] hover:text-[#D0E7F9] dark:text-[#D0E7F9] dark:hover:text-[#223A5E] font-medium rounded-xl hover:bg-[#223A5E] dark:hover:bg-[#D0E7F9]">
                {user.displayName || "User"}
              </li>
              <li>
                <Link to="/profile" className="px-4 py-2 hover:text-[#4FD1C5] rounded-xl hover:underline hover:bg-[#223A5E] dark:hover:bg-[#D0E7F9] transition">
                  My Profile
                </Link>
              </li>
              <li className="px-1 py-2">
                <button
                  onClick={handleLogOut}
                  className="text-sm text-left px-3 py-1 rounded-xl  text-[#223A5E] hover:text-[#D0E7F9] dark:text-[#D0E7F9] dark:hover:text-[#223A5E] border border-[#4FD1C5] hover:bg-[#223A5E] dark:hover:bg-[#D0E7F9] transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#223A5E] dark:text-[#4FD1C5] text-3xl"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[100%] mt-2 left-0 w-full bg-[#D0E7F9] dark:bg-[#223A5E] rounded-xl shadow-xl p-5 lg:hidden flex flex-col gap-4 overflow-hidden z-40"
          >
            <ul className="space-y-2 text-[#223A5E] dark:text-[#D0E7F9]">
              {Links}
            </ul>
            {!user ? (
              <>
              <ThemeToggle />
                <Link to="/login">
                  <button className="w-full bg-[#4FD1C5] text-[#223A5E] py-2 rounded-lg font-semibold hover:bg-[#3CA6A6] hover:text-[#F7FAFC]">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="w-full border border-[#4FD1C5] text-[#4FD1C5] py-2 rounded-lg font-semibold hover:bg-[#4FD1C5] hover:text-[#223A5E]">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                {user.photoURL ? (
                    <img
  key={user.photoURL}
  src={user.photoURL}
  alt="User"
  referrerPolicy="no-referrer"
  className="w-10 h-10 rounded-full border-2 border-[#4FD1C5] object-cover bg-gray-200"
/>

                  ) : (
                    <FaUserCircle className="text-3xl text-[#129990] dark:text-[#90D1CA]" />
                  )}
                <p className="text-[#223A5E] dark:text-[#D0E7F9] font-medium">
                  {user.displayName}
                </p>
                <Link to="/profile" className="text-[#3CA6A6] hover:text-[#4FD1C5]">
                  My Profile
                </Link>
              </div>
                <button
                  onClick={handleLogOut}
                  className="w-full border border-[#4FD1C5] text-[#4FD1C5] py-2 rounded-lg font-semibold hover:bg-[#4FD1C5] hover:text-[#223A5E]"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
