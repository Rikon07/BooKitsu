import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryBooks = () => {
  const { categoryName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = [
    'Tech', 'Education', 'Sci-Fi', 'Comics', 'Biographies', 'Business',
    'Entertainment', 'Health', 'Horror', 'Mystery', 'Kids', 'Religion',
    'Novel', 'Thriller', 'History', 'Drama'
  ];

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected && selected !== categoryName) {
      navigate(`/category/${selected}`);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://bookitsu-server.vercel.app/books?category=${categoryName}`)
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [categoryName]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex gap-1 text-[#4FD1C5]">
        {Array.from({ length: fullStars }, (_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt key="half" />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] cabin">
      <Helmet>
        <title>{categoryName} | BooKitsu</title>
      </Helmet>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1440px] mx-auto min-h-[61vh] px-4 pb-12 pt-6 mt-16"
      >
        <div className="mb-6 text-center">
          <label className="text-lg font-semibold mr-2 text-[#223A5E] dark:text-[#D0E7F9]">
            Show other categories:
          </label>
          <select
            value={categoryName}
            onChange={handleCategoryChange}
            className="bg-[#64d1c6] cursor-pointer dark:bg-[#1B314B] border border-[#6C6E96] px-3 py-2 rounded-md text-sm"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === categoryName ? `${cat} (${books.length})` : cat}
              </option>
            ))}
          </select>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6 text-[#4FD1C5]">
          {categoryName} Books
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: books.length }).map((_, idx) => (
              <div key={idx} className="flex bg-white dark:bg-[#1B314B] rounded-xl shadow-lg overflow-hidden p-4">
                <Skeleton height={248} width={180} className="rounded-md" />
                <div className="ml-4 flex flex-col justify-between flex-grow">
                  <div>
                    <Skeleton height={20} width={120} className="mb-2" />
                    <Skeleton height={15} width={100} className="mb-2" />
                    <Skeleton height={15} width={80} className="mb-2" />
                    <Skeleton height={15} width={100} />
                  </div>
                  <div>
                    <Skeleton height={25} width={100} className="mb-2" />
                    <Skeleton height={30} width={80} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            books.map((book) => (
              <motion.div
                key={book._id}
                whileHover={{ scale: 1.02 }}
                className="flex bg-white dark:bg-[#1B314B] rounded-xl shadow-lg overflow-hidden transition duration-300"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-[248px] aspect-[3/4] object-cover"
                />
                <div className="flex flex-col p-6 md:w-2/3 justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-[#223A5E] dark:text-[#D0E7F9]">
                      {book.title}
                    </h3>
                    <p className="text-sm mb-2 text-[#6C6E96] dark:text-[#D0E7F9]">
                      Author: <span className="font-medium">{book.author}</span>
                    </p>
                    <p className="text-sm mb-2 text-[#6C6E96] dark:text-[#D0E7F9]">
                      Category: {book.category}
                    </p>
                    <div className="mb-2">
                      {renderStars(book.rating)}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`px-3 py-1 rounded-full w-fit text-sm ${
                        book.quantity > 0
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {book.quantity > 0 ? `Available - ${book.quantity}` : 'Not Available'}
                    </span>

                    <Link to={`/books/${book._id}`} className="bg-gradient-to-br from-[#4FD1C5] to-[#129990] text-white hover:bg-gradient-to-br hover:from-[#6C6E96] hover:to-[#4FD1C5] text-sm px-4 py-1 rounded-xl text-center hover:scale-101 transition">
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default CategoryBooks;