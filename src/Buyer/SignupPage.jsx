import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../redux/features/authApi";
import { showSuccess } from "../Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaArrowLeft } from "react-icons/fa";

import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces")
    .min(3, "Full name must be at least 3 characters"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  role: yup.string().required("Role is required"),
});

function SignupPage() {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    if (profileImg) formData.append("profileImg", profileImg);

    try {
      const res = await signup(formData).unwrap();
      console.log(res);
      if (res?.success) {
        showSuccess(res?.message);
        navigate("/login");
      }
    } catch (err) {
      showError(err?.message || "Signup failed.");
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e7e7e7] text-white p-4 relative">
      <button
             onClick={() => navigate("/")}
             className="absolute bg-amber-400 text-pink-700 px-3 py-2 font-bold shadow-md flex items-center gap-2  z-50
                  top-4 left-4 sm:top-6 sm:left-10 md:top-8 md:left-20"
           >
             <FaArrowLeft size={14} />
             Back
           </button>
      <div className="w-full max-w-xl bg-white text-[#005555] font-serif p-10 rounded-lg shadow-2xl border-gray-300 relative z-10">
        <h2 className="text-center text-amber-400 text-3xl font-semibold mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              {...register("fullname")}
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
            />
            {errors.fullname && (
              <p className="text-pink-700 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              {...register("mobile")}
              type="tel"
              placeholder="Mobile No"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
            />
            {errors.mobile && (
              <p className="text-pink-700 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
            />
            {errors.email && (
              <p className="text-pink-700 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent p-2 outline-none text-gray-900 pr-10"
            />
            <span
              className="absolute right-2 top-2 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-pink-700 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-transparent p-2 outline-none text-gray-900 pr-10"
            />
            <span
              className="absolute right-2 top-2 text-gray-600 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-pink-700 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="w-full border-b-2 border-gray-900">
            <select
              {...register("role")}
              className="w-full bg-transparent p-2 text-gray-900 outline-none"
            >
              <option value="buyer">Buyer</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-pink-700 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div className="w-full">
            <label className="text-black text-md font-semibold">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImg(e.target.files[0])}
              className="w-full bg-transparent p-2 text-gray-900"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 bg-amber-400 hover:bg-amber-500 py-2 my-4 font-bold text-pink-700  transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center text-black text-sm mt-4">
          Already have an account?
          <a href="/login" className="text-[#005555] hover:underline ml-1 font-semibold">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
