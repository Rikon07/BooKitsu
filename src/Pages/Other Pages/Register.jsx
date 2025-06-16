import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import MinimalHeader from "../../Components/Main Components/MinimalHeader";
import { AuthContext } from "../../Provider/AuthProvider";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } = useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (name.length < 3) {
      setNameError("Name should be more long");
      return;
    } else {
      setNameError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must have 6+ characters, with at least one uppercase and one lowercase letter.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const result = await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      setUser({ ...result.user, displayName: name, photoURL: photo });
      Swal.fire({
        title: "Success!",
        text: "Registered successfully!",
        icon: "success",
        background: "#D0E7F9",
        color: "#223A5E",
        confirmButtonColor: "#4FD1C5",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        background: "#D0E7F9",
        color: "#223A5E",
        confirmButtonColor: "#4FD1C5",
      });
    }
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        setUser(result.user);
        // console.log(result.user)
        Swal.fire({
          title: "Welcome!",
          text: `Logged in as ${result.user.displayName}`,
          icon: "success",
          background: "#D0E7F9",
          color: "#223A5E",
          confirmButtonColor: "#4FD1C5",
        });
        navigate("/", { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops!",
          text: "Google Sign In Failed: " + error.message,
          icon: "error",
          background: "#D0E7F9",
          color: "#223A5E",
          confirmButtonColor: "#4FD1C5",
        });
      });
  };

  return (
    <div className="bg-gradient-to-br from-[#D0E7F9] to-[#4FD1C5] dark:bg-gradient-to-br dark:from-[#0f1c2e] dark:to-[#0f1c2e] pt-5 min-h-screen relative">
      <Helmet>
        <title>Register | Bookitsu</title>
      </Helmet>
      <MinimalHeader />

      <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 dark:bg-[#4FD1C5]/20 rounded-lg animate-pulse"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-white/20 dark:bg-[#4FD1C5]/20 rounded-lg animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 dark:bg-[#4FD1C5]/10 rounded-lg animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-20 h-20 bg-white/10 dark:bg-[#4FD1C5]/10 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-white/30 dark:bg-[#4FD1C5]/30 rounded-lg animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/30 dark:bg-[#4FD1C5]/30 rounded-lg animate-pulse"></div>

      <div className="min-h-[90vh] flex items-center justify-center px-4">
        <div className="bg-white/50 dark:bg-[#1e2f45]/70 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl w-full max-w-md text-center border border-white/30 dark:border-[#4FD1C5]/30">
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-xl font-bold flex items-center gap-1 qyore tracking-wide text-[#223A5E] dark:text-[#D0E7F9] transition"
            >
              <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#4FD1C5]">
                BooKitsu
              </span>
            </Link>
          </div>
          <h2 className="text-4xl font-bold text-[#223A5E] dark:text-[#D0E7F9] mb-4">Register</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input-style"
              required
            />
            {nameError && <p className="text-sm text-red-500">{nameError}</p>}

            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input-style"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-style"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-style"
              required
            />
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

            <button
              type="submit"
              className="bg-[#4FD1C5] hover:bg-[#90e1ddfd] text-white font-semibold py-2 rounded-lg transition-all hover:text-[#0f1c2e] hover:shadow-lg  hover:shadow-[#4FD1C5]/20"
            >
              Register
            </button>
          </form>

          <div className="my-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full border border-[#4FD1C5] text-[#4FD1C5] hover:bg-[#4FD1C5] hover:text-white gap-2 py-2 rounded-lg transition-all"
            >
              <FcGoogle size={20} />
              Sign up with Google
            </button>
          </div>

          <p className="text-sm text-[#223A5E] dark:text-[#D0E7F9]">
            Already have an account? {" "}
            <Link to="/login" className="text-[#4FD1C5] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;