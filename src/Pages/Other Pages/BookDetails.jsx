import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returnDate, setReturnDate] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleBorrow = () => {
    if (!returnDate) return;

    axios
      .post(`http://localhost:3000/borrow/${id}`, {
        name: user?.displayName,
        email: user?.email,
        returnDate,
      })
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Borrowed Successfully!',
            text: `Please return by ${returnDate}`,
            confirmButtonColor: '#4FD1C5',
          });
          setBook((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
          setShowModal(false);
        }
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Something went wrong' });
      });
  };

  if (!book) return <div className="min-h-screen bg-[#D0E7F9] dark:bg-[#223A5E] text-center pt-20">Loading...</div>;

  return (
    <div className="bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 py-20"
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
              <p className="text-sm mb-1">Author: <span className="font-medium">{book.author}</span></p>
              <p className="text-sm mb-1">Category: {book.category}</p>
              <p className="text-sm mb-1">Rating: {book.rating} / 5</p>
              <p className="text-sm mb-4">Quantity: {book.quantity}</p>
              <p className="text-sm">{book.description}</p>
            </div>
            <button
              disabled={book.quantity === 0}
              onClick={() => setShowModal(true)}
              className={`mt-4 px-4 py-2 rounded-lg w-fit text-white transition-all ${
                book.quantity > 0
                  ? 'bg-[#4FD1C5] hover:bg-[#129990]'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {book.quantity > 0 ? 'Borrow' : 'Not Available'}
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1B314B] p-6 rounded-xl w-full max-w-md text-[#223A5E] dark:text-[#D0E7F9]">
              <h3 className="text-xl font-bold mb-4">Borrow Book</h3>
              <div className="space-y-4">
                <input type="text" value={user?.displayName} readOnly className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800" />
                <input type="email" value={user?.email} readOnly className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button onClick={() => setShowModal(false)} className="text-sm text-red-500">Cancel</button>
                <button onClick={handleBorrow} className="bg-[#4FD1C5] text-white px-4 py-1 rounded">Confirm</button>
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