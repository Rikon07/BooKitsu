import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet';
import Navbar from '../../Components/Main Components/Navbar';
import Footer from '../../Components/Main Components/Footer';
import Anime5 from "../../assets/Animations/Anime -5.json";
import Lottie from "lottie-react";
import { Tooltip } from "react-tooltip";

const AddBook = () => {
  const { user } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const quantity = parseInt(form.quantity.value);
    const author = form.author.value;
    const category = form.category.value;
    const description = form.description.value;
    const rating = parseFloat(form.rating.value);
    const content = form.content.value;

    if (!selectedImage) {
      Swal.fire("Oops", "Please upload a book cover image!", "warning");
      return;
    }

    const imageUrl = await handleImageUpload(selectedImage);
    if (!imageUrl) return Swal.fire("Failed", "Image upload failed", "error");

    const bookData = {
      title,
      quantity,
      author,
      category,
      description,
      rating,
      content,
      image: imageUrl,
      email: user.email,
      name: user.displayName,

    };

    console.log(bookData);

    try {
      await axios.post("http://localhost:3000/books", bookData);
      form.reset();
      setImagePreview(null);
      setSelectedImage(null);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Book added successfully!',
        showConfirmButton: false,
        timer: 2000,
        background: '#D0E7F9',
        color: '#223A5E',
      });
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
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
    <div>
      <Navbar />
      <div className="mt-16 cabin lg:mt-[74px] bg-[#D0E7F9] dark:bg-[#223A5E] text-[#223A5E] dark:text-[#D0E7F9]  px-4 lg:px-20">
        {/* <Helmet>
          <title>Add Book | BooKitsu</title>
        </Helmet> */}
        <div className='flex items-center justify-center'>
            <h2 className="text-2xl lg:text-3xl font-bold  text-center text-[#4FD1C5]">Add a New Book</h2>
        <div className="flex justify-center">
            <Lottie animationData={Anime5} loop={true} className="w-32"  />
          </div>
        </div>

        <div className="gap-4 items-start max-w-7xl mx-auto">
          <form onSubmit={handleSubmit} className="lg:col-span-2 grid grid-cols-1 gap-4 bg-white dark:bg-[#1B314B] p-8 rounded-xl shadow-md">

            <div>
              <label className="block mb-1 font-medium">Book Cover Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleImagePreview} required
                className="file-input file-input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E] dark:placeholder:text-[#D0E7F9]" data-tip="Upload book image" />
              <Tooltip place="top" type="dark" effect="solid" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-48" />}
            </div>

            <div>
              <label className="block mb-1 font-medium">Book Title</label>
              <input type="text" name="title" className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" required placeholder="Book Title" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Quantity</label>
              <input type="number" name="quantity" className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" required placeholder="Number of copies" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Author Name</label>
              <input type="text" name="author" className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E] " required placeholder="Author Name" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Category</label>
              <select name="category" className="select select-bordered cursor-pointer w-full bg-[#D0E7F9] text-[#223A5E]" required>
                <option disabled selected>Choose category</option>
                {[ 'Arts & Music', 'Biographies', 'Business', 'Comics', 'Tech', 'Education', 'Entertainment', 'Health', 'Horror', 'Mystery', 'Kids', 'Religion', 'Novel', 'Thriller', 'History', 'Drama', 'Sci-Fi' ].map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Short Description</label>
              <textarea name="description" rows="2" className="textarea textarea-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" required placeholder="Enter a short summary"></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium">Rating (1-5)</label>
              <input type="number" name="rating" min="1" max="5" step="0.1" className="input input-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" required placeholder="Rating" />
            </div>

            <div>
              <label className="block mb-1 font-medium">Book Content</label>
              <textarea name="content" rows="2" placeholder="Additional info or synopsis..." className="textarea textarea-bordered w-full bg-[#D0E7F9] placeholder:text-[#223A5E]" required></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-gradient-to-r from-[#4FD1C5] to-[#129990] text-white hover:text-[#223A5E] px-8 py-2 rounded-xl font-semibold hover:scale-101 transition">
                Add Book
              </button>
            </div>
          </form>

          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddBook;
