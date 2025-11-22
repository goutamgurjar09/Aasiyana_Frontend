import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showError, showSuccess } from "../Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import {
  useLoginMutation,
  useGoogleLoginMutation,
} from "../redux/features/authApi";
import { FaArrowLeft } from "react-icons/fa";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter (A-Z)"
    )
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter (a-z)"
    )
    .matches(/[0-9]/, "Password must contain at least one number (0-9)")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res?.data?.accessToken) {
        showSuccess(res.message || "Login successful!");

        // Store user data
        localStorage.setItem("user", JSON.stringify(res.data));

        // Role-based redirect
        const role = res.data.role;
        if (role === "superAdmin") {
          navigate("/super/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "seller") {
          navigate("/seller/dashboard");
        } else {
          // Default for buyers or unknown role
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
      showError(err?.data?.message || "An unexpected error occurred during login.");
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const tokenId = response?.credential;
      if (!tokenId) return showError("Invalid Google response.");

      const res = await googleLogin({ data: { tokenId } }).unwrap();

      if (res?.data) {
        showSuccess(res.message || "Google login successful!");

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(res.data));

        // Role-based redirect
        const role = res.data.role;
        if (role === "superAdmin") {
          navigate("/super/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "seller") {
          navigate("/seller/dashboard");
        } else {
          // Default for buyers or unknown role
          navigate("/");
        }
      }
    } catch (err) {
      showError(err?.data?.message || "Google login error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e7e7e7] text-white p-4 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute bg-amber-400 hover:bg-amber-500 text-pink-700 px-3 py-2 font-bold shadow-md flex items-center gap-2  z-50
             top-4 left-4 sm:top-6 sm:left-10 md:top-8 md:left-20"
      >
        <FaArrowLeft size={14} />
        Back
      </button>

      <div className="absolute inset-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center blur-lg opacity-30"></div>

      <div className="w-full max-w-md bg-white p-0 rounded-lg shadow-xl border border-gray-300 relative z-10 overflow-hidden">
        <div className="p-8 mt-10">
          <h2 className="text-center text-3xl font-serif font-semibold mb-6 text-amber-400">
            Log In
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-bold text-black"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="Your Email"
                {...register("email")}
                className="w-full p-3 border border-gray-500 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#005555] text-gray-800 placeholder-gray-500 transition"
              />
              {errors.email && (
                <p className="text-pink-700 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="w-full relative">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-bold text-black"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                {...register("password")}
                className="w-full p-3 border border-gray-500 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#005555] text-gray-800 placeholder-gray-500 pr-10 transition"
              />
              <span
                className="absolute right-3 top-9 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-pink-700 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Link
              to="/forgetPassword"
              className="block text-end text-sm font-semibold text-[#005555] hover:text-gray-600 mt-4 transition"
            >
              FORGOT PASSWORD?
            </Link>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 bg-amber-400 hover:bg-amber-500 py-2 mt-4 font-bold text-pink-700   transition duration-300 shadow-md"
              >
                LOGIN
              </button>
            </div>
          </form>

          <p className="text-center text-sm mt-4 text-black">
            No account?
            <Link
              to="/signup"
              className="text-[#005555] hover:underline ml-1 font-semibold"
            >
              Sign up
            </Link>
          </p>

          <div className="flex justify-center items-center mt-4 gap-4">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => showError("Google Login Failed")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
