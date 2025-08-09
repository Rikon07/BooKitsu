import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Components/Main Components/Navbar";
import Footer from "../../Components/Main Components/Footer";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/AxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // console.log(user.accessToken);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/borrowed?email=${user.email}`)
      .then((res) => {
        setBorrowedBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  const handleReturn = async (borrowId, bookId) => {
    try {
      const res = await axiosSecure.post(`/return/${borrowId}`, { bookId });
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Book Returned",
          text: "Thank you for returning the book!",
          confirmButtonColor: "#4FD1C5",
        });

        setBorrowedBooks((prev) => prev.filter((b) => b._id !== borrowId));
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Failed to return the book" });
    }
  };


  return (
    <div className="cabin bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9]">
      <Helmet>
        <title>Borrowed | BooKitsu</title>
      </Helmet>
      <Navbar />
      <div className="max-w-[1440px] mx-auto min-h-[61vh] p-6 mt-16">
        <h2 className="text-3xl font-bold mb-8 text-[#4FD1C5] text-center">
          Your Borrowed Books
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1B314B] p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Skeleton height={192} width={128} className="rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton height={24} width={`80%`} />
                    <Skeleton height={16} width={`60%`} />
                    <Skeleton height={16} width={`70%`} />
                    <Skeleton height={16} width={`65%`} />
                  </div>
                </div>
                <div className="mt-2">
                  <Skeleton height={28} borderRadius={9999} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {!borrowedBooks.length ? (
              <div className="text-center mt-10">
                You have no borrowed books.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {borrowedBooks.map(
                  ({ _id, bookId, book, borrowedAt, returnDate }) => (
                    <div
                      key={_id}
                      className="bg-white dark:bg-[#1B314B] p-4 rounded-lg shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="h-48 object-cover rounded-md mb-4"
                        />
                        <div>
                          <h3 className="text-xl font-semibold mb-1">
                            {book.title}
                          </h3>
                          <p className="text-sm mb-1 text-[#6C6E96] dark:text-[#D0E7F9]">
                            <strong>Category:</strong> {book.category}
                          </p>
                          <p className="text-sm mb-1 text-[#6C6E96] dark:text-[#D0E7F9]">
                            <strong>Borrowed On:</strong>{" "}
                            {new Date(borrowedAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm mb-4 text-[#6C6E96] dark:text-[#D0E7F9]">
                            <strong>Return By:</strong>{" "}
                            {new Date(returnDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleReturn(_id, bookId)}
                        className="bg-gradient-to-br from-[#4FD1C5] to-[#129990] text-white hover:bg-gradient-to-br hover:from-[#6C6E96] hover:to-[#4FD1C5] text-sm px-4 py-1 rounded-xl text-center hover:scale-101 transition w-full"
                      >
                        Return Book
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BorrowedBooks;
