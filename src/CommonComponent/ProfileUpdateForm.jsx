import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../redux/features/authApi";
import { showSuccess, showError } from "../Alert";

const ProfileUpdateForm = ({ userData, setIsModalOpen, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [previewImage, setPreviewImage] = useState(null);

  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userData) {
      reset({
        email: userData.email || "",
        fullname: userData.fullname || "",
        mobile: userData.mobile || "",
      });
      if (userData.profileImg) {
        setPreviewImage(userData.profileImg);
      }
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("fullname", data.fullname);
      formData.append("mobile", data.mobile);

      if (data.profileImg?.[0]) {
        formData.append("profileImg", data.profileImg[0]);
      }

      const res = await updateUser({
        id: userData._id,
        formData,
      }).unwrap();

      showSuccess(res.message || "Profile updated successfully");

      // Update modal & parent
      setIsModalOpen(false);
      onSuccess();

      // Update local storage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const newUser = {
        ...storedUser,
        ...res.updatedUser,
      };
      localStorage.setItem("user", JSON.stringify(newUser));

    } catch (err) {
      showError(err?.data?.message || "Failed to update profile");
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="mx-auto p-4 rounded-lg max-h-[55vh] overflow-scroll no-scrollbar">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullname", { required: "Full name is required" })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mobile</label>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter valid mobile number",
              },
            })}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("profileImg")}
            onChange={handleImagePreview}
          />
        </div>

        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="h-20 w-20 object-cover rounded-full"
          />
        )}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={updateLoading}
            className="w-60 bg-[#005555] text-white py-2 rounded shadow-md hover:bg-[#007777] transition"
          >
            {updateLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
