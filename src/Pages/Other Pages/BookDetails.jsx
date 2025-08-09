import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Components/Main Components/Navbar";
import Footer from "../../Components/Main Components/Footer";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Loader from "../../Components/Main Components/Loader";
import { Helmet } from "react-helmet";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../../Hooks/AxiosSecure";



const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState("");
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [checkingBorrowStatus, setCheckingBorrowStatus] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
  axiosSecure
    .get(`/books/${id}`)
    .then((res) => setBook(res.data))
    .catch((err) => console.error(err));

  if (user?.email) {
    axiosSecure
      .get(`/borrowed/check?email=${user.email}&bookId=${id}`)
      .then((res) => {
        setIsBorrowed(res.data.isBorrowed);
        setCheckingBorrowStatus(false);
      })
      .catch((err) => {
        console.error(err);
        setCheckingBorrowStatus(false);
      });
  }
}, [id, user?.email, axiosSecure]);

  const handleBorrow = () => {
    if (!returnDate) return;

   axiosSecure
    .post(`/borrow/${id}`, {
      name: user?.displayName,
      email: user?.email,
      returnDate,
    })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: "success",
            title: "Borrowed Successfully!",
            text: `Please return by ${returnDate}`,
            confirmButtonColor: "#4FD1C5",
          });

          setBook(res.data.updatedBook);
          setIsBorrowed(true);
          setShowModal(false);
        }
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message;

        if (
          errorMsg ===
          "You have already borrowed 3 books. Return one to borrow more."
        ) {
          Swal.fire({
            icon: "warning",
            title: "Limit Reached!",
            text: "You can only borrow 3 books at a time. Please return one first.",
            confirmButtonColor: "#4FD1C5",
          });
          setShowModal(false);
        } else if (errorMsg === "Book not available to borrow.") {
          Swal.fire({
            icon: "info",
            title: "Not Available",
            text: "This book is currently out of stock.",
            confirmButtonColor: "#4FD1C5",
          });
        } else {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            confirmButtonColor: "#4FD1C5",
          });
        }
      });
  };

  if (!book || checkingBorrowStatus) {
    return (
      <div className="bg-[#D0E7F9] dark:bg-[#223A5E] min-h-screen py-20 px-4">
        <Navbar />
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#1B314B] rounded-xl p-6 shadow-md">
            <Skeleton height={300} width={200} className="rounded-md" />
            <div className="flex-1 space-y-3">
              <Skeleton height={30} width={`70%`} />
              <Skeleton height={20} width={`50%`} />
              <Skeleton height={20} width={`40%`} />
              <Skeleton height={20} width={`30%`} />
              <Skeleton height={60} count={2} />
              <Skeleton height={40} width={120} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] min-h-screen cabin">
      <Helmet>
        <title>Book Details | BooKitsu</title>
      </Helmet>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-16 max-w-4xl mx-auto px-4 py-6 md:py-8 lg:py-10"
      >
        <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-[#1B314B] rounded-xl p-6 shadow-md">
          <img
            src={book.image}
            alt={book.title}
            className="h-[300px] aspect-[3/4] object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
              <p className="text-sm mb-1">
                Author: <span className="font-medium">{book.author}</span>
              </p>
              <p className="text-sm mb-1">Category: {book.category}</p>
              <p className="text-sm mb-1">Rating: {book.rating} / 5</p>
              <p className="text-sm mb-4">Quantity: {book.quantity}</p>
              <p className="text-sm mb-3">{book.description}</p>
              <p className="text-sm">{book.content}</p>
            </div>
            {isBorrowed ? (
              <p className="mt-4 text-sm text-red-600 dark:text-red-400 font-medium">
                You have already borrowed this book.
              </p>
            ) : (
              <button
                disabled={book.quantity === 0}
                onClick={() => setShowModal(true)}
                className={`mt-4 px-4 py-2 rounded-lg w-fit text-white transition-all ${
                  book.quantity > 0
                    ? "bg-[#4FD1C5] hover:bg-[#129990]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {book.quantity > 0 ? "Borrow" : "Not Available"}
              </button>
            )}
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1B314B] p-6 rounded-xl w-full max-w-md text-[#223A5E] dark:text-[#D0E7F9]">
              <h3 className="text-xl font-bold mb-4">Borrow Book</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={user?.displayName}
                  readOnly
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
                />
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
                />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-sm text-red-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBorrow}
                  className="bg-[#4FD1C5] hover:bg-cyan-600 text-white px-4 py-1 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default BookDetails;