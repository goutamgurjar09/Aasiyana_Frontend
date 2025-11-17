import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";
import MetricsPieChart from "../CommonComponent/PieChart";

// ✅ RTK Query hooks
import { useGetAllPropertiesQuery } from "../redux/features/propertyApi";
import { useGetUsersQuery } from "../redux/features/authApi";
import { useGetBookingsQuery, useGetTotalRevenueQuery, useGetTotalBookingStatusCountQuery } from "../redux/features/bookingApi";
import { useGetAllInquiriesQuery } from "../redux/features/inquiryApi";

export default function Dashboard() {
  // Fetch all data via RTK Query
const { data: propertiesData } = useGetAllPropertiesQuery({ page: 1, limit: 10 });
const { data: usersData } = useGetUsersQuery({ page: 1, limit: 10 });
const { data: bookingsData } = useGetBookingsQuery({ page: 1, limit: 10 });
const { data: enquiriesData } = useGetAllInquiriesQuery({ page: 1, limit: 10 });  
  const { data: revenueData } = useGetTotalRevenueQuery();
  const { data: bookingStatusCount } = useGetTotalBookingStatusCountQuery();

  // Calculate totals
  const totalProperties = propertiesData?.data?.totalProperties || 0;
  const totalUsers = usersData?.data?.totalUsers || 0;
  const totalBookings = bookingsData?.data?.totalBookings || 0;
  const totalEnquiries = enquiriesData?.data?.totalEnquiries || 0;
  const totalPendingBookings = bookingStatusCount?.data?.pending || 0;
  const totalConfirmedBookings = bookingStatusCount?.data?.confirmed || 0;
  const totalCancelledBookings = bookingStatusCount?.data?.cancelled || 0;

  const totalRevenueCalculated =
    revenueData?.data?.reduce((sum, item) => sum + item.totalRevenue, 0) || 0;

  const stats = [
    { title: "Total Properties", value: totalProperties, path: "/property-list" },
    { title: "Total Users", value: totalUsers, path: "/users" },
    { title: "Total Bookings", value: totalBookings, path: "/bookings" },
    { title: "Total Confirmed Bookings", value: totalConfirmedBookings, path: "/bookings" },
    { title: "Total Pending Bookings", value: totalPendingBookings, path: "/bookings" },
    { title: "Total Cancelled Bookings", value: totalCancelledBookings, path: "/bookings" },

    { title: "Total Enquiries", value: totalEnquiries, path: "/enquiries" },
    { title: "Total Revenue", value: totalRevenueCalculated.toLocaleString() || 0 },
  ];


const monthShortNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const revenueArray = revenueData?.data || [];

// ✅ Get current year dynamically
const currentYear = new Date().getFullYear();

// ✅ Build full 12-month data (fill missing with 0)
const fullYearRevenue = monthShortNames.map((month, index) => {
  const match = revenueArray.find(
    (item) => item._id?.month === index + 1 && item._id?.year === currentYear
  );
  return {
    month,
    revenue: match ? match.totalRevenue : 0,
  };
});

// ✅ Highcharts options
const highChartOptions = {
  chart: {
    type: "column",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    style: { fontFamily: "Inter, sans-serif" },
  },
  title: {
    text: `Monthly Revenue (${currentYear})`,
    style: { fontSize: "18px", fontWeight: "bold", color: "#333" },
  },
  xAxis: {
    categories: fullYearRevenue.map((i) => i.month),
    crosshair: true,
    title: { text: "Month" },
  },
  yAxis: {
    min: 0,
    title: { text: "Revenue (₹)" },
    gridLineColor: "#eee",
  },
  tooltip: {
    headerFormat: "<b>{point.key}</b><br/>",
    pointFormat: "Revenue: <b>₹{point.y:,.2f}</b>",
  },
  plotOptions: {
    column: {
      borderRadius: 4,
      pointPadding: 0.05,
      groupPadding: 0.1,
      borderWidth: 0,
    },
  },
  series: [
    {
      name: "Revenue",
      data: fullYearRevenue.map((i) => i.revenue),
      color: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [
          [0, "#00AAAA"],
          [0.5, "#00CCCC"],
          [1, "#007777"],
        ],
      },
    },
  ],
};

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(item => (
          <Link key={item.title} to={item?.path || ""}>
            <div className="p-6 bg-gray-100 shadow-md rounded-lg text-center hover:bg-gray-200 transition">
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-700 font-semibold text-xl mt-2">{item.value}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-8 p-8 bg-gray-100 shadow-md rounded-lg mb-10">
        <MetricsPieChart
          totalBookings={totalBookings}
          totalConfirmedBookings={totalConfirmedBookings}
          totalPendingBookings={totalPendingBookings}
          totalCancelledBookings={totalCancelledBookings}
          totalProperties={totalProperties}
          totalUsers={totalUsers}
          totalEnquiries={totalEnquiries}
          totalRevenue={totalRevenueCalculated}
        />
      </div>

      <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-lg mb-8">
        <HighchartsReact highcharts={Highcharts} options={highChartOptions} />
      </div>
    </main>
  );
}
