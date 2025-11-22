export const InputField = ({
  label,
  register,
  name,
  placeholder,
  type = "text",
  error,
  className = "",
  required,
  ...rest
}) => (
  <div>

    <label
      className="block text-sm font-medium text-gray-700 mb-1"
      htmlFor={name}
    >
      {label} {required && <span className="required: text-pink-700">*</span>}
    </label>
    <input
      type={type}
      {...register(name)}
      placeholder={placeholder}
      className={`h-12 px-4 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        className || "w-full"
      }`}
      {...rest}
    />
    {error && <p className="text-pink-700 text-sm mt-1">{error}</p>}
  </div>
);
