import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { FaPen } from "react-icons/fa";
import Footer from "../../Components/Main Components/Footer";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import Navbar from "../../Components/Main Components/Navbar";

const Profile = () => {
  const { user, setUser, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();

    updateUser({ displayName: name, photoURL })
      .then(() => {
        setUser({ ...user, displayName: name, photoURL });
        toast.success("Profile updated successfully!");
        setEditing(false);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="min-h-[90vh] cabin bg-[#D0E7F9] dark:bg-[#223A5E] transition-all duration-300 mt-16 lg:mt-[74px]">
      <Helmet>
        <title>Profile | BooKitsu</title>
      </Helmet>
      <Navbar />

      <section className="max-w-xl min-h-[55vh] mx-auto mt-10 p-8 bg-[#F7FAFC]/50 dark:bg-[#2c4a79] shadow-2xl rounded-3xl font-poppins transition-all duration-300 relative mb-1">
        <div className="flex flex-col items-center gap-3 relative">
          <div className="relative">
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#4FD1C5] object-cover shadow-md"
              data-tooltip-id="profile-img"
              data-tooltip-content="Your profile picture"
            />
            <Tooltip id="profile-img" />

            {/* Pencil Icon */}
            <button
              onClick={() => setEditing(true)}
              data-tooltip-id="edit-profile"
              data-tooltip-content="Edit Profile"
              className="absolute -bottom-2 -right-2 p-2 bg-[#4FD1C5] hover:bg-[#3CA6A6] text-[#223A5E] rounded-full shadow transition-all duration-300"
            >
              <FaPen className="text-sm" />
            </button>
            <Tooltip id="edit-profile" />
          </div>

          <h2
            className="text-2xl font-bold text-[#223A5E] dark:text-[#4FD1C5]"
            data-tooltip-id="display-name"
            data-tooltip-content="Your display name"
          >
            {user?.displayName}
          </h2>
          <Tooltip id="display-name" />

          <p
            className="text-sm text-[#3CA6A6] dark:text-[#D0E7F9]"
            data-tooltip-id="email-id"
            data-tooltip-content="Your email address"
          >
            {user?.email}
          </p>
          <Tooltip id="email-id" />
        </div>

        <AnimatePresence>
          {editing && (
            <motion.form
              onSubmit={handleUpdate}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex flex-col gap-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name"
                className="border border-[#4FD1C5] text-[#223A5E] dark:text-[#D0E7F9] dark:bg-[#223A5E] placeholder-[#3CA6A6] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                data-tooltip-id="edit-name"
                data-tooltip-content="Update your display name"
              />
              <Tooltip id="edit-name" />

              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter new photo URL"
                className="border border-[#4FD1C5] text-[#223A5E] dark:text-[#D0E7F9] dark:bg-[#223A5E] placeholder-[#3CA6A6] px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
                data-tooltip-id="edit-photo"
                data-tooltip-content="Update your profile picture URL"
              />
              <Tooltip id="edit-photo" />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-[#4FD1C5] text-[#223A5E] font-semibold py-2 px-5 rounded-xl hover:bg-[#3CA6A6] hover:text-[#F7FAFC] transition-all duration-300 cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="border border-[#4FD1C5] text-[#223A5E] dark:text-[#D0E7F9] py-2 px-5 rounded-xl hover:bg-[#D0E7F9] dark:hover:bg-[#23395d] transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;