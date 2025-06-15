import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTable, FaThLarge, FaSyncAlt } from 'react-icons/fa';
import { MdOutlineUpdate } from 'react-icons/md';
import Loader from '../../Components/Main Components/Loader';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [viewMode, setViewMode] = useState('card');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/books')
      .then(res => {
        setBooks(res.data);
        setFilteredBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  

  useEffect(() => {
    if (showAvailableOnly) {
      setFilteredBooks(books.filter(book => book.quantity > 0));
    } else {
      setFilteredBooks(books);
    }
  }, [showAvailableOnly, books]);

  if (loading)
      return (
        <div>
          <Loader />{" "}
        </div>
      );

  return (
    <div className="bg-[#D0E7F9] mt-16 dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] min-h-screen cabin">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 lg:mb-6">
          <button
            onClick={() => setShowAvailableOnly(!showAvailableOnly)}
            className="flex items-center gap-2 bg-[#4FD1C5] hover:bg-[#3BB8AC] text-white px-4 py-2 rounded shadow"
          >
            <FaSyncAlt className="text-lg" />
            {showAvailableOnly ? 'Show All Books' : 'Show Available Books'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1 px-4 py-2 rounded shadow transition ${viewMode === 'card' ? 'bg-[#4FD1C5] text-white' : 'bg-white dark:bg-[#1B314B] text-[#223A5E] dark:text-white'}`}
            >
              <FaThLarge /> Card View
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-4 py-2 rounded shadow transition ${viewMode === 'table' ? 'bg-[#4FD1C5] text-white' : 'bg-white dark:bg-[#1B314B] text-[#223A5E] dark:text-white'}`}
            >
              <FaTable /> Table View
            </button>
          </div>
        </div>
        <div>
          {
            showAvailableOnly ? (
              <p className='mb-2 lg:text-lg text-[#1B314B] dark:text-[#4FD1C5]'>Available Books</p>
            ) : (
              <p className='mb-2 lg:text-lg text-[#1B314B] dark:text-[#4FD1C5]'>All Books</p>
            )
          }
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'card' ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBooks.map(book => (
                <motion.div
                  key={book._id}
                  whileHover={{ scale: 1.01 }}
                  className="bg-white dark:bg-[#1B314B] p-4 rounded-lg shadow-lg flex flex-col "
                >
                  <div className='flex items-center justify-between gap-3'>
                    <img src={book.image} alt={book.title} className="h-[250px] object-cover rounded-md mx-auto mb-4 w-40" />
                  <div className="flex-1 overflow-ellipsis">
                    <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                    <p className="text-sm mb-2">By: {book.author}</p>
                    <p className="text-sm mb-2">Category: {book.category}</p>
                    <p className="text-sm mb-2">Rating: {book.rating}</p>
                  </div>
                  </div>
                  <Link
                    to={`/update-book/${book._id}`}
                    className="mt-4 inline-flex items-center justify-center gap-1 bg-[#4FD1C5] hover:bg-[#3BB8AC] text-white px-4 py-2 rounded"
                  >
                    <MdOutlineUpdate className="text-lg" /> Update
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="overflow-x-auto"
            >
              <table className="table w-full">
                <thead className="bg-[#4FD1C5] text-white">
                  <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Rating</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map(book => (
                    <tr key={book._id} className="bg-white dark:bg-[#1B314B]">
                      <td><img src={book.image} alt={book.title} className="h-16 w-12 object-cover rounded" /></td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.category}</td>
                      <td>{book.rating}</td>
                      <td>{book.quantity}</td>
                      <td>
                        <Link
                          to={`/update-book/${book._id}`}
                          className="flex items-center gap-1 bg-[#4FD1C5] text-white px-3 py-1 rounded hover:bg-[#3BB8AC]"
                        >
                          <MdOutlineUpdate /> Update
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default AllBooks;