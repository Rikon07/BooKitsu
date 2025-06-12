import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "../Main Components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
// import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  // const { user, logOut } = useContext(AuthContext);
  const user = null;
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`cabin fixed z-50 top-0 left-1/2 -translate-x-1/2 w-full px-6 md:px-10 lg:px-14 xl:px-18 py-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#D0E7F9]/80 dark:bg-[#223A5E]/80 backdrop-blur-xl"
          : "bg-[#D0E7F9] dark:bg-[#223A5E]"
      }`}
    >
      {/* Logo with dark mode glow */}
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
              className="dropdown-content menu p-3 space-y-2 bg-[#D0E7F9] dark:bg-[#223A5E] shadow-md rounded-xl w-52 z-50"
            >
              <li className="text-[#223A5E] dark:text-[#D0E7F9] font-medium">
                {user.displayName || "User"}
              </li>
              <li>
                <Link to="/profile" className="hover:text-[#4FD1C5] transition">
                  My Profile
                </Link>
              </li>
              <li>
                <button
                  // onClick={handleLogOut}
                  className="text-sm text-left px-2 py-1 rounded hover:bg-[#4FD1C5]/10 text-[#223A5E] dark:text-[#D0E7F9] border border-transparent hover:border-[#4FD1C5] transition"
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
            <ThemeToggle />
            {!user ? (
              <>
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
                <p className="text-[#223A5E] dark:text-[#D0E7F9] font-medium">
                  {user.displayName}
                </p>
                <Link to="/profile" className="text-[#3CA6A6] hover:text-[#4FD1C5]">
                  My Profile
                </Link>
                <button
                  // onClick={handleLogOut}
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
