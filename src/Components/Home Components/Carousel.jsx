"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const classNames = (...classes) => classes.filter(Boolean).join(" ");

function MostAvailableBooks() {
  const [books, setBooks] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
  axios
    .get("https://bookitsu-server.vercel.app/books")
    .then((res) => {
      const sortedBooks = res.data
        .sort((a, b) => b.quantity - a.quantity) 
        .slice(0, 10); // pick only top 10

      setBooks(sortedBooks);
      setActiveItem(Math.floor(sortedBooks.length / 2));
    })
    .catch((err) => console.error(err));
}, []);


  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    );

    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeItem]);

  if (!books.length) return null;

  return (
    <div className="w-full border-t-1 border-t-[#4FD1C5]/20 cabin bg-[#D0E7F9] dark:bg-[#223A5E] py-6 md:py-8">
      <div className="w-full max-w-[1440px] mx-auto p-2 sm:p-6 md:p-4">
        <h2 className="hidden md:block text-2xl md:text-3xl font-bold mb-6 text-[#223A5E] dark:text-[#D0E7F9] text-center">
          Most Available Books
        </h2>

        <ul
          ref={wrapperRef}
          className="flex w-full flex-col gap-2 md:h-[350px] md:flex-row md:gap-[1.5%]"
        >
          {books.map((book, index) => (
            <li
              key={book._id}
              onClick={() => setActiveItem(index)}
              aria-current={activeItem === index}
              className={classNames(
                "relative group cursor-pointer transition-all duration-500 ease-in-out",
                "md:w-[8%]",
                "md:[&[aria-current='true']]:w-[48%]",
                "md:[transition:width_var(--transition,300ms_ease_in)]"
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl bg-[#D0E7F9] dark:bg-[#223A5E] transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:z-10">
                <img
                  src={book.image}
                  alt={book.title}
                  width="500"
                  height="640"
                  className={classNames(
                    "absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2 object-cover transition-all duration-500 ease-in-out",
                    activeItem === index
                      ? "scale-102 grayscale-0"
                      : "scale-100 grayscale"
                  )}
                />

                <div
                  className={classNames(
                    "absolute inset-0 transition-opacity duration-500",
                    activeItem === index ? "opacity-100" : "opacity-0",
                    "bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  )}
                />

                <div
                  className={classNames(
                    "absolute bottom-0 left-0 w-full p-6 text-white transition-[transform,opacity] duration-700 ease-in-out md:p-8",
                    activeItem === index
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  )}
                >
                  <p className="text-lg font-bold">{book.title}</p>
                  <Link to={`/books/${book._id}`}
                    className="mt-2 inline-block px-4 py-2 rounded-lg bg-[#4FD1C5] text-[#223A5E] font-semibold hover:opacity-90 transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MostAvailableBooks;
