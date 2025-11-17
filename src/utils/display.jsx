export const renderField = (label, value, formatter) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    (typeof value === "number" && value === 0)
  ) {
    return null; // don't render anything
  }

  const displayValue = formatter ? formatter(value) : value;
  return (
    <div>
      <span className="font-medium">{label}:</span> {displayValue}
    </div>
  );
};
