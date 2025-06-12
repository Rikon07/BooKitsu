import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const MinimalHeader = () => {
  return (
    <div className="w-9/11 mx-auto flex justify-between items-center px-6 py-4">
      {/* Logo  */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-1 qyore tracking-wide text-[#223A5E] dark:text-[#D0E7F9] transition"
      >
        <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#4FD1C5]">
          BooKitsu
        </span>
      </Link>
      <ThemeToggle />
    </div>
  );
};

export default MinimalHeader;