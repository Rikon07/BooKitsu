import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import MinimalHeader from "../../Components/Main Components/MinimalHeader";
import Loader from "../../Components/Main Components/Loader";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      background: "#FFFBDE",
      color: "#096B68",
      confirmButtonColor: "#129990",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    setLoading(true);
    try {
      const result = await signIn(email, password);
      showAlert("Welcome Back!", `Logged in as ${result.user.displayName}`, "success");
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      setError(err.message);
      showAlert("Login Failed", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleSignIn();
      showAlert("Welcome!", `Logged in as ${result.user.displayName}`, "success");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      showAlert("Oops!", "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#D0E7F9] to-[#4FD1C5] dark:bg-gradient-to-br dark:from-[#0f1c2e] dark:to-[#0f1c2e] pt-5 relative">
      {/* <Helmet>
        <title>RykHub | Login</title>
      </Helmet> */}

      <MinimalHeader />
      {loading && <Loader />}

      {/* Floating Squares */}
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
          <h2 className="text-4xl font-bold text-[#223A5E] dark:text-[#D0E7F9] mb-4">Login</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="text-right">
              <Link
                to="/forget-password"
                state={{ email }}
                className="text-[#4FD1C5] text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="bg-[#4FD1C5] hover:bg-[#90e1ddfd] text-white font-semibold py-2 rounded-lg transition-all hover:text-[#0f1c2e] hover:shadow-lg  hover:shadow-[#4FD1C5]/20"
            >
              Log In
            </button>
          </form>

          <div className="my-4">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full border border-[#129990] text-[#129990] hover:bg-[#129990] hover:text-white gap-2 py-2 rounded-lg transition-all"
            >
              <FcGoogle size={20} />
              Sign in with Google
            </button>
          </div>

          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#096B68] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
