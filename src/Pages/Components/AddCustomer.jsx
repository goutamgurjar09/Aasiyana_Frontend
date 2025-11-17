// src/components/Customer/AddCustomerForm.jsx
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateCustomerMutation } from "../../redux/features/customerApi";
import { showError, showSuccess } from "../../Alert";
import { useNavigate } from "react-router-dom"
const schema = yup.object({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
});

const AddCustomer = ({ propertyId, onClose }) => {
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, propertyId };
      await createCustomer(payload).unwrap();
      showSuccess("Enquiry submitted successfully,Pls wait our team will contact you!");
      localStorage.setItem("customerInfo", JSON.stringify({
        mobile: data.mobile
      }));
      reset();
      onClose();

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate(`/propertyDetails/${propertyId}`);
      }, 500);
    } catch (err) {
      showError(err?.data?.message || "Failed to add customer");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4"
      noValidate
    >
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Enter name"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AAAA]"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("mobile")}
          type="mobile"
          placeholder="Enter mobile number"
          maxLength={10}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00AAAA]"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#00AAAA] hover:bg-[#00CCCC] text-white font-semibold py-2 rounded-lg transition-all"
      >
        {isLoading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default AddCustomer;
