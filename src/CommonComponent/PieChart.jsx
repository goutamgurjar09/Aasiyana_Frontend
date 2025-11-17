import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the elements
ChartJS.register(ArcElement, Tooltip, Legend);
export default function MetricsPieChart({
  totalBookings,
  totalConfirmedBookings,
  totalPendingBookings,
  totalCancelledBookings,
  totalProperties,
  totalUsers,
  totalEnquiries,
}) {
  // All labels, values, and colors
  const rawLabels = [
    "Total Bookings",
    "Confirmed Bookings",
    "Pending Bookings",
    "Cancelled Bookings",
    "Total Properties",
    "Total Users",
    "Total Enquiries",
  ];

  const rawValues = [
    totalBookings,
    totalConfirmedBookings,
    totalPendingBookings,
    totalCancelledBookings,
    totalProperties,
    totalUsers,
    totalEnquiries,
  ];

  const backgroundColors = [
    "#3b82f6", // blue - Total Bookings
    "#10b981", // green - Confirmed
    "#f59e0b", // amber - Pending
    "#6366f1", // indigo - Cancelled
    "#f43f5e", // rose - Properties
    "#8b5cf6", // violet - Users
    "#ec4899", // pink - Enquiries
  ];

  // ✅ Filter out metrics with 0 or undefined values
  const filteredLabels = [];
  const filteredValues = [];
  const filteredColors = [];

  rawValues.forEach((val, idx) => {
    if (val && val > 0) {
      filteredLabels.push(rawLabels[idx]);
      filteredValues.push(val);
      filteredColors.push(backgroundColors[idx]);
    }
  });

  // ✅ Show fallback message if everything is 0
  if (filteredValues.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        No data available to display
      </div>
    );
  }

  const data = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Overview Data",
        data: filteredValues,
        backgroundColor: filteredColors,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          fontSize: 12,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mb-4 mx-auto h-96 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">
       Overview
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
}
