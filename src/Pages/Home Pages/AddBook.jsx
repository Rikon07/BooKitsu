import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import Anime5 from "../../assets/Animations/Anime -5.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=dbe36fc890c8c903039528c40c376b69`,
        formData
      );
      return response.data.data.display_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!selectedImage) {
      return Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please upload a book cover image!',
        background: '#D0E7F9',
        color: '#223A5E',
        confirmButtonColor: '#4FD1C5'
      });
    }

    setLoading(true);
    const imageUrl = await handleImageUpload(selectedImage);
    if (!imageUrl) {
      setLoading(false);
      return Swal.fire({
        icon: 'error',
        title: 'Image Upload Failed',
        background: '#D0E7F9',
        color: '#223A5E',
        confirmButtonColor: '#4FD1C5'
      });
    }

    const bookData = {
      ...data,
      quantity: parseInt(data.quantity),
      rating: parseFloat(data.rating),
      image: imageUrl,
      email: user.email,
      name: user.displayName,
    };

    try {
      await axios.post("https://bookitsu-server.vercel.app/books", bookData);
      reset();
      setImagePreview(null);
      setSelectedImage(null);
      Swal.fire({
        icon: 'success',
        title: `${bookData.title} Book added successfully!`,
        background: '#D0E7F9',
        color: '#223A5E',
        confirmButtonColor: '#4FD1C5',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to add book',
        text: 'Try again later.',
        background: '#D0E7F9',
        color: '#223A5E',
        confirmButtonColor: '#4FD1C5'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  return (
    <div className='bg-[#D0E7F9] dark:bg-[#223A5E]'>
      <Navbar />
      <Helmet>
        <title>Add Book | Bookitsu</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="min-h-screen bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9] mt-16 mb-4"
      >
        <div className=" cabin px-4 lg:px-20">
          <div className='flex items-center justify-center text-center mb-1'>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#4FD1C5]">
              Add a New Book
            </h2>
            <Lottie animationData={Anime5} loop={true} className="w-32" />
          </div>

          <div className="max-w-6xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 bg-white dark:bg-[#1B314B] p-8 rounded-xl shadow-md">

              <div>
                <label className="block mb-1 font-medium">Book Cover Image</label>
                <input type="file" accept="image/*" onChange={handleImagePreview} required
                  className="file-input file-input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-48" />
                ) : loading && <Skeleton height={200} className="mt-4 rounded-lg" />}
              </div>

              <div>
                <label className="block mb-1 font-medium">Book Title</label>
                <input type="text" {...register("title")} required placeholder="Book Title"
                  className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Quantity</label>
                <input type="number" {...register("quantity")} required placeholder="Number of copies"
                  className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Author Name</label>
                <input type="text" {...register("author")} required placeholder="Author Name"
                  className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select {...register("category")} required
                  className="select select-bordered cursor-pointer w-full bg-[#D0E7F9] text-[#223A5E]">
                  <option disabled selected>Choose category</option>
                  {[ 'Tech', 'Education', 'Sci-Fi', 'Comics', 'Biographies', 'Business',  'Entertainment', 'Health', 'Horror', 'Mystery', 'Kids', 'Religion', 'Novel', 'Thriller', 'History', 'Drama' ].map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Short Description</label>
                <textarea {...register("description")} rows="2" required placeholder="Enter a short summary"
                  className="textarea textarea-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Rating (1-5)</label>
                <input type="number" {...register("rating")} min="1" max="5" step="0.1" required placeholder="Rating"
                  className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
              </div>

              <div>
                <label className="block mb-1 font-medium">Book Content</label>
                <textarea {...register("content")} rows="2" required placeholder="Additional info or synopsis..."
                  className="textarea textarea-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" />
              </div>

              <div className="text-center mt-4">
                <button type="submit"
                  className="bg-gradient-to-r from-[#4FD1C5] to-[#129990] text-white hover:text-[#223A5E] px-8 py-2 rounded-xl font-semibold hover:scale-105 transition">
                  {loading ? <Skeleton width={80} height={20} /> : "Add Book"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AddBook;