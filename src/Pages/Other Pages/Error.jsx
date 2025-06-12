import React from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationError from "../../assets/Animations/Animation - Error.json";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9]  px-4 text-center">
      <div className="max-w-md w-full">
        <Lottie animationData={animationError} loop={true} className="w-full h-80 mx-auto" />
        <h1 className="text-3xl md:text-4xl font-bold text-[#223A5E] dark:text-[#D0E7F9] mt-4">
          Oops! Page Not Found
        </h1>
        <p className=" mt-2 mb-6 text-base md:text-lg">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link to="/">
          <button className="bg-[#223A5E] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:scale-101 hover:bg-gradient-to-b hover:from-[#223A5E] hover:to-[#4FD1C5] hover:shadow-lg transition-all duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
