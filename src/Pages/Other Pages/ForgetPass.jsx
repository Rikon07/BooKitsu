import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import MinimalHeader from "../../Components/Main Components/MinimalHeader";

const ForgetPass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      Swal.fire({
        title: "Oops!",
        text: "Please enter a valid email address.",
        icon: "warning",
        background: "#D0E7F9",
        color: "#223A5E",
        confirmButtonColor: "#4FD1C5",
      });
      return;
    }

    // Placeholder for actual password reset logic
    Swal.fire({
      title: "Reset Link Sent!",
      text: "Check your inbox for the password reset link.",
      icon: "success",
      background: "#D0E7F9",
      color: "#223A5E",
      confirmButtonColor: "#4FD1C5",
    }).then(() => {
      window.open("https://mail.google.com", "_blank");
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#D0E7F9] to-[#4FD1C5] dark:bg-gradient-to-br dark:from-[#0f1c2e] dark:to-[#0f1c2e] min-h-screen flex flex-col">
      <Helmet>
        <title>BooKitsu | Forgot Password</title>
      </Helmet>
      <MinimalHeader />

      {/* Floating Squares */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 dark:bg-[#4FD1C5]/20 rounded-lg animate-pulse"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-white/20 dark:bg-[#4FD1C5]/20 rounded-lg animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 dark:bg-[#4FD1C5]/10 rounded-lg animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 dark:bg-[#4FD1C5]/10 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/30 dark:bg-[#4FD1C5]/30 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/30 dark:bg-[#4FD1C5]/30 rounded-lg animate-pulse"></div>

      {/* Form */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-[#F7FAFC]/80 dark:bg-[#23395d]/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-xl font-bold flex items-center gap-1 qyore tracking-wide text-[#223A5E] dark:text-[#D0E7F9] transition"
            >
              <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#4FD1C5]">
                BooKitsu
              </span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-[#223A5E] dark:text-[#4FD1C5] mb-4">Forgot Password</h2>

          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-[#4FD1C5] text-[#223A5E] dark:text-[#D0E7F9] dark:bg-[#223A5E] placeholder-[#3CA6A6] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              required
            />
            <button
              type="submit"
              className="bg-[#4FD1C5] hover:bg-[#3CA6A6] text-[#223A5E] font-semibold py-2 rounded-lg transition-all"
            >
              Reset Password
            </button>
          </form>

          <p className="mt-4 text-sm text-[#223A5E] dark:text-[#D0E7F9]">
            Remembered your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-[#4FD1C5] hover:underline font-semibold"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;