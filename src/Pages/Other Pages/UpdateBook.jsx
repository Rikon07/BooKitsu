// src/pages/UpdateBook.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Swal from 'sweetalert2';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import { Helmet } from 'react-helmet';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`https://bookitsu-server.vercel.app/books/${id}`)
      .then(res => setBookData(res.data))
      .catch(err => console.error('Error loading book:', err));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const updatedBook = { ...bookData };
    if (image) updatedBook.image = image;

    try {
      await axios.patch(`https://bookitsu-server.vercel.app/books/${id}`, updatedBook);
      Swal.fire({
        icon: 'success',
        title: 'Book updated!',
        background: '#D0E7F9',
        color: '#223A5E',
        confirmButtonColor: '#4FD1C5'
      });
      navigate('/all-books');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'Please try again later.',
        background: '#D0E7F9',
        color: '#223A5E',
        confirmButtonColor: '#4FD1C5'
      });
    }
  };

  return (
    <div className="bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] mt-16 cabin min-h-screen">
      <Helmet>
        <title>Update Book | BooKitsu</title>
      </Helmet>
      <Navbar />
      <div className="max-w-3xl mx-auto p-8">
        <h2 className="text-2xl font-bold mb-6">Update Book Info</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Book Title"
              value={bookData.title || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              data-tooltip-id="titleTip"
            />
            <Tooltip id="titleTip" content="Update the book title." />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block mb-1 font-medium">Author</label>
            <input
              id="author"
              type="text"
              name="author"
              placeholder="Author"
              value={bookData.author || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              data-tooltip-id="authorTip"
            />
            <Tooltip id="authorTip" content="Update the author name." />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="Category"
              value={bookData.category || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              data-tooltip-id="categoryTip"
            />
            <Tooltip id="categoryTip" content="Update book category." />
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block mb-1 font-medium">Rating</label>
            <input
              id="rating"
              type="number"
              name="rating"
              placeholder="Rating"
              value={bookData.rating || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              data-tooltip-id="ratingTip"
            />
            <Tooltip id="ratingTip" content="Set rating between 1 to 5." />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block mb-1 font-medium">Quantity</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={bookData.quantity || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              data-tooltip-id="quantityTip"
            />
            <Tooltip id="quantityTip" content="Total available quantity." />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="image" className="block mb-1 font-medium">Upload New Cover</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border rounded file-input file-input-bordered w-full placeholder:text-[#223A5E] bg-transparent dark:placeholder:text-[#D0E7F9]"
              data-tooltip-id="imageTip"
            />
            <Tooltip id="imageTip" content="Upload a new image to replace the current one." />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#4FD1C5] hover:bg-[#3BB8AC] text-white px-6 py-2 rounded"
          >
            Update Book
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateBook;
