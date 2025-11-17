import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../Alert";
import Modal from "../../CommonComponent/Modal";
import {
  useGenerateOtpMutation,
  useResetPasswordMutation,
} from "../../redux/features/authApi";

const ForgotPassword = () => {
  const [mobile, setMobile] = useState("");
  const [otp_number, setOtpNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const navigate = useNavigate();

  // RTK Query mutations
  const [generateOtp] = useGenerateOtpMutation();
  const [resetPassword] = useResetPasswordMutation();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!mobile) return showError("Please enter your mobile number");

    try {
      const result = await generateOtp({ mobile }).unwrap();

      if (result?.data?.otp_send) {
        setShowResetModal(true);
        showSuccess(result?.message || "OTP sent successfully");
      } else {
        showError(result?.message || "Failed to send OTP");
      }
    } catch (err) {
      showError(err?.data?.message || err?.message || "Failed to send OTP");
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp_number || !newPassword || !confirmPassword)
      return showError("All fields are required");

    if (newPassword !== confirmPassword)
      return showError("Passwords do not match");

    try {
      const result = await resetPassword({
        mobile,
        otp_number,
        newPassword,
      }).unwrap();

      showSuccess(result?.message || "Password reset successful!");
      setShowResetModal(false);
      navigate("/login");
    } catch (err) {
      showError(err?.data?.message || err?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      <div className="absolute inset-0 bg-gray-900 bg-center blur-lg opacity-30"></div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Forgot Password
        </h2>
        <p className="text-gray-900 text-center mt-2">
          Enter your mobile number to receive an OTP
        </p>

        <form onSubmit={handleSendOtp} className="mt-6">
          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
            <label className="block text-sm text-gray-900">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 mt-2 bg-transparent border-b border-gray-900 text-gray-900 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
          >
            Send OTP
          </button>
        </form>
      </div>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset Password"
        size="h-[70%]"
      >
        <form onSubmit={handleResetPassword} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm text-gray-900 mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp_number}
              onChange={(e) => setOtpNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-900 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-900 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowResetModal(false)}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Reset Password
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
