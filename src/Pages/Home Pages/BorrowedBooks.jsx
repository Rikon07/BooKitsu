import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider'; // your auth context
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';

const BorrowedBooks = () => {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch borrowed books filtered by user email
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/borrowed?email=${user.email}`)
      .then((res) => {
        setBorrowedBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Return book handler
  const handleReturn = async (borrowId, bookId) => {
    try {
      const res = await axios.post(`http://localhost:3000/return/${borrowId}`, { bookId });
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Book Returned',
          text: 'Thank you for returning the book!',
          confirmButtonColor: '#4FD1C5',
        });

        // Remove returned book from state
        setBorrowedBooks((prev) => prev.filter((b) => b._id !== borrowId));
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Failed to return the book' });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading borrowed books...</div>;
  if (!borrowedBooks.length) return <div className="text-center mt-10">You have no borrowed books.</div>;

  return (
    <div className="min-h-screen bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9]">
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-6 mt-16">
        <h2 className="text-3xl font-bold mb-8 text-[#4FD1C5] text-center">Your Borrowed Books</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {borrowedBooks.map(({ _id, bookId, book, borrowedAt, returnDate }) => (
            <div key={_id} className="bg-white dark:bg-[#1B314B] p-6 rounded-lg shadow-md flex flex-col">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
              <p className="text-sm mb-1 text-[#6C6E96] dark:text-[#D0E7F9]">
                <strong>Category:</strong> {book.category}
              </p>
              <p className="text-sm mb-1 text-[#6C6E96] dark:text-[#D0E7F9]">
                <strong>Borrowed On:</strong> {new Date(borrowedAt).toLocaleDateString()}
              </p>
              <p className="text-sm mb-4 text-[#6C6E96] dark:text-[#D0E7F9]">
                <strong>Return By:</strong> {new Date(returnDate).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleReturn(_id, bookId)}
                className="mt-auto bg-[#E3A750] hover:bg-[#cf953c] text-white font-semibold py-2 rounded-md transition"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BorrowedBooks;
