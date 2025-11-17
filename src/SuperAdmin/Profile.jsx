import { useState } from "react";
import { FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";
import ProfileUpdateForm from "../CommonComponent/ProfileUpdateForm";
import Modal from "../CommonComponent/Modal";
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../redux/features/authApi";

// Helper to get initials
const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user: userData } = useSelector((state) => state.auth);
  const { data: user, isLoading, refetch } = useGetUserByIdQuery(userData?.userId);

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-700">Profile</h2>
        <button
          className="px-4 py-2 bg-[#005555] text-white rounded-md hover:bg-[#007777] transition"
          onClick={() => setIsModalOpen(true)}
        >
          Update Profile
        </button>
      </div>

      <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center gap-6 mb-8">
          {user?.profileImg ? (
            <img
              src={user.profileImg}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-700">
              {getInitials(user?.fullname || "U")}
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {user?.fullname
                ? user.fullname.charAt(0).toUpperCase() + user.fullname.slice(1)
                : "User"}
            </h2>
            <span className="inline-block mt-2 px-4 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "User"}
            </span>
          </div>
        </div>

        <div className="space-y-6 text-gray-700 text-lg">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500" />
            <span>{user?.email || "Not available"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-green-500" />
            <span>{user?.mobile || "Not available"}</span>
          </div>
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-purple-500" />
            <span>{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || "Not specified"}</span>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Profile"
        size="h-[75%] w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]"
      >
        <ProfileUpdateForm
          userData={user}
          setIsModalOpen={setIsModalOpen}
          onSuccess={() => refetch()}
          loading={isLoading}
        />
      </Modal>
    </main>
  );
};

export default Profile;
