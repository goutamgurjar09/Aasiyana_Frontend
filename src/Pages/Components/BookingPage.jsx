import { useCreateBookingMutation } from "../../redux/features/bookingApi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showSuccess } from "../../Alert";
import { InputField } from "../../CommonComponent/InputField";
import { TextAreaField } from "../../CommonComponent/TextAreaField";

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(3),
  mobile: yup.string().matches(/^[0-9]{10}$/, "Invalid number").required(),
});

const BookingPage = ({ propertyId, onClose }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = { ...data, propertyId, userId: user.userId };

    try {
      const res = await createBooking(payload).unwrap();
      showSuccess("Booking request sent successfully");

      reset();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      <InputField
        label="Full Name"
        name="name"
        register={register}
        placeholder="Enter your full name"
        error={errors?.name?.message}
      />

      <InputField
        label="Mobile"
        name="mobile"
        register={register}
        placeholder="Enter Mobile Number"
        error={errors?.mobile?.message}
      />

      <TextAreaField
        label="Message"
        name="message"
        register={register}
        placeholder="Enter message"
        errors={errors}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-amber-400 hover:bg-amber-500 text-pink-700 py-3 rounded-lg "
      >
        {isLoading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
};

export default BookingPage;
